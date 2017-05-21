if(typeof module !== 'undefined')
    module.exports = Global;

function Global() {
    this.signInCount = 0;
    GameLog("Global------------->")
}

// 初始化
Global.prototype.Init = function(callback) {
    var cmd = "UPDATE `farm_global` SET `start`=? WHERE `id`=?";
    var now = (new Date()).getTime();
    mysql.Query2(cmd, [now, 1], function (results, fields) {
        if (callback) callback(true);
    });
}

Global.prototype.LoopByEveryData = function(hours, minutes, overAtOnceRun, func) {
    var now = new Date();
    var nowHours = now.getHours();
    var nowMinutes = now.getMinutes();
    
    if (nowHours === hours && nowMinutes == minutes) {
        func();
        setInterval(func, 24*36000*1000);
        GameLog('24小时0分钟后刷新奖励');
        return;
    }
    
    var callback = function() {
        this.LoopByEveryData(hours, minutes, overAtOnceRun, func);
    }.bind(this);
    
    if (hours < nowHours || (hours === nowHours && minutes < nowMinutes) ) {
        if (overAtOnceRun) {
            // 超过更新时间立即更新一次.
            GameLog("立即刷新一次签到奖励!");
            func();
        }
        
        var remainHours = 23 - nowHours;
        setTimeout(callback, ((remainHours + hours)*36000 + (60 - minutes)*60)*1000);
        GameLog((remainHours + hours)+'小时' + (60-minutes)+'分钟后刷新奖励');
    }
    else {
        setTimeout(callback, ((hours - nowHours)*36000 +(minutes - nowMinutes)*60)*1000);
        GameLog((hours - nowHours)+'小时'+(minutes - nowMinutes)+'分钟后刷新奖励');
    }
}

Global.prototype.UpdateSignInCount = function() {
    var self = this;
    var cmd = "SELECT `data` FROM `farm_global` WHERE `id`=?";
    mysql.Query2(cmd, [1], function (results, fields) {
        if (results.length === 0) {
            GameLog("错误的全局数据表:,id=", 1);
            return;
        }else {
            var data = JSON.parse(results[0].data);
            ++data.signInCount;
            self.signInCount = data.signInCount;
            // 更新数据
            var dataJson = JSON.stringify(data);
            var updateSql = "UPDATE `farm_global` SET `data`=? WHERE `id`=?";
            mysql.Query2(updateSql, [dataJson, 1]);
        }
    });
}

Global.prototype.UpdateSignInCountEveryData = function(hours, minutes) {
    this.LoopByEveryData(hours, minutes, false, this.UpdateSignInCount.bind(this));
}

Global.prototype.GetSignInCount = function(callback) {
    var self = this;
    var cmd = "SELECT `data` FROM `farm_global` WHERE `id`=?";
    mysql.Query2(cmd, [1], function (results, fields) {
        if (results.length === 0) {
            GameLog("错误的全局数据表:,id=", 1);
            if (callback) callback(undefined);
            return;
        }else {
            var data = JSON.parse(results[0].data);
            //self.signInCount = data.signInCount;
            if (callback) callback(data.signInCount);
        }
    });
}
