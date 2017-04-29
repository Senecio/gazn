if(typeof module !== 'undefined')
    module.exports = Pet;

var MinuteToMicroSecond = 60000;
var HourToMinute = 60;

var updateSql = "UPDATE `farm_game` SET `pets`=? WHERE `userId`=?";
var selectSql = "SELECT `pets` FROM `farm_game` WHERE `userId`=?";

function Pet() {

}

// 添加
Pet.prototype.Add = function(userId, pedId, buyTime, validTime, callback)
{
    mysql.Query2(selectSql, [userId], function (results, fields) {
        if (results.length === 0) {
            if (callback) callback(false);
            return;
        }else {
            var pets = JSON.parse(results[0].pets);
            
            if (typeof pets.items === 'undefined') {
                pets.items = new Array();
                pets.activeId = pedId;
            }
            
            var pet, find = false;
            for (var i = 0; i < pets.items.length; ++i) {
                pet = pets.items[i];
                if (pet.id === pedId) {
                    if (Pet.prototype.IsValid(pet, buyTime)) {
                        pet.validTime += validTime;
                    }else {
                        pet.buyTime = buyTime;
                        pet.validTime = validTime;
                    }
                    find = true;
                    break;
                }
            }
            
            if (find === false) {
                var newPet = { id : pedId, buyTime : buyTime, validTime : validTime };
                pets.items.push(newPet);
            }
            
            // 更新数据
            var petsJson = JSON.stringify(pets);
            mysql.Query2(updateSql, [petsJson, userId], function(results, fields) { if (callback) callback(true); });
        }
    });
}

//激活
Pet.prototype.Active = function(userId, pedId, callback)
{
    mysql.Query2(selectSql, [userId], function (results, fields) {
        if (results.length === 0) {
            if (callback) callback(false);
            return;
        }else {
            var pets = JSON.parse(results[0].pets);
            
            if (typeof pets.items === 'undefined') {
                if (callback) callback(false);
                return;
            }
            
            var pet, find = false, now = (new Date()).getTime();;
            for (var i = 0; i < pets.items.length; ++i) {
                pet = pets.items[i];
                if (pet.id === pedId && Pet.prototype.IsValid(pet, now)) {
                    if (pets.activeId === pedId) { 
                        // 已经激活
                        if (callback) callback(true);
                        return;
                    }
                    
                    pets.activeId = pedId;
                    // 更新数据
                    var petsJson = JSON.stringify(pets);
                    mysql.Query2(updateSql, [petsJson, userId], function(results, fields) { if (callback) callback(true); });
                    return
                }
            }
            
            if (callback) callback(false);
        }
    });
}


// 宠物是否有效
Pet.prototype.IsValid = function(pet, nowTime) {
    if (pet.buyTime + pet.validTime > nowTime) {
        return true;
    }
    return false;
}
