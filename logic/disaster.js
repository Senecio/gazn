if(typeof module !== 'undefined')
    module.exports = Disaster;

var MinuteToMicroSecond = 60000;
var HourToMinute = 60;

function Disaster() {

}

Disaster.prototype.enum_none = 0;
Disaster.prototype.enum_has_bug = 1;    // 除虫
Disaster.prototype.enum_no_water = 2;   // 缺水
Disaster.prototype.eunm_extra_nutrition = 3;    // 营养流失

Disaster.prototype.GetPart = function(sowTime, disasterTime, timeParts, effectParent, clearDisasterTime) {
    var c = 0;
    var array = [0,0,0];
    if (disasterTime < sowTime) {
        return array;
    }
    var a = Math.floor((disasterTime - sowTime) / MinuteToMicroSecond);
    for (var i = 0; i < 3; ++i) {
        c += timeParts[i];
        if (c > a) {
            if (typeof clearDisasterTime !== 'undefined' && clearDisasterTime) {
                var d = Math.floor((clearDisasterTime - disasterTime) / MinuteToMicroSecond);
                if (c - a > d) {
                    array[i] = Math.floor((d / HourToMinute) * effectParent);
                }
                else {
                    array[i] = Math.floor(((c - a) / HourToMinute) * effectParent);
                    d -= (c - a);
                    while (++i < 3) {
                        if (d > timeParts[i]) {
                            array[i] = Math.floor((timeParts[i] / HourToMinute) * effectParent);
                            d -= timeParts[i];
                        }else {
                            array[i] = Math.floor((d / HourToMinute) * effectParent);
                            break;
                        }
                    }
                }
                break;
            }
        
            array[i] = Math.floor(((c - a) / HourToMinute) * effectParent);
            c = 0;
            a = 0;
        }
    }
    return array;
}

// 触发灾害
Disaster.prototype.Trigger = function(userId, callback) {
    var cmd = "SELECT `lands` FROM `farm_game` WHERE `userId`=?";
    mysql.Query2(cmd, [userId], function (results, fields) {
        if (results.length === 0) {
            if (callback) callback(false);
            return;
        }else {
            var now = (new Date()).getTime();
            var lands = JSON.parse(results[0].lands);
            
            var land = null;
            var seedCfg = null;
            var disasterCfg = null;
            var reduceTime = 0;
            var change = 0;

            for (var i = 0; i < lands.length; ++i) {
                var land = lands[i];
                if (land.state !== 1) 
                    continue; // 未种植
                    
                if (typeof land.clearDisasterTime !== 'undefined')
                    continue; // 已经灾害过
                
                if (typeof land.disasterType !== 'undefined' && land.disasterType !== 0)
                    continue; // 灾害中
                 
                seedCfg = table.GetEntry("plant", land.seedId);
                if (seedCfg === null)
                    continue;
                
                disasterCfg = table.GetEntry("disaster", seedCfg.disasterId);
                if (disasterCfg === null)
                    continue;
                
                if (typeof land.disasterTime === 'undefined') {
                    land.disasterTime = now;
                    change = true;
                }

                if (now <= (land.disasterTime + (disasterCfg.cd * MinuteToMicroSecond)))
                    continue; // 灾害cd时间未到
                
                GameLog("超过灾害cd!")

                reduceTime = typeof land.reduceTime !== 'undefined' ? land.reduceTime[0] : 0;
                if (now > (land.sowTime + (seedCfg.time.part[0] - reduceTime) * MinuteToMicroSecond))
                {
                    //非种子状态
                    var chance = 0;
                    if (Math.random() < disasterCfg.percent) {
                        // 触发灾害
                        GameLog("触发灾害");
                        var randIndex = table.ChanceByWeightArray(disasterCfg.chanceWeight)
                        land.disasterType = randIndex + 1;
                        land.disasterTime = now;
                        change = true;
                    }
                }
            }

            // 更新数据
            if (change) {
                GameLog("更新cd!")
                Lands.Update(userId, lands, callback);
            }else {
                if (callback) callback(false);
            }
        }
    });
}
