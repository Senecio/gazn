// 15:12 2017/3/24
// create by lsh

// 播种
var MsgSowSeeds = { }

var async = require('async');

MsgSowSeeds.interest = "sowSeeds"
MsgSowSeeds.Process = function(socket, message) {

    var userId = socket.userId;
    var seedId = message.seedId;
    var landIndex = message.landIndex;
    
    //var cmd = "SELECT `lands` , `landsLevel` , `package`  FROM `farm_game` WHERE `userId`=?";
    var cmd = "SELECT t1.experience, t2.lands, t2.package  FROM `farm_user` t1 LEFT JOIN `farm_game` t2 ON t1.id=t2.userId  WHERE t1.id=?";
    mysql.Query2(cmd, [userId], function (results, fields) {
        if (results.length === 0) {
            GameLog("不存在!!!, 不可能, 角色或数据不存在?");
        } else {
            
            var package = JSON.parse(results[0].package);
            var kinds = 0;  //种子
            if (typeof package[kinds][seedId] === 'undefined' || package[kinds][seedId] === 0) {
                MsgHandler.ErrorResponse(socket, 5); // 种子不足!
                return;
            }
            
            var lands = JSON.parse(results[0].lands);
            if (landIndex >= lands.length) {
                MsgHandler.ErrorResponse(socket, 3); // 土地位未开垦
                return;
            }
            
            if (lands[landIndex].state !== 0) {
                MsgHandler.ErrorResponse(socket, 4); // 土地费非空闲
                return;
            }
            
            var landsLevel = lands[landIndex].level;
            if (!Lands.CanSowSeed(landsLevel, seedId)) {
                MsgHandler.ErrorResponse(socket, 8); // 土地当前等级无法播种此种子
                return;
            }
            
            var experience = results[0].experience;
            var updateExperience = experience;
            var seedCfg = table.GetEntry("plant", seedId);
            if (seedCfg) {
                updateExperience += seedCfg.sowExp;
            }

            async.parallel([
                function(callback){
                    // 减少种子
                    Package.UseItem(userId, kinds, seedId, 1, function(rs) {
                        callback(null, rs);
                    });
                },
                function(callback){
                    // 更新land状态
                    Lands.SowSeeds(userId, landIndex, seedId, function(rs) {
                        callback(null, rs);
                    });
                },
                function(callback){
                    // 添加用户经验
                    User.UpdateExperience(userId, updateExperience, function(rs) {
                        callback(null, rs);
                    });
                }],
                // optional callback
                function(err, results){
                    if (results[0] !== true || results[1] !== true) {
                        throw "!!!!!!!![播种]错误的结果!!!!!!!!";
                    } else {
                        // 通知成功
                        MsgSowSeeds.Success(socket);
                        User.SendDataSync(socket, ['lands','package', 'experience']);
                    }
                }
            );
        }
    });
}

// 播种成功
MsgSowSeeds.Success = function(socket, results) {
    var obj = { type : "sowSeedsSuccess" };
    var msg = JSON.stringify(obj);
    socket.send(msg);
}

MsgHandler.Add(MsgSowSeeds);

