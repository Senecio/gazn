
var MsgRemovePlant = { }

var async = require('async');

MsgRemovePlant.interest = "removePlant"
MsgRemovePlant.Process = function(socket, message) {
    GameLog("remove plant");
   
    var userId = socket.userId;
    var landIndex = message.landIndex;
    
    var cmd = "SELECT t1.experience, t2.lands FROM `farm_user` t1 LEFT JOIN `farm_game` t2 ON t1.id=t2.userid  WHERE t1.id=?";
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
            
            var land = lands[landIndex];
            var seedCfg = table.GetEntry("plant", land.seedId);
            if (seedCfg === null) {
                GameLog("seedCfg === null, seedId =", land.seedId);
                return;
            }
           
            var experience = results[0].experience;
            var updateExperience = experience + seedCfg.clearExp;

            async.parallel([
                function(callback){
                    // 更新土地信息.
                    Lands.Reset(userId, landIndex, function(rs) {
                        callback(null, rs);
                    });
                },
                function(callback) {
                    // 添加经验
                    User.UpdateExperience(userId, updateExperience, function(rs) {
                        callback(null, rs);
                    });
                }],
                // optional callback
                function(err, results){
                    if (results[0] !== true || results[1] !== true) {
                        if (callback) callback(false, 444444);
                        throw "!!!!!!!![铲除植物]错误的结果!!!!!!!!";
                    } else {
                        MsgRemovePlant.Success(socket);
                        User.SendDataSync(socket, ['lands', 'experience']);
                    }
                }
            );
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