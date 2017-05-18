// 16:42 2017/3/30
// create by lsh

var visitMessage = { }

var async = require('async');

var MinuteToMicroSecond = 60000;
var HourToMinute = 60;

visitMessage.interest = "visitMessage"
visitMessage.Process = function(socket, message) {
    GameLog("visit Message");
   
    var userId = socket.userId;
    var toUserId = message.toUserId;
    var msg = message.msg;

    // 添加日志
    var now = (new Date()).getTime();
    
    async.parallel([
        function(callback){
            var cmd = "SELECT `username` FROM `farm_user` WHERE id=?";
            mysql.Query2(cmd, [userId], function (results, fields) {
                callback(null, results);
            });
        },
        function(callback){
            var cmd = "SELECT `username` FROM `farm_user` WHERE id=?";
            mysql.Query2(cmd, [toUserId], function (results, fields) {
                callback(null, results);
            });
        }],
        // optional callback
        function(err, results){
            var rs1 = results[0];
            var rs2 = results[1];
            if (rs1.length === 0 || rs2.length === 0)
                return;
            var userName = rs1[0].username;
            var toUserName = rs2[0].username;
            HomeMsg.AddMsg(now, userId, toUserId, userName, toUserName, msg, function(rs){
                var data = new Array();
                data.push(userName);
                data.push(toUserName);
                data.push(msg);
                visitMessage.Success(socket, { time : now, userId : userId,  toUserId : toUserId, data : JSON.stringify(data)});
            });
        }
    );
}

// 偷盗成功
visitMessage.Success = function(socket, rs) {
    var obj = { type : "visitMessageSuccess", newChat : rs };
    var msg = JSON.stringify(obj);
    socket.send(msg);
}

MsgHandler.Add(visitMessage);

