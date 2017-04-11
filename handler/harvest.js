// 15:23 2017/4/10
// create by lsh

// 收割
var MsgHarvest = { }

var MinuteToMicroSecond = 60000;

var async = require('async');

MsgHarvest.interest = "harvest"
MsgHarvest.Process = function(socket, message) {
    GameLog("harvest");
    
    var userId = socket.userId;
    var landIndex = message.landIndex;
    
    var cmd = "SELECT `lands` FROM `farm_game` WHERE `userId`=?";
    mysql.Query2(cmd, [userId], function (results, fields) {
        if (results.length === 0) {
            GameLog("不存在!!!, 不可能, 角色或数据不存在?");
        } else {
            var lands = JSON.parse(results[0].lands);
            if (landIndex >= lands.length) {
                MsgHandler.ErrorResponse(socket, 3); // 土地位未开垦
                return;
            }
            
            var land = lands[landIndex];
            if (land.state === Lands.enum_landsState_idle) {
                MsgHandler.ErrorResponse(socket, 12); // 土地还没有播种
                return;
            }
            
            var seedCfg = table.GetEntry("plant", land.seedId);
            if (seedCfg === null) {
                GameLog("seedCfg === null, seedId =", land.seedId);
                return;
            }
            
            var reduceTime = 0;
            if (typeof land.reduceTime !== 'undefined') {
                for (var i = 0; i < land.reduceTime.length; ++i) {
                    reduceTime += land.reduceTime[i];
                }
            }

            var now = (new Date()).getTime();
            if (false === (now > (land.sowTime + (seedCfg.time.amount - reduceTime) * MinuteToMicroSecond))) {
                // 植物未成熟
                return;
            }
            
            // 获得百分之80% + 20%随机获得;
            var fruitId = seedCfg.id;
            var cast = Math.floor(seedCfg.output * 0.2);
            var get = seedCfg.output - Math.floor( Math.random() * cast );
            var kinds = 2;  //果实

            async.parallel([
                function(callback){
                    // 更新背包信息. 
                    Package.AddNewItem(userId, kinds, fruitId, get, function(rs) {
                        callback(null, rs);
                    });
                },
                function(callback){
                    // 更新土地信息.
                    Lands.Harvest(userId, landIndex, function(rs) {
                        callback(null, rs);
                    });
                }],
                // optional callback
                function(err, results){
                    if (results[0] !== true || results[1] !== true) {
                        if (callback) callback(false, 444444);
                        throw "!!!!!!!![收割]错误的结果!!!!!!!!";
                    } else {
                        MsgHarvest.Success(socket);
                        User.SendDataSync(socket, ['package','lands']);
                    }
                }
            );
        }
    }); 
}

MsgHarvest.Success =  function(socket, results) {
    var obj = { type : "harvestSuccess" };
    var msg = JSON.stringify(obj);
    socket.send(msg);
}


MsgHandler.Add(MsgHarvest);
