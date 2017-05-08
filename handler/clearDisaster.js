// 16:50 2017/4/2
// create by lsh

var MsgClearDisaster = { }

var async = require('async');

MsgClearDisaster.interest = "clearDisaster"
MsgClearDisaster.Process = function(socket, message) {
    GameLog("clearDisaster");
   
    var userId = socket.userId;
    var landIndex = message.landIndex;

    if (!(landIndex >= 0 && landIndex < 12)) {
        GameLog("错误的土地索引!");
        return;
    }
    
    var cmd = "SELECT t1.experience, t2.lands FROM `farm_user` t1 LEFT JOIN `farm_game` t2 ON t1.id=t2.userid  WHERE t1.id=?";
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
            
            var updateExp = results[0].experience + disasterCfg.addExp;
            
            var now = (new Date()).getTime();
            land.clearDisasterTime = now;
            var disasterType = land.disasterType;

            async.parallel([
                function(callback){
                    // 更新数据
                    Lands.Update(userId, lands, function(rs) {
                        callback(null, rs);
                    });
                },
                function(callback){
                    // 添加经验
                    User.UpdateExperience(userId, updateExp, function(rs) {
                        callback(null, rs);
                    });
                }],
                
                // optional callback
                function(err, results){
                    if (results[0] !== true || results[1] !== true) {
                        if (callback) callback(false, 444444);
                        throw "!!!!!!!![清楚灾害]错误的结果!!!!!!!!";
                    } else {
                        MsgClearDisaster.Success(socket, disasterType);
                        User.SendDataSync(socket, ['lands','experience']);
                    }
                }
            );
        }
    });
}

// 除灾成功
MsgClearDisaster.Success = function(socket, disasterType) {
    var obj = { type : "clearDisasterSuccess", disasterType : disasterType};
    var msg = JSON.stringify(obj);
    socket.send(msg);
}

MsgHandler.Add(MsgClearDisaster);

