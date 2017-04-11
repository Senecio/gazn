// 18:30 2017/3/22
// create by lsh

(function() {

    var MesssgeHandler = { }

    MesssgeHandler.Add = function(handler) {
        if (typeof handler.interest === 'string' &&
            typeof handler.Process === 'function') {
            this[handler.interest] = handler.Process
            GameLog("Add handler : " + handler.interest);
        }
        else {
            GameLog("error type of handler" + handler);
        }
    }

    MesssgeHandler.Process = function(socket, msg) {
        if (typeof msg.type === 'string' && 
            typeof this[msg.type] === 'function') {
             this[msg.type](socket, msg);
        }else {
            GameLog("invalid massage ->>" + msg);
        }    
    }
    
    MesssgeHandler.ErrorResponse = function(socket, code, addon) {
        var entry = table.GetEntry('error', code);
        if (entry) {
            var obj = { type: 'error',  id : code };
            if (typeof addon !== 'undefined') {
                obj['addon'] = addon;
            }
            var msg = JSON.stringify(obj);
            socket.send(msg);
        }
        else {
            GameLog("invalid error id.");
        }
    }
    
    if(typeof module !== 'undefined')
        module.exports = MesssgeHandler;
})();
