// 16:42 2017/3/30
// create by lsh

var MsgAddFriend = { }

var async = require('async');

MsgAddFriend.interest = "addFriend"
MsgAddFriend.Process = function(socket, message) {
    GameLog("add friend");
   
    var userId = socket.userId;
    var addUserId = message.addUserId;
}

// 解锁成功
MsgAddFriend.Success = function(socket, results) {
    var obj = { type : "addFriendSuccess" };
    var msg = JSON.stringify(obj);
    socket.send(msg);
}

MsgHandler.Add(MsgAddFriend);

