// 16:42 2017/3/30
// create by lsh

var MsgBuyItems = { }

var async = require('async');

var MinuteToMicroSecond = 60000;
var HourToMinute = 60;

MsgBuyItems.interest = "buyItems"
MsgBuyItems.Process = function(socket, message) {
    GameLog("buy items");
   
    var userId = socket.userId;
    var kinds = message.kinds;
    var itemId = message.buyId;
    var number = message.buyCount;
    
    if (kinds === 0) 
    {   // 种子
        var cmd = "SELECT `money` , `experience` FROM `farm_user` WHERE `id`=?";
        mysql.Query2(cmd, [userId], function (results, fields) 
        {
            if (results.length === 0) {
                    GameLog("不存在!!!, 不可能, 角色或数据不存在?");
            } else 
            {
                var hasMoney = results[0].money;
                var experience = results[0].experience;
                var seedCfg = table.GetEntry("plant", itemId);
                if (seedCfg) {
                    var amountPrice = seedCfg.buy * number;
                    if (amountPrice > hasMoney) {
                        MsgHandler.ErrorResponse(socket, 6); // 金币不足!
                        return;
                    }
                    
                    if (seedCfg.minLevel > User.GetLevel(experience)) {
                        MsgHandler.ErrorResponse(socket, 7); // 等级不足!
                        return;
                    }
                    
                    async.parallel([
                        function(callback){
                            // 减钱
                            User.UpdateMoney(userId, hasMoney - amountPrice, function(rs) {
                                callback(null, rs);
                            });
                        },
                        function(callback){
                            // 添加新物品
                            Package.AddNewItem(userId, kinds, itemId, number, function(rs) {
                                callback(null, rs);
                            });
                        }],
                        // optional callback
                        function(err, results){
                            if (results[0] !== true || results[1] !== true) {
                                if (callback) callback(false, 444444);
                                throw "!!!!!!!![购买种子]错误的结果!!!!!!!!";
                            } else {
                                // 通知成功
                                MsgBuyItems.Success(socket);
                                User.SendDataSync(socket, ['money','package']);
                            }
                        }
                    );
                }else {
                    GameLog("seedCfg === null, seedId =", itemId);
                }
            }
        });
    }
    else if (kinds === 1) 
    {   // 道具
        var cmd = "SELECT `money` FROM `farm_user` WHERE `id`=?";
        mysql.Query2(cmd, [userId], function (results, fields) {
            if (results.length === 0) {
                    GameLog("不存在!!!, 不可能");
            } else {
                var hasMoney = results[0].money;
                var propCfg = table.GetEntry("property", itemId);
                if (propCfg) {
                    var amountPrice = propCfg.buy * number;
                    if (amountPrice > hasMoney) {
                        MsgHandler.ErrorResponse(socket, 6);
                        return;
                    }
                    
                    async.parallel([
                        function(callback){
                            // 减钱
                            User.UpdateMoney(userId, hasMoney - amountPrice, function(rs) {
                                callback(null, rs);
                            });
                        },
                        function(callback){
                            // 添加新物品
                            Package.AddNewItem(userId, kinds, itemId, number, function(rs) {
                                callback(null, rs);
                            });
                        }],
                        // optional callback
                        function(err, results){
                            if (results[0] !== true || results[1] !== true) {
                                if (callback) callback(false, 444444);
                                throw "!!!!!!!![购买道具]错误的结果!!!!!!!!";
                            } else {
                                // 通知成功
                                MsgBuyItems.Success(socket);
                                User.SendDataSync(socket, ['money','package']);
                            }
                        }
                    );
                } else {
                    GameLog("propCfg === null, propertyId =", itemId);
                }
            }
        });
    }else if (kinds === 2) {
        // 宠物
        var cmd = "SELECT `money` FROM `farm_user` WHERE `id`=?";
        mysql.Query2(cmd, [userId], function (results, fields) {
            if (results.length === 0) {
                GameLog("不存在!!!, 不可能");
            }
            else {
                var hasMoney = results[0].money;
                var petCfg = table.GetEntry("pet", itemId);
                if (petCfg === null) {
                     GameLog("petCfg === null, petId =", itemId);
                     return;
                }
                
                var amountPrice;
                if (number === 7) {
                    amountPrice = petCfg.time.money[0];
                }else if (number === 30) {
                    amountPrice = petCfg.time.money[1];
                }else if (number === 90) {
                    amountPrice = petCfg.time.money[2];
                }else {
                    GameLog("宠物购买周期不是配置选项[" + number + "]");
                    return;
                }
                
                if (amountPrice > hasMoney) {
                    MsgHandler.ErrorResponse(socket, 6);
                    return;
                }
                
                var now = (new Date()).getTime();
                var validTime = number * MinuteToMicroSecond * HourToMinute * 24;
                
                async.parallel([
                    function(callback){
                        // 减钱
                        User.UpdateMoney(userId, hasMoney - amountPrice, function(rs) {
                            callback(null, rs);
                        });
                    },
                    function(callback){
                        // 添加新物品
                        Pet.Add(userId, itemId, now, validTime, function(rs) {
                            callback(null, rs);
                        });
                    }],
                    // optional callback
                    function(err, results){
                        if (results[0] !== true || results[1] !== true) {
                            if (callback) callback(false, 444444);
                            throw "!!!!!!!![购买道具]错误的结果!!!!!!!!";
                        } else {
                            // 通知成功
                            MsgBuyItems.Success(socket);
                            User.SendDataSync(socket, ['money','pets']);
                        }
                    }
                );
            }
        });
    } else {
        GameLog("未知的购买操作!");
    }
}

// 购买成功
MsgBuyItems.Success = function(socket, results) {
    var obj = { type : "buyItemsSuccess" };
    var msg = JSON.stringify(obj);
    socket.send(msg);
}

MsgHandler.Add(MsgBuyItems);

