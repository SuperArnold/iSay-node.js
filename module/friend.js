var Sequelize = require('sequelize');
var db = require('./db');
var express = require('express');

// 建 model
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
}, {
        // 如果true 表會與model相同，即 test_user
        freezeTableName: true,
        operatorsAliases: false
    });


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
});

// Announce.sync() 會建表並回傳Promise
// 如果 force = true 會先刪表再建表
var friend = Friend.sync({ force: false });

// module.exports = router;
// module.exports = user;

class FriendModule {
    static async addFriend(me_id1, me_id2, friendly) {
        return await Friend.create({
            me_id1: me_id1,
            me_id2: me_id2,
            friendly: friendly
        });
    }

    static async find(me_id1) {
        console.log("XXXXXXXXXX")
        // Friend.belongsTo(Diary, {foreignKey: 'me_id1'})
        // Diary.belongsTo(Friend, {foreignKey: 'me_id1'}) 
        // return await Friend.find(
        //     {
                // $sub: {
                    // union: [{
                        // where: {
                        //     me_id1: me_id1
                        // }, include: [Diary]
                    // }, {
                    //     where: {
                    //         me_id1: "1111111112"
                    //     }
                    // }
                    // ]
                // }
            // }
            return await db.query("select * from friend"



        ).then(function (s) {
            return s;
        });
    }
}

module.exports = FriendModule;
