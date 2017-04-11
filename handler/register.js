// 18:30 2017/3/22
// create by lsh

var MsgReg = { }

MsgReg.interest = "register"
MsgReg.Process = function(socket, message) {
    GameLog("Process register");
    
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
    
    mysql.RunSP("AddUserByRegName", [regName, password, regName, 1000000, 1, 0, 0], function(results, fields) {
        var rs0 = results[0][0];
        if (rs0.out_value < 0) {
            // 已经被注册
            MsgHandler.ErrorResponse(socket, 2);
        }
        else {
            // 提示注册成功.
            MsgReg.Success(socket, results);   
        }
    });
    return;
    
    /* 修改成上面使用存储过程
    var cmd = 'SELECT * FROM `' + config.GetUserTableName() + '` WHERE `regname`="' + regName + '"';
    mysql.Query(cmd, function (results, fields) {    
        if (results.length === 0) {
            var addNewUserCmd = 'INSERT INTO `' + config.GetUserTableName() 
                            + '` (`id`,`uid`,`password`,`regname`,`username`,`money`,`experience`,`vip`,`tq`) values(?,?,?,?,?,?,?,?,?)';
            var array = [null, null, password, regName, regName, 0, 1, 0, 0];
            mysql.Query2(addNewUserCmd, array, function (results, fields) {
                // 提示注册成功.
                MsgReg.Success(socket, results);
            });
        }
        else {
            MsgHandler.ErrorResponse(socket, 2);
        }
    }); */
}

// 登录成功
MsgReg.Success = function(socket, results) {
    //GameLog("MsgLogin.Success", results);
    var obj = { type : "registerSuccess" };
    var msg = JSON.stringify(obj);
    socket.send(msg);
}

MsgHandler.Add(MsgReg);

