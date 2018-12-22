var user = require('./member');
var express = require('express'); 
var router = express.Router();


// router.get('/', function(req, res, next) {
    user.addUser('Arnold', 'jack@12345.com').then(function() {
        return user.findByName('jack');
        console.log('userSSSSSSS: ', user);
    }).then(function(user) {
        
        console.log('****************************');
        console.log('user111 ', user);
        console.log('user111 name: ', user.userName);
        console.log('user email: ', user.email);
        res.send("userss.userName");

    });
// });

user.findByName = (async () =>{
    try{
        var userss = await user.findByName('jack');
        console.log('user222 name: ', userss.userName);
        }catch(err)
    {
        console.log(err);
    }
    res.send("userss.userName");
})();

module.exports = router;