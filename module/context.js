
var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next){
    return res.render('context');
});

module.exports = router;