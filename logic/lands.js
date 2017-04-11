if(typeof module !== 'undefined')
    module.exports = Lands;
    
var updateSql = "UPDATE `farm_game` set `lands`=? where `userId`=?";
var selectSql = "SELECT `lands` FROM `farm_game` WHERE `userId`=?";

function Lands() {

}

// ʱ����Բ���
Lands.prototype.CanSowSeed = function(landsLevel, seedId) {
    var landsTab = table['landsLevel'];
    for (var i = 0; i < landsLevel && i < 6; ++i) {
        for (var j = 0; j < landsTab[i].canSow.length; ++j) {
            if (landsTab[i].canSow[j] === seedId)
                return true;
        }
    }
    return false;
}

Lands.prototype.enum_landsState_idle = 0;
Lands.prototype.enum_landsState_grow = 1;
Lands.prototype.enum_landsState_mature = 2;
Lands.prototype.eunm_landsState_harvested = 3;

// state : ״̬  0����,1��ֲ,2���ո�
// seedId : ũ����
// sowTime : ����ʱ��
// reduceTime[,,] : ����ʱ�� 

// ��ʼ��Ϊ���û�
Lands.prototype.InitForNewUser = function(userId, callback) {
    var cmd = "UPDATE `farm_game` set `lands`=? , `landsLevel`=? where `userId`=?";
    var items = '[{"state":0, "seedId":0, "sowTime":0 }]';
    var level = 1;
    mysql.Query2(cmd, [items, level, userId], function (results, fields) {
        if (callback) callback(true);
    });
}

// ����
Lands.prototype.SowSeeds = function(userId, landIndex, seedId, callback) {
    mysql.Query2(selectSql, [userId], function (results, fields) {
        if (results.length === 0) {
            if (callback) callback(false);
            return;
        }else {
            var lands = JSON.parse(results[0].lands);
            var land = lands[landIndex];
            land.state = 1;
            land.seedId = seedId;
            land.sowTime = (new Date()).getTime();
            // ��������
            var landsJson = JSON.stringify(lands);
            mysql.Query2(updateSql, [landsJson, userId], function(results, fields) { if (callback) callback(true); });
        }
    });
}

// �ջ�
Lands.prototype.Harvest = function(userId, landIndex, callback) {
    mysql.Query2(selectSql, [userId], function (results, fields) {
        if (results.length === 0) {
            if (callback) callback(false);
            return;
        }else {
            var lands = JSON.parse(results[0].lands);
            var land = lands[landIndex];
            land.state = 2;
            // ��������
            var landsJson = JSON.stringify(lands);
            mysql.Query2(updateSql, [landsJson, userId], function(results, fields) { if (callback) callback(true); });
        }
    });
}

// ʩ��
Lands.prototype.Manure = function(userId, landIndex, reduceTime, callback) {
    mysql.Query2(selectSql, [userId], function (results, fields) {
        if (results.length === 0) {
            if (callback) callback(false);
            return;
        }else {
            var lands = JSON.parse(results[0].lands);
            var land = lands[landIndex];
            land['reduceTime'] = reduceTime;
            // ��������
            var landsJson = JSON.stringify(lands);
            mysql.Query2(updateSql, [landsJson, userId], function(results, fields) { if (callback) callback(true); });
        }
    });
}

// ����
Lands.prototype.Reset = function(userId, landIndex, callback) {
    mysql.Query2(selectSql, [userId], function (results, fields) {
        if (results.length === 0) {
            if (callback) callback(false);
            return;
        }else {
            var lands = JSON.parse(results[0].lands);
            var land = lands[landIndex];
            land.state = 0;
            land.seedId = 0;
            land.sowTime = 0;
            delete land.reduceTime;
            // ��������
            var landsJson = JSON.stringify(lands);
            mysql.Query2(updateSql, [landsJson, userId], function(results, fields) { if (callback) callback(true); });
        }
    });
}

//  ���ؽ���
Lands.prototype.Unlock = function(userId, landIndex, callback) {
    mysql.Query2(selectSql, [userId], function (results, fields) {
        if (results.length === 0) {
            if (callback) callback(false);
            return;
        }else {
            var lands = JSON.parse(results[0].lands);
            lands[landIndex] = {"state":0, "seedId":0, "sowTime":0 };
            // ��������
            var landsJson = JSON.stringify(lands);
            mysql.Query2(updateSql, [landsJson, userId], function(results, fields) { if (callback) callback(true); });
        }
    });
}

//  ��������
Lands.prototype.Upgrade = function(userId, landsLevel, callback) {
    var cmd = "UPDATE `farm_game` set `landsLevel`=? where `userId`=?";
    mysql.Query2(selectSql, [landsLevel , userId], function (results, fields) {
        if (callback) callback(true);
    });
}