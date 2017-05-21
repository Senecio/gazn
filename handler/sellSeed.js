// 15:23 2017/4/10
// create by lsh

// 收割
var MsgSellSeed = { }

var async = require('async');

MsgSellSeed.interest = "sellSeed"
MsgSellSeed.Process = function(socket, message) {
    GameLog("sellSeed");
    
    var userId = socket.userId;
    var seedId = message.fruitId;
    var count = message.count;
    
    var cmd = "SELECT t1.money, t2.package FROM `farm_user` t1 LEFT JOIN `farm_game` t2 ON t1.id=t2.userid  WHERE t1.id=?";
    mysql.Query2(cmd, [userId], function (results, fields) {
        if (results.length === 0) {
            GameLog("不存在!!!, 不可能, 角色或数据不存在?");
        } else {
        
            var package = JSON.parse(results[0].package);
            var kinds = 0;  //种子
            if (typeof package[kinds][seedId] === 'undefined' || 
                package[kinds][seedId] === 0 || 
                package[kinds][seedId] < count) {
                MsgHandler.ErrorResponse(socket, 5); //种子不足!
                return;
            }
            
            var seedCfg = table.GetEntry("plant", seedId);
            if (seedCfg === null) {
                GameLog("seedCfg === null, seedId =", seedId);
                return;
            }
            
            var hasMoney =  results[0].money;
            var getMoney = seedCfg.sellPrice;

            async.parallel([
                function(callback){
                    // 更新背包信息.
                    Package.UseItem(userId, kinds, seedId, count, function(rs) {
                        callback(null, rs);
                    });
                },
                function(callback){
                    // 更新金币.
                    User.UpdateMoney(userId, hasMoney + getMoney, function(rs) {
                        callback(null, rs);
                    });
                }],
                // optional callback
                function(err, results){
                    if (results[0] !== true || results[1] !== true) {
                        if (callback) callback(false, 444444);
                        throw "!!!!!!!![种子出售]错误的结果!!!!!!!!";
                    } else {
                        MsgSellSeed.Success(socket);
                        User.SendDataSync(socket, ['package','money']);
                    }
                }
            );
        }
    }); 
}

MsgSellSeed.Success =  function(socket, results) {
    var obj = { type : "sellSeedSuccess" };
    var msg = JSON.stringify(obj);
    socket.send(msg);
}

MsgHandler.Add(MsgSellSeed);
