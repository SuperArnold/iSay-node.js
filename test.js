// var jwt = require('express-jwt');
var express = require('express');
// var app = express
var app =  express.Router();


app.get('/', (req, res) => {
  setTimeout(() => {
  
    res.send('Hello World')
  }, 1000)
})

const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

app.get('/jwt', async function (req, res, next) {
  const secret = 'aaa';
  const token = jwt.sign({
    name: 123
 }, secret, {
    expiresIn:  60 //秒到期时间
 });

    console.log("token:" +token)

    res.send(token)
});

app.post('/jwtget', function (req, res, next) {
  console.log("req.body.token : " +req.body.token)
    jwt.verify(req.body.token, secret, function (err, decoded) {
      if (!err){
            console.log("decoded:" +decoded.name);  //会输出123，如果过了60秒，则有错误。
       }
  })
});

app.listen(3000)