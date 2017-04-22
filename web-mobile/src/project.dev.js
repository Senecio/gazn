require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"AudioMng":[function(require,module,exports){
"use strict";
cc._RFpush(module, '46bf8MJ+ylG6L5OVxzUo6vg', 'AudioMng');
// script\AudioMng.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        winAudio: {
            default: null,
            url: cc.AudioClip
        },

        loseAudio: {
            default: null,
            url: cc.AudioClip
        },

        cardAudio: {
            default: null,
            url: cc.AudioClip
        },

        buttonAudio: {
            default: null,
            url: cc.AudioClip
        },

        chipsAudio: {
            default: null,
            url: cc.AudioClip
        },

        bgm: {
            default: null,
            url: cc.AudioClip
        }
    },

    playMusic: function playMusic() {
        cc.audioEngine.playMusic(this.bgm, true);
    },

    pauseMusic: function pauseMusic() {
        cc.audioEngine.pauseMusic();
    },

    resumeMusic: function resumeMusic() {
        cc.audioEngine.resumeMusic();
    },

    _playSFX: function _playSFX(clip) {
        cc.audioEngine.playEffect(clip, false);
    },
    /*
    playWin: function() {
        this._playSFX(this.winAudio);
    },
     playLose: function() {
        this._playSFX(this.loseAudio);
    },
     playCard: function() {
        this._playSFX(this.cardAudio);
    },
     playChips: function() {
        this._playSFX(this.chipsAudio);
    },*/

    playButton: function playButton() {
        this._playSFX(this.buttonAudio);
    }
});

cc._RFpop();
},{}],"ButtonScaler":[function(require,module,exports){
"use strict";
cc._RFpush(module, '5c156RZ5+lJ4It6heya76Cw', 'ButtonScaler');
// script\ButtonScaler.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        pressedScale: 1,
        transDuration: 0
    },

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;

        var audioMng = AudioMng();
        self.initScale = this.node.scale;
        self.button = self.getComponent(cc.Button);
        self.scaleDownAction = cc.scaleTo(self.transDuration, self.pressedScale);
        self.scaleUpAction = cc.scaleTo(self.transDuration, self.initScale);
        function onTouchDown(event) {
            this.stopAllActions();
            if (audioMng) audioMng.playButton();
            this.runAction(self.scaleDownAction);
        }
        function onTouchUp(event) {
            this.stopAllActions();
            this.runAction(self.scaleUpAction);
        }
        this.node.on('touchstart', onTouchDown, this.node);
        this.node.on('touchend', onTouchUp, this.node);
        this.node.on('touchcancel', onTouchUp, this.node);
    }
});

cc._RFpop();
},{}],"Table":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'd5951wa1pJFmLLmVZ8/1Grn', 'Table');
// script\Table.js

"use strict";

// 数据表
;(function () {

    var Table = {
        // buff表
        'error': [{ id: 1, description: "账号或密码错误!" }, { id: 2, description: "此账号已经注册过了!" }, { id: 3, description: "土地位尚未开垦!" }, { id: 4, description: "土地并非空闲!" }, { id: 5, description: "种子不足!" }, { id: 6, description: "金币不足!" }, { id: 7, description: "等级不足!" }, { id: 8, description: "土地当前等级无法播种此种子!" }, { id: 9, description: "土地扩建的数量不满足!" }, { id: 10, description: "道具不足!" }, { id: 11, description: "土地无法到达此等级!" }, { id: 12, description: "土地还没有播种!" }, { id: 13, description: "道具不足!" }, { id: 14, description: "植物已经成熟!" }, { id: 15, description: "道具类型必须是化肥!" }, { id: 16, description: "只能每阶段施一次肥!" }, { id: 17, description: "果实不足!" }],
        // 植物表
        'plant': [{ id: 1, name: "植物1", buy: 100, fruit: { name: "果实1", price: 20 }, output: 15, minLevel: 1, time: { amount: 600, part: [200, 200, 200] }, sowExp: 2, harvestExp: 10, clearExp: 2 }, { id: 2, name: "植物2", buy: 120, fruit: { name: "果实2", price: 30 }, output: 15, minLevel: 2, time: { amount: 600, part: [200, 200, 200] }, sowExp: 2, harvestExp: 10, clearExp: 2 }, { id: 3, name: "植物3", buy: 140, fruit: { name: "果实3", price: 40 }, output: 15, minLevel: 3, time: { amount: 600, part: [200, 200, 200] }, sowExp: 2, harvestExp: 10, clearExp: 2 }, { id: 4, name: "植物4", buy: 160, fruit: { name: "果实4", price: 60 }, output: 15, minLevel: 4, time: { amount: 660, part: [200, 260, 200] }, sowExp: 2, harvestExp: 12, clearExp: 2 }, { id: 5, name: "植物5", buy: 180, fruit: { name: "果实5", price: 80 }, output: 15, minLevel: 5, time: { amount: 660, part: [200, 260, 200] }, sowExp: 2, harvestExp: 12, clearExp: 2 }, { id: 6, name: "植物6", buy: 200, fruit: { name: "果实6", price: 100 }, output: 15, minLevel: 6, time: { amount: 660, part: [200, 260, 200] }, sowExp: 2, harvestExp: 12, clearExp: 2 }, { id: 7, name: "植物7", buy: 220, fruit: { name: "果实7", price: 120 }, output: 15, minLevel: 7, time: { amount: 720, part: [200, 260, 260] }, sowExp: 2, harvestExp: 14, clearExp: 2 }, { id: 8, name: "植物8", buy: 240, fruit: { name: "果实8", price: 140 }, output: 15, minLevel: 8, time: { amount: 720, part: [200, 260, 260] }, sowExp: 2, harvestExp: 14, clearExp: 2 }, { id: 9, name: "植物9", buy: 260, fruit: { name: "果实9", price: 160 }, output: 15, minLevel: 9, time: { amount: 720, part: [200, 260, 260] }, sowExp: 2, harvestExp: 14, clearExp: 2 }, { id: 10, name: "植物10", buy: 280, fruit: { name: "果实10", price: 180 }, output: 20, minLevel: 10, time: { amount: 780, part: [260, 260, 260] }, sowExp: 2, harvestExp: 16, clearExp: 2 }, { id: 11, name: "植物11", buy: 300, fruit: { name: "果实11", price: 200 }, output: 20, minLevel: 11, time: { amount: 780, part: [260, 260, 260] }, sowExp: 2, harvestExp: 16, clearExp: 2 }, { id: 12, name: "植物12", buy: 320, fruit: { name: "果实12", price: 220 }, output: 20, minLevel: 12, time: { amount: 780, part: [260, 260, 260] }, sowExp: 2, harvestExp: 16, clearExp: 2 }, { id: 13, name: "植物13", buy: 340, fruit: { name: "果实13", price: 240 }, output: 20, minLevel: 13, time: { amount: 900, part: [300, 300, 300] }, sowExp: 3, harvestExp: 16, clearExp: 2 }, { id: 14, name: "植物14", buy: 360, fruit: { name: "果实14", price: 260 }, output: 20, minLevel: 14, time: { amount: 900, part: [300, 300, 300] }, sowExp: 3, harvestExp: 16, clearExp: 2 }, { id: 15, name: "植物15", buy: 380, fruit: { name: "果实15", price: 270 }, output: 20, minLevel: 15, time: { amount: 900, part: [300, 300, 300] }, sowExp: 3, harvestExp: 16, clearExp: 2 }, { id: 16, name: "植物16", buy: 400, fruit: { name: "果实16", price: 280 }, output: 20, minLevel: 16, time: { amount: 1440, part: [480, 480, 480] }, sowExp: 3, harvestExp: 18, clearExp: 2 }, { id: 17, name: "植物17", buy: 420, fruit: { name: "果实17", price: 290 }, output: 20, minLevel: 17, time: { amount: 1440, part: [480, 480, 480] }, sowExp: 3, harvestExp: 18, clearExp: 2 }, { id: 18, name: "植物18", buy: 440, fruit: { name: "果实18", price: 300 }, output: 20, minLevel: 18, time: { amount: 1440, part: [480, 480, 480] }, sowExp: 3, harvestExp: 18, clearExp: 2 }],
        // 道具
        'property': [{ id: 1, name: "化肥1", type: 1, data: 120, desc: "每个阶段使用1次,减少2小时成熟时间", buy: 1000 }, { id: 2, name: "化肥2", type: 1, data: 180, desc: "每个阶段使用1次,减少3小时成熟时间", buy: 1500 }, { id: 3, name: "化肥3", type: 2, data: 120, desc: "每个阶段可多次使用,减少2小时成熟时间", buy: 2000 }, { id: 4, name: "化肥4", type: 2, data: 180, desc: "每个阶段可多次使用,减少3小时成熟时间", buy: 3000 }],
        // 土地等级表
        'landsLevel': [{ id: 1, name: "1等级土地", canSow: [1, 2, 3] }, { id: 2, name: "2等级土地", canSow: [4, 5, 6], minLevel: 10, landsNumber: 3, needMoney: 10000, propertyId: 6, propertyNumber: 1 }, { id: 3, name: "3等级土地", canSow: [7, 8, 9], minLevel: 15, landsNumber: 5, needMoney: 20000, propertyId: 7, propertyNumber: 1 }, { id: 4, name: "4等级土地", canSow: [10, 11, 12], minLevel: 20, landsNumber: 7, needMoney: 40000, propertyId: 8, propertyNumber: 1 }, { id: 5, name: "5等级土地", canSow: [13, 14, 15], minLevel: 25, landsNumber: 9, needMoney: 60000, propertyId: 9, propertyNumber: 1 }, { id: 6, name: "6等级土地", canSow: [16, 17, 18], minLevel: 30, landsNumber: 12, needMoney: 80000, propertyId: 10, propertyNumber: 1 }],
        //  土地解锁表
        'unlockLands': [{ id: 1, needMoney: [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000], minLevel: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }],
        // 商店
        'shop': [{ id: 1, name: "种子", sell: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18] }, { id: 2, name: "道具", sell: [1, 2, 3, 4] }, { id: 3, name: "装饰", sell: [] }],
        'market': [],

        GetEntry: function GetEntry(tableName, id) {
            if (typeof this[tableName] !== 'undefined') {
                return this[tableName][id - 1];
            }
            return null;
        }
    };

    if (typeof module !== 'undefined') module.exports = Table;

    if (typeof window !== 'undefined') window.Table = Table;
})();

cc._RFpop();
},{}],"buyItemsHandler":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'c49f0AZwPBMHpfqVQ9qFWIM', 'buyItemsHandler');
// script\handler\buyItemsHandler.js

"use strict";

var MessageHandler = require("msgHandler");
var buyItemsSuccess = {};
buyItemsSuccess['interest'] = "buyItemsSuccess";
buyItemsSuccess['Process'] = function (message) {
    GameEvent().SendEvent("BuyItemsSuccess");
    GameNotify().AddText("购买成功!");
};
MessageHandler.Add(buyItemsSuccess);

cc._RFpop();
},{"msgHandler":"msgHandler"}],"buyProperty":[function(require,module,exports){
"use strict";
cc._RFpush(module, '77e9324BmFCb5KLA71q3gE2', 'buyProperty');
// script\ui\buyProperty.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        addBtn: cc.Button,
        subBtn: cc.Button,
        buyBtn: cc.Button,
        cancelBtn: cc.Button,
        propName: cc.Label,
        propType: cc.Label,
        describe: cc.Label,
        buyNumber: cc.Label,
        amountPrice: cc.Label,
        limitLevel: cc.Label
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.addBtn.node.on('click', this.OnAdd, this);
        this.subBtn.node.on('click', this.OnSub, this);
        this.buyBtn.node.on('click', this.OnBuy, this);
        this.cancelBtn.node.on('click', function (event) {
            this.OnHide();
        }.bind(this));
    },

    OnShow: function OnShow() {
        this.node.active = true;
    },

    OnHide: function OnHide() {
        this.node.active = false;
    },

    OnAdd: function OnAdd(event) {
        this.buyCount += 1;
        if (this.buyCount <= 0) {
            this.buyCount = 1;
        }

        this.buyNumber.string = this.buyCount;
        this.amountPrice.string = this.buyCount * this.buyPrice + "金币";

        if (this.buyCount > 1) {
            this.subBtn.interactable = true;
        }
    },
    OnSub: function OnSub(event) {
        this.buyCount -= 1;
        if (this.buyCount <= 0) {
            this.buyCount = 1;
            this.subBtn.interactable = false;
        }

        this.buyNumber.string = this.buyCount;
        this.amountPrice.string = this.buyCount * this.buyPrice + "金币";
    },
    OnBuy: function OnBuy(event) {
        var gameData = window.GameData;
        if (gameData.GetMoney() < this.buyCount * this.buyPrice) {
            var errorEntry = Table.GetEntry("error", 6);
            if (errorEntry) {
                GameNotify().AddText(errorEntry.description, window.ErrorNotifyColor);
            } else {
                GameNotify().AddText("金币不足!", window.ErrorNotifyColor);
            }
            return;
        }

        var obj = { type: 'buyItems', kinds: 1, buyId: this.buyId, buyCount: this.buyCount };
        var msg = JSON.stringify(obj);
        GameSocket().Send(msg);

        this.OnHide();
    },

    Setup: function Setup(config) {
        this.propName.string = config.name;
        // this.propType.string = config.type;
        this.describe.string = config.desc;
        this.buyId = config.id;
        this.buyPrice = config.buy;
        this.buyCount = 0;

        this.limitLevel.node.active = false;

        this.OnAdd(null);
    }

});

cc._RFpop();
},{}],"buySeed":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'ad48686xkROraOi6t5jt9WJ', 'buySeed');
// script\ui\buySeed.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        addBtn: cc.Button,
        subBtn: cc.Button,
        buyBtn: cc.Button,
        cancelBtn: cc.Button,
        buyNumber: cc.Label,
        seedName: cc.Label,
        time: cc.Label,
        output: cc.Label,
        price: cc.Label,
        gains: cc.Label,
        getExp: cc.Label,
        amountPrice: cc.Label,
        limitLevel: cc.Label
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.addBtn.node.on('click', this.OnAdd, this);
        this.subBtn.node.on('click', this.OnSub, this);
        this.buyBtn.node.on('click', this.OnBuy, this);
        this.cancelBtn.node.on('click', function (event) {
            this.OnHide();
        }.bind(this));
    },

    OnShow: function OnShow() {
        this.node.active = true;
    },

    OnHide: function OnHide() {
        this.node.active = false;
    },

    OnAdd: function OnAdd(event) {
        this.buyCount += 1;
        if (this.buyCount <= 0) {
            this.buyCount = 1;
        }

        this.buyNumber.string = this.buyCount;
        this.amountPrice.string = this.buyCount * this.buyPrice + "金币";

        if (this.buyCount > 1) {
            this.subBtn.interactable = true;
        }
    },
    OnSub: function OnSub(event) {
        this.buyCount -= 1;
        if (this.buyCount <= 0) {
            this.buyCount = 1;
            this.subBtn.interactable = false;
        }

        this.buyNumber.string = this.buyCount;
        this.amountPrice.string = this.buyCount * this.buyPrice + "金币";
    },
    OnBuy: function OnBuy(event) {
        var gameData = window.GameData;
        if (gameData.GetMoney() < this.buyCount * this.buyPrice) {
            var errorEntry = Table.GetEntry("error", 6);
            if (errorEntry) {
                GameNotify().AddText(errorEntry.description, window.ErrorNotifyColor);
            } else {
                GameNotify().AddText("金币不足!", window.ErrorNotifyColor);
            }
            return;
        }

        var obj = { type: 'buyItems', kinds: 0, buyId: this.buyId, buyCount: this.buyCount };
        var msg = JSON.stringify(obj);
        GameSocket().Send(msg);

        this.OnHide();
    },

    Setup: function Setup(config) {
        this.seedName.string = config.name;
        this.time.string = config.time.amount / 60 + (config.time.amount % 60 ? 1 : 0) + "小时";
        this.output.string = config.output + "个";
        this.price.string = config.fruit.price + "金币";
        this.gains.string = config.output * config.fruit.price;
        this.getExp.string = config.sowExp + config.harvestExp + config.clearExp;
        this.buyId = config.id;
        this.buyPrice = config.buy;
        this.buyCount = 0;

        var gameData = window.GameData;
        if (gameData.GetLevel() < config.minLevel) {
            this.buyBtn.interactable = false;
            this.limitLevel.node.active = true;
            this.limitLevel.string = "需求Lv." + config.minLevel + "(等级不足)";
        } else {
            this.limitLevel.node.active = false;
            this.buyBtn.interactable = true;
        }

        this.OnAdd(null);
    }

});

cc._RFpop();
},{}],"canvas":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'e8895VhD7hAh6SOISVoNqK9', 'canvas');
// script\canvas.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        gameNotify: cc.Prefab
    },

    // use this for initialization
    onLoad: function onLoad() {}

});

cc._RFpop();
},{}],"error":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'e3e63hfLZdPjZl6YD4R3NNl', 'error');
// script\handler\error.js

"use strict";

var MessageHandler = require("msgHandler");
var error = {};
error['interest'] = "error";
error['Process'] = function (message) {
    GameLog(message);
    var entry = Table.GetEntry("error", message.id);
    if (entry) {
        GameLog(entry.description);
        GameNotify().AddText(entry.description, ErrorNotifyColor);
    }
};
MessageHandler.Add(error);

cc._RFpop();
},{"msgHandler":"msgHandler"}],"gameData":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'b1eb7lYRI5DV5yopcwfGiwY', 'gameData');
// script\gameData.js

'use strict';

(function () {

  var GameData = {
    userId: -1,
    userName: "",
    money: 0,
    experience: 0,
    vip: 0,
    lands: [],
    package: []
  };

  GameData.GetUserId = function () {
    return this.userId;
  }, GameData.GetUserName = function () {
    return this.userName;
  }, GameData.GetMoney = function () {
    return this.money;
  }, GameData.GetLevel = function () {
    var level = 1;
    if (this.experience > 0) {
      level = level + Math.floor(this.experience / 200);
    }

    return level;
  }, GameData.GetLevelExp = function () {
    return this.experience % 200;
  }, GameData.GetLevelExpMax = function () {
    return 200;
  };

  if (typeof module !== 'undefined') module.exports = GameData;

  if (typeof window !== 'undefined') window.GameData = GameData;
})();

cc._RFpop();
},{}],"gameEvent":[function(require,module,exports){
"use strict";
cc._RFpush(module, '863b78ivfJOp5nxyBAag2+G', 'gameEvent');
// script\gameEvent.js

"use strict";

var GameEvent = cc.Class({
    extends: cc.Component,

    statics: {
        inst: null
    },

    // use this for initialization
    onLoad: function onLoad() {
        GameEvent.inst = this;
    },

    OnEvent: function OnEvent(eventName, func, obj) {
        this.node.on(eventName, func, obj);
    },

    OffEvent: function OffEvent(eventName, func, obj) {
        this.node.off(eventName, func, obj);
    },

    SendEvent: function SendEvent(eventName, data) {
        this.node.emit(eventName, data);
    }

});

cc._RFpop();
},{}],"gameLayer":[function(require,module,exports){
"use strict";
cc._RFpush(module, '0c2e7ISWOdImp7YKyyaFh8m', 'gameLayer');
// script\gameLayer.js

"use strict";

var enum_opbtn_sow = 1;
var enum_opbtn_info = 2;
var enum_opbtn_remove = 3;
var enum_opbtn_manure = 4;
var enum_opbtn_harvest = 5;
var enum_opbtn_water = 6;
var enum_opbtn_degrass = 7;
var enum_opbtn_debug = 8;

var enum_landsState_idle = 0;
var enum_landsState_grow = 1;
var eunm_landsState_harvested = 2;

var MinuteToMicroSecond = 60000;
var HourToMicroSecond = 3600000;

cc.Class({
    extends: cc.Component,

    properties: {
        landsPrefab: cc.Prefab,
        opertorBtnPrefab: cc.Prefab,
        cangKuSpr: cc.Sprite
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.scrollView = this.node.getComponent("cc.ScrollView");
        this.content = this.scrollView.content;
        this.lands = this.content.getChildByName("lands");
        this.scrollView.horizontal = false;
        this.scrollView.vertical = false;

        GameEvent().OnEvent("LoginSuccess", this.OnLoginSuccess, this);
        GameEvent().OnEvent("UpdateBaseData", this.ReLoadData, this);
        GameEvent().OnEvent("UpdateLands", this.ReLoadData, this);

        GameEvent().OnEvent("UserSowSeeds", this.OnUserSowSeed, this);
        GameEvent().OnEvent("UserManure", this.OnUserManure, this);
    },

    start: function start() {
        var prefab;
        for (var i = 0; i < 4; ++i) {
            for (var j = 0; j < 3; ++j) {
                var coord = window.GridToCoord(j, i);
                prefab = cc.instantiate(this.landsPrefab);
                prefab.x = coord.x;
                prefab.y = coord.y;
                prefab.getChildByName('tips').active = false;
                this.lands.addChild(prefab);
            }
        }
    },

    OnLoginSuccess: function OnLoginSuccess() {
        this.scrollView.horizontal = true;
        this.scrollView.vertical = true;
        this.selectLandIndex = -1;
        this.ReLoadData();

        this.lands.on(cc.Node.EventType.TOUCH_END, function (event) {
            var location = this.lands.convertToNodeSpaceAR(event.getLocation());
            var gridPosition = window.CoordToGrid(location.x, location.y);
            if (gridPosition.x >= 0 && gridPosition.x < 3 && gridPosition.y >= 0 && gridPosition.y < 4) {
                var landIndex = gridPosition.x + gridPosition.y * 3;
                if (landIndex < 12) {
                    var children = this.lands.children;
                    var prefab = children[landIndex];

                    if (typeof this.lastHightLight !== 'undefined') {
                        this.HightLightLandsPrefab(this.lastHightLight, landIndex, false);
                    }

                    var audioMng = AudioMng();
                    if (audioMng) audioMng.playButton();

                    this.HightLightLandsPrefab(prefab, landIndex, true);
                    this.lastHightLight = prefab;
                    this.selectLandIndex = landIndex;
                }
            } else {
                if (typeof this.lastHightLight !== 'undefined') {
                    this.HightLightLandsPrefab(this.lastHightLight, landIndex, false);
                    this.lastHightLight = undefined;
                    this.selectLandIndex = -1;
                }
            }
        }.bind(this));

        this.cangKuSpr.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            GameEvent().SendEvent("OpenWarehouse");
        });
    },

    ReLoadData: function ReLoadData() {
        var gameData = window.GameData;
        var landsData = gameData.lands;
        var children = this.lands.children;
        for (var i = 0; i < children.length; ++i) {
            this.InitLandsPrefab(children[i], landsData[i], landsData.length === i);
        }
    },

    InitLandsPrefab: function InitLandsPrefab(prefab, land, unlock) {
        if (typeof land === 'undefined') {
            prefab.getChildByName('lands2').active = true;
            prefab.getChildByName('lands1').active = false;
            prefab.getChildByName('plant').active = false;
        } else {
            prefab.getChildByName('lands2').active = false;
            prefab.getChildByName('lands1').active = true;

            if (land.state === 0) {
                prefab.getChildByName('plant').active = false;
                prefab.getChildByName('time').active = false;
            } else if (land.state === 1) {
                prefab.getChildByName('plant').active = true;

                var seedCfg = Table.GetEntry("plant", land.seedId);
                if (seedCfg) {
                    var timeNode = prefab.getChildByName('time');
                    timeNode.active = true;
                    var timeLabel = timeNode.getComponent(cc.Label);

                    var reduceTime = 0;
                    if (typeof land.reduceTime !== 'undefined') {
                        for (var i = 0; i < land.reduceTime.length; ++i) {
                            reduceTime += land.reduceTime[i];
                        }
                    }

                    var now = new Date().getTime();
                    if (now > land.sowTime + (seedCfg.time.amount - reduceTime) * MinuteToMicroSecond) {
                        // 植物已经成熟
                        timeLabel.string = "植物已经成熟";
                    } else {
                        var remainingTime = seedCfg.time.amount * MinuteToMicroSecond - (now - land.sowTime);
                        remainingTime -= reduceTime * MinuteToMicroSecond;
                        var partId = 0;
                        for (var j = seedCfg.time.part.length - 1; j >= 0; --j) {
                            if (remainingTime > seedCfg.time.part[j] * MinuteToMicroSecond) {
                                remainingTime -= seedCfg.time.part[j] * MinuteToMicroSecond;
                            } else {
                                partId = j;
                                break;
                            }
                        }
                        var state;
                        if (partId === 0) {
                            state = "发芽";
                        } else if (partId == 1) {
                            state = "开花";
                        } else {
                            state = "结果";
                        }

                        timeLabel.string = "剩余" + Math.floor(remainingTime / HourToMicroSecond) + "小时" + Math.floor(remainingTime % HourToMicroSecond / MinuteToMicroSecond) + "分钟" + state;
                    }
                }
            } else if (land.state === 2) {
                var timeNode = prefab.getChildByName('time');
                timeNode.active = true;
                var timeLabel = timeNode.getComponent(cc.Label);
                timeLabel.string = "果实已收割";

                prefab.getChildByName('plant').active = true;
            }
        }

        prefab.getChildByName('openLands').active = unlock;
    },

    // 土地高亮
    HightLightLandsPrefab: function HightLightLandsPrefab(prefab, landIndex, hightLight) {
        var lands1, lands2;
        if (hightLight) {
            lands1 = prefab.getChildByName('lands1');
            if (lands1.active) {
                lands1.getComponent("cc.Sprite").dstBlendFactor = cc.BlendFunc.BlendFactor.ONE;
            }
            lands2 = prefab.getChildByName('lands2');
            if (lands2.active) {
                lands2.getComponent("cc.Sprite").dstBlendFactor = cc.BlendFunc.BlendFactor.ONE;
            }

            this.OperatorLands(prefab, landIndex);
        } else {
            lands1 = prefab.getChildByName('lands1');
            if (lands1.active) {
                lands1.getComponent("cc.Sprite").dstBlendFactor = cc.BlendFunc.BlendFactor.ONE_MINUS_SRC_ALPHA;
            }
            lands2 = prefab.getChildByName('lands2');
            if (lands2.active) {
                lands2.getComponent("cc.Sprite").dstBlendFactor = cc.BlendFunc.BlendFactor.ONE_MINUS_SRC_ALPHA;
            }

            this.CancelOperatorLands(prefab);
        }
    },

    // 操作土地 
    OperatorLands: function OperatorLands(prefab, landIndex) {
        var gameData = window.GameData;
        if (gameData.lands.length > landIndex) {
            var land = gameData.lands[landIndex];
            var landOperator = prefab.getChildByName('operator');
            landOperator.active = true;
            var prefabBtn;
            if (land.state === enum_landsState_idle) {
                // 播种
                prefabBtn = this.CreateOpertorButton(enum_opbtn_sow);
                landOperator.addChild(prefabBtn);
            } else if (land.state === enum_landsState_grow) {
                // 信息 施肥 铲地
                prefabBtn = this.CreateOpertorButton(enum_opbtn_info);
                landOperator.addChild(prefabBtn);

                var seedCfg = Table.GetEntry("plant", land.seedId);
                if (seedCfg) {

                    var reduceTime = 0;
                    if (typeof land.reduceTime !== 'undefined') {
                        for (var i = 0; i < land.reduceTime.length; ++i) {
                            reduceTime += land.reduceTime[i];
                        }
                    }

                    var now = new Date().getTime();
                    if (now > land.sowTime + (seedCfg.time.amount - reduceTime) * MinuteToMicroSecond) {
                        prefabBtn = this.CreateOpertorButton(enum_opbtn_harvest);
                        landOperator.addChild(prefabBtn);
                    } else {
                        prefabBtn = this.CreateOpertorButton(enum_opbtn_manure);
                        landOperator.addChild(prefabBtn);
                    }
                }

                prefabBtn = this.CreateOpertorButton(enum_opbtn_remove);
                landOperator.addChild(prefabBtn);
            } else if (land.state === eunm_landsState_harvested) {
                // 铲地
                prefabBtn = this.CreateOpertorButton(enum_opbtn_remove);
                landOperator.addChild(prefabBtn);
            }
        } else {

            if (gameData.lands.length === landIndex) {

                // 这里最好添加一个二次确认框.  

                // unlock
                var obj = { type: 'unlockLands', landIndex: landIndex };
                var msg = JSON.stringify(obj);
                GameSocket().Send(msg);
            }
        }
    },

    // 取消土地操作
    CancelOperatorLands: function CancelOperatorLands(prefab) {
        var landOperator = prefab.getChildByName('operator');
        landOperator.removeAllChildren();
        landOperator.active = false;
    },

    // 创建操作按钮
    CreateOpertorButton: function CreateOpertorButton(type) {
        var prefabBtn = null;
        var label;
        if (type === enum_opbtn_sow) {
            // 播种
            prefabBtn = cc.instantiate(this.opertorBtnPrefab);
            label = prefabBtn.getComponent('cc.Button').node.getChildByName('Label');
            label.getComponent('cc.Label').string = "播种";
            prefabBtn.on('click', function (event) {
                GameEvent().SendEvent("OpenPackage", "sow");
            });
        } else if (type === enum_opbtn_info) {
            // 信息
            prefabBtn = cc.instantiate(this.opertorBtnPrefab);
            label = prefabBtn.getComponent('cc.Button').node.getChildByName('Label');
            label.getComponent('cc.Label').string = "详细信息";
            prefabBtn.on('click', function (event) {
                //this.OnUserRemovePlant();
            });
        } else if (type === enum_opbtn_remove) {
            // 铲除植物
            prefabBtn = cc.instantiate(this.opertorBtnPrefab);
            label = prefabBtn.getComponent('cc.Button').node.getChildByName('Label');
            label.getComponent('cc.Label').string = "铲除植物";
            prefabBtn.on('click', function (event) {
                this.OnUserRemovePlant();
            }.bind(this));
        } else if (type === enum_opbtn_manure) {
            // 施肥
            prefabBtn = cc.instantiate(this.opertorBtnPrefab);
            label = prefabBtn.getComponent('cc.Button').node.getChildByName('Label');
            label.getComponent('cc.Label').string = "施肥";
            prefabBtn.on('click', function (event) {
                GameEvent().SendEvent("OpenPackage", "manure");
            });
        } else if (type === enum_opbtn_harvest) {
            // 摘取果实
            prefabBtn = cc.instantiate(this.opertorBtnPrefab);
            label = prefabBtn.getComponent('cc.Button').node.getChildByName('Label');
            label.getComponent('cc.Label').string = "收割果实";
            prefabBtn.on('click', function (event) {
                this.OnUserHarvest();
            }.bind(this));
        } else if (type === enum_opbtn_water) {
            // 浇水
        } else if (type === enum_opbtn_degrass) {
            // 除草
        } else if (type === enum_opbtn_debug) {
            // 除虫
        }

        return prefabBtn;
    },

    OnUserSowSeed: function OnUserSowSeed(event) {
        var seedId = event.detail;
        if (this.selectLandIndex >= 0) {
            this.CancelOperatorLands(this.lastHightLight);
            var landIndex = this.selectLandIndex;

            var obj = { type: 'sowSeeds', seedId: seedId, landIndex: landIndex };
            var msg = JSON.stringify(obj);
            GameSocket().Send(msg);
        }
    },

    OnUserManure: function OnUserManure(event) {
        var propertyId = event.detail;
        if (this.selectLandIndex >= 0) {
            this.CancelOperatorLands(this.lastHightLight);
            var landIndex = this.selectLandIndex;

            var obj = { type: 'manure', propertyId: propertyId, landIndex: landIndex };
            var msg = JSON.stringify(obj);
            GameSocket().Send(msg);
        }
    },

    OnUserRemovePlant: function OnUserRemovePlant(event) {
        if (this.selectLandIndex >= 0) {
            this.CancelOperatorLands(this.lastHightLight);
            var landIndex = this.selectLandIndex;

            // 这里最好添加一个二次确认框.

            var obj = { type: 'removePlant', landIndex: landIndex };
            var msg = JSON.stringify(obj);
            GameSocket().Send(msg);
        }
    },

    OnUserHarvest: function OnUserHarvest(event) {
        if (this.selectLandIndex >= 0) {
            this.CancelOperatorLands(this.lastHightLight);
            var landIndex = this.selectLandIndex;

            var obj = { type: 'harvest', landIndex: landIndex };
            var msg = JSON.stringify(obj);
            GameSocket().Send(msg);
        }
    }

});

cc._RFpop();
},{}],"harvestLands":[function(require,module,exports){
"use strict";
cc._RFpush(module, '4e41d4UI4ZAjJBpR13emG8I', 'harvestLands');
// script\handler\harvestLands.js

"use strict";

var MessageHandler = require("msgHandler");
var harvestSuccess = {};
harvestSuccess['interest'] = "harvestSuccess";
harvestSuccess['Process'] = function (message) {
    GameNotify().AddText("收割成功!");
};
MessageHandler.Add(harvestSuccess);

cc._RFpop();
},{"msgHandler":"msgHandler"}],"info":[function(require,module,exports){
"use strict";
cc._RFpush(module, '500c7bFHShCj5AZu+ZpNbsG', 'info');
// script\ui\info.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        roleName: cc.Label,
        level: cc.Label,
        money: cc.Label,
        expProgress: cc.ProgressBar
    },

    // use this for initialization
    onLoad: function onLoad() {
        GameEvent().OnEvent("UpdateBaseData", this.ReLoadData, this);
        GameEvent().OnEvent("UpdateUserInfo", this.ReLoadData, this);
    },

    OnShow: function OnShow() {
        this.node.active = true;
    },

    OnHide: function OnHide() {
        this.node.active = false;
    },

    ReLoadData: function ReLoadData() {
        var gameData = window.GameData;
        this.roleName.string = gameData.GetUserName();
        this.money.string = gameData.GetMoney();
        this.level.string = "Lv." + gameData.GetLevel();
        this.expProgress.progress = gameData.GetLevelExp() / gameData.GetLevelExpMax();
        this.expProgress.totalLength = gameData.GetLevelExpMax();
        var text = this.expProgress.node.getChildByName("value").getComponent('cc.Label');
        text.string = gameData.GetLevelExp() + "/" + gameData.GetLevelExpMax();
    }

});

cc._RFpop();
},{}],"loginHandler":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'dc886cpH0JA95NAuisHz8Rb', 'loginHandler');
// script\handler\loginHandler.js

"use strict";

var MessageHandler = require("msgHandler");
var loginSuccess = {};
loginSuccess['interest'] = "loginSuccess";
loginSuccess['Process'] = function (message) {
    GameEvent().SendEvent("LoginSuccess");
};
MessageHandler.Add(loginSuccess);

cc._RFpop();
},{"msgHandler":"msgHandler"}],"login":[function(require,module,exports){
"use strict";
cc._RFpush(module, '69ac94zGKRA/rekHALWuDIK', 'login');
// script\ui\login.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        loginBtn: cc.Button,
        registerBtn: cc.Button,
        inputAccount: cc.EditBox,
        inputPassword: cc.EditBox
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.loginBtn.node.on('click', this.OnLogin, this);
        this.registerBtn.node.on('click', this.OnRegister, this);
    },

    // 
    OnShow: function OnShow() {
        this.node.active = true;
    },

    OnHide: function OnHide() {
        this.node.active = false;
    },

    // 登录
    OnLogin: function OnLogin(event) {
        if (this.inputAccount.string.length === 0) {
            GameNotify().AddText("请输入账号");
            return;
        }
        if (this.inputPassword.string.length === 0) {
            GameNotify().AddText("请输入密码 ");
            return;
        }

        var obj = { type: 'login', account: this.GetAccount(), password: this.GetPassword() };
        var msg = JSON.stringify(obj);
        GameSocket().Send(msg);
    },

    // 注册 
    OnRegister: function OnRegister(event) {
        GameEvent().SendEvent("GoRegister");
    },

    GetAccount: function GetAccount() {
        return this.inputAccount.string;
    },

    GetPassword: function GetPassword() {
        return this.inputPassword.string;
    }

});

cc._RFpop();
},{}],"main":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'f6babQhRldN7qU5r2qiWXpj', 'main');
// script\ui\main.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        infoPnl: cc.Node,
        toolbarPnl: cc.Node,
        loginPnl: cc.Node,
        registerPnl: cc.Node,
        shopPnl: cc.Node,
        packagePnl: cc.Node,
        buySeedPnl: cc.Node,
        buyPropPnl: cc.Node,
        sellFruitPnl: cc.Node,
        warehousePnl: cc.Node
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.HideAllPnl();
        GameLog("main onLoad");

        var audioMng = window.AudioMng();
        //if (audioMng) audioMng.playMusic();
    },

    start: function start() {
        GameSocket().Connect("localhost", 34443);
        GameEvent().OnEvent("connectedServer", this.OnConectServe, this);
        GameEvent().OnEvent("GoRegister", this.OnGoRegister, this);
        GameEvent().OnEvent("LoginSuccess", this.OnLoginSuccess, this);
        GameEvent().OnEvent("CancelRegister", this.OnCancelRegister, this);
        GameEvent().OnEvent("RegisterSuccess", this.OnRegisterSuccess, this);
        GameEvent().OnEvent("BuyItemsSuccess", this.OnBuyItemsSuccess, this);

        GameEvent().OnEvent("OpenShop", this.OnOpenShop, this);
        GameEvent().OnEvent("OpenPackage", this.OnOpenPackage, this);
        GameEvent().OnEvent("OpenBuySeed", this.OnOpenBuySeed, this);
        GameEvent().OnEvent("OpenBuyProperty", this.OnOpenBuyProperty, this);
        GameEvent().OnEvent("OpenWarehouse", this.OnOpenWarehouse, this);
        GameEvent().OnEvent("OpenSellFruit", this.OnOpenSellFruit, this);
    },

    HideAllPnl: function HideAllPnl() {
        this.infoPnl.getComponent("info").OnHide();
        this.toolbarPnl.getComponent("toolbar").OnHide();
        this.loginPnl.getComponent("login").OnHide();
        this.registerPnl.getComponent("register").OnHide();
        this.shopPnl.getComponent("shop").OnHide();
        this.packagePnl.getComponent("package").OnHide();
        this.buySeedPnl.getComponent("buySeed").OnHide();
        this.buyPropPnl.getComponent("buyProperty").OnHide();
        this.sellFruitPnl.getComponent("sellFruit").OnHide;
        this.warehousePnl.getComponent("warehouse").OnHide();
    },

    OnConectServe: function OnConectServe(event) {
        GameLog("OnConectServe");
        this.loginPnl.getComponent("login").OnShow();
    },

    OnGoRegister: function OnGoRegister(event) {
        this.loginPnl.getComponent("login").OnHide();
        this.registerPnl.getComponent("register").OnShow();
    },

    OnLoginSuccess: function OnLoginSuccess(event) {
        GameLog("登录成功");
        this.HideAllPnl();
        this.infoPnl.getComponent("info").OnShow();
        this.toolbarPnl.getComponent("toolbar").OnShow();
    },

    OnCancelRegister: function OnCancelRegister(event) {
        this.loginPnl.getComponent("login").OnShow();
        this.registerPnl.getComponent("register").OnHide();
    },

    OnRegisterSuccess: function OnRegisterSuccess(event) {
        this.loginPnl.getComponent("login").OnShow();
        this.registerPnl.getComponent("register").OnHide();
    },

    OnBuyItemsSuccess: function OnBuyItemsSuccess(event) {
        this.buySeedPnl.getComponent("buySeed").OnHide();
        this.buyPropPnl.getComponent("buyProperty").OnHide();
    },

    OnOpenShop: function OnOpenShop(event) {
        this.shopPnl.getComponent("shop").OnShow();
    },

    OnOpenPackage: function OnOpenPackage(event) {
        var script = this.packagePnl.getComponent("package");
        script.OnShow();
        script.OpenWith(event.detail);
    },

    OnOpenBuySeed: function OnOpenBuySeed(event) {
        var script = this.buySeedPnl.getComponent("buySeed");
        script.OnShow();
        script.Setup(event.detail);
    },

    OnOpenBuyProperty: function OnOpenBuyProperty(event) {
        var script = this.buyPropPnl.getComponent("buyProperty");
        script.OnShow();
        script.Setup(event.detail);
    },

    OnOpenWarehouse: function OnOpenWarehouse(event) {
        var script = this.warehousePnl.getComponent("warehouse");
        script.OnShow();
    },

    OnOpenSellFruit: function OnOpenSellFruit(event) {
        var script = this.sellFruitPnl.getComponent("sellFruit");
        script.OnShow();
        script.Setup(event.detail);
    }

});

cc._RFpop();
},{}],"manureLands":[function(require,module,exports){
"use strict";
cc._RFpush(module, '19dd9UWpJ1Il7IACP7pUdMq', 'manureLands');
// script\handler\manureLands.js

"use strict";

var MessageHandler = require("msgHandler");
var manureSuccess = {};
manureSuccess['interest'] = "manureSuccess";
manureSuccess['Process'] = function (message) {
    GameNotify().AddText("施肥成功!");
};
MessageHandler.Add(manureSuccess);

cc._RFpop();
},{"msgHandler":"msgHandler"}],"msgHandler":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'bf199399u1H4Z4f07UIDO9L', 'msgHandler');
// script\msgHandler.js

'use strict';

// 18:30 2017/3/22
// create by lsh

;(function () {

    var MessageHandler = {};

    MessageHandler.Add = function (handler) {
        if (typeof handler.interest === 'string' && typeof handler.Process === 'function') {
            this[handler.interest] = handler.Process;
            GameLog("Add handler :" + handler.interest);
        } else {
            GameLog("error type of handler" + handler);
        }
    };

    MessageHandler.Process = function (msg) {
        if (typeof msg.type === 'string' && typeof this[msg.type] === 'function') {
            this[msg.type](msg);
        } else {
            GameLog("invalid massage ->>" + msg);
        }
    };

    if (typeof module !== 'undefined') module.exports = MessageHandler;

    if (typeof window !== 'undefined') window.MessageHandler = MessageHandler;
})();

cc._RFpop();
},{}],"notifyText":[function(require,module,exports){
"use strict";
cc._RFpush(module, '6311aEnqulPi492lRJveIXd', 'notifyText');
// script\notifyText.js

"use strict";

var NotifyText = cc.Class({
    extends: cc.Component,

    properties: {
        textPrefab: cc.Prefab
    },

    statics: {
        inst: null
    },

    // use this for initialization
    onLoad: function onLoad() {
        NotifyText.inst = this;
        this.entityPool = new cc.NodePool();
        var initCount = 5;
        for (var i = 0; i < initCount; ++i) {
            var entity = cc.instantiate(this.textPrefab); // 创建节点
            this.entityPool.put(entity); // 通过 putInPool 接口放入对象池
        }
    },

    AddText: function AddText(text, color, fontSize) {

        var notify = null;
        if (this.entityPool.size() > 0) {
            // 通过 size 接口判断对象池中是否有空闲的对象
            notify = this.entityPool.get();
        } else {
            // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            notify = cc.instantiate(this.textPrefab);
        }

        notify.parent = this.node;
        notify.color = color ? color : cc.Color.GREEN;
        var label = notify.getComponent("cc.Label");
        label.string = text;
        label.fontSize = fontSize ? fontSize : 30;

        var size = cc.director.getWinSize();
        var move = cc.moveBy(2, cc.p(0, size.height / 8 * 3));
        var fadeOunt = cc.fadeOut(1.0);
        var callback = cc.callFunc(this._RemoveText, this, notify);
        var action = cc.sequence(move, fadeOunt, callback);
        notify.runAction(action);
    },

    _RemoveText: function _RemoveText(notify) {
        this.node.removeChild(notify);
        this.entityPool.put(notify);
    }

});

cc._RFpop();
},{}],"package":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'f19b3ye65tJmY2tT2nWSo9d', 'package');
// script\ui\package.js

"use strict";

var enum_reason_normal = 0;
var enum_reason_sow = 1;
var enum_reason_manure = 2;

cc.Class({
    extends: cc.Component,

    properties: {
        seedPrefab: cc.Prefab,
        propertyPrefab: cc.Prefab,
        scrollView: cc.ScrollView,

        radioButton: {
            default: [],
            type: cc.Toggle
        },

        _currentToggle: cc.Toggle,

        closeBtn: cc.Button
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.closeBtn.node.on('click', this.OnClose, this);

        for (var i = 0; i < this.radioButton.length; ++i) {
            if (this.radioButton[i].isChecked) {
                this._currentToggle = this.radioButton[i];
                break;
            }
        }

        // 感兴趣背包更新 
        GameEvent().OnEvent("UpdatePackage", this.Load, this);
    },

    OnShow: function OnShow() {
        this.node.active = true;
        this.Load();
    },

    OnHide: function OnHide() {
        this.node.active = false;
    },

    Load: function Load() {
        if (!this.node.active) return;

        var index = this.radioButton.indexOf(this._currentToggle);
        if (index >= 0) {
            var group = new Array(["plant", this.seedPrefab, this.InitSeedPrefab], ["property", this.propertyPrefab, this.InitPropPrefab]);

            var content = this.scrollView.content;
            content.removeAllChildren();
            if (group.length > index) {
                var gameData = window.GameData;
                var package_ = gameData.package;
                if (typeof package_[index] !== 'undefined') {
                    var itemId, config, prefab;
                    for (var key in package_[index]) {
                        if (package_[index][key] > 0) {
                            itemId = key;
                            config = Table.GetEntry(group[index][0], itemId);
                            prefab = cc.instantiate(group[index][1]);
                            group[index][2].bind(this)(prefab, config, package_[index][key]);
                            content.addChild(prefab);
                        }
                    }
                    this.scrollView.scrollToTop(0.1);
                }
            }
        }
    },

    OpenWith: function OpenWith(reason) {
        if (typeof reason === 'undefined') {
            this.openReason = enum_reason_normal;
        } else {
            if (reason === "sow") {
                this.openReason = enum_reason_sow;
                this.radioButton[0].check();
            } else if (reason === "manure") {
                this.openReason = enum_reason_manure;
                this.radioButton[1].check();
            } else {
                this.openReason = enum_reason_normal;
            }
        }
    },

    InitSeedPrefab: function InitSeedPrefab(prefab, config, count) {
        var name = prefab.getChildByName("name").getComponent('cc.Label');
        name.string = config.name;
        var level = prefab.getChildByName("level").getComponent('cc.Label');
        level.string = config.minLevel + "级";
        var number = prefab.getChildByName("count").getComponent('cc.Label');
        number.string = "数量:" + count;
        prefab.config = config;
        // 点击回调
        prefab.on(cc.Node.EventType.TOUCH_END, function (event) {
            //this.OnOpenBuySeed(event.target.config);
            //GameLog(event.target.config);
            this.OnSeedClick(event.target.config);
        }.bind(this));
    },

    InitPropPrefab: function InitPropPrefab(prefab, config, count) {
        var name = prefab.getChildByName("name").getComponent('cc.Label');
        name.string = config.name;
        var number = prefab.getChildByName("count").getComponent('cc.Label');
        number.string = "数量:" + count;
        prefab.config = config;
        // 点击回调
        prefab.on(cc.Node.EventType.TOUCH_END, function (event) {
            this.OnPropertyClikc(event.target.config);
        }.bind(this));
    },

    radioButtonClicked: function radioButtonClicked(toggle) {
        if (this._currentToggle !== toggle) {
            this._currentToggle = toggle;
            this.Load();
        }
    },

    OnSeedClick: function OnSeedClick(config) {
        if (this.openReason === enum_reason_sow) {
            this.OnHide();
            GameEvent().SendEvent("UserSowSeeds", config.id);
        }
    },

    OnPropertyClikc: function OnPropertyClikc(config) {
        if (this.openReason === enum_reason_manure) {
            this.OnHide();
            GameEvent().SendEvent("UserManure", config.id);
        }
    },

    OnClose: function OnClose() {
        this.OnHide();
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"registerHander":[function(require,module,exports){
"use strict";
cc._RFpush(module, '0d938HjkqRBhprE7RodwBx1', 'registerHander');
// script\handler\registerHander.js

"use strict";

var MessageHandler = require("msgHandler");
var regSuccess = {};
regSuccess['interest'] = "registerSuccess";
regSuccess['Process'] = function (message) {
    // GameLog(message);
    GameEvent().SendEvent("RegisterSuccess");
};
MessageHandler.Add(regSuccess);

cc._RFpop();
},{"msgHandler":"msgHandler"}],"register":[function(require,module,exports){
"use strict";
cc._RFpush(module, '83632q929pAyqfS/6vYW90v', 'register');
// script\ui\register.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        registerBtn: cc.Button,
        cancelBtn: cc.Button,
        inputAccount: cc.EditBox,
        inputPassword: cc.EditBox
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.registerBtn.node.on('click', this.OnRegister, this);
        this.cancelBtn.node.on('click', this.OnCancel, this);
    },

    // 
    OnShow: function OnShow() {
        this.node.active = true;
    },

    OnHide: function OnHide() {
        this.node.active = false;
    },

    OnRegister: function OnRegister(event) {
        if (this.inputAccount.string.length === 0) {
            GameNotify().AddText("请输入账号");
            return;
        }
        if (this.inputPassword.string.length === 0) {
            GameNotify().AddText("请输入密码 ");
            return;
        }

        var obj = { type: 'register', account: this.GetAccount(), password: this.GetPassword() };
        var msg = JSON.stringify(obj);
        GameSocket().Send(msg);
    },

    OnCancel: function OnCancel(event) {
        GameEvent().SendEvent("CancelRegister");
    },

    GetAccount: function GetAccount() {
        return this.inputAccount.string;
    },

    GetPassword: function GetPassword() {
        return this.inputPassword.string;
    }

});

cc._RFpop();
},{}],"removePlant":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'fac37jQz3lLp43mZnamrGPh', 'removePlant');
// script\handler\removePlant.js

"use strict";

var MessageHandler = require("msgHandler");
var removePlantSuccess = {};
removePlantSuccess['interest'] = "removePlantSuccess";
removePlantSuccess['Process'] = function (message) {
    GameLog(message);
    GameNotify().AddText("铲除成功");
};
MessageHandler.Add(removePlantSuccess);

cc._RFpop();
},{"msgHandler":"msgHandler"}],"sellFruitHander":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'e076d1POXxMkY6zps6Ur9SM', 'sellFruitHander');
// script\handler\sellFruitHander.js

"use strict";

var MessageHandler = require("msgHandler");
var sellFruitSuccess = {};
sellFruitSuccess['interest'] = "sellFruitSuccess";
sellFruitSuccess['Process'] = function (message) {
    GameNotify().AddText("出售成功!");
};
MessageHandler.Add(sellFruitSuccess);

cc._RFpop();
},{"msgHandler":"msgHandler"}],"sellFruit":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'f9346Fbh+BE7qdeCF0ceJ55', 'sellFruit');
// script\ui\sellFruit.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        addBtn: cc.Button,
        subBtn: cc.Button,
        sellBtn: cc.Button,
        cancelBtn: cc.Button,

        sellNumber: cc.Label,
        fruitName: cc.Label,
        price: cc.Label,
        amount: cc.Label
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.addBtn.node.on('click', this.OnAdd, this);
        this.subBtn.node.on('click', this.OnSub, this);
        this.sellBtn.node.on('click', this.OnSell, this);
        this.cancelBtn.node.on('click', function (event) {
            this.OnHide();
        }.bind(this));
    },

    OnShow: function OnShow() {
        this.node.active = true;
    },

    OnHide: function OnHide() {
        this.node.active = false;
    },

    OnAdd: function OnAdd(event) {
        this.sellCount += 1;
        if (this.sellCount <= 0) {
            this.sellCount = 1;
        }

        if (this.sellCount > this.hasCount) {
            this.sellCount = this.hasCount;
            this.addBtn.interactable = false;
        } else {
            this.addBtn.interactable = true;
        }

        this.sellNumber.string = this.sellCount;
        this.amount.string = this.sellCount * this.sellPrice + "金币";

        if (this.sellCount > 1) {
            this.subBtn.interactable = true;
        }
    },
    OnSub: function OnSub(event) {
        this.sellCount -= 1;
        if (this.sellCount <= 0) {
            this.sellCount = 1;
            this.subBtn.interactable = false;
        }

        this.sellNumber.string = this.sellCount;
        this.amount.string = this.sellCount * this.sellPrice + "金币";

        if (this.sellCount < this.hasCount) {
            this.addBtn.interactable = true;
        }
    },

    OnSell: function OnSell(event) {
        var gameData = window.GameData;
        if (gameData.GetMoney() < this.sellCount * this.sellPrice) {
            var errorEntry = Table.GetEntry("error", 6);
            if (errorEntry) {
                GameNotify().AddText(errorEntry.description, window.ErrorNotifyColor);
            } else {
                GameNotify().AddText("金币不足!", window.ErrorNotifyColor);
            }
            return;
        }

        var obj = { type: 'sellFruit', fruitId: this.fruitId, count: this.sellCount };
        var msg = JSON.stringify(obj);
        GameSocket().Send(msg);

        this.OnHide();
    },

    Setup: function Setup(config) {
        this.fruitName.string = config.fruit.name;
        this.price.string = config.fruit.price + "金币";

        this.fruitId = config.id;
        this.sellPrice = config.fruit.price;

        var gameData = window.GameData;
        this.hasCount = 0;
        if (typeof gameData.package[2][config.id] !== 'undefined' && gameData.package[2][config.id] > 0) {
            this.hasCount = gameData.package[2][config.id];
        }

        this.sellCount = this.hasCount;

        this.OnAdd();
    }
});

cc._RFpop();
},{}],"sell":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'bc2b7s9RRJKkoJCsF5ZJcqy', 'sell');
// script\ui\sell.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function onLoad() {}

});

cc._RFpop();
},{}],"shop":[function(require,module,exports){
"use strict";
cc._RFpush(module, '1b823M9uh9CW7iwBEZYCSqk', 'shop');
// script\ui\shop.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        shopSeedItemPrefab: cc.Prefab,
        shopPropItemPrefab: cc.Prefab,
        scrollView: cc.ScrollView,

        radioButton: {
            default: [],
            type: cc.Toggle
        },

        _currentToggle: cc.Toggle,

        closeBtn: cc.Button
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.closeBtn.node.on('click', this.OnClose, this);

        for (var i = 0; i < this.radioButton.length; ++i) {
            if (this.radioButton[i].isChecked) {
                this._currentToggle = this.radioButton[i];
                break;
            }
        }
    },

    OnShow: function OnShow() {
        this.node.active = true;
        this.Load();
    },

    OnHide: function OnHide() {
        this.node.active = false;
    },

    Load: function Load() {
        var index = this.radioButton.indexOf(this._currentToggle);
        if (index >= 0) {
            var group = new Array(["plant", this.shopSeedItemPrefab, this.InitSeedPrefab], ["property", this.shopPropItemPrefab, this.InitPropPrefab]);

            var content = this.scrollView.content;
            content.removeAllChildren();
            if (group.length > index) {
                var entry = Table.GetEntry("shop", index + 1);
                if (entry) {
                    if (entry.sell.length > 0) {
                        var itemId, config, prefab;
                        for (var i = 0; i < entry.sell.length; ++i) {
                            itemId = entry.sell[i];
                            config = Table.GetEntry(group[index][0], itemId);
                            prefab = cc.instantiate(group[index][1]);
                            group[index][2].bind(this)(prefab, config);
                            content.addChild(prefab);
                        }
                        this.scrollView.scrollToTop(0.1);
                    }
                }
            }
        }
    },

    InitSeedPrefab: function InitSeedPrefab(prefab, config) {
        var name = prefab.getChildByName("name").getComponent('cc.Label');
        name.string = config.name;
        var level = prefab.getChildByName("level").getComponent('cc.Label');
        level.string = config.minLevel + "级";
        var money = prefab.getChildByName("money").getComponent('cc.Label');
        money.string = config.buy + "金币";
        prefab.config = config;
        // 点击回调
        prefab.on(cc.Node.EventType.TOUCH_END, function (event) {
            this.OnOpenBuySeed(event.target.config);
        }.bind(this));
    },

    OnOpenBuySeed: function OnOpenBuySeed(config) {
        GameEvent().SendEvent("OpenBuySeed", config);
    },

    InitPropPrefab: function InitPropPrefab(prefab, config) {
        var name = prefab.getChildByName("name").getComponent('cc.Label');
        name.string = config.name;
        var money = prefab.getChildByName("money").getComponent('cc.Label');
        money.string = config.buy + "金币";
        prefab.config = config;
        // 点击回调
        prefab.on(cc.Node.EventType.TOUCH_END, function (event) {
            this.OnOpenBuyProp(event.target.config);
        }, this);
    },

    OnOpenBuyProp: function OnOpenBuyProp(config) {
        GameEvent().SendEvent("OpenBuyProperty", config);
    },

    radioButtonClicked: function radioButtonClicked(toggle) {
        if (this._currentToggle !== toggle) {
            this._currentToggle = toggle;
            this.Load();
        }
    },

    OnClose: function OnClose() {
        this.OnHide();
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"socket":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'a6873XdOGBBNaNL7VhdxpQ+', 'socket');
// script\socket.js

"use strict";

// 18:30 2017/3/22
// create by lsh

var Socket = cc.Class({
    extends: cc.Component,

    statics: {
        inst: null
    },

    // use this for initialization
    onLoad: function onLoad() {
        Socket.inst = this;
        this.connected = false;
        this.webSocket = null;
    },

    Connect: function Connect(address, port) {
        var self = this;
        if (self.webSocket) {
            return;
        } else {
            try {
                var ws = new WebSocket("ws://" + address + ":" + port);
                ws.onopen = function (event) {
                    self.connected = true;
                    self.webSocket = ws;
                    GameEvent().SendEvent('connectedServer');
                };
                ws.onmessage = function (event) {
                    self.OnReceiveMessage(event);
                };
                ws.onerror = function (event) {
                    GameLog("GameSocket error!!!!");
                };
                ws.onclose = function (event) {
                    GameLog("GameSocket closed.");
                    self.connected = false;
                    GameNotify().AddText("连接服务器失败!", new cc.Color(255, 32, 32));
                };
            } catch (e) {
                GameLog(e);
            }
        }
    },

    IsConnected: function IsConnected() {
        return this.connected;
    },

    OnReceiveMessage: function OnReceiveMessage(e) {
        var msg = e.data;
        console.log("Receive data:" + msg);
        try {
            var msgObj = JSON.parse(msg);
            MessageHandler.Process(msgObj);
        } catch (e) {
            GameLog(e);
        }
    },

    Send: function Send(msg) {
        if (this.connected) {
            this.webSocket.send(msg);
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"sowSeeds":[function(require,module,exports){
"use strict";
cc._RFpush(module, '8436dsX3GdA27FeT0WUC4mm', 'sowSeeds');
// script\handler\sowSeeds.js

"use strict";

var MessageHandler = require("msgHandler");
var sowSeedsSuccess = {};
sowSeedsSuccess['interest'] = "sowSeedsSuccess";
sowSeedsSuccess['Process'] = function (message) {
    GameLog(message);
    //var sccessEvent = new GameEvent(GameEvent.sowSeedsSuccess, true);
    //GameEventDispatch.DispatchEvent(sccessEvent);
    GameNotify().AddText("播种成功");
};
MessageHandler.Add(sowSeedsSuccess);

cc._RFpop();
},{"msgHandler":"msgHandler"}],"toolbar":[function(require,module,exports){
"use strict";
cc._RFpush(module, '0a2c4MVMjNCg4dSQx6HQWwO', 'toolbar');
// script\ui\toolbar.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        shopBtn: cc.Button,
        packageBtn: cc.Button
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.shopBtn.node.on('click', function () {
            GameEvent().SendEvent("OpenShop");
        });
        this.packageBtn.node.on('click', function () {
            GameEvent().SendEvent("OpenPackage");
        });
    },

    OnShow: function OnShow() {
        this.node.active = true;
    },

    OnHide: function OnHide() {
        this.node.active = false;
    }

});

cc._RFpop();
},{}],"unlockLands":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'acc5fKIFnlG1a8JmLDtwrEO', 'unlockLands');
// script\handler\unlockLands.js

"use strict";

var MessageHandler = require("msgHandler");
var unlockLandsSuccess = {};
unlockLandsSuccess['interest'] = "unlockLandsSuccess";
unlockLandsSuccess['Process'] = function (message) {
    GameLog(message);
    GameNotify().AddText("扩建土地成功");
};
MessageHandler.Add(unlockLandsSuccess);

cc._RFpop();
},{"msgHandler":"msgHandler"}],"userBaseData":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'aac4bOG2OBAEZ78IJJ4C9ry', 'userBaseData');
// script\handler\userBaseData.js

"use strict";

var MessageHandler = require("msgHandler");
var userBaseData = {};
userBaseData['interest'] = "userBaseData";
userBaseData['Process'] = function (message) {
    var gameData = window.GameData;
    gameData.userId = message.id;
    gameData.userName = message.username;
    gameData.money = message.money;
    gameData.experience = message.experience;
    gameData.vip = message.vip;
    gameData.lands = JSON.parse(message.lands);
    gameData.package = JSON.parse(message.package);

    GameEvent().SendEvent("UpdateBaseData");
};
MessageHandler.Add(userBaseData);

cc._RFpop();
},{"msgHandler":"msgHandler"}],"userDataSync":[function(require,module,exports){
"use strict";
cc._RFpush(module, '37dc3E2WXtHFbxFN5E1HTL1', 'userDataSync');
// script\handler\userDataSync.js

"use strict";

var MessageHandler = require("msgHandler");
var userDataSync = {};
userDataSync['interest'] = "userDataSync";
userDataSync['Process'] = function (message) {

    var gameData = window.GameData;
    var updateUserInfo = false;
    if (typeof message.money !== 'undefined') {
        gameData.money = message.money;
        updateUserInfo = true;
    }

    if (typeof message.experience !== 'undefined') {
        gameData.experience = message.experience;
        updateUserInfo = true;
    }

    if (typeof message.vip !== 'undefined') {
        gameData.vip = message.vip;
        updateUserInfo = true;
    }

    if (typeof message.lands !== 'undefined') {
        gameData.lands = JSON.parse(message.lands);
        GameEvent().SendEvent("UpdateLands");
    }

    if (typeof message.package !== 'undefined') {
        gameData.package = JSON.parse(message.package);

        GameEvent().SendEvent("UpdatePackage");
    }

    if (updateUserInfo) {
        GameEvent().SendEvent("UpdateUserInfo");
    }
};
MessageHandler.Add(userDataSync);

cc._RFpop();
},{"msgHandler":"msgHandler"}],"warehouse":[function(require,module,exports){
"use strict";
cc._RFpush(module, '5f12bh6LmFEorn6viVVDOUf', 'warehouse');
// script\ui\warehouse.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        fruitPrefab: cc.Prefab,
        scrollView: cc.ScrollView,
        closeBtn: cc.Button
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.closeBtn.node.on('click', this.OnClose, this);

        // 感兴趣背包更新 
        GameEvent().OnEvent("UpdatePackage", this.Load, this);
    },

    OnShow: function OnShow() {
        this.node.active = true;
        this.Load();
    },

    OnHide: function OnHide() {
        this.node.active = false;
    },

    Load: function Load() {
        if (!this.node.active) return;

        var content = this.scrollView.content;
        content.removeAllChildren();
        var gameData = window.GameData;
        var package_ = gameData.package;
        var index = 2; // 果实
        if (typeof package_[index] !== 'undefined') {
            var itemId, config, prefab;
            for (var key in package_[index]) {
                if (package_[index][key] > 0) {
                    itemId = key;
                    config = Table.GetEntry("plant", itemId);
                    prefab = cc.instantiate(this.fruitPrefab);
                    this.InitFruitPrefab(prefab, config, package_[index][key]);
                    content.addChild(prefab);
                }
            }
            this.scrollView.scrollToTop(0.1);
        }
    },

    InitFruitPrefab: function InitFruitPrefab(prefab, config, count) {
        var name = prefab.getChildByName("name").getComponent('cc.Label');
        name.string = config.fruit.name;
        var level = prefab.getChildByName("level").getComponent('cc.Label');
        level.string = config.minLevel + "级";
        var number = prefab.getChildByName("count").getComponent('cc.Label');
        number.string = "数量:" + count;
        prefab.config = config;
        // 点击回调
        prefab.on(cc.Node.EventType.TOUCH_END, function (event) {
            this.OnFruitClick(event.target.config);
        }.bind(this));
    },

    OnFruitClick: function OnFruitClick(config) {
        GameEvent().SendEvent("OpenSellFruit", config);
    },

    OnClose: function OnClose() {
        this.OnHide();
    }
});

cc._RFpop();
},{}]},{},["AudioMng","ButtonScaler","Table","canvas","gameData","gameEvent","gameLayer","buyItemsHandler","error","harvestLands","loginHandler","manureLands","registerHander","removePlant","sellFruitHander","sowSeeds","unlockLands","userBaseData","userDataSync","msgHandler","notifyText","socket","buyProperty","buySeed","info","login","main","package","register","sell","sellFruit","shop","toolbar","warehouse"]);
