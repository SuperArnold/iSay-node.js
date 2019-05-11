var anno = require('../module/announce');
var express = require('express');
var session = require('express-session');
var router = express.Router();
var crypto = require('crypto');

var app = express();
app.use(session({
    secret : 'secret', // 對session id 相關的cookie 進行簽名
    resave : true,
    saveUninitialized: false, // 是否儲存未初始化的會話
    cookie : {
    maxAge : 1000 * 60 * 3, // 設定 session 的有效時間，單位毫秒
    },
    }));
// app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.static(__dirname + './public'));
router.get('/register', function (req, res, next) {
    return res.render('register');
});

router.post('/registeradd', function (req, res, next) {
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
            // return res.json(data = JSON.stringify({ message: "註冊成功" }));
            return res.json({ success: success, message: "已註冊過" });
        }
    });
});

router.post('/authentication', async function (req, res, next) {
    let success;
    let passwd = crypto.createHash('md5').update(req.body.passwd).digest('hex');
    let user1 = await user.loginAuthentication(req.body.account, passwd)
    if (user1 == null) {
        success = 0;
    } else {
        success = 1;
        req.session.loginPass=true;
        req.session.account=req.body.account;
        data = JSON.stringify({ message: "註冊成功" });
    }
    return res.json({ success: success });
});

router.get('/login', function (req, res, next) {
    return res.render('login');
});

module.exports = user;
module.exports = router;
