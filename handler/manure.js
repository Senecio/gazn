// 16:50 2017/4/2
// create by lsh

var MsgManure = { }

var async = require('async');

var enum_huafei = 1;
var enum_power_huafei = 2;

var MinuteToMicroSecond = 60000;

MsgManure.interest = "manure"
MsgManure.Process = function(socket, message) {
    GameLog("manure");
   
    var userId = socket.userId;
    var landIndex = message.landIndex;
    var propertyId = message.propertyId;

    if (!(landIndex >= 0 && landIndex < 12)) {
        GameLog("错误的土地索引!");
        return;
    }
    
    var cmd = "SELECT `lands`, `package` FROM `farm_game` WHERE `userId`=?";
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
            
            var package = JSON.parse(results[0].package);
            var kinds = 1;  //道具
            if (typeof package[kinds][propertyId] === 'undefined' || package[kinds][propertyId] === 0) {
                MsgHandler.ErrorResponse(socket, 13); // 道具不足!
                return;
            }
            
            var propCfg = table.GetEntry("property", propertyId);
            if (propCfg === null) {
                GameLog("propCfg === null, propertyId =", propertyId);
                return;
            }
            
            if (propCfg.type !== enum_huafei && propCfg.type !== enum_power_huafei) {
                MsgHandler.ErrorResponse(socket, 15); // 道具类型必须是化肥!
                return;
            }
            
            if (typeof land.reduceTime === 'undefined') {
                land.reduceTime = new Array(0,0,0);
            }
            
            if (propCfg.type === enum_huafei && land.reduceTime[j] !== 0) {
                MsgHandler.ErrorResponse(socket, 16);  //只能每阶段施一次肥!
                return;
            }
            
            var nowTime = (new Date()).getTime();
            var disasterTime = (typeof land.disasterTime !== 'undefined' && land.disasterType === 2 || land.disasterType === 3) ? land.disasterTime : null;
            if (Lands.IsMatured(land.reduceTime, nowTime, land.sowTime, disasterTime, seedCfg.time.part, disasterCfg.effect2, land.clearDisasterTime)) {
                MsgHandler.ErrorResponse(socket, 14); // 植物已经成熟
                return;
            }
            
            // 施肥
            MsgManure.Do(land.reduceTime, propCfg.data, nowTime, land.sowTime, disasterTime, seedCfg.time.part, disasterCfg.effect2, land.clearDisasterTime);

            async.parallel([
                function(callback){
                    // 扣除道具
                    Package.UseItem(userId, kinds, propertyId, 1, function(rs) {
                        callback(null, rs);
                    });
                },
                function(callback){
                    // 减少植物时间
                    Lands.Manure(userId, landIndex, land.reduceTime, function(rs) {
                        callback(null, rs);
                    });
                }],
                // optional callback
                function(err, results){
                    if (results[0] !== true || results[1] !== true) {
                        if (callback) callback(false, 444444);
                        throw "!!!!!!!![施肥]错误的结果!!!!!!!!";
                    } else {
                        MsgManure.Success(socket);
                        User.SendDataSync(socket, ['package','lands']);
                    }
                }
            );           
        }
    });
}

MsgManure.Do = function(reduceMinuteArray, reduceMinute, nowTime, sowTime, disasterTime, timeParts, effectParent, clearDisasterTime) {
    var incArray = [0,0,0];
    if (typeof disasterTime !== 'undefined' && disasterTime) {
        incArray = Disaster.GetPart(sowTime, disasterTime, timeParts, effectParent, clearDisasterTime);
    }

    var a = Math.floor((nowTime - sowTime) / MinuteToMicroSecond);
    var c = 0;
    var i;
    for (i = 0; i < 3; ++i) {
        c += (timeParts[i] - reduceMinuteArray[i] + incArray[i]);
        if (c > a) { c -= a; break; }
    }
    
    if (i < 3) {
        reduceMinuteArray[i] += Math.min(c, reduceMinute);
    }
}

// 施肥成功
MsgManure.Success = function(socket, results) {
    var obj = { type : "manureSuccess" };
    var msg = JSON.stringify(obj);
    socket.send(msg);
}

MsgHandler.Add(MsgManure);

