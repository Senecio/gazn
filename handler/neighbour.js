// 17:04 2017/4/1
// create by lsh

var MsgNeighbourList = { }

var MinuteToMicroSecond = 60000;
var HourToMinute = 60;

MsgNeighbourList.interest = "neighbourList"
MsgNeighbourList.Process = function(socket, message) {
    GameLog("upgrade lands");
   
    var userId = socket.userId;
    //SELECT `id`, `username` FROM `farm_user` ORDER BY `logintime` DESC LIMIT 20;
    
    var cmd = "SELECT `logintime` FROM `farm_user` WHERE `id`=?";
    mysql.Query2(cmd, [userId], function (results, fields)
    {
        if (results.length === 0) {
            GameLog("不存在!!!, 不可能");
        }else {
            var loginTime = results[0].logintime;
            var nowTime = (new Date()).getTime();
            if (x === null || (loginTime + 6*HourToMinute*MinuteToMicroSecond) > nowTime) {
                User.GetNeighbourList(userId, function(results, fields) {
                    MsgNeighbourList.Success(socket, results);   
                });
            }
            else {
                MsgHandler.ErrorResponse(socket, 19); // 请求过于频繁!
            }
        }
    });
}

// 邻居列表成功
MsgNeighbourList.Success = function(socket, results) {
    var obj = { type : "neighbourListSuccess", list : results };
    var msg = JSON.stringify(obj);
    socket.send(msg);
}

MsgHandler.Add(MsgNeighbourList);