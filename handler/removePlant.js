
var MsgRemovePlant = { }

MsgRemovePlant.interest = "removePlant"
MsgRemovePlant.Process = function(socket, message) {
    GameLog("remove plant");
   
    var userId = socket.userId;
    var landIndex = message.landIndex;
    
    var cmd = "SELECT `lands`  FROM `farm_game` WHERE `userId`=?";
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
           
            Lands.Reset(userId, landIndex, function(rs) {
                if (rs !== true) {
                        throw "!!!!!!!![����ֲ��]����Ľ��!!!!!!!!";
                } else {
                    // ֪ͨ�ɹ�
                    MsgRemovePlant.Success(socket);
                    User.SendDataSync(socket, ['lands']);
                }
            });
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