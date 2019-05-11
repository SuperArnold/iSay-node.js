var user = require('../module/member');
var express = require('express');
var authorize = require('../module/authorize');
var router = express.Router();
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var app = express();
app.use(express.static(__dirname + './public'));
    router.get('/register', function (req, res, next) {
        return res.render('register');
});

router.post('/registeradd', function (req, res, next) {
    var data;
    let success = 0;
    user.findByNumeric(req.body.numeric).then(function (user1) {

        if (user1 == null) {
            let passwd = crypto.createHash('md5').update(req.body.inputPassword).digest('hex');
            user.addUser(req.body.numeric, req.body.name, req.body.account, passwd, req.body.birthday, req.body.gender, req.body.info)
                .then(function () {
                    success = 1;
                    return res.json({ success: success, message: "註冊成功" });
                });
        } else {
            return res.json({ success: success, message: "已註冊過" });
        }
    });
});

router.post('/authentication', async function (req, res, next) {
    let success;

    if(req.body.token == null){

        let passwd = crypto.createHash('md5').update(req.body.passwd).digest('hex');
        let user1 = await user.loginAuthentication(req.body.account, passwd)
        
        if (user1 == null) {
            success = 0;
        } else {
            success = 1;
            //for session
            req.session.loginPass = true;
            req.session.account = req.body.account;
            
            token = setJWT(user1);

        }
        return res.json({ success: success , token : token});
    }else{
        
        data = authorize.isJWT(req.body.token)
        if(data.success == 1)
            return res.json({ success: 1, message: data.data });
        else
            return res.json({ success: 0, message: data.data });
    }
});

router.get('/login', function (req, res, next) {
    return res.render('login');
});

router.get('/findSomeone', function (req, res, next) {
    user.findSomeone(req.body.username)
        .then(function (user) {
            success = 1;
            return res.json({ success: success, message: user });
        });
});

function setJWT(user1) {
    const token = jwt.sign({
        name: user1.username,
        numeric : user1.numeric,
        account : user1.account,
        birthday : user1.birthday,
        gender : user1.gender
   }, secret, {
      expiresIn:  3000 //秒為單位的到期時間
   });
      return token;
};

function getJWT(token){
   var success = 1;
   jwt.verify(token, secret, function (err, decoded) {
      if (!err){ //超過時間會有錯
            data = JSON.stringify({  
               "username": decoded.username,
               "numeric" : decoded.numeric,
               "account" : decoded.account,
               "birthday" : decoded.birthday,
               "gender" : decoded.gender });
       } else{
            success = -1
            message = "超過時間"
            data = {};
       }
   })
    
   return data;
}

module.exports = user;
module.exports = router;
