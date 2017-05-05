if(typeof module !== 'undefined')
    module.exports = Package;

var updateSql = "UPDATE `farm_game` SET `package`=? where `userId`=?";
    
function Package() {

}

Package.prototype.InitForNewUser = function(userId, callback) {
    var items = '[{ "1" : 10, "2" : 10, "3" : 10 },{}, {}]';
    mysql.Query2(updateSql, [items, userId], function (results, fields) {
        if (callback) callback(true);
    });
}

// 添加新物品
Package.prototype.AddNewItem = function(userId, kinds, itemId, number, callback) {
    var cmd = "SELECT `package`  FROM `farm_game` WHERE `userId`=?";
    mysql.Query2(cmd, [userId], function (results, fields) {
        if (results.length === 0) {
            if (callback) callback(false);
            return;
        }else {
            var items = JSON.parse(results[0].package);
            if (typeof items[kinds][itemId] === 'undefined') {
                items[kinds][itemId] = number;
            }
            else {
                items[kinds][itemId] += number;
            }
            // 更新数据
            var itemsJson = JSON.stringify(items);
            mysql.Query2(updateSql, [itemsJson, userId], function(results, fields) { if (callback) callback(true); });
        }
    });
}

// 使用物品
Package.prototype.UseItem = function(userId, kinds, itemId, number, callback) {
    var cmd = "SELECT `package`  FROM `farm_game` WHERE `userId`=?";
    mysql.Query2(cmd, [userId], function (results, fields) {
        if (results.length === 0) {
            if (callback) callback(false);
            return;
        }else {
            var items = JSON.parse(results[0].package);
            if (typeof items[kinds][itemId] !== 'undefined') {
                if (items[kinds][itemId] > number) {
                    items[kinds][itemId] -= number;
                }else {
                    items[kinds][itemId] = 0;
                }
                // 更新数据
                var itemsJson = JSON.stringify(items);
                mysql.Query2(updateSql, [itemsJson, userId], function(results, fields) { if (callback) callback(true); });
            }
        }
    });
}


// 使用物品
Package.prototype.Update = function(userId, package, callback) {
    // 更新数据
    var packageJson = JSON.stringify(package);
    mysql.Query2(updateSql, [packageJson, userId], function(results, fields) { if (callback) callback(true); });
}
