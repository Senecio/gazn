// 15:23 2017/4/10
// create by lsh

// 收割
var MsgSellFruit = { }

var async = require('async');

MsgSellFruit.interest = "sellFruit"
MsgSellFruit.Process = function(socket, message) {
    GameLog("sellFruit");
    
    var userId = socket.userId;
    var fruitId = message.fruitId;
    var count = message.count;
    
    var cmd = "SELECT t1.money, t2.package FROM `farm_user` t1 LEFT JOIN `farm_game` t2 ON t1.id=t2.userid  WHERE t1.id=?";
    mysql.Query2(cmd, [userId], function (results, fields) {
        if (results.length === 0) {
            GameLog("不存在!!!, 不可能, 角色或数据不存在?");
        } else {
        
            var package = JSON.parse(results[0].package);
            var kinds = 2;  //果实
            if (typeof package[kinds][fruitId] === 'undefined' || 
                package[kinds][fruitId] === 0 || 
                package[kinds][fruitId] < count) {
                MsgHandler.ErrorResponse(socket, 17); // 果实不足!
                return;
            }
            
            var fruitCfg = table.GetEntry("plant", fruitId);
            if (fruitCfg === null) {
                GameLog("fruitCfg === null, fruitId =", fruitId);
                return;
            }
            
            var hasMoney =  results[0].money;
            var getMoney = fruitCfg.fruit.price * count;

            async.parallel([
                function(callback){
                    // 更新背包信息.
                    Package.UseItem(userId, kinds, fruitId, count, function(rs) {
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
                        throw "!!!!!!!![果实出售]错误的结果!!!!!!!!";
                    } else {
                        MsgSellFruit.Success(socket);
                        User.SendDataSync(socket, ['package','money']);
                    }
                }
            );
        }
    }); 
}

MsgSellFruit.Success =  function(socket, results) {
    var obj = { type : "sellFruitSuccess" };
    var msg = JSON.stringify(obj);
    socket.send(msg);
}

MsgHandler.Add(MsgSellFruit);
