var Sequelize = require('sequelize');
var db = require('../module/db');
var express = require('express'); 
var router = express.Router();
var crypto = require('crypto');

// var md5=require("md5");

// 建 model
var Members = db.define('member', {
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
    // 如果true 表會與model相同，即 test_user
    freezeTableName: true,
    operatorsAliases: false
});
 


// User.sync() 會建表並回傳Promise
// 如果 force = true 會先刪表再建表
var user = Members.sync({ force: false });

class Member {
    static async addUser(numeric, username, account, passwd, birthday, gender, info) {
        return await Members.create({
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
        return await Members.findOne({ where: { numeric: numeric }} ).then(function(s) {                    
            return s;
        });
    }

    static async loginAuthentication(account, passwd) {
        return await Members.findOne({ where: { account: account, passwd : passwd}} )
    }

    static async findSomeone(username, offset) {
        return await Members.findAll({ 
            limit : 2 , offset: offset,
            where: { username: {$like: username + "%"}}} )
    }
}

module.exports = Member;
