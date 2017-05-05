// 15:23 2017/4/10
// create by lsh

// 合成
var MsgHeCheng = { }

MsgHeCheng.interest = "hechengProp";
MsgHeCheng.Process = function(socket, message) {
    GameLog("he cheng");
    
    var userId = socket.userId;
    var propId = message.propId;
    var propCount = message.propCount;
    
    var cmd = "SELECT `package` FROM `farm_game` WHERE `userId`=?";
    mysql.Query2(cmd, [userId], function (results, fields) {
        if (results.length === 0) {
            GameLog("不存在!!!, 不可能, 角色或数据不存在?");
        } else {
            var propCfg = table.GetEntry("hechengProp", propId);
            if (propCfg === null)
                return;

            var package = JSON.parse(results[0].package);
            var guoshiKinds = 2; // 果实
            var heChengKinds = 3; // 合成物品
            var caiLiaoId, caiLiaoCount;
            for(var i = 0; i < propCfg.cailiao.length; ++i) {
                caiLiaoId = propCfg.cailiao[i].id;
                caiLiaoCount = propCfg.cailiao[i].count;
                if (false === (typeof package[guoshiKinds][caiLiaoId] !== 'undefined' && 
                               package[guoshiKinds][caiLiaoId] >= caiLiaoCount * propCount) ) {
                    MsgHandler.ErrorResponse(socket, 25); // 材料不足,合成道具失败!
                    return;
                }
            }

            if (typeof package[heChengKinds] === 'undefined') {
                package[heChengKinds] = {};
            }
            
            for(var i = 0; i < propCfg.cailiao.length; ++i) {
                caiLiaoId = propCfg.cailiao[i].id;
                caiLiaoCount = propCfg.cailiao[i].count;
                if (typeof package[guoshiKinds][caiLiaoId] !== 'undefined' && 
                    package[guoshiKinds][caiLiaoId] >= caiLiaoCount * propCount) 
                {
                    package[guoshiKinds][caiLiaoId] -= caiLiaoCount * propCount;
                }
            }
            
            if (typeof package[heChengKinds][propCfg.id] === 'undefined') {
                package[heChengKinds][propCfg.id] = propCount;
            }
            else {
                package[heChengKinds][propCfg.id] += propCount;
            }

            // 更新背包信息. 
            Package.Update(userId, package,  function(rs) {
                MsgHeCheng.Success(socket);
                User.SendDataSync(socket, ['package']);
            });
        }
    }); 
}

MsgHeCheng.Success =  function(socket, results) {
    var obj = { type : "hechengPropSuccess" };
    var msg = JSON.stringify(obj);
    socket.send(msg);
}


MsgHandler.Add(MsgHeCheng);
