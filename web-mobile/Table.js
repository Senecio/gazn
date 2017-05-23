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
            { id : 25, description : "材料不足,合成道具失败!" },
            { id : 26, description : "发言过于频繁,请不要一秒钟以内多次发言!" },
            { id : 27, description : "今天领取过了,请明天再来明天!" },
            { id : 28, description : "领取失败,错过领取时间!" }
        ],
        // 植物表
        'plant' : [
            { id : 1, name : "百合", desc : "淡白色，先端常开放如莲座状，卵匙形的鳞片聚合而成。", buy : 50, sellPrice : 25, fruit : { name : "百合", price : 1 }, output : 100, minLevel:3, time:{amount:30, part:[10,10,10],images:["zhongZi","youmiao","1_2","1_3","canliu"], imagesModify:[null,null,{ox:0,oy:-10,sx:1.2,sy:1.2},{ox:0,oy:-10,sx:1.0,sy:1.0},null]}, headImagPath : "plant/1_2", disasterId : 1, sowExp:50, harvestExp:100, clearExp:50},
            { id : 2, name : "当归", desc : "具有补血和血，调经止痛，润燥滑肠、免疫之功效。", buy : 100, sellPrice : 50, fruit : { name : "当归", price : 2 }, output : 100, minLevel:5, time:{amount:60, part:[20,20,20],images:["zhongZi","youmiao","2_2","2_3","canliu"],imagesModify:[null,null,{ox:0,oy:-10,sx:1.2,sy:1.2},{ox:-2,oy:-10,sx:1.0,sy:1.0},null]}, headImagPath : "plant/2_2", disasterId : 1, sowExp:50, harvestExp:105, clearExp:50},
            { id : 3, name : "枸杞", desc : "根皮（中药称地骨皮），有解热止咳之效用。", buy : 150, sellPrice : 75, fruit : { name : "枸杞", price : 3 }, output : 100, minLevel:9, time:{amount:90, part:[30,30,30],images:["zhongZi","youmiao","3_2","3_3","canliu"],imagesModify:[null,null,{ox:0,oy:-10,sx:1.2,sy:1.2},{ox:0,oy:-10,sx:1.0,sy:1.0},null]}, headImagPath : "plant/3_2", disasterId : 1, sowExp:50, harvestExp:110, clearExp:50},
            { id : 4, name : "红参", desc : "红参是参的熟用品，有大补元气，复脉固脱，益气摄血功效。", buy : 200, sellPrice : 80, fruit : { name : "红参", price : 4 }, output : 100, minLevel:1, time:{amount:120, part:[40,40,40],images:["zhongZi","youmiao","4_2","4_3","canliu"],imagesModify:[null,null,{ox:-2,oy:-10,sx:1.2,sy:1.2},{ox:-2,oy:-10,sx:1.0,sy:1.0},null]}, headImagPath : "plant/4_2", disasterId : 1, sowExp:100, harvestExp:100, clearExp:100},
            { id : 5, name : "红枣", desc : "红枣味甘性温、归脾胃经，有养血安神、缓和药性的功能", buy : 250, sellPrice : 90, fruit : { name : "红枣", price : 5 }, output : 100, minLevel:1, time:{amount:150, part:[50,50,50],images:["zhongZi","youmiao","5_2","5_3","canliu"],imagesModify:[null,null,{ox:-1,oy:-10,sx:1.2,sy:1.2},{ox:0,oy:-10,sx:1.0,sy:1.0},null]}, headImagPath : "plant/5_2", disasterId : 1, sowExp:100, harvestExp:125, clearExp:100},
            { id : 6, name : "灵芝", desc : "灵芝具有补气安神、止咳平喘、延年益寿的功效。", buy : 300, sellPrice : 100, fruit : { name : "灵芝", price : 6 }, output : 100, minLevel:2, time:{amount:180, part:[60,60,60],images:["zhongZi","youmiao","6_2","6_3","canliu"],imagesModify:[null,null,{ox:0,oy:-10,sx:1.2,sy:1.2},{ox:0,oy:-10,sx:1.0,sy:1.0},null]}, headImagPath : "plant/6_2", disasterId : 1, sowExp:100, harvestExp:150, clearExp:100},
            { id : 7, name : "人参", desc : "人参适用于调整血压、恢复心脏功能、神经衰弱", buy : 350, sellPrice : 110, fruit : { name : "人参", price : 7 }, output : 100, minLevel:2, time:{amount:210, part:[70,70,70],images:["zhongZi","youmiao","7_2","7_3","canliu"],imagesModify:[null,null,{ox:0,oy:-10,sx:1.2,sy:1.2},{ox:0,oy:-10,sx:1.0,sy:1.0},null]}, headImagPath : "plant/7_2", disasterId : 1, sowExp:100, harvestExp:200, clearExp:100},
            { id : 8, name : "沙参", desc : "甘而微苦，有滋补、祛寒热、清肺止咳。", buy : 400, sellPrice : 120, fruit : { name : "沙参", price : 8 }, output : 100, minLevel:2, time:{amount:240, part:[80,80,80],images:["zhongZi","youmiao","8_2","8_3","canliu"],imagesModify:[null,null,{ox:0,oy:-10,sx:1.2,sy:1.2},{ox:0,oy:-10,sx:1.0,sy:1.0},null]}, headImagPath : "plant/8_2", disasterId : 1, sowExp:100, harvestExp:225, clearExp:100},
            { id : 9, name : "铁皮石斛", desc : "生津养胃、滋阴清热、润肺益肾、明目强腰。", buy : 450, sellPrice : 130, fruit : { name : "铁皮石斛", price : 9 }, output : 100, minLevel:31, time:{amount:270, part:[90,90,90],images:["zhongZi","youmiao","9_2","9_3","canliu"],imagesModify:[null,null,{ox:0,oy:-10,sx:1.2,sy:1.2},{ox:0,oy:-10,sx:1.0,sy:1.0},null]}, headImagPath : "plant/9_2", disasterId : 1, sowExp:100, harvestExp:250, clearExp:100},
            { id : 10, name : "玉竹", desc : "玉竹具有降血糖、血脂、血压等作用。", buy : 500, sellPrice : 140, fruit : { name : "玉竹", price : 10 }, output : 100, minLevel:3, time:{amount:300, part:[100,100,100],images:["zhongZi","10_2","youmiao","10_3","canliu"],imagesModify:[null,null,{ox:0,oy:-10,sx:1.2,sy:1.2},{ox:0,oy:-10,sx:1.0,sy:1.0},null]}, headImagPath : "plant/10_2", disasterId : 1, sowExp:100, harvestExp:300, clearExp:100},
            { id : 11, name : "党参", desc : "党参有增强免疫力、扩张血管、降压、增强造血功能等作用。", buy : 550, sellPrice : 150, fruit : { name : "党参", price : 11 }, output : 100, minLevel:3, time:{amount:330, part:[110,110,110],images:["zhongZi","11_2","youmiao","11_3","canliu"],imagesModify:[null,null,{ox:0,oy:-10,sx:1.2,sy:1.2},{ox:0,oy:-10,sx:1.0,sy:1.0},null]}, headImagPath : "plant/11_2", disasterId : 1, sowExp:100, harvestExp:350, clearExp:100},
            { id : 12, name : "黄芪", desc : "黄芪有增保肝、利尿、抗衰老、降压和较广泛的抗菌作用。", buy : 600, sellPrice : 160, fruit : { name : "黄芪", price : 12 }, output : 100, minLevel:4, time:{amount:360, part:[120,120,120],images:["zhongZi","12_2","youmiao","12_3","canliu"],imagesModify:[null,null,{ox:0,oy:-10,sx:1.2,sy:1.2},{ox:0,oy:-10,sx:1.0,sy:1.0},null]}, headImagPath : "plant/12_2", disasterId : 1, sowExp:100, harvestExp:400, clearExp:100},
            { id : 13, name : "莲子", desc : "莲子具有补脾止泻，止带，益肾涩精，养心安神之功效。", buy : 650, sellPrice : 170, fruit : { name : "莲子", price : 13 }, output : 100, minLevel:4, time:{amount:390, part:[130,130,130],images:["zhongZi","13_2","youmiao","13_3","canliu"],imagesModify:[null,null,{ox:0,oy:-10,sx:1.2,sy:1.2},{ox:0,oy:-10,sx:1.0,sy:1.0},null]}, headImagPath : "plant/13_2", disasterId : 1, sowExp:100, harvestExp:450, clearExp:100},
            { id : 14, name : "玫瑰", desc : "玫瑰露可以改善皮肤质地，促进血液循环及新陈代谢。", buy : 700, sellPrice : 180, fruit : { name : "玫瑰", price : 14 }, output : 100, minLevel:4, time:{amount:420, part:[140,140,140],images:["zhongZi","14_2","youmiao","14_3","canliu"],imagesModify:[null,null,{ox:0,oy:-10,sx:1.2,sy:1.2},{ox:0,oy:-10,sx:1.0,sy:1.0},null]}, headImagPath : "plant/14_2", disasterId : 1, sowExp:100, harvestExp:500, clearExp:100},
            { id : 15, name : "牛大力", desc : "牛大力具有平肝、润肺，养肾补虚，强筋活络之功效。", buy : 750, sellPrice : 190, fruit : { name : "牛大力", price : 15 }, output : 100, minLevel:5, time:{amount:450, part:[150,150,150],images:["zhongZi","youmiao","15_2","15_3","canliu"],imagesModify:[null,null,{ox:0,oy:-10,sx:1.2,sy:1.2},{ox:0,oy:-10,sx:1.0,sy:1.0},null]}, headImagPath : "plant/15_2", disasterId : 1, sowExp:100, harvestExp:550, clearExp:100},
            { id : 16, name : "山药", desc : "山药具有滋养强壮，助消化，敛虚汗，止泻之功效。", buy : 800, sellPrice : 200, fruit : { name : "山药", price : 16 }, output : 100, minLevel:5, time:{amount:480, part:[160,160,160],images:["zhongZi","youmiao","16_2","16_3","canliu"],imagesModify:[null,null,{ox:0,oy:-10,sx:1.2,sy:1.2},{ox:0,oy:-10,sx:1.0,sy:1.0},null]}, headImagPath : "plant/16_2", disasterId : 1, sowExp:100, harvestExp:600, clearExp:100},
            { id : 17, name : "五指毛桃", desc : "五指毛桃具有健脾补肺药、行气利湿药、舒筋活络药", buy : 850, sellPrice : 210, fruit : { name : "五指毛桃", price : 17 }, output : 100, minLevel:6, time:{amount:600, part:[200,200,200],images:["zhongZi","17_2","17_3","canliu"],imagesModify:[null,null,{ox:0,oy:-10,sx:1.2,sy:1.2},{ox:0,oy:-10,sx:1.0,sy:1.0},null]}, headImagPath : "plant/17_2", disasterId : 1, sowExp:100, harvestExp:650, clearExp:100},
        ],
        // 道具
        'property' : [
            { id : 1, name : "-10M化肥", type : 2, data : 10, desc : "减少10分钟成熟时间", buy : 1000, imagPath : "prop/huafei_1"},
            { id : 2, name : "-30M化肥", type : 2, data : 30, desc : "减少30分钟成熟时间", buy : 1500, imagPath : "prop/huafei_2"},
            { id : 3, name : "-1H化肥", type : 2, data : 60, desc : "减少1小时成熟时间", buy : 2000, imagPath : "prop/huafei_3"},
            { id : 4, name : "-2H化肥", type : 2, data : 120, desc : "减少2小时成熟时间", buy : 3000, imagPath : "prop/huafei_10"},
            { id : 5, name : "测试神器", type : 2, data : 1200, desc : "减少20小时成熟时间", buy : 1, imagPath : "prop/huafei_10"},
            { id : 6, name : "1级营养液", type : 3, data : 0, desc : "升级2等级土地时使用", buy : 1000, imagPath : "prop/yingyangye"},
            { id : 7, name : "2级营养液", type : 3, data : 0, desc : "升级3等级土地时使用", buy : 5000, imagPath : "prop/yingyangye"},
            { id : 8, name : "3级营养液", type : 3, data : 0, desc : "升级4等级土地时使用", buy : 10000, imagPath : "prop/yingyangye"},
            { id : 9, name : "4级营养液", type : 3, data : 0, desc : "升级5等级土地时使用", buy : 15000, imagPath : "prop/yingyangye"},
            { id : 10, name : "5级营养液", type : 3, data : 0, desc : "升级6等级土地时使用", buy : 20000, imagPath : "prop/yingyangye"},
            { id : 1000, name : "金币", type : 4, data : 0, desc : "一大堆金光灿灿的金币", buy : 0, imagPath : "prop/money"}
        ],
        //宠物
        'pet' : [
            {id : 1, name : "哈士奇", data : [0.3,0.1], desc : "降低偷盗成功率30%/n降低果实损失10%", time : {day : [7, 30, 90], money:[500,2000,6000]}, headImagPath : "pet/petHead_1", imagPath : "pet/pet_1"},
            {id : 2, name : "狮子犬", data : [0.4,0.15], desc : "降低偷盗成功率40%；/n降低果实损失15%", time : {day : [7, 30, 90], money:[600,2500,7500]}, headImagPath : "pet/petHead_1", imagPath : "pet/pet_1"},
            {id : 3, name : "藏獒", data : [0.5,0.25], desc : "降低偷盗成功率50%；/n降低果实损失25%", time : {day : [7, 30, 90], money:[700,3000,9000]}, headImagPath : "pet/petHead_1", imagPath : "pet/pet_1"},

        ],
        // 土地等级表
        'landsLevel' : [
            { id : 1, name : "1等级土地", imagPaht : "ui/tdsj_icon1", canSow: [1,2,3], effect : [0,0,0] },
            { id : 2, name : "2等级土地", imagPaht : "ui/tdsj_icon1", canSow: [4,5,6], effect : [0.1,0.1,0.1,0.5,0.7], minLevel : 12, landsNumber : 3, needMoney : 4800, propertyId : 6, propertyNumber : 10 },
            { id : 3, name : "3等级土地", imagPaht : "ui/tdsj_icon1", canSow: [7,8,9], effect : [0.2,0.2,0.1], minLevel : 23, landsNumber : 5, needMoney : 7800, propertyId : 7, propertyNumber : 10},
            { id : 4, name : "4等级土地", imagPaht : "ui/tdsj_icon1", canSow: [10,11,12], effect : [0.3,0.3,0.2], minLevel : 34, landsNumber : 7, needMoney : 12800, propertyId : 8, propertyNumber : 10 },
            { id : 5, name : "5等级土地", imagPaht : "ui/tdsj_icon1", canSow: [13,14,15], effect : [0.4,0.4,0.2], minLevel : 45, landsNumber : 9, needMoney : 18000, propertyId : 9, propertyNumber : 10 },
            { id : 6, name : "6等级土地", imagPaht : "ui/tdsj_icon1", canSow: [16,17,18], effect : [0.5,0.5,0.3], minLevel : 56, landsNumber : 12, needMoney : 23000, propertyId : 10, propertyNumber : 10 }
        ],
        
        // 土地最大等级
        'landMaxLevel' : [
            {id : 1, maxLandLevel : 6}
        ],
        
        //  土地解锁表
        'unlockLands' : [
            { id : 1, needMoney : [1000,150,300,450,600,1200,1600,2000,2700,4800,5200,5500], minLevel : [1,2,3,4,5,6,7,8,9,10,11,12] }
        ],
        // 商店
        'shop' : [
            { id : 1, name :"种子", sell:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]},
            { id : 2, name :"道具", sell:[1,2,3,4,5,6,7,8,9,10]},
            { id : 3, name :"宠物", sell:[1,2,3]}
        ],
        // 灾害  effect1 出虫(每小时减少收成的x%)  effect2  缺水(每小时增加x分钟的时间) effect 营养流失(前面两种效果叠加)
        'disaster' : [
            { id : 1, percent : 1.0, cd : 1, effect1 : 0.1, maxEffect1 : 0.5, effect2 : 10, maxEffect2 : 0.3, chanceWeight:[1,1,1], addExp : 20 },
            { id : 2, percent : 0.1, cd : 280, effect1 : 0.1, maxEffect1 : 0.5, effect2 : 1, maxEffect2 : 0.3, chanceWeight:[1,1,1], addExp : 2 }
        ],
        
        //合成道具
        'hechengProp' : [
            {id : 1, name : "人参茶", headImagPath : "hecheng/hechengHead_1", imagPath : "hecheng/hechengProp_1", money : 1000, cailiao : [{id : 7, count : 3}]},
            {id : 2, name : "皇晨茶", headImagPath : "hecheng/hechengHead_1", imagPath : "hecheng/hechengProp_1", money : 1000, cailiao : [{id : 7, count : 3}, {id : 3, count : 3},{id : 5, count : 3}]},
        ],
        
        'hechenglayer' : [
            {id : 1, name : "合成道具", items : [1,2]}
        ],
        
        //兑换商品
        'duihuanshangpin' : [
            {id : 1, name : "人参茶", imagPath : "duihuan/duiHuanProp_1", desc : "商品说明1", duihuanProp : [{id : 1, count : 1}]},
            {id : 2, name : "皇晨茶", imagPath : "duihuan/duiHuanProp_1", desc : "商品说明2", duihuanProp : [{id : 2, count : 1}]},
        ],
        
        //兑换商店
        "duihuanshop" : [
            { id : 1, name :"兑换商品", sell:[1,2]},
            //{ id : 2, name :"未知", sell:[]}
        ],
        
        "signInAward" : [ // "seed" 种子, "fruit" 果实, "property" 道具/金币, "pet" 宠物
            {id : 1, type: "seed", itemId : 1, count : 1 },
            {id : 2, type: "property", itemId : 1, count : 2 },
            {id : 3, type: "property", itemId : 1000, count : 1000 }, // 金币
            {id : 4, type: "pet", itemId : 1, count : 7 },
            {id : 5, type: "fruit", itemId : 2, count : 3 }
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

