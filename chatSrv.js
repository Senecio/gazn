/*
    server websocket framework.
*/

var express = require('express');
var app = express();
var http = require('http').Server(app);
IO = require('socket.io')(http);

Util = require("./Utility.js");
GameLog = require('./Logger.js');

// 监听端口
var listenPort = 11555;
http.listen( listenPort, function() {
    console.log('[DEBUG] Listening on *:' + listenPort);
});

//--------------------------------------------------
// 常量
//--------------------------------------------------
var c_HeartbeatCheckMS = 100000;          //心跳检测毫秒数
var c_HeartbeatCheckTimeoutCount = 30;   //心跳检测超时数量

//--------------------------------------------------
// 全局变量
//--------------------------------------------------
var clients = [];
var rooms = {};

var chatServer = new ChatServer();

IO.on('connection', function (socket) {
    GameLog('Client [' + socket.id + '] connected!');
    
    // 创建一个客户链接信息.
    var client = { 
                    id: socket.id, 
                    socket : socket,
                    timeoutCount : 0,
                    heartbeatTime : new Date().getTime(), 
                    SetHeartbeatTime : function() { this.heartbeatTime = new Date().getTime() },
                };

    clients.push(client);
    
    //IO.emit('clientJoin', { name: client.id });
    
    GameLog('Total client: ' + clients.length);
    
    // 心跳响应
    socket.on('heartbeat', function () {
        client.SetHeartbeatTime();
        socket.emit('heartbeatBack');
    });
    
    // 断开链接
    socket.on('disconnect', function () {
        GameLog('Client [' + client.id + '] disconnected!');

        // 通知gameServer 删除client
        chatServer.DeleteClient(client);
        
        //client.socket.broadcast.emit('clientDisconnect', { name: client.id  });
            
        var idx = Util.FindIndexById(clients, client.id);
        if ( idx >= 0 ) {
            clients.splice(idx, 1);
        }
            
        GameLog('Total client: ' + clients.length);
    });
    
    // 通知gameServer 进入新client
    chatServer.NewClient(client);
});

// 检测客户心跳
function CheckClientHeartbeat()
{
    var now = new Date().getTime();
    
    for (var i = clients.length - 1; i >=0; --i) {
        var client = clients[i];
        if (now - client.heartbeatTime > c_HeartbeatCheckMS) {
            ++client.timeoutCount;
            if (client.timeoutCount > c_HeartbeatCheckTimeoutCount) {
                // 超过超时次数,断开客户链接
                client.socket.disconnect();
            }
        }else {
            client.timeoutCount = 0;
        }
    }
}

setInterval(CheckClientHeartbeat, c_HeartbeatCheckMS);




/////////////////////////////////////////////////////////////////////////////////

function ChatServer() {

}

ChatServer.prototype.NewClient = function(client) {

    client.socket.on('reg', function(msg) {
        GameLog("reg", msg);
        client.name = msg.name;
        client.userId = msg.userId;
        client.level = msg.level;
    });

    client.socket.on('enterRoom', function(msg) {
        GameLog("enterRoom", msg);
        var roomId = msg.roomId;
        
        if (typeof roomId === 'number') {
            if (typeof rooms[roomId] === 'undefined') {
                rooms[roomId] = {};
            }
            rooms[roomId][client.userId] = client;
            client.roomId = roomId;
            GameLog("加入:"+"rm"+roomId+" "+client.socket.id);
            client.socket.join("rm"+roomId);
            
            var data = new Array();
            var entry;
            for (var key in rooms[roomId]) {
                if (typeof rooms[roomId][key] !== 'undefined') {
                    entry = rooms[roomId][key]
                    data.push({ name: entry.name, userId : entry.userId, lv : entry.level })
                }
            }
            IO.to("rm"+client.roomId).emit('userList', data);
        }
    });
    
    client.socket.on('leaveRoom', function(msg) {
        GameLog("levaeRoom", msg);
        if (typeof client.roomId === 'number') {
            var roomId = client.roomId;
            
            if (typeof rooms[roomId][client.userId] !== 'undefined') {
                delete rooms[roomId][client.userId];
                
                client.roomId = undefined;
                GameLog("离开:"+"rm"+roomId+" "+client.socket.id);
                client.socket.leave("rm"+client.roomId);
                    
                var data = new Array();
                var entry;
                for (var key in rooms[roomId]) {
                    if (typeof rooms[roomId][key] !== 'undefined') {
                        entry = rooms[roomId][key]
                        data.push({ name: entry.name, userId : entry.userId, lv : entry.level })
                    }
                }
                IO.to("rm"+roomId).emit('userList', data);
            }
        }
    });
    
    client.socket.on('chat', function(msg) {
        GameLog("chat", msg);
        IO.emit('chat', { name: client.name, userId : client.userId, lv : client.level, msg : msg });
    });
    
    client.socket.on('roomChat', function(msg) {
        GameLog("roomChat", msg);
        if (typeof client.roomId === 'number') {
            IO.to("rm"+client.roomId).emit('roomChat', { name: client.name, userId : client.userId, msg : msg });
        }
    });    
}

ChatServer.prototype.DeleteClient = function(client) {
    //GameLog("send unReg");
    //client.socket.broadcast.emit('unReg', { name: client.name, userId : client.userId });
    
    
    if (typeof client.roomId === 'number') {
        var roomId = client.roomId;
        
        if (typeof rooms[roomId][client.userId] !== 'undefined') {
            delete rooms[roomId][client.userId];
            
            client.roomId = undefined;
            GameLog("离开:"+"rm"+roomId+" "+client.socket.id);
            client.socket.leave("rm"+client.roomId);
                
            var data = new Array();
            var entry;
            for (var key in rooms[roomId]) {
                if (typeof rooms[roomId][key] !== 'undefined') {
                    entry = rooms[roomId][key]
                    data.push({ name: entry.name, userId : entry.userId, lv : entry.level })
                }
            }
            IO.to("rm"+roomId).emit('userList', data);
        }
    }
}











