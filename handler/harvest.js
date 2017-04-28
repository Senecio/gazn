// 15:23 2017/4/10
// create by lsh

// 收割
var MsgHarvest = { }

var MinuteToMicroSecond = 60000;
var HourToMinute = 60;

var async = require('async');

MsgHarvest.interest = "harvest"
MsgHarvest.Process = function(socket, message) {
    GameLog("harvest");
    
    var userId = socket.userId;
    var landIndex = message.landIndex;
    
    var cmd = "SELECT t1.experience, t2.lands FROM `farm_user` t1 LEFT JOIN `farm_game` t2 ON t1.id=t2.userid  WHERE t1.id=?";
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
            
            var disasterCfg = table.GetEntry("disaster", seedCfg.disasterId);
            if (disasterCfg === null)
                return;
            
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
            
            var cast = 0;
            if (typeof land.disasterTime !== 'undefined' && 
                typeof land.clearDisasterTime !== 'undefined' &&
                land.clearDisasterTime > land.disasterTime &&
                (land.disasterType === 1 || land.disasterType === 3))
            {
                var t = land.clearDisasterTime - land.disasterTime;
                var d = Math.floor((t / MinuteToMicroSecond) / HourToMinute); 
                cast = d * disasterCfg.effect1;
                cast = Math.min(cast, disasterCfg.maxEffect1);
                cast = Math.floor(seedCfg.output * cast);
            }
            
            var fruitId = seedCfg.id;
            var get = seedCfg.output - cast;
            var kinds = 2;  //果实
            var experience = results[0].experience;
            var updateExperience = experience + seedCfg.harvestExp;

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
                },
                function(callback) {
                    // 添加经验
                    User.UpdateExperience(userId, updateExperience, function(rs) {
                        callback(null, rs);
                    });
                }],
                // optional callback
                function(err, results){
                    if (results[0] !== true || results[1] !== true || results[2] !== true) {
                        if (callback) callback(false, 444444);
                        throw "!!!!!!!![收割]错误的结果!!!!!!!!";
                    } else {
                        MsgHarvest.Success(socket);
                        User.SendDataSync(socket, ['package','lands', 'experience']);
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
