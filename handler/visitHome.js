// 16:42 2017/3/30
// create by lsh

var MsgVisitHome = { }

var async = require('async');

MsgVisitHome.interest = "visitHome"
MsgVisitHome.Process = function(socket, message) {
    GameLog("visit home");
    
    var userId = socket.userId;
    var visitUserId = message.visitUserId;
}

// 解锁成功
MsgVisitHome.Success = function(socket, results) {
    var obj = { type : "visitHomeSuccess" };
    var msg = JSON.stringify(obj);
    socket.send(msg);
}

MsgHandler.Add(MsgVisitHome);

