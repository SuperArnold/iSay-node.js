var Sequelize = require('sequelize');
var db = require('./db');

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
            { where: {
                me_id: me_id,
                diary_id : diary_id
            }}).then(function(s) {                    
            return s;
        });
    }

    static async loginAuthentication(account, passwd) {

        return await Images.findOne({ where: { account: account, passwd : passwd}} )
    }
}

module.exports = AnnounceModule;
