// 16:50 2017/4/26
// create by lsh

var MsgGetMsgs = { }

MsgGetMsgs.interest = "getMsgs"
MsgGetMsgs.Process = function(socket, message) {
    GameLog("get msgs");
   
    var userId = socket.userId;
    HomeMsg.GetMsgs(userId, function(results, fields) {
        MsgGetMsgs.Success(socket, results);
    });
}

// 获取留言成功
MsgGetMsgs.Success = function(socket, msgs) {
    var obj = { type : "getMsgsSuccess" , msgs : msgs};
    var msg = JSON.stringify(obj);
    socket.send(msg);
}

MsgHandler.Add(MsgGetMsgs);

