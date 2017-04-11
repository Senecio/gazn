// 18:30 2017/3/22
// create by lsh

var MsgLogin = { }

var async = require('async');

MsgLogin.interest = "login"
MsgLogin.Process = function(socket, message) {
    GameLog("Process login");
    if (typeof message.account !== 'string') {
        GameLog("账号类型错误!");
        return;
    }
    if (message.account.length <= 0) {
        GameLog("账号名为空!");
        return;
    }
    
    if (typeof message.password !== 'string') {
        GameLog("密码类型错误!");
        return;
    }
    if (typeof message.length <= 0) {
        GameLog("密码不能为空!");
        return;
    }
    
    var regName = message.account;
    var password = message.password;
    var cmd = 'SELECT * FROM `'+ config.GetUserTableName() + '` WHERE `regName`=? AND `password`=?';
    var array = [regName, password];
    mysql.Query2(cmd, array, function (results, fields) {
        if (results.length > 0) {
            // 进入场景
            MsgLogin.Success(socket, results);
        }
        else {
            MsgHandler.ErrorResponse(socket, 1);
        }
    }); 
}

// 登录成功
MsgLogin.Success = function(socket, results) {    
    var user = results[0];
    var userId = user.id;
    socket.userId = userId;
    
    // 判断如果没有game数据,那么为新用户
    // 然后初始化新用户game数据.
    mysql.RunSP("InitDataForNewUser", [userId], function(results, fields) {
        var rs0 = results[0][0];
        if (rs0.out_value < 0) {
            // 初始化过了
            User.SendAllBaseData(socket);
            var msg = JSON.stringify({type : "loginSuccess"});
            socket.send(msg);
        }else {
            async.parallel([
                function(callback){
                    // 初始背包
                    Package.InitForNewUser(userId, function(rs) {
                        callback(null, rs);
                    });
                },
                function(callback){
                    // 初始化土地
                    Lands.InitForNewUser(userId, function(rs) {
                        callback(null, rs);
                    });
                }],
                // optional callback
                function(err, results){
                    if (results[0] !== true || results[1] !== true) {
                        throw "!!!!!!!![角色初始化]错误的结果!!!!!!!!";
                    } else {
                        // 通知成功
                        User.SendAllBaseData(socket);
                        var msg = JSON.stringify({type : "loginSuccess"});
                        socket.send(msg);
                    }
                }
            );
        }
    });
}

MsgHandler.Add(MsgLogin);

