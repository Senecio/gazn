
var MsgRemovePlant = { }

MsgRemovePlant.interest = "removePlant"
MsgRemovePlant.Process = function(socket, message) {
    GameLog("remove plant");
   
    var userId = socket.userId;
    var landIndex = message.landIndex;
    
    var cmd = "SELECT `lands`  FROM `farm_game` WHERE `userId`=?";
    mysql.Query2(cmd, [userId], function (results, fields)
    {
        if (results.length === 0) {
                GameLog("不存在!!!, 不可能, 角色或数据不存在?");
        }else {

            var lands = JSON.parse(results[0].lands);
            if (landIndex >= lands.length) {
                MsgHandler.ErrorResponse(socket, 3); // 土地位未开垦
                return;
            }
            
            if (lands[landIndex].state === 0) {
                MsgHandler.ErrorResponse(socket, 12); // 土地还没有播种
                return;
            }
           
            Lands.Reset(userId, landIndex, function(rs) {
                if (rs !== true) {
                        throw "!!!!!!!![铲除植物]错误的结果!!!!!!!!";
                } else {
                    // 通知成功
                    MsgRemovePlant.Success(socket);
                    User.SendDataSync(socket, ['lands']);
                }
            });
        }
    });
}

// 铲除植物成功
MsgRemovePlant.Success = function(socket, results) {
    var obj = { type : "removePlantSuccess" };
    var msg = JSON.stringify(obj);
    socket.send(msg);
}

MsgHandler.Add(MsgRemovePlant);