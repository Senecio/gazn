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
            
            var now = (new Date()).getTime();
            if (now > (land.sowTime + seedCfg.time.amount * MinuteToMicroSecond)) {
                MsgHandler.ErrorResponse(socket, 14); // 植物已经成熟
                return;
            }
            
            var reduceTime = 0;
            if (typeof land.reduceTime !== 'undefined') {
                for (var i = 0; i < land.reduceTime.length; ++i) {
                    reduceTime += land.reduceTime[i];
                }
                
                if (now > (land.sowTime + (seedCfg.time.amount - reduceTime) * MinuteToMicroSecond)) {
                    MsgHandler.ErrorResponse(socket, 14); // 植物已经成熟
                    return;
                }
            }
            
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

            var remaining = seedCfg.time.amount*MinuteToMicroSecond - (now - land.sowTime);
            if (typeof land.reduceTime === 'undefined') {
                land.reduceTime = new Array(0,0,0);
            }else {
                remaining -= reduceTime*MinuteToMicroSecond;
            }

            for (var j = seedCfg.time.part.length - 1; j >= 0; --j) {
                if ( remaining > seedCfg.time.part[j]*MinuteToMicroSecond) {
                    remaining -= seedCfg.time.part[j]*MinuteToMicroSecond;
                }else {
                
                    if (propCfg.type === enum_huafei && land.reduceTime[j] !== 0) {
                        MsgHandler.ErrorResponse(socket, 16);  //只能每阶段施一次肥!
                        return;
                    }
                
                    if (propCfg.data*MinuteToMicroSecond > remaining) {
                        land.reduceTime[j] += Math.floor(remaining/MinuteToMicroSecond);
                    } else {
                        land.reduceTime[j] += propCfg.data;
                    }
                    break;
                }
            }

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

// 施肥成功
MsgManure.Success = function(socket, results) {
    var obj = { type : "manureSuccess" };
    var msg = JSON.stringify(obj);
    socket.send(msg);
}

MsgHandler.Add(MsgManure);

