// 16:42 2017/3/30
// create by lsh

var MsgUnlockLands = { }

var async = require('async');

MsgUnlockLands.interest = "unlockLands"
MsgUnlockLands.Process = function(socket, message) {
    GameLog("unlock lands");
   
    var userId = socket.userId;
    var landIndex = message.landIndex;

    if (!(landIndex >= 0 && landIndex < 12)) {
        GameLog("错误的土地索引!");
        return;
    }
    
    var cmd = "SELECT t1.money, t1.experience, t2.lands FROM `farm_user` t1 LEFT JOIN `farm_game` t2 ON t1.id=t2.userid  WHERE t1.id=?";
    mysql.Query2(cmd, [userId], function (results, fields)
    {
        if (results.length === 0) {
            GameLog("不存在!!!, 不可能, 角色或数据不存在?");
        }else {
            var hasMoney = results[0].money;
            var experience = results[0].experience;
            
            var entry = table.GetEntry('unlockLands', 1);
            if (entry.needMoney[landIndex] > hasMoney) {
                MsgHandler.ErrorResponse(socket, 6); // 金币不足!
                return;
            }

            if (entry.minLevel[landIndex] >　User.GetLevel(experience)) {
                MsgHandler.ErrorResponse(socket, 7); // 等级不足!
                return;
            }

            var lands = JSON.parse(results[0].lands);
            if (landIndex >= Math.min(12, lands.length + 1)) {
                MsgHandler.ErrorResponse(socket, 3); // 土地位未开垦
                return;
            }
            
            async.parallel([
                function(callback){
                    // 减钱
                    User.UpdateMoney(userId, hasMoney - entry.needMoney[landIndex], function(rs) {
                        callback(null, rs);
                    });
                },
                function(callback){
                    // 土地解锁
                    Lands.Unlock(userId, landIndex, function(rs) {
                        callback(null, rs);
                    });
                }],
                // optional callback
                function(err, results){
                    if (results[0] !== true || results[1] !== true) {
                        if (callback) callback(false, 444444);
                        throw "!!!!!!!![土地解锁]错误的结果!!!!!!!!";
                    } else {
                        MsgUnlockLands.Success(socket);
                        User.SendDataSync(socket, ['money','lands']);
                    }
                }
            );           
        }
    });
}

// 解锁成功
MsgUnlockLands.Success = function(socket, results) {
    var obj = { type : "unlockLandsSuccess" };
    var msg = JSON.stringify(obj);
    socket.send(msg);
}

MsgHandler.Add(MsgUnlockLands);

