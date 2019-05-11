
var express = require('express');
var router = express.Router();
var authorize = require('../module/authorize');
var bodyparser = require('body-parser');
var app = express();
var ann = require('../module/announce');
var formidable = require("formidable");//上傳圖片用
var multer = require('multer');
var upload = multer({ dest: 'uploadFile/' });
fs = require("fs");



router.get("/", function (req, res, next) {
    let success = 0;
    var sess = req.session;
    console.log("context " + sess.account);
    if (authorize.isPass(req)) {
        // return res.json({code:200});
        success = 1;
        return res.json({ success: success, message: "GOOD" });
    } else {
        // return res.json({code:400});
        return res.json({ success: success, message: "session已過期，請重新登入" });
        // return res.render('login');
    }
});


router.get("/home", function (req, res, next) {
    return res.render('home', res.json({ username: 1, st: "11112222" }));

});
router.get("/friends", function (req, res, next) {

    return res.render('friends');

});

router.get("/order", function (req, res, next) {

    return res.render('order');

});
router.post("/upload", upload.any(), function (req, res, next) {

    var newFile = "./uploadFile/" + req.files[0].originalname;
    fs.readFile(req.files[0].path, function (err, data) {
        fs.writeFile(newFile, data, function (err) {
            if (err) {
                console.log("錯誤：", err)
            } else {
                let response = {
                    message: '上傳成功',
                    filename: req.files[0].originalname
                };
                res.json(response);
            }
        });
    })

});

module.exports = router;