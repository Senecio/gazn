// 16:42 2017/3/30
// create by lsh

var MsgSignInAward = { }

var async = require('async');

var MinuteToMicroSecond = 60000;
var HourToMinute = 60;

MsgSignInAward.interest = "signInAward"
MsgSignInAward.Process = function(socket, message) {
    GameLog("sign in award");
   
    var userId = socket.userId;
    
    var cmd = "SELECT `signIn` FROM `farm_game` WHERE `userId`=?";
    mysql.Query2(cmd, [userId], function (results, fields) {
        if (results.length === 0) {
            GameLog("不存在!!!, 不可能, 角色或数据不存在?");
        } else {
        
            var signInCount = Global.signInCount;
            var signInDay = table["signInAward"].length;
            
            var cycle = Math.floor(signInCount / signInDay);
            var index = signInCount % signInDay;
            var signInData;
            if (results[0].signIn === null) {
                signInData = { cycle : cycle, days : [index] };
            }
            else {
                signInData = JSON.parse(results[0].signIn);
                if (signInData.cycle !== cycle) {
                    signInData.cycle = cycle;
                    signInData.days = [index];
                }
                else {
                    if (signInData.days.indexOf(index) >= 0) {
                        MsgHandler.ErrorResponse(socket, 27); // 今天领取过了,请明天再来明天!
                        return;
                    }else {
                        signInData.days.push(index);
                    }
                }
            }
            
            var  awardCfg = table["signInAward"][index];
            if (typeof awardCfg === 'undefined') {
                GameLog("awardCfg === null, id =", index+1);
                return;
            }
            
            var kinds = -1, itemId = -1, count = -1;
            var isPet = false;
            
            itemId = awardCfg.itemId;
            count = awardCfg.count;
            
            if (awardCfg.type === 'seed') {
                kinds = 0; // 种子
            }else if (awardCfg.type === 'fruit') {
                kinds = 2; // 果实
            }else if (awardCfg.type === 'property') {
                kinds = 1; // 道具
                var propCfg = table.GetEntry("property", itemId);
                if (propCfg === null) {
                    GameLog('propCfg === null, propId=', itemId);
                    return;
                }
                if (propCfg.type === 4) { // 金币
                    kinds = -1;
                }
            } else if (awardCfg.type === 'pet') {
                isPet = true;
                count = count * MinuteToMicroSecond * HourToMinute * 24;
                
            }else {
                GameLog("无效奖励类型~!type=", awardCfg.type);
                return;
            }

            if (kinds >= 0) {
                async.parallel([
                    function(callback){
                        // 更新背包信息.
                        Package.AddNewItem(userId, kinds, itemId, count, function(rs) {
                            callback(null, rs);
                        });
                    },
                    function(callback){
                        // 更新签到数据.
                        SignInAward.Update(userId, signInData, function(rs) {
                            callback(null, rs);
                        });
                    }],
                    // optional callback
                    function(err, results){
                        if (results[0] !== true || results[1] !== true) {
                            if (callback) callback(false, 444444);
                            throw "!!!!!!!![签到]错误的结果!!!!!!!!";
                        } else {
                            MsgSignInAward.Success(socket);
                            User.SendDataSync(socket, ['package','signIn']);
                        }
                    }
                );
            }else {
                if (isPet) {
                    async.parallel([
                        function(callback){
                            var now = (new Date()).getTime();
                            // 添加宠物
                            Pet.Add(userId, itemId, now, count, function(rs) {
                                callback(null, rs);
                            });
                        },
                        function(callback){
                            // 更新签到数据.
                            SignInAward.Update(userId, signInData, function(rs) {
                                callback(null, rs);
                            });
                        }],
                        // optional callback
                        function(err, results){
                            if (results[0] !== true || results[1] !== true) {
                                if (callback) callback(false, 444444);
                                throw "!!!!!!!![签到]错误的结果!!!!!!!!";
                            } else {
                                MsgSignInAward.Success(socket);
                                User.SendDataSync(socket, ['pets','signIn']);
                            }
                        }
                    );
                }
                else {
                    async.parallel([
                        function(callback){
                            // 更新金币.
                            User.AddMoney(userId, count, function(rs) {
                                callback(null, rs);
                            });
                        },
                        function(callback){
                            // 更新签到数据.
                            SignInAward.Update(userId, signInData, function(rs) {
                                callback(null, rs);
                            });
                        }],
                        // optional callback
                        function(err, results){
                            if (results[0] !== true || results[1] !== true) {
                                if (callback) callback(false, 444444);
                                throw "!!!!!!!![签到]错误的结果!!!!!!!!";
                            } else {
                                MsgSignInAward.Success(socket);
                                User.SendDataSync(socket, ['money','signIn']);
                            }
                        }
                    );
                }
            
            }
        }
    });
}

// 签到成功
MsgSignInAward.Success = function(socket) {
    var obj = { type : "signInAwardSuccess" };
    var msg = JSON.stringify(obj);
    socket.send(msg);
}

MsgHandler.Add(MsgSignInAward);

