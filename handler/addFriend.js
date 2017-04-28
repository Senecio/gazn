// 16:50 2017/4/26
// create by lsh

var MsgAddFriend = { }

MsgAddFriend.interest = "addFriend"
MsgAddFriend.Process = function(socket, message) {
    GameLog("add friend");
   
    var userId = socket.userId;
    var addUserId = message.addUserId;
    
    var cmd = "SELECT `id` FROM `farm_user` WHERE id=?";
    mysql.Query2(cmd, [addUserId], function (results, fields){
        if (results.length > 0) {
            User.AddFriend(userId, addUserId, function(rs) {
                if (rs) {
                    MsgAddFriend.Success(socket, null);
                    // 发送好友
                    User.GetFriendsList(userId, function(results, fields) {
                        socket.send(JSON.stringify({ type : "friendsList", list : results }));
                    });
                }
                else {
                    MsgHandler.ErrorResponse(socket, 21); // 已经成为好友!
                }
            });
        }
    });
}

// 解锁成功
MsgAddFriend.Success = function(socket, results) {
    var obj = { type : "addFriendSuccess" };
    var msg = JSON.stringify(obj);
    socket.send(msg);
}

MsgHandler.Add(MsgAddFriend);

