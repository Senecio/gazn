// 16:59 2017/3/20
// create by lsh

// 游戏日志

var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);

// 设置客户端根目录
app.use(express.static(__dirname + "/web-mobile"));
// 监听端口
app.listen(80);

GameLog = require('./Logger.js');
config = require('./config.js');
table = require('./web-mobile/Table.js');

Global = new (require('./logic/global.js'))();
User = new (require('./logic/user.js'))();
Lands = new (require('./logic/lands.js'))();
Package = new (require('./logic/package.js'))();
Disaster = new (require('./logic/disaster.js'))();
HomeLog = new (require('./logic/homeLog.js'))();
HomeMsg = new (require('./logic/homeMsg.js'))();
SignInAward = new (require('./logic/signIn.js'))();
Pet = new (require('./logic/pet.js'))();
MsgHandler = require('./msgHandler.js');
require('./handler/all.js');

app.ws('/', function(newSocket, req) {
    // 监听消息
    newSocket.on('message', function(message) {
        var msgObj;
        try {
            msgObj = JSON.parse(message);
            MsgHandler.Process(newSocket, msgObj);
        } catch (e) {
            if (e instanceof SyntaxError) {
                GameLog("JSON.parse 解析错误[" + message + ']');
            }
            else {
                GameLog(e);
            }
        }
    });
});

mysql = new (require("./mysql.js"))();
var host = config.db_host;
var port = config.db_port;
var database = config.db_database;
var user = config.db_user;
var password = config.db_password;
mysql.Init(host, port, database, user, password, start);

var once = false;  // 只启动一次

function start() {

    if (once === true) {
        return;
    }
    once = true;
    
    Global.Init();
    Global.UpdateSignInCountEveryData(config.signInAwardRefreshTime.hours, 
        config.signInAwardRefreshTime.minutes);
    
    Global.GetSignInCount();
}
