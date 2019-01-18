var Sequelize = require('sequelize');
var db = require('./db');
var express = require('express'); 

// 建 model
var Images = db.define('images', {
    name: {
        primaryKey: true,
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.STRING, // 指定類型
        field: 'content' // 欄位
    },
    diary_id: {
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
var images = Images.sync({ force: false });
 
// module.exports = router;
// module.exports = user;

class ImagesModule{
    static async addImages(name, content, me_id, diary_id) {
        return await Images.create({
            name : name,
            content: content,
            me_id : me_id,
            diary_id : diary_id
        });
    }

    static async find(me_id, diary_id) {
        return await Images.findAll(
            // { limit : 1 },
            { where: {
                me_id: me_id,
                diary_id : diary_id
            }}).then(function(s) {                    
            return s;
        });
    }

    static async loginAuthentication(account, passwd) {

        console.log("BBBBBB  " + account)
        console.log("BBBBBB  " + passwd)
    
        return await Images.findOne({ where: { account: account, passwd : passwd}} )
        // console.log("SSSSSS" + s)
    }
}

module.exports = AnnounceModule;
