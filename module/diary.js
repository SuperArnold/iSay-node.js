var Sequelize = require('sequelize');
var db = require('./db');
// var express = require('express');

// 建 model
var Diary = db.define('diary', {
    id: {
        primaryKey: true,
        type: Sequelize.STRING
    },
    title: {
        type: Sequelize.STRING, // 指定類型
        field: 'title' // 欄位
    },
    // 没有指定 field，代表欄位跟這個是一樣的
   
    content: {
        type: Sequelize.STRING
    },
    place: {
        type: Sequelize.STRING
    },
    time: {
        type: Sequelize.DATE
    },
    //1.自己 2.好友 3.公開 0.刪除 
    permission: {
        type: Sequelize.INTEGER
    },
    music_path: {
        type: Sequelize.STRING
    },
    me_id: {
        type: Sequelize.STRING
    }
}, {
    // 如果true 表會與model相同，即 test_user
    freezeTableName: true,
    operatorsAliases: false
});

var Friend = db.define('friend', {
    me_id1: {
        primaryKey: true,
        type: Sequelize.STRING
    },
    me_id2: {
        primaryKey: true,
        type: Sequelize.STRING
    },
    // 没有指定 field，代表欄位跟這個是一樣的
    /*
    0 一般
    1 申請
    2 好友
    3 摯友
    4 封鎖
    */
    friendly: {
        type: Sequelize.INTEGER
    }
}, {freezeTableName: true, operatorsAliases: false});
Friend.hasMany(Diary, {foreignKey: 'me_id1'});
Friend.hasMany(Diary, {foreignKey: 'me_id2'});
Diary.belongsTo(Friend, {foreignKey: 'me_id'});
// Friend.belongsTo(Diary, {targetKey:'me_id1',foreignKey: 'me_id'});


// Announce.sync() 會建表並回傳Promise
// 如果 force = true 會先刪表再建表
var dia = Diary.sync({ force: false });
 
// module.exports = router;
// module.exports = user;

class DiaryModule{
    static async addDiary(uuid, title, content, place, permission, time, music_path, me_id) {
        return await Diary.create({
            id : uuid,
            title : title,
            content: content,
            place : place,
            permission : permission,
            time: time,
            music_path : music_path,
            me_id : me_id
        });
    }

    static async find(me_id, offset) {
        return await db.query(
            "select * from diary where me_id = '" + me_id + 
            "' union select * from diary where me_id in " + 
            "(select me_id2 from friend where me_id1 = '" + me_id +"')" +" and permission = 1"
            
            ).then(function(s) {                   
            return s;
        }).catch(err => {
            return err
        });
    }

    static async findOneDiary_self(id, me_id1){
        return await  Diary.find({ 
                attributes: ['id', 'title', 'content', 'place', 'time'],
                where: { id: id,
                    me_id : me_id1,
                    permission : {
                        $gte : 1
                    }
                }
            }).then(function(s) {
                return s;
            }).catch(err => {
                return err
            });
    }

    static async findOneDiary(id, me_id1){
        return await  Diary.find({ 
                attributes: ['id', 'title', 'content', 'place', 'time'],
                where: { id: id,
                    permission : {
                        $gte : 1
                    }
                }, include: [{
                    model: Friend,
                    where: {
                        me_id1: me_id1,
                        friendly : {
                            $in: [2, 3]
                        }
                   }
                 }]
            }).then(function(s) {
                return s;
            }).catch(err => {
                return err
            });
    }
 
    static async update(id, title, content, place, permission, music_path, me_id) {
        return await Diary.update({
            title : title,
            content: content,
            place : place,
            permission : permission,
            music_path : music_path,
            }, {
                where: {
                    me_id : me_id,
                    id : id
                }
            });
    }
    static async delete(id, permission, me_id) {
        return await Diary.update({
            permission : permission,
            }, {
                where: {
                    me_id : me_id,
                    id : id
                }
            });
    }
}

module.exports = DiaryModule;
