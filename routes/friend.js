var express = require('express');
var router = express.Router();
var friend = require('../module/friend');
var Sequelize = require('sequelize');

router.get("/add", function (req, res, next) {
    console.log("req.body.context  " + req.body.context);
    let body = req.body;
    friend.addFriend(body.me_id1, body.me_id2, body.friendly).then(function () {
        return res.json({ success: 1, message: "好友新增成功" });
    }).catch(function (err) {
        return res.json({ success: -1, message: err.sql });
    });;

});

router.get("/find", function (req, res, next) {
    
        friend.find(req.body.me_id1)
    .then(function (friendContent) {
    
        return res.json({ success: 1, message: friendContent });
    });

});


router.get("/update", function (req, res, next) {
    let body = req.body;
    let music_path = 'music_path';
    friend.update(body.id, body.title, body.content, body.place, body.permission, music_path, body.me_id).then(function () {
        return res.json({ success: 1, message: "日誌更新成功" });
    }).catch(err => {
        return res.json({ success: -1, message: err });
    });

});
router.get("/delete", function (req, res, next) {
    let body = req.body;
    friend.delete(body.id, body.permission, body.me_id).then(function () {

        return res.json({ success: 1, message: "日誌刪除成功" });
    }).catch(err => {
        return res.json({ success: -1, message: err });
    });

});

module.exports = router;