if(typeof module !== 'undefined')
    module.exports = SignInAward;

var updateSql = "UPDATE `farm_game` SET `signIn`=? WHERE `userId`=?";
var selectSql = "SELECT `signIn` FROM `farm_game` WHERE `userId`=?";

function SignInAward() {

}

// 初始化为新用户
SignInAward.prototype.InitForNewUser = function(userId) {

}

SignInAward.prototype.Update = function(userId, signData, callback) {
    // 更新数据
    var signDataJson = JSON.stringify(signData);
    mysql.Query2(updateSql, [signDataJson, userId], function(results, fields) { if (callback) callback(true); });
    
}