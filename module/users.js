var user = require('./member');
var express = require('express');
var router = express.Router();
var app = express();

app.use(express.static(__dirname + './public'));
router.get('/register', function (req, res, next) {
    return res.render('register');
});

router.post('/registeradd', function (req, res, next) {
    var data;
    user.findByNumeric(req.body.numeric).then(function (user1) {

        if (user1 == null) {
            user.addUser(req.body.numeric, req.body.name, req.body.account, req.body.inputPassword, req.body.birthday, req.body.gender, req.body.info)
                .then(function () {
                });
        } else {
            data = JSON.stringify({ message: "註冊成功" });
        }
    });
    res.json({ success: 1, message: "Hello World" });
});

router.post('/authentication', async function (req, res, next) {
    let success;
    let user1 = await user.loginAuthentication(req.body.account, req.body.passwd)

    if (user1 == null) {
        success = 0;
    } else
        success = 1;
    return res.json({ success: success });
});


router.get('/login', function (req, res, next) {
    return res.render('login');
});

module.exports = user;
module.exports = router;
