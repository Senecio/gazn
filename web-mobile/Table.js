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
            { id : 23, description : "手下留情吧,劳动光荣!" },
            { id : 24, description : "宠物尚未获得!" },
            { id : 25, description : "材料不足,合成道具失败!" }
        ],
        // 植物表
        'plant' : [
            { id : 1, name : "百合", buy : 50, sellPrice : 25, fruit : { name : "百合", price : 1 }, output : 100, minLevel:1, time:{amount:30, part:[10,10,10],images:["zhongZi","youmiao","1_2","1_3","canliu"]}, headImagPath : "plant/1_2", disasterId : 1, sowExp:50, harvestExp:100, clearExp:50},
            { id : 2, name : "当归", buy : 100, sellPrice : 50, fruit : { name : "当归", price : 2 }, output : 100, minLevel:5, time:{amount:60, part:[20,20,20],images:["zhongZi","youmiao","2_2","2_3","canliu"]}, headImagPath : "plant/2_2", disasterId : 1, sowExp:50, harvestExp:105, clearExp:50},
            { id : 3, name : "枸杞", buy : 150, sellPrice : 75, fruit : { name : "枸杞", price : 3 }, output : 100, minLevel:9, time:{amount:90, part:[30,30,30],images:["zhongZi","youmiao","3_2","3_3","canliu"]}, headImagPath : "plant/3_2", disasterId : 1, sowExp:50, harvestExp:110, clearExp:50},
            { id : 4, name : "红参", buy : 160, sellPrice : 80, fruit : { name : "红参", price : 60 }, output : 15, minLevel:4, time:{amount:660, part:[200,260,200],images:["zhongZi","youmiao","4_2","4_3","canliu"]}, headImagPath : "plant/4_2", disasterId : 1, sowExp:2, harvestExp:12, clearExp:2},
            { id : 5, name : "红枣", buy : 180, sellPrice : 90, fruit : { name : "红枣", price : 80 }, output : 15, minLevel:5, time:{amount:660, part:[200,260,200],images:["zhongZi","youmiao","5_2","5_3","canliu"]}, headImagPath : "plant/5_2", disasterId : 1, sowExp:2, harvestExp:12, clearExp:2},
            { id : 6, name : "灵芝", buy : 200, sellPrice : 100, fruit : { name : "灵芝", price : 100 }, output : 15, minLevel:6, time:{amount:660, part:[200,260,200],images:["zhongZi","youmiao","6_2","6_3","canliu"]}, headImagPath : "plant/6_2", disasterId : 1, sowExp:2, harvestExp:12, clearExp:2},
            { id : 7, name : "人参", buy : 220, sellPrice : 110, fruit : { name : "人参", price : 120 }, output : 15, minLevel:7, time:{amount:720, part:[200,260,260],images:["zhongZi","youmiao","7_2","7_3","canliu"]}, headImagPath : "plant/7_2", disasterId : 1, sowExp:2, harvestExp:14, clearExp:2},
            { id : 8, name : "沙参", buy : 240, sellPrice : 120, fruit : { name : "沙参", price : 140 }, output : 15, minLevel:8, time:{amount:720, part:[200,260,260],images:["zhongZi","youmiao","8_2","8_3","canliu"]}, headImagPath : "plant/8_2", disasterId : 1, sowExp:2, harvestExp:14, clearExp:2},
            { id : 9, name : "铁皮石斛", buy : 260, sellPrice : 130, fruit : { name : "铁皮石斛", price : 160 }, output : 15, minLevel:9, time:{amount:720, part:[200,260,260],images:["zhongZi","youmiao","9_2","9_3","canliu"]}, headImagPath : "plant/9_2", disasterId : 1, sowExp:2, harvestExp:14, clearExp:2},
            { id : 10, name : "玉竹", buy : 280, sellPrice : 140, fruit : { name : "玉竹", price : 180 }, output : 20, minLevel:10, time:{amount:780, part:[260,260,260],images:["zhongZi","10_2","youmiao","10_3","canliu"]}, headImagPath : "plant/10_2", disasterId : 1, sowExp:2, harvestExp:16, clearExp:2},
            { id : 11, name : "党参", buy : 300, sellPrice : 150, fruit : { name : "党参", price : 200 }, output : 20, minLevel:11, time:{amount:780, part:[260,260,260],images:["zhongZi","11_2","youmiao","11_3","canliu"]}, headImagPath : "plant/11_2", disasterId : 1, sowExp:2, harvestExp:16, clearExp:2},
            { id : 12, name : "黄芪", buy : 320, sellPrice : 160, fruit : { name : "黄芪", price : 220 }, output : 20, minLevel:12, time:{amount:780, part:[260,260,260],images:["zhongZi","12_2","youmiao","12_3","canliu"]}, headImagPath : "plant/12_2", disasterId : 1, sowExp:2, harvestExp:16, clearExp:2},
            { id : 13, name : "莲子", buy : 340, sellPrice : 170, fruit : { name : "莲子", price : 240 }, output : 20, minLevel:13, time:{amount:900, part:[300,300,300],images:["zhongZi","13_2","youmiao","13_3","canliu"]}, headImagPath : "plant/13_2", disasterId : 1, sowExp:3, harvestExp:16, clearExp:2},
            { id : 14, name : "玫瑰", buy : 360, sellPrice : 180, fruit : { name : "玫瑰", price : 260 }, output : 20, minLevel:14, time:{amount:900, part:[300,300,300],images:["zhongZi","14_2","youmiao","14_3","canliu"]}, headImagPath : "plant/14_2", disasterId : 1, sowExp:3, harvestExp:16, clearExp:2},
            { id : 15, name : "牛大力", buy : 380, sellPrice : 190, fruit : { name : "牛大力", price : 270 }, output : 20, minLevel:15, time:{amount:900, part:[300,300,300],images:["zhongZi","youmiao","15_2","15_3","canliu"]}, headImagPath : "plant/15_2", disasterId : 1, sowExp:3, harvestExp:16, clearExp:2},
            { id : 16, name : "山药", buy : 400, sellPrice : 200, fruit : { name : "山药", price : 280 }, output : 20, minLevel:16, time:{amount:1440, part:[480,480,480],images:["zhongZi","youmiao","16_2","16_3","canliu"]}, headImagPath : "plant/16_2", disasterId : 1, sowExp:3, harvestExp:18, clearExp:2},
            { id : 17, name : "五指毛桃", buy : 420, sellPrice : 210, fruit : { name : "五指毛桃", price : 290 }, output : 20, minLevel:17, time:{amount:1440, part:[480,480,480],images:["zhongZi","17_2","17_3","canliu"]}, headImagPath : "plant/17_2", disasterId : 1, sowExp:3, harvestExp:18, clearExp:2},
            { id : 18, name : "植物18", buy : 440, sellPrice : 220, fruit : { name : "果实18", price : 300 }, output : 20, minLevel:18, time:{amount:1440, part:[480,480,480],images:["zhongZi","youmiao","11_2","11_3","canliu"]}, headImagPath : "plant/11_2", disasterId : 1, sowExp:3, harvestExp:18, clearExp:2}
        ],
        // 道具
        'property' : [
            { id : 1, name : "化肥1", type : 1, data : 120, desc : "每个阶段使用1次,减少2小时成熟时间", buy : 1000, imagPath : "prop/huafei_1"},
            { id : 2, name : "化肥2", type : 1, data : 180, desc : "每个阶段使用1次,减少3小时成熟时间", buy : 1500, imagPath : "prop/huafei_2"},
            { id : 3, name : "化肥3", type : 2, data : 120, desc : "每个阶段可多次使用,减少2小时成熟时间", buy : 2000, imagPath : "prop/huafei_3"},
            { id : 4, name : "化肥4", type : 2, data : 180, desc : "每个阶段可多次使用,减少3小时成熟时间", buy : 3000, imagPath : "prop/huafei_10"},
            { id : 6, name : "1级营养液", type : 3, data : 0, desc : "升级2等级土地时使用", buy : 10, imagPath : "prop/yingyangye"},
            { id : 7, name : "2级营养液", type : 3, data : 0, desc : "升级3等级土地时使用", buy : 10, imagPath : "prop/yingyangye"},
            { id : 8, name : "3级营养液", type : 3, data : 0, desc : "升级4等级土地时使用", buy : 10, imagPath : "prop/yingyangye"},
            { id : 9, name : "4级营养液", type : 3, data : 0, desc : "升级5等级土地时使用", buy : 10, imagPath : "prop/yingyangye"},
            { id : 10, name : "5级营养液", type : 3, data : 0, desc : "升级6等级土地时使用", buy : 10, imagPath : "prop/yingyangye"}
        ],
        //宠物
        'pet' : [
            {id : 1, name : "宠物1", data : [0.3,0.1], desc : "宠物功能说明1", time : {day : [7, 30, 90], money:[500,1500,3000]}, headImagPath : "pet/petHead_1", imagPath : "pet/pet_1"},
            {id : 2, name : "宠物2", data : [0.4,0.12], desc : "宠物功能说明2", time : {day : [7, 30, 90], money:[600,1800,3600]}, headImagPath : "pet/petHead_1", imagPath : "pet/pet_1"},
            {id : 3, name : "宠物3", data : [0.5,0.14], desc : "宠物功能说明3", time : {day : [7, 30, 90], money:[700,2100,4200]}, headImagPath : "pet/petHead_1", imagPath : "pet/pet_1"},
            {id : 4, name : "宠物4", data : [0.6,0.16], desc : "宠物功能说明4", time : {day : [7, 30, 90], money:[800,2400,4800]}, headImagPath : "pet/petHead_1", imagPath : "pet/pet_1"},
            {id : 5, name : "宠物5", data : [0.7,0.18], desc : "宠物功能说明5", time : {day : [7, 30, 90], money:[900,2700,5400]}, headImagPath : "pet/petHead_1", imagPath : "pet/pet_1"},
            {id : 6, name : "宠物6", data : [0.8,0.2], desc : "宠物功能说明6", time : {day : [7, 30, 90], money:[1000,3000,6000]}, headImagPath : "pet/petHead_1", imagPath : "pet/pet_1"},
            {id : 7, name : "宠物7", data : [0.9,0.22], desc : "宠物功能说明7", time : {day : [7, 30, 90], money:[1100,3300,6600]}, headImagPath : "pet/petHead_1", imagPath : "pet/pet_1"}
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
        
		//合成道具
		'hechengProp' : [
			{id : 1, name : "道具名称1", headImagPath : "hecheng/hechengHead_1", imagPath : "hecheng/hechengProp_1", money : 1000, cailiao : [{id : 1, count : 30}, {id : 2, count : 30},{id : 3, count : 30}]},
			{id : 2, name : "道具名称2", headImagPath : "hecheng/hechengHead_1", imagPath : "hecheng/hechengProp_1", money : 1000, cailiao : [{id : 1, count : 30}, {id : 2, count : 30},{id : 3, count : 30}]},
			{id : 3, name : "道具名称3", headImagPath : "hecheng/hechengHead_1", imagPath : "hecheng/hechengProp_1", money : 1000, cailiao : [{id : 1, count : 30}, {id : 2, count : 30},{id : 3, count : 30}]},
			{id : 4, name : "道具名称4", headImagPath : "hecheng/hechengHead_1", imagPath : "hecheng/hechengProp_1", money : 1000, cailiao : [{id : 1, count : 30}, {id : 2, count : 30},{id : 3, count : 30}]},
			{id : 5, name : "道具名称5", headImagPath : "hecheng/hechengHead_1", imagPath : "hecheng/hechengProp_1", money : 1000, cailiao : [{id : 1, count : 30}, {id : 2, count : 30},{id : 3, count : 30}]},
			{id : 6, name : "道具名称6", headImagPath : "hecheng/hechengHead_1", imagPath : "hecheng/hechengProp_1", money : 1000, cailiao : [{id : 1, count : 30}, {id : 2, count : 30},{id : 3, count : 30}]},
			{id : 7, name : "道具名称7", headImagPath : "hecheng/hechengHead_1", imagPath : "hecheng/hechengProp_1", money : 1000, cailiao : [{id : 1, count : 30}, {id : 2, count : 30},{id : 3, count : 30}]}
		],
		
		//兑换商品
		'duihuanshop' : [
			{id : 1, name : "商品名称1", imagPath : "duihuan/duiHuanProp_1", desc : "商品说明1", duihuanProp : [{id : 1, count : 50},{id : 2, count : 50},{id : 3, count : 50}]},
			{id : 2, name : "商品名称2", imagPath : "duihuan/duiHuanProp_1", desc : "商品说明2", duihuanProp : [{id : 1, count : 50},{id : 2, count : 50},{id : 3, count : 50}]},
			{id : 3, name : "商品名称3", imagPath : "duihuan/duiHuanProp_1", desc : "商品说明3", duihuanProp : [{id : 1, count : 50},{id : 2, count : 50},{id : 3, count : 50}]},
			{id : 4, name : "商品名称4", imagPath : "duihuan/duiHuanProp_1", desc : "商品说明4", duihuanProp : [{id : 1, count : 50},{id : 2, count : 50},{id : 3, count : 50}]},
			{id : 5, name : "商品名称5", imagPath : "duihuan/duiHuanProp_1", desc : "商品说明5", duihuanProp : [{id : 1, count : 50},{id : 2, count : 50},{id : 3, count : 50}]},
			{id : 6, name : "商品名称6", imagPath : "duihuan/duiHuanProp_1", desc : "商品说明6", duihuanProp : [{id : 1, count : 50},{id : 2, count : 50},{id : 3, count : 50}]},
			{id : 7, name : "商品名称7", imagPath : "duihuan/duiHuanProp_1", desc : "商品说明7", duihuanProp : [{id : 1, count : 50},{id : 2, count : 50},{id : 3, count : 50}]}
		],
		
		'hechengduihuan' : [
			{id : 1, name : "合成道具", items : [1,2,3,4,6,7]},
			{id : 2, name : "兑换商品", items : [1,2,3,4,6,7]}
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

