var Sequelize = require('sequelize');
var db = require('../back/db');
var express = require('express'); 
var router = express.Router();
 

 const sequelize = new Sequelize('isay', 'postgres', 'p@ssw0rd', {
    host: '127.0.0.1',
    dialect: "postgres", // or 'sqlite', 'postgres', 'mariadb'
    port:    5432, // or 5432
});
console.log('GO!');
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
    })
    .catch(err => {
    console.error('Unable to connect to the database:', err);
    }).done();
    console.log('GO22!');

// 建 model
var User = db.define('test_user', {
    userName: {
        type: Sequelize.STRING, // 指定類型
        field: 'user_name' // 欄位
    },
    // 没有指定 field，代表欄位跟這個是一樣的
    email: {
        type: Sequelize.STRING
    }
}, {
    // 如果true 表會與model相同，即 test_user
    freezeTableName: true,
    operatorsAliases: false
});
 


// User.sync() 會建表並回傳Promise
// 如果 force = true 會先刪表再建表
var user = User.sync({ force: false });
 
module.exports = router;
module.exports = user;
module.exports.addUser = function(userName, email) {
    // 新增資料
    console.log("userName:" + userName);
    return User.create({
        userName: userName,
        email: email
    });
};
 
module.exports.findByName = async (userName) => {
    console.log("BBBBBB" + userName)
    
    await User.findOne({ where: { userName: userName }} ).then(function(s) {
        console.log("SSSSSSSSS!!!!!");                     
        console.log("SSSSSSSSS+ " + s.userName);
        return s;
    });
    console.log("SSSSSS" + s)
};

