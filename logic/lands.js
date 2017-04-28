if(typeof module !== 'undefined')
    module.exports = Lands;
    
var updateSql = "UPDATE `farm_game` SET `lands`=? WHERE `userId`=?";
var selectSql = "SELECT `lands` FROM `farm_game` WHERE `userId`=?";

var MinuteToMicroSecond = 60000;
var HourToMinute = 60;

function Lands() {

}

// state : 状态  0空闲, 1种植, 2成熟, 3收获
Lands.prototype.enum_landsState_idle = 0;
Lands.prototype.enum_landsState_grow = 1;
Lands.prototype.enum_landsState_mature = 2;
Lands.prototype.eunm_landsState_harvested = 3;

// 是否可以播种指定种子
Lands.prototype.CanSowSeed = function(landsLevel, seedId) {
    var landsTab = table['landsLevel'];
    for (var i = 0; i < landsLevel && i < 6; ++i) {
        for (var j = 0; j < landsTab[i].canSow.length; ++j) {
            if (landsTab[i].canSow[j] === seedId)
                return true;
        }
    }
    return false;
}


Lands.prototype.IsMatured = function(reduceMinuteArray, nowTime, sowTime, disasterTime, timeParts, effectParent, clearDisasterTime)
{
    var g = Math.floor((nowTime - sowTime) / MinuteToMicroSecond); 
    var a = g;
    //var info = ["发芽","开花","结果"];
    
    var incArray = [0,0,0];
    if (typeof disasterTime !== 'undefined' && disasterTime) {
        incArray = Disaster.GetPart(sowTime, disasterTime, timeParts, effectParent, clearDisasterTime);
    }
    
    for (var i = 0; i < 3; ++i) {
        if (timeParts[i] + incArray[i] > reduceMinuteArray[i] + a) {
            //console.log("剩余" + (timeParts[i] + incArray[i] - reduceMinuteArray[i] - a) +"分钟" + info[i], "灾害"+incArray[i]+"分钟", "已成长"+g+"分钟");
            return false;
        }else {
            a = (reduceMinuteArray[i] + a) - (timeParts[i] + incArray[i]);
        }
    }
    // console.log("已经成熟!");
    return true;
}

// 隐藏服务端信息
Lands.prototype.HiddenServerSideInfo = function(strLands) {
    var lands = JSON.parse(strLands);
    var land;
    for (var k = 0; k < lands.length; ++k) {
        land = lands[k];
        if (typeof land.clearDisasterTime !== 'undefined') {
            delete land.disasterType;
            delete land.disasterTime;
            delete land.clearDisasterTime;
        }
    }
    return JSON.stringify(lands);
}

// 初始化为新用户
Lands.prototype.InitForNewUser = function(userId, callback) {
    var now = (new Date()).getTime();
    var items = '[{"level":1, "state":0, "seedId":0, "sowTime":0, "disasterTime":' + now + '}]';
    mysql.Query2(updateSql, [items, userId], function (results, fields) {
        if (callback) callback(true);
    });
}

// 播种
Lands.prototype.SowSeeds = function(userId, landIndex, seedId, callback) {
    mysql.Query2(selectSql, [userId], function (results, fields) {
        if (results.length === 0) {
            if (callback) callback(false);
            return;
        }else {
            var lands = JSON.parse(results[0].lands);
            var land = lands[landIndex];
            land.state = 1;
            land.seedId = seedId;
            land.sowTime = (new Date()).getTime();
            // 更新数据
            var landsJson = JSON.stringify(lands);
            mysql.Query2(updateSql, [landsJson, userId], function(results, fields) { if (callback) callback(true); });
        }
    });
}

// 收获
Lands.prototype.Harvest = function(userId, landIndex, callback) {
    mysql.Query2(selectSql, [userId], function (results, fields) {
        if (results.length === 0) {
            if (callback) callback(false);
            return;
        }else {
            var lands = JSON.parse(results[0].lands);
            var land = lands[landIndex];
            land.state = 2;
            // 更新数据
            var landsJson = JSON.stringify(lands);
            mysql.Query2(updateSql, [landsJson, userId], function(results, fields) { if (callback) callback(true); });
        }
    });
}

// 偷盗
Lands.prototype.Steal = function(userId, landIndex, count, callback) {
    mysql.Query2(selectSql, [userId], function (results, fields) {
        if (results.length === 0) {
            if (callback) callback(false);
            return;
        }else {
            var lands = JSON.parse(results[0].lands);
            var land = lands[landIndex];
            land.stealCount = count;
            // 更新数据
            var landsJson = JSON.stringify(lands);
            mysql.Query2(updateSql, [landsJson, userId], function(results, fields) { if (callback) callback(true); });
        }
    });
}

// 施肥
Lands.prototype.Manure = function(userId, landIndex, reduceTime, callback) {
    mysql.Query2(selectSql, [userId], function (results, fields) {
        if (results.length === 0) {
            if (callback) callback(false);
            return;
        }else {
            var lands = JSON.parse(results[0].lands);
            var land = lands[landIndex];
            land['reduceTime'] = reduceTime;
            // 更新数据
            var landsJson = JSON.stringify(lands);
            mysql.Query2(updateSql, [landsJson, userId], function(results, fields) { if (callback) callback(true); });
        }
    });
}

// 翻地
Lands.prototype.Reset = function(userId, landIndex, callback) {
    mysql.Query2(selectSql, [userId], function (results, fields) {
        if (results.length === 0) {
            if (callback) callback(false);
            return;
        }else {
            var lands = JSON.parse(results[0].lands);
            var land = lands[landIndex];
            land.state = 0;
            land.seedId = 0;
            land.sowTime = 0;
            delete land.disasterType;
            delete land.clearDisasterTime;
            delete land.reduceTime;
            delete land.stealCount;
            delete land.stealUsers;
            // 更新数据
            var landsJson = JSON.stringify(lands);
            mysql.Query2(updateSql, [landsJson, userId], function(results, fields) { if (callback) callback(true); });
        }
    });
}

//  土地解锁
Lands.prototype.Unlock = function(userId, landIndex, callback) {
    mysql.Query2(selectSql, [userId], function (results, fields) {
        if (results.length === 0) {
            if (callback) callback(false);
            return;
        }else {
            var lands = JSON.parse(results[0].lands);
            var now = (new Date()).getTime();
            lands[landIndex] = {"level":1, "state":0, "seedId":0, "sowTime":0, 'disasterTime' : now };
            // 更新数据
            var landsJson = JSON.stringify(lands);
            mysql.Query2(updateSql, [landsJson, userId], function(results, fields) { if (callback) callback(true); });
        }
    });
}

//  土地更新
Lands.prototype.Update = function(userId, lands, callback) {
    // 更新数据
    var landsJson = JSON.stringify(lands);
    mysql.Query2(updateSql, [landsJson, userId], function(results, fields) { if (callback) callback(true); });
}