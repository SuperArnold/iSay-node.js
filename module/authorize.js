//------------------------
// 檢查是否已登入
//------------------------
module.exports = {
    isPass:function(req){
        console.log("session: " + req.session.account)
        if(!req.session.loginPass){
            return false;
        }else{
            return true;
        }
	},
	
	illegalURL: 'unauthorized'
};