// 数据表
; (function() {

    var Table = {
        // 错误表
        'error' : [
            { id : 1, description : "账号或密码错误!" },
            { id : 2, description : "此账号已经注册过了!" },
            { id : 3, description : "土地位尚未开垦!" },
            { id : 4, description : "土地并非空闲!" },
            { id : 5, description : "种子不足!" },
            { id : 6, description : "金币不足!" },
            { id : 7, description : "等级不足!" },
            { id : 8, description : "土地当前等级无法播种此种子!" },
            { id : 9, description : "土地扩建的数量不满足!" },
            { id : 10, description : "道具不足!" },
            { id : 11, description : "土地无法到达此等级!" },
            { id : 12, description : "土地还没有播种!" },
            { id : 13, description : "道具不足!" },
            { id : 14, description : "植物已经成熟!" },
            { id : 15, description : "道具类型必须是化肥!" },
            { id : 16, description : "只能每阶段施一次肥!" },
            { id : 17, description : "果实不足!"},
            { id : 18, description : "植物尚未发生灾害!" },
            { id : 19, description : "请求过于频繁!" }
        ],
        // 植物表
        'plant' : [
            { id : 1, name : "植物1", buy : 100, fruit : { name : "果实1", price : 20 }, output : 15, minLevel:1, time:{amount:600, part:[200,200,200]}, disasterId : 1, sowExp:20, harvestExp:100, clearExp:20},
            { id : 2, name : "植物2", buy : 120, fruit : { name : "果实2", price : 30 }, output : 15, minLevel:2, time:{amount:600, part:[200,200,200]}, disasterId : 1, sowExp:20, harvestExp:100, clearExp:20},
            { id : 3, name : "植物3", buy : 140, fruit : { name : "果实3", price : 40 }, output : 15, minLevel:3, time:{amount:600, part:[200,200,200]}, disasterId : 1, sowExp:20, harvestExp:100, clearExp:20},
            { id : 4, name : "植物4", buy : 160, fruit : { name : "果实4", price : 60 }, output : 15, minLevel:4, time:{amount:660, part:[200,260,200]}, disasterId : 1, sowExp:2, harvestExp:12, clearExp:2},
            { id : 5, name : "植物5", buy : 180, fruit : { name : "果实5", price : 80 }, output : 15, minLevel:5, time:{amount:660, part:[200,260,200]}, disasterId : 1, sowExp:2, harvestExp:12, clearExp:2},
            { id : 6, name : "植物6", buy : 200, fruit : { name : "果实6", price : 100 }, output : 15, minLevel:6, time:{amount:660, part:[200,260,200]}, disasterId : 1, sowExp:2, harvestExp:12, clearExp:2},
            { id : 7, name : "植物7", buy : 220, fruit : { name : "果实7", price : 120 }, output : 15, minLevel:7, time:{amount:720, part:[200,260,260]}, disasterId : 1, sowExp:2, harvestExp:14, clearExp:2},
            { id : 8, name : "植物8", buy : 240, fruit : { name : "果实8", price : 140 }, output : 15, minLevel:8, time:{amount:720, part:[200,260,260]}, disasterId : 1, sowExp:2, harvestExp:14, clearExp:2},
            { id : 9, name : "植物9", buy : 260, fruit : { name : "果实9", price : 160 }, output : 15, minLevel:9, time:{amount:720, part:[200,260,260]}, disasterId : 1, sowExp:2, harvestExp:14, clearExp:2},
            { id : 10, name : "植物10", buy : 280, fruit : { name : "果实10", price : 180 }, output : 20, minLevel:10, time:{amount:780, part:[260,260,260]}, disasterId : 1, sowExp:2, harvestExp:16, clearExp:2},
            { id : 11, name : "植物11", buy : 300, fruit : { name : "果实11", price : 200 }, output : 20, minLevel:11, time:{amount:780, part:[260,260,260]}, disasterId : 1, sowExp:2, harvestExp:16, clearExp:2},
            { id : 12, name : "植物12", buy : 320, fruit : { name : "果实12", price : 220 }, output : 20, minLevel:12, time:{amount:780, part:[260,260,260]}, disasterId : 1, sowExp:2, harvestExp:16, clearExp:2},
            { id : 13, name : "植物13", buy : 340, fruit : { name : "果实13", price : 240 }, output : 20, minLevel:13, time:{amount:900, part:[300,300,300]}, disasterId : 1, sowExp:3, harvestExp:16, clearExp:2},
            { id : 14, name : "植物14", buy : 360, fruit : { name : "果实14", price : 260 }, output : 20, minLevel:14, time:{amount:900, part:[300,300,300]}, disasterId : 1, sowExp:3, harvestExp:16, clearExp:2},
            { id : 15, name : "植物15", buy : 380, fruit : { name : "果实15", price : 270 }, output : 20, minLevel:15, time:{amount:900, part:[300,300,300]}, disasterId : 1, sowExp:3, harvestExp:16, clearExp:2},
            { id : 16, name : "植物16", buy : 400, fruit : { name : "果实16", price : 280 }, output : 20, minLevel:16, time:{amount:1440, part:[480,480,480]}, disasterId : 1, sowExp:3, harvestExp:18, clearExp:2},
            { id : 17, name : "植物17", buy : 420, fruit : { name : "果实17", price : 290 }, output : 20, minLevel:17, time:{amount:1440, part:[480,480,480]}, disasterId : 1, sowExp:3, harvestExp:18, clearExp:2},
            { id : 18, name : "植物18", buy : 440, fruit : { name : "果实18", price : 300 }, output : 20, minLevel:18, time:{amount:1440, part:[480,480,480]}, disasterId : 1, sowExp:3, harvestExp:18, clearExp:2}
        ],
        // 道具
        'property' : [
            { id : 1, name : "化肥1", type : 1, data : 120, desc : "每个阶段使用1次,减少2小时成熟时间", buy : 1000 },
            { id : 2, name : "化肥2", type : 1, data : 180, desc : "每个阶段使用1次,减少3小时成熟时间", buy : 1500 },
            { id : 3, name : "化肥3", type : 2, data : 120, desc : "每个阶段可多次使用,减少2小时成熟时间", buy : 2000 },
            { id : 4, name : "化肥4", type : 2, data : 180, desc : "每个阶段可多次使用,减少3小时成熟时间", buy : 3000 },
            { id : 6, name : "1级营养液", type : 3, data : 0, desc : "升级2等级土地时使用", buy : 10 },
            { id : 7, name : "2级营养液", type : 3, data : 0, desc : "升级3等级土地时使用", buy : 10 },
            { id : 8, name : "3级营养液", type : 3, data : 0, desc : "升级4等级土地时使用", buy : 10 },
            { id : 9, name : "4级营养液", type : 3, data : 0, desc : "升级5等级土地时使用", buy : 10 },
            { id : 10, name : "5级营养液", type : 3, data : 0, desc : "升级6等级土地时使用", buy : 10 }
        ],
        // 土地等级表
        'landsLevel' : [
            { id : 1, name : "1等级土地", canSow: [1,2,3] },
            { id : 2, name : "2等级土地", canSow: [4,5,6], minLevel : 10, landsNumber : 3, needMoney : 10000, propertyId : 6, propertyNumber : 1 },
            { id : 3, name : "3等级土地", canSow: [7,8,9], minLevel : 15, landsNumber : 5, needMoney : 20000, propertyId : 7, propertyNumber : 1 },
            { id : 4, name : "4等级土地", canSow: [10,11,12], minLevel : 20, landsNumber : 7, needMoney : 40000, propertyId : 8, propertyNumber : 1 },
            { id : 5, name : "5等级土地", canSow: [13,14,15], minLevel : 25, landsNumber : 9, needMoney : 60000, propertyId : 9, propertyNumber : 1 },
            { id : 6, name : "6等级土地", canSow: [16,17,18], minLevel : 30, landsNumber : 12, needMoney : 80000, propertyId : 10, propertyNumber : 1 }
        ],
        //  土地解锁表
        'unlockLands' : [
            { id : 1, needMoney : [1000,2000,3000,4000,5000,6000,7000,8000,9000,10000,11000,12000], minLevel : [1,2,3,4,5,6,7,8,9,10,11,12] }
        ],
        // 商店
        'shop' : [
            { id : 1, name :"种子", sell:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
            { id : 2, name :"道具", sell:[1,2,3,4,6,7,8,9,10]},
            { id : 3, name :"装饰", sell:[]}
        ],
        // 灾害  effect1 出虫(每小时减少收成的x%)  effect2  缺水(每小时增加x分钟的时间) effect 营养流失(前面两种效果叠加)
        'disaster' : [
            { id : 1, percent : 1.0, cd : 480, effect1 : 0.1, maxEffect1 : 0.5, effect2 : 10, maxEffect2 : 0.3, chanceWeight:[1,100,1], addExp : 2 },
            { id : 1, percent : 0.1, cd : 280, effect1 : 0.1, maxEffect1 : 0.5, effect2 : 1, maxEffect2 : 0.3, chanceWeight:[1,2,1], addExp : 2 }
        ],
        
        GetEntry : function(tableName, id)
        {
            if (typeof(this[tableName]) !== 'undefined') {
                return this[tableName][id-1];
            }
            return null;
        },
        
        ChanceByWeightArray : function(weightArray) {
            var j, rand, chance = 0;
            for (j = 0; j < weightArray.length; ++j) {
                chance += weightArray[j];
            }

            rand = Math.random() * chance;
            GameLog(rand, weightArray, chance);
            for (j = 0; j < weightArray.length; ++j) {
                if (rand <= weightArray[j]) {
                    return j;
                }
                rand -= weightArray[j];
            }

            return -1;
        }
    }
    
    if(typeof module !== 'undefined')
        module.exports = Table;
    
    if(typeof window !== 'undefined')
        window.Table = Table;

})();

