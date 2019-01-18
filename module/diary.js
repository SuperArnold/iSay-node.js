var Sequelize = require('sequelize');
var db = require('./db');
var express = require('express'); 

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
        // console.log("SSSSSS" + s)
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
        // console.log("SSSSSS" + s)
    }
}

module.exports = DiaryModule;
