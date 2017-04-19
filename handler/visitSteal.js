// 16:42 2017/3/30
// create by lsh

var MsgVisitSteal = { }

var async = require('async');

MsgVisitSteal.interest = "visitSteal"
MsgVisitSteal.Process = function(socket, message) {
    GameLog("visit steal");
   
    var userId = socket.userId;
    var visitUserId = message.visitUserId;
}

// 解锁成功
MsgVisitSteal.Success = function(socket, results) {
    var obj = { type : "visitStealSuccess" };
    var msg = JSON.stringify(obj);
    socket.send(msg);
}

MsgHandler.Add(MsgVisitSteal);

