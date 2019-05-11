var Sequelize = require('sequelize');
var db = require('../module/db');

// 建 model
var User = db.define('member', {
    numeric: {
        primaryKey: true,
        type: Sequelize.STRING
    },
    username: {
        type: Sequelize.STRING, // 指定類型
        field: 'username' // 欄位
    },
    // 没有指定 field，代表欄位跟這個是一樣的
   
    account: {
        type: Sequelize.STRING
    },
    passwd: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.INTEGER
    },
    birthday: {
        type: Sequelize.DATE
    },
    gender: {
        type: Sequelize.INTEGER
    },
    info: {
        type: Sequelize.STRING
    },
    membership: {
        type: Sequelize.INTEGER
    },
    capacity: {
        type: Sequelize.INTEGER
    }
}, {
    // 如果true 表會與model相同
    freezeTableName: true,
    operatorsAliases: false
});
 


// User.sync() 會建表並回傳Promise
// 如果 force = true 會先刪表再建表
var user = User.sync({ force: false });

class Member {
    static async addUser(numeric, username, account, passwd, birthday, gender, info) {
        return await User.create({
            numeric :numeric,
            username: username,
            account: account,
            passwd : passwd,
            type: 0,
            birthday: birthday,
            gender: gender,
            info: info,
            membership: 1,
            capacity: 500

        });
    }

    static async findByNumeric(numeric) {
        return await User.findOne({ where: { numeric: numeric }} ).then(function(s) {                    
            return s;
        });
    }

    static async loginAuthentication(account, passwd) {
        return await User.findOne({
            attributes: ['numeric', 'username', "account", "birthday", "gender"],
            where: { account: account, passwd : passwd}} )
    }

    static async findSomeone(username, offset) {
        return await User.findAll({ 
            limit : 2 , offset: offset,
            where: { username: {$like: username + "%"}}} )
    }
}

module.exports = Member;
