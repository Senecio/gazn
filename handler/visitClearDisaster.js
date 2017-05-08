// 16:42 2017/3/30
// create by lsh

var MsgVisitClearDisaster = { }

var async = require('async');

MsgVisitClearDisaster.interest = "visitClearDisaster"
MsgVisitClearDisaster.Process = function(socket, message) {
    GameLog("visit clear disaster");
   
    var userId = socket.userId;
    var visitUserId = message.visitUserId;
    var landIndex = message.landIndex;
    
    if (!(landIndex >= 0 && landIndex < 12)) {
        GameLog("错误的土地索引!");
        return;
    }
    
    async.parallel([
        function(callback){
            var cmd = "SELECT `lands` FROM `farm_game` WHERE userId=?";
            mysql.Query2(cmd, [visitUserId], function (results, fields) {
                callback(null, results);
            });
        },
        function(callback){
            var cmd = "SELECT `experience`,`username` FROM `farm_user` WHERE id=?";
            mysql.Query2(cmd, [userId], function (results, fields) {
                callback(null, results);
            });
        },
        function(callback){
            var cmd = "SELECT `friendsId` FROM `farm_friend` WHERE `userId`=?";
            mysql.Query2(cmd, [userId], function (results, fields) {
                callback(null, results);
            });
        }],
        
        // optional callback
        function(err, results) {
            var rs1 = results[0];
            var rs2 = results[1];
            var rs3 = results[2];
            
            if (rs1.length === 0)
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
            
            if (typeof land.disasterType === 'undefined' || land.disasterType === 0 || typeof land.clearDisasterTime !== 'undefined') {
                MsgHandler.ErrorResponse(socket, 18); // 植物尚未发生灾害
                return;
            }
            
            var seedCfg = table.GetEntry("plant", land.seedId);
            if (seedCfg === null) {
                GameLog("seedCfg === null, seedId =", land.seedId);
                return;
            }
            
            var disasterCfg = table.GetEntry("disaster", seedCfg.disasterId);
            if (disasterCfg === null) {
                GameLog("disasterCfg === null, disaster =", seedCfg.disasterId);
                return;
            }
            
            var isFriend = false;
            if (rs3.length > 0) {
                var friendsId = JSON.parse(rs3[0].friendsId);
                var idx = friendsId.indexOf(visitUserId);
                isFriend = idx < 0 ? false : true;
            }
            
            var getExp = Math.floor(disasterCfg.addExp * (isFriend ? 1.0 : 0.2));
            var needUpdateExp = getExp > 0 ? true : false;
            var updateExp = getExp + rs2[0].experience;
            
            var userName = rs2[0].username;
            
            var now = (new Date()).getTime();
            land.clearDisasterTime = now;
            var disasterType = land.disasterType;
                
            async.parallel([
                function(callback){
                    // 更新数据
                    Lands.Update(visitUserId, lands, function(rs) {
                        callback(null, rs);
                    });
                },
                function(callback){
                    if (needUpdateExp) {
                        // 添加经验
                        User.UpdateExperience(userId, updateExp, function(rs) {
                            callback(null, rs);
                        });
                    }else {
                        callback(null, true);
                    }
                }],
                
                // optional callback
                function(err, results){
                    if (results[0] !== true || results[1] !== true) {
                        if (callback) callback(false, 444444);
                        throw "!!!!!!!![帮助除灾]错误的结果!!!!!!!!";
                    } else {
                        MsgVisitClearDisaster.Success(socket, visitUserId, lands, disasterType);
                        User.SendDataSync(socket, ['experience']);
                        // 添加日志
                        HomeLog.AddClearDisaster(visitUserId, now, userId, userName, disasterType, getExp, null);
                    }
                }
            );
        }
    );
}

// 帮助除灾成功
MsgVisitClearDisaster.Success = function(socket, visitUserId, lands, disasterType) {
    var obj = { type : "visitClearDisasterSuccess", visitUserId : visitUserId, lands : lands, disasterType : disasterType };
    var msg = JSON.stringify(obj);
    socket.send(msg);
}

MsgHandler.Add(MsgVisitClearDisaster);

