var Sequelize = require('sequelize');
var db = require('./db');
var express = require('express'); 

// 建 model
var Announce = db.define('announce', {
    id: {
        primaryKey: true,
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.STRING, // 指定類型
        field: 'content' // 欄位
    },
    // 没有指定 field，代表欄位跟這個是一樣的
   
    time: {
        type: Sequelize.DATE
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
var announce = Announce.sync({ force: false });
 
// module.exports = router;
// module.exports = user;

class AnnounceModule{
    static async addAnnounce(uuid, content, time, me_id) {
        return await Announce.create({
            id : uuid,
            content: content,
            time: time,
            me_id : me_id
        });
    }

    static async find(me_id) {
        return await Announce.findAll(
            // { limit : 1 },
            { where: {
                me_id: me_id
            }}).then(function(s) {                    
            return s;
        });
    }

    static async loginAuthentication(account, passwd) {
        return await Announce.findOne({ where: { account: account, passwd : passwd}} )
    }
}

module.exports = AnnounceModule;
