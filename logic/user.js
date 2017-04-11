if(typeof module !== 'undefined')
    module.exports = User;

function User() {

}

// 初始化为新用户
User.prototype.InitForNewUser = function(userId) {

}

// 更新金币
User.prototype.UpdateMoney = function(userId, money, callback) {
    var cmd = "UPDATE `farm_user` SET `money`=? WHERE `id`=?";
    mysql.Query2(cmd, [money, userId], function (results, fields) {
        if (callback) callback(true);
    });
}

// 更新经验
User.prototype.UpdateExperience = function(userId, experience, callback) {
    var cmd = "UPDATE `farm_user` SET `experience`=? WHERE `id`=?";
    mysql.Query2(cmd, [experience, userId], function (results, fields) {
        if (callback) callback(true);
    });
}

// 更新钱和经验
User.prototype.UpdateMoneyAndExperience = function(userId, money, experience, callback) {
    var cmd = "UPDATE `farm_user` SET `money`=?,`experience`=? WHERE `id`=?";
    mysql.Query2(cmd, [money, experience, userId], function (results, fields) {
        if (callback) callback(true);
    });
}

// 获得等级
User.prototype.GetLevel = function(experience) {
    var level = 1;
    if (experience > 0) {
        level = level + Math.floor(experience / 200);
    }
    return level;
}

// 获得等级经验
User.prototype.GetLevelExp = function(experience) {
    return experience % 200;
}

// 登陆后的所有需要数据
User.prototype.SendAllBaseData = function(socket, callback) {
    var userId = socket.userId;
    var cmd = "SELECT t1.username,t1.money,t1.experience,t1.vip,t1.tq,t2.lands,t2.package FROM farm_user t1 LEFT JOIN farm_game t2 ON t1.id=t2.userid WHERE t1.id=?";
    mysql.Query2(cmd, [userId], function (results, fields) {
        if (results.length === 0) {
            if (callback) callback(false);
            return;
        }else {
            var user = results[0];
            var obj = { type : "userBaseData", id : userId, username : user.username, 
                money : user.money, experience : user.experience, vip : user.vip, lands : user.lands, package : user.package };
            var msg = JSON.stringify(obj);
            socket.send(msg);
            if (callback) callback(true);
        }
    });
}

// 数据同步
User.prototype.SendDataSync = function(socket, dataFields, callback) {
    var userId = socket.userId;
    
    if (!(dataFields instanceof Array) || dataFields.length === 0) {
        GameLog("===============Send Data Sync data fields is error type!===================", dataFields);
        if (callback) callback(false);
        return;
    }
    
    var fieldsCmd = "";
    for (var i = 0; i < dataFields.length; i++) {
        if (dataFields[i] === 'money') {
            fieldsCmd += 't1.money,'
        }else if (dataFields[i] === 'experience') {
            fieldsCmd += 't1.experience,'
        }else if (dataFields[i] === 'vip') {
            fieldsCmd += 't1.vip,'
        }else if (dataFields[i] === 'tq') {
            fieldsCmd += 't1.tq,'
        }else if (dataFields[i] === 'lands') {
            fieldsCmd += 't2.lands,'
        }else if (dataFields[i] === 'package') {
            fieldsCmd += 't2.package,'
        }
        else  {
            GameLog("=== error field : " +  dataFields[i] + "===" );
        }
    }
    if (fieldsCmd.length === 0) {
        if (callback) callback(false);
        return;
    }
    fieldsCmd = fieldsCmd.substring(0, fieldsCmd.length - 1);
    
    var cmd = "SELECT " + fieldsCmd + " FROM `farm_user` t1 LEFT JOIN `farm_game` t2 ON t1.id=t2.userid WHERE t1.id=?";
    mysql.Query2(cmd, [userId], function (results, fields) {
        if (results.length === 0) {
            if (callback) callback(false);
        }else {
            var user = results[0];
            var obj = { type : "userDataSync" };
            for (var i = 0; i < dataFields.length; i++) {
                if (dataFields[i] === 'money') {
                    obj['money'] = user.money;
                }else if (dataFields[i] === 'experience') {
                    obj['experience'] = user.experience;
                }else if (dataFields[i] === 'vip') {
                    obj['vip'] = user.vip;
                }else if (dataFields[i] === 'tq') {
                    obj['tq'] = user.tq;
                }else if (dataFields[i] === 'lands') {
                    obj['lands'] = user.lands;
                }else if (dataFields[i] === 'package') {
                    obj['package'] = user.package;
                }
            }

            var msg = JSON.stringify(obj);
            socket.send(msg);
            if (callback) callback(true);
        }
    });
}