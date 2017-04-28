// 16:42 2017/3/30
// create by lsh

var MsgVisitSteal = { }

var async = require('async');

var MinuteToMicroSecond = 60000;
var HourToMinute = 60;

MsgVisitSteal.interest = "visitSteal"
MsgVisitSteal.Process = function(socket, message) {
    GameLog("visit steal");
   
    var userId = socket.userId;
    var visitUserId = message.visitUserId;
    var landIndex = message.landIndex; 
    
    async.parallel([
        function(callback){
            var cmd = "SELECT `lands` FROM `farm_game` WHERE userId=?";
            mysql.Query2(cmd, [visitUserId], function (results, fields) {
                callback(null, results);
            });
        },
        function(callback){
            var cmd = "SELECT `username` FROM `farm_user` WHERE id=?";
            mysql.Query2(cmd, [userId], function (results, fields) {
                callback(null, results);
            });
        }],
        // optional callback
        function(err, results){
            var rs1 = results[0];
            var rs2 = results[1];
            if (rs1.length === 0 || rs2.length === 0)
                return;

            var lands = JSON.parse(rs1[0].lands);
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
                cast = Math.ceil(Math.min(cast, disasterCfg.maxEffect1));
                cast = Math.floor(seedCfg.output * cast);
            }
            
            var stealCount = 0;
            if (typeof land.stealCount !== 'undefined') {
                stealCount = land.stealCount;
            }
            
            var get = seedCfg.output - cast;
            var canStealCount = get - stealCount - (seedCfg.output * 0.5);
            if (canStealCount > 0) {
                canStealCount = Math.floor(Math.min(canStealCount, seedCfg.output * 0.25));
                stealCount += canStealCount;
                land.stealCount = stealCount;
            } else {
                MsgHandler.ErrorResponse(socket, 22); // 无可偷取.
                return;
            }
            
            if (typeof land.stealUsers !== 'undefined') {
                var idx = land.stealUsers.indexOf(userId);
                if (idx >= 0) {
                    MsgHandler.ErrorResponse(socket, 23); // 已经偷取过了
                    return;
                }
                else {
                    land.stealUsers.push(userId);
                }
            }else {
                land.stealUsers = new Array();
                land.stealUsers.push(userId);
            }
            
            var userName = rs2[0].username;
            
            var fruitId = seedCfg.id;
            var kinds = 2;  //果实
            
            async.parallel([
                function(callback){
                    // 更新背包信息. 
                    Package.AddNewItem(userId, kinds, fruitId, canStealCount, function(rs) {
                        callback(null, rs);
                    });
                },
                function(callback){
                    // 更新土地信息.
                    Lands.Update(visitUserId, lands, function(rs) {
                        callback(null, rs);
                    });
                }],
                // optional callback
                function(err, results){
                    if (results[0] !== true || results[1] !== true) {
                        if (callback) callback(false, 444444);
                        throw "!!!!!!!![收割]错误的结果!!!!!!!!";
                    } else {
                        MsgVisitSteal.Success(socket, visitUserId, lands);
                        User.SendDataSync(socket, ['package']);
                        // 添加日志
                        HomeLog.AddSteal(visitUserId, now, userId, userName, fruitId, canStealCount, -1, null);
                    }
                }
            );
        }
    );
}

// 偷盗成功
MsgVisitSteal.Success = function(socket, visitUserId, lands) {
    var obj = { type : "visitStealSuccess",  visitUserId : visitUserId, lands : lands};
    var msg = JSON.stringify(obj);
    socket.send(msg);
}

MsgHandler.Add(MsgVisitSteal);

