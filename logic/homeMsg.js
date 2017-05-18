if(typeof module !== 'undefined')
    module.exports = HomeMsg;

var MinuteToMicroSecond = 60000;
var HourToMinute = 60;


function HomeMsg() {

}

HomeMsg.prototype.AddMsg = function(time, userId, toUserId, userName, toUserName, msg, callback) {
    var cmd = "INSERT INTO `farm_msg` VALUES (NULL,?,?,?,?)";
    var data = new Array();
    data.push(userName);
    data.push(toUserName);
    data.push(msg);
    mysql.Query2(cmd, [time, userId, toUserId, JSON.stringify(data)], function (results, fields) {
        if (callback) callback(true);
    });
}

HomeMsg.prototype.GetMsgs = function(userId, callback) {
    var cmd = "SELECT `time`,`userId`,`toUserId`,`data` FROM `farm_msg` WHERE `userId`=? or `toUserId`=?;";
    mysql.Query2(cmd, [userId, userId], function (results, fields) {
        if (callback) callback(results, fields);
    });
}

HomeMsg.prototype.DeleteOverTimeLog = function(daysAgo, callback) {
    var now = (new Date()).getTime();
    var day = 2; // 多少天以前删除.
    var overTime =  now - (day * 60000 * 60 * 24);
    var cmd = "DELETE FROM `farm_log` WHERE `time` < ?";
    mysql.Query2(cmd, [overTime], function (results, fields) {
        if (callback) callback(true);
    });
}
