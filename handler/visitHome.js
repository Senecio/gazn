// 12:07 2017/4/26
// create by lsh

var MsgVisitHome = { }

var async = require('async');

MsgVisitHome.interest = "visitHome"
MsgVisitHome.Process = function(socket, message) {
    GameLog("visit home");
    
    var userId = socket.userId;
    var visitUserId = message.userId;

    User.GetVisitBaseData(visitUserId, function(results, fields) {
        if (results === null) 
            return;
        MsgVisitHome.Success(socket, results)
    });
}

// 解锁成功
MsgVisitHome.Success = function(socket, results) {
    var user = results[0];
    var obj = { type : "visitHomeSuccess", userid : user.id, username : user.username, 
    money : user.money, experience : user.experience, vip : user.vip, lands : user.lands };
    var msg = JSON.stringify(obj);
    socket.send(msg);
}

MsgHandler.Add(MsgVisitHome);
