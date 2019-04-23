var Sequelize = require('sequelize');
var db = require('./db');

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

// Announce.sync() 會建表並回傳Promise
// 如果 force = true 會先刪表再建表
Friend.sync({ force: false });

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
        return await db.query("select * from friend where me_id1 ='"+ me_id1 + "' and friendly = 2").then(function (s) {
            return s[0];
        });
    }
    
    static async friendInvite(me_id2) {
        return await Friend.find({
            me_id2: me_id2,
            friendly: 1
        });
    }

    static async friendSomeone(me_id2) {
        return await Friend.find({
            me_id2: me_id2
        });
    }
    static async friendUpsert(me_id1, me_id2, friendly) {
        return await Friend.upsert({
            me_id1: me_id1,
            me_id2: me_id2,
            friendly : friendly
        },{individualHooks: false}).then(t => {
            console.log("t " +t)
        }) ;
    }
}

module.exports = FriendModule;
