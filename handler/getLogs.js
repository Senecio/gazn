// 16:50 2017/4/26
// create by lsh

var MsgGetLogs = { }

MsgGetLogs.interest = "getLogs"
MsgGetLogs.Process = function(socket, message) {
    GameLog("get logs");
   
    var userId = socket.userId;
    HomeLog.GetUserLog(userId, function(results, fields) {
        MsgGetLogs.Success(socket, results);
    });
}

// 获取日志成功
MsgGetLogs.Success = function(socket, logs) {
    var obj = { type : "getLogsSuccess" , logs : logs};
    var msg = JSON.stringify(obj);
    socket.send(msg);
}

MsgHandler.Add(MsgGetLogs);

