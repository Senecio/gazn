// 数据表
// modify by zyx
// modify by wyx
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
            { id : 19, description : "请求过于频繁!" },
            { id : 20, description : "尚未成为好友!" },
            { id : 21, description : "已经成为好友!" },
            { id : 22, description : "手下留情吧,已无可偷取!" },
            { id : 23, description : "手下留情吧,劳动光荣!" }
        ],
        // 植物表
        'plant' : [
            { id : 1, name : "百合", buy : 50, fruit : { name : "百合", price : 1 }, output : 100, minLevel:1, time:{amount:30, part:[10,10,10],images:["zhongZi","1_2","1_3","canliu"]}, disasterId : 1, sowExp:50, harvestExp:100, clearExp:50},
            { id : 2, name : "当归", buy : 100, fruit : { name : "当归", price : 2 }, output : 100, minLevel:5, time:{amount:60, part:[20,20,20],images:["zhongZi","2_2","2_3","canliu"]}, disasterId : 1, sowExp:50, harvestExp:105, clearExp:50},
            { id : 3, name : "枸杞", buy : 150, fruit : { name : "枸杞", price : 3 }, output : 100, minLevel:9, time:{amount:90, part:[30,30,30],images:["zhongZi","3_2","3_3","canliu"]}, disasterId : 1, sowExp:50, harvestExp:110, clearExp:50},
            { id : 4, name : "红参", buy : 200, fruit : { name : "红参", price : 4 }, output : 100, minLevel:12, time:{amount:120, part:[40,40,40],images:["zhongZi","4_2","4_3","canliu"]}, disasterId : 1, sowExp:100, harvestExp:100, clearExp:100},
            { id : 5, name : "红枣", buy : 250, fruit : { name : "红枣", price : 5 }, output : 100, minLevel:16, time:{amount:150, part:[50,50,500],images:["zhongZi","5_2","5_3","canliu"]}, disasterId : 1, sowExp:100, harvestExp:125, clearExp:100},
            { id : 6, name : "灵芝", buy : 300, fruit : { name : "灵芝", price : 6 }, output : 100, minLevel:20, time:{amount:180, part:[60,60,60],images:["zhongZi","6_2","6_3","canliu"]}, disasterId : 1, sowExp:100, harvestExp:150, clearExp:100},
            { id : 7, name : "人参", buy : 350, fruit : { name : "人参", price : 7 }, output : 100, minLevel:23, time:{amount:210, part:[70,70,70],images:["zhongZi","7_2","7_3","canliu"]}, disasterId : 1, sowExp:100, harvestExp:200, clearExp:100},
            { id : 8, name : "沙参", buy : 400, fruit : { name : "沙参", price : 8 }, output : 100, minLevel:27, time:{amount:240, part:[80,80,80],images:["zhongZi","8_2","8_3","canliu"]}, disasterId : 1, sowExp:100, harvestExp:225, clearExp:100},
            { id : 9, name : "铁皮石斛", buy : 450, fruit : { name : "铁皮石斛", price : 9 }, output : 100, minLevel:31, time:{amount:270, part:[90,90,90],images:["zhongZi","9_2","9_3","canliu"]}, disasterId : 1, sowExp:100, harvestExp:250, clearExp:100},
            { id : 10, name : "玉竹", buy : 500, fruit : { name : "玉竹", price : 10 }, output : 100, minLevel:34, time:{amount:300, part:[100,100,100],images:["zhongZi","10_2","10_3","canliu"]}, disasterId : 1, sowExp:100, harvestExp:300, clearExp:100},
            { id : 11, name : "党参", buy : 550, fruit : { name : "党参", price : 11 }, output : 100, minLevel:38, time:{amount:330, part:[110,110,110],images:["zhongZi","11_2","11_3","canliu"]}, disasterId : 1, sowExp:100, harvestExp:350, clearExp:100},
            { id : 12, name : "黄芪", buy : 600, fruit : { name : "黄芪", price : 12 }, output : 100, minLevel:42, time:{amount:360, part:[120,120,120],images:["zhongZi","12_2","12_3","canliu"]}, disasterId : 1, sowExp:100, harvestExp:400, clearExp:100},
            { id : 13, name : "莲子", buy : 650, fruit : { name : "莲子", price : 13 }, output : 100, minLevel:45, time:{amount:390, part:[130,130,130],images:["zhongZi","13_2","13_3","canliu"]}, disasterId : 1, sowExp:100, harvestExp:450, clearExp:100},
            { id : 14, name : "玫瑰", buy : 700, fruit : { name : "玫瑰", price : 14 }, output : 100, minLevel:49, time:{amount:420, part:[140,140,140],images:["zhongZi","14_2","14_3","canliu"]}, disasterId : 1, sowExp:100, harvestExp:500, clearExp:100},
            { id : 15, name : "牛大力", buy : 750, fruit : { name : "牛大力", price : 15 }, output : 100, minLevel:53, time:{amount:450, part:[150,150,150],images:["zhongZi","15_2","15_3","canliu"]}, disasterId : 1, sowExp:100, harvestExp:550, clearExp:100},
            { id : 16, name : "山药", buy : 800, fruit : { name : "山药", price : 16 }, output : 100, minLevel:56, time:{amount:480, part:[160,160,160],images:["zhongZi","16_2","16_3","canliu"]}, disasterId : 1, sowExp:100, harvestExp:600, clearExp:100},
            { id : 17, name : "五指毛桃", buy : 850, fruit : { name : "五指毛桃", price : 17 }, output : 100, minLevel:60, time:{amount:600, part:[200,200,200],images:["zhongZi","17_2","17_3","canliu"]}, disasterId : 1, sowExp:100, harvestExp:650, clearExp:100},
        ],
        // 道具
        'property' : [
            { id : 1, name : "化肥1", type : 2, data : 10, desc : "减少10分钟成熟时间", buy : 1000, imagPath : "prop/huafei_1"},
            { id : 2, name : "化肥2", type : 2, data : 180, desc : "每个阶段使用1次,减少3小时成熟时间", buy : 1500, imagPath : "prop/huafei_2"},
            { id : 3, name : "化肥3", type : 2, data : 120, desc : "每个阶段可多次使用,减少2小时成熟时间", buy : 2000, imagPath : "prop/huafei_3"},
            { id : 4, name : "化肥4", type : 2, data : 180, desc : "每个阶段可多次使用,减少3小时成熟时间", buy : 3000, imagPath : "prop/huafei_10"},
            { id : 6, name : "1级营养液", type : 3, data : 0, desc : "升级2等级土地时使用", buy : 1000, imagPath : "prop/yingyangye"},
            { id : 7, name : "2级营养液", type : 3, data : 0, desc : "升级3等级土地时使用", buy : 5000, imagPath : "prop/yingyangye"},
            { id : 8, name : "3级营养液", type : 3, data : 0, desc : "升级4等级土地时使用", buy : 10000, imagPath : "prop/yingyangye"},
            { id : 9, name : "4级营养液", type : 3, data : 0, desc : "升级5等级土地时使用", buy : 15000, imagPath : "prop/yingyangye"},
            { id : 10, name : "5级营养液", type : 3, data : 0, desc : "升级6等级土地时使用", buy : 20000, imagPath : "prop/yingyangye"}
        ],
		//宠物
		'pet' : [
			{id : 1, name : "宠物1", buy : [500,1500,3000], data : [0.3,0.1], desc : "宠物功能说明1", headImagPath : "pet/petHead_1", imagPath : "pet/pet_1"},
			{id : 2, name : "宠物2", buy : [600,1800,3600], data : [0.4,0.12], desc : "宠物功能说明2", headImagPath : "pet/petHead_1", imagPath : "pet/pet_1"},
			{id : 3, name : "宠物3", buy : [700,2100,4200], data : [0.5,0.14], desc : "宠物功能说明3", headImagPath : "pet/petHead_1", imagPath : "pet/pet_1"},
			{id : 4, name : "宠物4", buy : [800,2400,4800], data : [0.6,0.16], desc : "宠物功能说明4", headImagPath : "pet/petHead_1", imagPath : "pet/pet_1"},
			{id : 5, name : "宠物5", buy : [900,2700,5400], data : [0.7,0.18], desc : "宠物功能说明5", headImagPath : "pet/petHead_1", imagPath : "pet/pet_1"},
			{id : 6, name : "宠物6", buy : [1000,3000,6000], data : [0.8,0.2], desc : "宠物功能说明6", headImagPath : "pet/petHead_1", imagPath : "pet/pet_1"},
			{id : 7, name : "宠物7", buy : [1100,3300,6600], data : [0.9,0.22], desc : "宠物功能说明7", headImagPath : "pet/petHead_1", imagPath : "pet/pet_1"}
		],
        // 土地等级表
        'landsLevel' : [
            { id : 1, name : "1等级土地", canSow: [1,2,3] },
            { id : 2, name : "2等级土地", canSow: [4,5,6], minLevel : 12, landsNumber : 3, needMoney : 4800, propertyId : 6, propertyNumber : 10 },
            { id : 3, name : "3等级土地", canSow: [7,8,9], minLevel : 23, landsNumber : 5, needMoney : 7800, propertyId : 7, propertyNumber : 10 },
            { id : 4, name : "4等级土地", canSow: [10,11,12], minLevel : 34, landsNumber : 7, needMoney : 12800, propertyId : 8, propertyNumber : 10 },
            { id : 5, name : "5等级土地", canSow: [13,14,15], minLevel : 45, landsNumber : 9, needMoney : 18000, propertyId : 9, propertyNumber : 10 },
            { id : 6, name : "6等级土地", canSow: [16,17,18], minLevel : 56, landsNumber : 12, needMoney : 23000, propertyId : 10, propertyNumber : 10 }
        ],
        //  土地解锁表
        'unlockLands' : [
            { id : 1, needMoney : [1000,150,300,450,600,1200,1600,2000,2700,4800,5200,5500], minLevel : [1,2,3,4,5,6,7,8,9,10,11,12] }
        ],
        // 商店
        'shop' : [
            { id : 1, name :"种子", sell:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
            { id : 2, name :"道具", sell:[1,2,3,4,6,7,8,9,10]},
            { id : 3, name :"宠物", sell:[1,2,3,4,6,7]}
        ],
        // 灾害  effect1 出虫(每小时减少收成的x%)  effect2  缺水(每小时增加x分钟的时间) effect 营养流失(前面两种效果叠加)
        'disaster' : [
            { id : 1, percent : 1.0, cd : 1, effect1 : 0.1, maxEffect1 : 0.5, effect2 : 10, maxEffect2 : 0.3, chanceWeight:[1,1,1], addExp : 20 },
            { id : 2, percent : 0.1, cd : 280, effect1 : 0.1, maxEffect1 : 0.5, effect2 : 1, maxEffect2 : 0.3, chanceWeight:[1,1,1], addExp : 2 }
        ],
        
        GetEntry : function(tableName, id)
        {
            if (typeof(this[tableName]) !== 'undefined') {
                if (typeof this[tableName][id-1] !== 'undefined' &&
                    this[tableName][id-1].id === id) {
                    return this[tableName][id-1];
                }
                
                for (var i = 0; i < this[tableName].length; ++i) {
                    if (this[tableName][i].id === id) {
                        return this[tableName][i];
                    }
                }
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

