// 16:50 2017/4/26
// create by lsh

var MsgActivePet = { }

MsgActivePet.interest = "activePet"
MsgActivePet.Process = function(socket, message) {
    GameLog("active pet");
   
    var userId = socket.userId;
    var petId = message.petId;
    
    Pet.Active(userId, petId, function(rs) {
        if (rs) {
            MsgActivePet.Success(socket);
            // 同步数据
            User.SendDataSync(socket, ['pets']);
        }
        else {
            MsgHandler.ErrorResponse(socket, 24); // 宠物尚未获得!
        }
    });
}

// 激活宠物成功
MsgActivePet.Success = function(socket) {
    var obj = { type : "activePetSuccess" };
    var msg = JSON.stringify(obj);
    socket.send(msg);
}

MsgHandler.Add(MsgActivePet);

