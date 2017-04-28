// 17:04 2017/4/1
// create by lsh

var MsgUpgradeLands = { }

var async = require('async');

MsgUpgradeLands.interest = "upgradeLands"
MsgUpgradeLands.Process = function(socket, message) {
    GameLog("upgrade lands");
   
    var userId = socket.userId;
    var landIndex = message.landIndex;
    
    var cmd = "SELECT t1.money , t1.experience, t2.lands, t2.package FROM `farm_user` t1 LEFT JOIN `farm_game` t2 ON t1.id=t2.userId  WHERE t1.id=?";
    mysql.Query2(cmd, [userId], function (results, fields)
    {
        if (results.length === 0) {
            GameLog("不存在!!!, 不可能");
        }else {
            var hasMoney = results[0].money;
            var experience = results[0].experience;
            
            var lands = JSON.parse(results[0].lands);
            if (landIndex >= lands.length) {
                MsgHandler.ErrorResponse(socket, 3); // 土地位未开垦
                return;
            }
            
            var land = lands[landIndex];
            
            var entry = table.GetEntry('landsLevel', land.level + 1);
            if (entry === null) {
                MsgHandler.ErrorResponse(socket, 11); // 土地无法到达此等级!
                return;
            }
            
            if (entry.needMoney > hasMoney) {
                MsgHandler.ErrorResponse(socket, 6); // 金币不足!
                return;
            }

            if (entry.minLevel > User.GetLevel(experience)) {
                MsgHandler.ErrorResponse(socket, 7); // 等级不足!
                return;
            }

            if (entry.landsNumber > lands.length) {
                MsgHandler.ErrorResponse(socket, 9); // 土地扩建的数量不满足
                return;
            }
            
            var package = JSON.parse(results[0].package);
            var kinds = 1; // 道具
            if (typeof package[kinds][entry.propertyId] === 'undefined' || 
                package[kinds][entry.propertyId] === 0 ||
                package[kinds][entry.propertyId] < entry.propertyNumber) {
                MsgHandler.ErrorResponse(socket, 10); // 道具不足
                return;
            }
            
            // 土地升级
            land.level += 1;
            
            async.parallel([
                function(callback){
                    // 减钱
                    User.UpdateMoney(userId, hasMoney - entry.needMoney, function(rs) {
                        callback(null, rs);
                    });
                },
                function(callback){
                    // 扣除道具
                    Package.UseItem(userId, kinds, entry.propertyId, entry.propertyNumber, function(rs) {
                        callback(null, rs);
                    });
                },
                function(callback){
                    // 土地升级
                    Lands.Update(userId, lands, function(rs) {
                        callback(null, rs);
                    });
                }],
                // optional callback
                function(err, results){
                    if (results[0] !== true || results[1] !== true || results[2] !== true) {
                        if (callback) callback(false, 444444);
                        throw "!!!!!!!![土地升级]错误的结果!!!!!!!!";
                    } else {
                        MsgUpgradeLands.Success(socket);
                        User.SendDataSync(socket, ['money','lands', 'package']);
                    }
                }
            );           
        }
    });
}

// 升级土地成功
MsgUpgradeLands.Success = function(socket, results) {
    var obj = { type : "upgradeLandsSuccess" };
    var msg = JSON.stringify(obj);
    socket.send(msg);
}

MsgHandler.Add(MsgUpgradeLands);