// 16:42 2017/3/30
// create by lsh

var MsgVisitClearDisaster = { }

var async = require('async');

MsgVisitClearDisaster.interest = "visitClearDisaster"
MsgVisitClearDisaster.Process = function(socket, message) {
    GameLog("visit clear disaster");
   
    var userId = socket.userId;
    var visitUserId = message.visitUserId;
}

// 解锁成功
MsgVisitClearDisaster.Success = function(socket, results) {
    var obj = { type : "visitClearDisasterSuccess" };
    var msg = JSON.stringify(obj);
    socket.send(msg);
}

MsgHandler.Add(MsgVisitClearDisaster);

