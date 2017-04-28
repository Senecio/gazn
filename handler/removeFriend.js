// 16:50 2017/4/26
// create by lsh

var MsgRemoveFriend = { }

MsgRemoveFriend.interest = "removeFriend"
MsgRemoveFriend.Process = function(socket, message) {
    GameLog("add friend");
   
    var userId = socket.userId;
    var removeUserId = message.removeUserId;
    
    User.RemoveFriend(userId, removeUserId, function(rs) {
        if (rs) {
            MsgRemoveFriend.Success(socket, null);
            // 发送好友
            User.GetFriendsList(userId, function(results, fields) {
                socket.send(JSON.stringify({ type : "friendsList", list : results }));
            });
        }
        else {
            MsgHandler.ErrorResponse(socket, 20); // 尚未成为好友!
        }
    });
}

// 解锁成功
MsgRemoveFriend.Success = function(socket, results) {
    var obj = { type : "removeFriendSuccess" };
    var msg = JSON.stringify(obj);
    socket.send(msg);
}

MsgHandler.Add(MsgRemoveFriend);

