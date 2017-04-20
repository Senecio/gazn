
var MsgRemovePlant = { }

var async = require('async');

MsgRemovePlant.interest = "removePlant"
MsgRemovePlant.Process = function(socket, message) {
    GameLog("remove plant");
   
    var userId = socket.userId;
    var landIndex = message.landIndex;
    
    var cmd = "SELECT t1.experience, t2.lands FROM `farm_user` t1 LEFT JOIN `farm_game` t2 ON t1.id=t2.userid  WHERE t1.id=?";
    mysql.Query2(cmd, [userId], function (results, fields)
    {
        if (results.length === 0) {
                GameLog("������!!!, ������, ��ɫ�����ݲ�����?");
        }else {

            var lands = JSON.parse(results[0].lands);
            if (landIndex >= lands.length) {
                MsgHandler.ErrorResponse(socket, 3); // ����λδ����
                return;
            }
            
            if (lands[landIndex].state === 0) {
                MsgHandler.ErrorResponse(socket, 12); // ���ػ�û�в���
                return;
            }
            
            var land = lands[landIndex];
            var seedCfg = table.GetEntry("plant", land.seedId);
            if (seedCfg === null) {
                GameLog("seedCfg === null, seedId =", land.seedId);
                return;
            }
           
            var experience = results[0].experience;
            var updateExperience = experience + seedCfg.clearExp;

            async.parallel([
                function(callback){
                    // ����������Ϣ.
                    Lands.Reset(userId, landIndex, function(rs) {
                        callback(null, rs);
                    });
                },
                function(callback) {
                    // ��Ӿ���
                    User.UpdateExperience(userId, updateExperience, function(rs) {
                        callback(null, rs);
                    });
                }],
                // optional callback
                function(err, results){
                    if (results[0] !== true || results[1] !== true) {
                        if (callback) callback(false, 444444);
                        throw "!!!!!!!![����ֲ��]����Ľ��!!!!!!!!";
                    } else {
                        MsgRemovePlant.Success(socket);
                        User.SendDataSync(socket, ['lands', 'experience']);
                    }
                }
            );
        }
    });
}

// ����ֲ��ɹ�
MsgRemovePlant.Success = function(socket, results) {
    var obj = { type : "removePlantSuccess" };
    var msg = JSON.stringify(obj);
    socket.send(msg);
}

MsgHandler.Add(MsgRemovePlant);