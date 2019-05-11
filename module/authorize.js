//------------------------
// 檢查是否已登入
//------------------------
var jwt = require('jsonwebtoken');
module.exports = {
    isPass:function(req){
        if(!req.session.loginPass){
            return false;
        }else{
            return true;
        }
    },
    isJWT : function(token){
        var success = 1;
        jwt.verify(token, secret, function (err, decoded) {
            if (!err){//超過時間會有錯
                    data = {  
                        "username": decoded.username,
                        "numeric" : decoded.numeric,
                        "account" : decoded.account,
                        "birthday" : decoded.birthday,
                        "gender" : decoded.gender };
            } else{
                    success = -1
                    data = {message : "超過時間"};
            }
        })
            
        return ({ success: success, data: data });
    },
	
	illegalURL: 'unauthorized'
};

