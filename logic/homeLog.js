if(typeof module !== 'undefined')
    module.exports = HomeLog;

var MinuteToMicroSecond = 60000;
var HourToMinute = 60;


function HomeLog() {

}

HomeLog.prototype.AddSteal = function(userId, time, stealUserId, stealUserName, furitId, number, carryback, callback) {
    var stealType = 1;
    var subType = 0;
    var cmd = "INSERT INTO `farm_log` VALUES (NULL,?,?,?,?,?)";
    var data = new Array();
    data.push(stealUserId);
    data.push(stealUserName);
    data.push(furitId);
    data.push(number);
    data.push(carryback);
    mysql.Query2(cmd, [userId, time, stealType, subType, JSON.stringify(data)], function (results, fields) {
        if (callback) callback(true);
    });
}

HomeLog.prototype.AddClearDisaster = function(userId, time, helpUserId, helperUserName, disasterType, getExp, callback) {
    var clearDisasterType = 2;
    var cmd = "INSERT INTO `farm_log` VALUES (NULL,?,?,?,?,?)";
    var data = new Array();
    data.push(helpUserId);
    data.push(helperUserName);
    data.push(getExp);
    mysql.Query2(cmd, [userId, time, clearDisasterType, disasterType, JSON.stringify(data)], function (results, fields) {
        if (callback) callback(true);
    });
}

HomeLog.prototype.GetUserLog = function(userId, callback) {
    var cmd = "SELECT * FROM `farm_log` WHERE `userId`=?";
    mysql.Query2(cmd, [userId], function (results, fields) {
        if (callback) callback(results, fields);
    });
}

HomeLog.prototype.DeleteOverTimeLog = function(callback) {
    var now = (new Date()).getTime();
    var day = 2; // 多少天以前删除.
    var overTime =  now - (day * 60000 * 60 * 24);
    var cmd = "DELETE FROM `farm_log` WHERE `time` < ?";
    mysql.Query2(cmd, [overTime], function (results, fields) {
        if (callback) callback(true);
    });
}
