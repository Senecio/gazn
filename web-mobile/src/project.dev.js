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
        this.time.string = config.time.amount / 60 + "小时";
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
},{}],"clearDisaster":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'a7ba5iZgTVCs65ppDPuBXvh', 'clearDisaster');
// script\handler\clearDisaster.js

"use strict";

var MessageHandler = require("msgHandler");
var clearDisasterSuccess = {};
clearDisasterSuccess['interest'] = "clearDisasterSuccess";
clearDisasterSuccess['Process'] = function (message) {
    GameEvent().SendEvent("ClearDisasterSuccess");
    if (message.disasterType === 1) {
        GameNotify().AddText("除虫成功!");
    } else if (message.disasterType === 2) {
        GameNotify().AddText("浇水成功!");
    } else if (message.disasterType === 3) {
        GameNotify().AddText("营养添加成功!");
    }
};
MessageHandler.Add(clearDisasterSuccess);

cc._RFpop();
},{"msgHandler":"msgHandler"}],"detail":[function(require,module,exports){
"use strict";
cc._RFpush(module, '0b4fcmzcGxLiKOLDwR+Zvy2', 'detail');
// script\ui\detail.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        scrollView: cc.ScrollView,
        closeBtn: cc.Button,
        log1Prefab: cc.Prefab,
        log2Prefab: cc.Prefab,
        log3Prefab: cc.Prefab
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.closeBtn.node.on('click', this.OnClose, this);

        GameEvent().OnEvent("UpdateLogs", this.ReLoad, this);
    },

    OnClose: function OnClose() {
        this.OnHide();
    },

    OnShow: function OnShow() {
        this.node.active = true;

        this.RequstLogs();
        this.ReLoad();
    },

    OnHide: function OnHide() {
        this.node.active = false;
    },

    RequstLogs: function RequstLogs() {
        var obj = { type: 'getLogs' };
        var msg = JSON.stringify(obj);
        GameSocket().Send(msg);
    },

    ReLoad: function ReLoad() {
        var gameData = window.GameData;
        var logs = gameData.logs;
        var content = this.scrollView.content;
        content.removeAllChildren();
        var prefab;
        for (var i = 0; i < logs.length; ++i) {
            prefab = this.InitLogPerfab(logs[i]);
            if (prefab) {
                content.addChild(prefab);
            }
        }
        this.scrollView.scrollToTop(0.1);
    },

    InitLogPerfab: function InitLogPerfab(log) {
        var prefab = null,
            str,
            richText = null;
        var data = JSON.parse(log.data);
        var nowTime = new Date();
        var logTime = new Date(log.time);
        var timeStr = "";
        if (nowTime.getFullYear() === logTime.getFullYear() && nowTime.getMonth() === logTime.getMonth()) {
            if (nowTime.getDate() === logTime.getDate()) {
                timeStr = "今天";
            } else if (nowTime.getDate() - 1 === logTime.getDate()) {
                timeStr = "昨天";
            }
        }

        if (timeStr.length === 0) {
            if (logTime.getMonth() < 9) {
                timeStr += "0" + (logTime.getMonth() + 1);
            } else {
                timeStr += logTime.getMonth() + 1;
            }

            if (nowTime.getDate() < 10) {
                timeStr += "0" + (logTime.getDate() + 1);
            } else {
                timeStr += logTime.getDate();
            }
        }

        if (log.type === 1) {
            // 偷盗
            var seedCfg = Table.GetEntry("plant", data[2]);

            if (data[4] === -1) {
                prefab = cc.instantiate(this.log1Prefab);
                richText = prefab.getComponent(cc.RichText);
                str = richText.string;
                str = str.replace(/name/, data[1]);
                str = str.replace(/fruitName/, seedCfg.fruit.name);
                str = str.replace(/number/, data[3]);
            } else {
                prefab = cc.instantiate(this.log2Prefab);
                str = prefab.getComponent(cc.RichText).string;
                str = str.replace(/name/, data[1]);
                str = str.replace(/fruitName/, seedCfg.fruit.name);
                str = str.replace(/number1/, data[3]);
                str = str.replace(/number1/, data[4]);
            }
        } else if (log.type === 2) {
            // 除灾
            prefab = cc.instantiate(this.log3Prefab);
            richText = prefab.getComponent(cc.RichText);
            str = richText.string;
            str = str.replace(/name/, data[1]);
            if (log.subType === 1) {
                str = str.replace(/disasterName/, "虫灾");
            } else if (log.subType === 2) {
                str = str.replace(/disasterName/, "旱灾");
            } else if (log.subType === 3) {
                str = str.replace(/disasterName/, "营养流失");
            }
            str = str.replace(/exp/, data[2]);
        }

        str = str.replace(/time/, timeStr);
        if (richText) richText.string = str;

        return prefab;
    }

});

cc._RFpop();
},{}],"duihuan":[function(require,module,exports){
"use strict";
cc._RFpush(module, '1d27dYq6JxBM6T6fiQdrByj', 'duihuan');
// script\ui\duihuan.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        shangpinItem: cc.Prefab,
        shangpinScroll: cc.ScrollView,
        shangpinImg: cc.Sprite,
        shangpinNameLab: cc.Label,
        conditionLab: cc.Label,
        shangpinNumLab: cc.Label,
        shangpinSubBtn: cc.Button,
        shangpinAddBtn: cc.Button,
        duihuanBtn: cc.Button
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
},{"msgHandler":"msgHandler"}],"friendHandler":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'e1968tX8cNPGK0xKOkWCgEw', 'friendHandler');
// script\handler\friendHandler.js

"use strict";

var MessageHandler = require("msgHandler");
var addFriendSuccess = {};
addFriendSuccess['interest'] = "addFriendSuccess";
addFriendSuccess['Process'] = function (message) {
    GameNotify().AddText("添加好友成功!");
};
MessageHandler.Add(addFriendSuccess);

var removeFriendSuccess = {};
removeFriendSuccess['interest'] = "removeFriendSuccess";
removeFriendSuccess['Process'] = function (message) {
    GameNotify().AddText("删除好友成功!");
};
MessageHandler.Add(removeFriendSuccess);

cc._RFpop();
},{"msgHandler":"msgHandler"}],"friendsList":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'cd235UIPCVNzJPpfOP1Jw+z', 'friendsList');
// script\handler\friendsList.js

"use strict";

var MessageHandler = require("msgHandler");
var friendsList = {};
friendsList['interest'] = "friendsList";
friendsList['Process'] = function (message) {
    var gameData = window.GameData;
    gameData.friendsList = message.list.slice();
    GameEvent().SendEvent("UpdateFriendsList");
};
MessageHandler.Add(friendsList);

var friendsListSuccess = {};
friendsListSuccess['interest'] = "friendsListSuccess";
friendsListSuccess['Process'] = function (message) {
    var gameData = window.GameData;
    gameData.friendsList = message.list.slice();
    GameEvent().SendEvent("UpdateFriendsList");
};
MessageHandler.Add(friendsListSuccess);

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
    package: [],
    neighbourList: [],
    friendsList: [],
    visitUser: {},
    logs: []
  };

  GameData.GetUserId = function () {
    return this.userId;
  };

  GameData.GetUserName = function () {
    return this.userName;
  };

  GameData.GetMoney = function () {
    return this.money;
  };

  GameData.GetLevel = function () {
    var level = 1;
    if (this.experience > 0) {
      level = level + Math.floor(this.experience / 200);
    }

    return level;
  };

  GameData.GetLevelByExp = function (experience) {
    var level = 1;
    if (experience > 0) {
      level = level + Math.floor(experience / 200);
    }

    return level;
  };

  GameData.GetLevelExp = function () {
    return this.experience % 200;
  };

  GameData.GetLevelExpByExp = function (experience) {
    return experience % 200;
  };

  GameData.GetLevelExpMax = function () {
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

'use strict';

var enum_opbtn_sow = 1;
var enum_opbtn_info = 2;
var enum_opbtn_remove = 3;
var enum_opbtn_manure = 4;
var enum_opbtn_harvest = 5;
var enum_opbtn_water = 6;
var enum_opbtn_extraNutrition = 7;
var enum_opbtn_debug = 8;
var enum_opbtn_steal = 9;
var enum_opbtn_upgread = 10;

var enum_landsState_idle = 0;
var enum_landsState_grow = 1;
var eunm_landsState_harvested = 2;

var MinuteToMicroSecond = 60000;
var HourToMicroSecond = 3600000;
var HourToMinute = 60;

function GetPart(sowTime, disasterTime, timeParts, effectParent, clearDisasterTime) {
    var c = 0;
    var array = [0, 0, 0];
    if (disasterTime < sowTime) {
        return array;
    }
    var a = Math.floor((disasterTime - sowTime) / MinuteToMicroSecond);
    for (var i = 0; i < 3; ++i) {
        c += timeParts[i];
        if (c > a) {
            if (typeof clearDisasterTime !== 'undefined' && clearDisasterTime) {
                var d = Math.floor((clearDisasterTime - disasterTime) / MinuteToMicroSecond);
                if (c - a > d) {
                    array[i] = Math.floor(d / HourToMinute * effectParent);
                } else {
                    array[i] = Math.floor((c - a) / HourToMinute * effectParent);
                    d -= c - a;
                    while (++i < 3) {
                        if (d > timeParts[i]) {
                            array[i] = Math.floor(timeParts[i] / HourToMinute * effectParent);
                            d -= timeParts[i];
                        } else {
                            array[i] = Math.floor(d / HourToMinute * effectParent);
                            break;
                        }
                    }
                }
                break;
            }

            array[i] = Math.floor((c - a) / HourToMinute * effectParent);
            c = 0;
            a = 0;
        }
    }
    return array;
}

function IsMatured(reduceMinuteArray, nowTime, sowTime, disasterTime, timeParts, effectParent, clearDisasterTime) {
    var g = Math.floor((nowTime - sowTime) / MinuteToMicroSecond);
    var a = g;

    var incArray = [0, 0, 0];
    if (typeof disasterTime !== 'undefined' && disasterTime) {
        incArray = GetPart(sowTime, disasterTime, timeParts, effectParent, clearDisasterTime);
    }

    for (var i = 0; i < 3; ++i) {
        if (timeParts[i] + incArray[i] > reduceMinuteArray[i] + a) {
            return [false, i, timeParts[i] + incArray[i] - reduceMinuteArray[i] - a];
        } else {
            a = reduceMinuteArray[i] + a - (timeParts[i] + incArray[i]);
        }
    }
    return [true];
}

function GetDisasterCast(land, disasterCfg, seedCfg) {

    var cast = 0;
    var clearDisasterTime = typeof land.clearDisasterTime !== 'undefined' ? land.clearDisasterTime : new Date().getTime();
    if (typeof land.disasterTime !== 'undefined' && clearDisasterTime > land.disasterTime && (land.disasterType === 1 || land.disasterType === 3)) {
        var t = clearDisasterTime - land.disasterTime;
        var d = Math.floor(t / MinuteToMicroSecond / HourToMinute);
        cast = d * disasterCfg.effect1;
        cast = Math.min(cast, disasterCfg.maxEffect1);
        cast = Math.floor(seedCfg.output * cast);
    }

    return cast;
}

cc.Class({
    extends: cc.Component,

    properties: {
        landsPrefab: cc.Prefab,
        opertorBtnPrefab: cc.Prefab,
        cangKuSpr: cc.Sprite,
        //landsOffsetX : { default : 0, type : cc.Integer },
        //landsOffsetY : { default : 0, type : cc.Integer }

        refreshSecond: { default: 30, type: cc.Float }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.scrollView = this.node.getComponent("cc.ScrollView");
        this.content = this.scrollView.content;
        this.lands = this.content.getChildByName("lands");
        this.touchNode = this.content.getChildByName("touchNode");
        this.scrollView.horizontal = false;
        this.scrollView.vertical = false;
        this.ReLoadFunc = null;
        this.OperatorFunc = null;
        this.OnClearDisasterFunc = null;

        GameEvent().OnEvent("LoginSuccess", this.OnLoginSuccess, this);
        GameEvent().OnEvent("NeedCancelSelectLand", this.OnCancelSelectLand, this);

        GameEvent().OnEvent("EnterHome", this.OnEnterHome, this); // 进入自己农场  
        GameEvent().OnEvent("VisitHome", this.OnVisitHome, this); // 访问别人农场 
    },

    OnEnterHome: function OnEnterHome() {
        GameEvent().OnEvent("UpdateBaseData", this.WarpReloadData, this);
        GameEvent().OnEvent("UpdateLands", this.WarpReloadData, this);

        GameEvent().OnEvent("UserSowSeeds", this.OnUserSowSeed, this);
        GameEvent().OnEvent("UserManure", this.OnUserManure, this);

        this.ReLoadFunc = this.ReLoadData;
        this.OperatorFunc = this.OperatorSelfLands;
        this.OnClearDisasterFunc = this.OnClearDisaster;

        this.cangKuSpr.node.targetOff(this);
        this.cangKuSpr.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            GameEvent().SendEvent("OpenWarehouse");
        }.bind(this), this);

        this.OnCancelSelectLand();
    },

    OnVisitHome: function OnVisitHome() {
        GameEvent().OffEvent("UpdateBaseData", this.WarpReloadData, this);
        GameEvent().OffEvent("UpdateLands", this.WarpReloadData, this);

        GameEvent().OffEvent("UserSowSeeds", this.OnUserSowSeed, this);
        GameEvent().OffEvent("UserManure", this.OnUserManure, this);

        GameEvent().OnEvent("VisitUserLands", this.WarpReloadData, this);

        this.ReLoadFunc = this.VisitReLoadData;
        this.OperatorFunc = this.OperatorVisiUserLands;
        this.OnClearDisasterFunc = this.OnClearVisitUserDisaster;

        this.cangKuSpr.node.targetOff(this);
        this.cangKuSpr.node.on(cc.Node.EventType.TOUCH_END, function () {}, this);

        this.OnCancelSelectLand();
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

    OnCancelSelectLand: function OnCancelSelectLand() {
        if (typeof this.lastHightLight !== 'undefined') {
            this.HightLightLandsPrefab(this.lastHightLight, this.selectLandIndex, false);
            this.lastHightLight = undefined;
            this.selectLandIndex = -1;
        }
    },

    OnLoginSuccess: function OnLoginSuccess() {
        this.scrollView.horizontal = true;
        this.scrollView.vertical = true;
        this.selectLandIndex = -1;
        this.ReLoadData();

        this.touchNode.on(cc.Node.EventType.TOUCH_END, function (event) {
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
                this.OnCancelSelectLand();
            }
        }.bind(this));
    },

    WarpReloadData: function WarpReloadData() {
        if (this.ReLoadFunc) {
            this.ReLoadFunc();
        }
    },

    ReLoadData: function ReLoadData() {
        var gameData = window.GameData;
        var landsData = gameData.lands;
        var children = this.lands.children;
        for (var i = 0; i < children.length; ++i) {
            this.InitLandsPrefab(children[i], landsData[i], landsData.length === i);
        }
    },

    VisitReLoadData: function VisitReLoadData() {
        var gameData = window.GameData;
        var landsData = gameData.visitUser.lands;
        if (landsData === null) {
            landsData = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined];
        }
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
            prefab.getChildByName('disaster').active = false;
            prefab.getChildByName('time').active = false;
        } else {
            prefab.getChildByName('lands2').active = false;
            prefab.getChildByName('lands1').active = true;
            prefab.getChildByName('disaster').active = false;
            prefab.getChildByName('time').active = false;

            if (land.state === 0) {
                prefab.getChildByName('plant').active = false;
            } else if (land.state === 1) {
                prefab.getChildByName('plant').active = true;

                var seedCfg = Table.GetEntry("plant", land.seedId);
                if (seedCfg) {

                    var disasterCfg = Table.GetEntry("disaster", seedCfg.disasterId);
                    if (disasterCfg === null) return;

                    var timeNode = prefab.getChildByName('time');
                    timeNode.active = true;
                    var timeLabel = timeNode.getComponent(cc.Label);

                    if (typeof land.disasterTime !== 'undefined' && typeof land.clearDisasterTime === 'undefined') {
                        prefab.getChildByName('disaster').active = true;
                        var sp = prefab.getChildByName('disaster').getComponent(cc.Sprite);

                        var url = "disaster" + land.disasterType;
                        cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
                            sp.spriteFrame = spriteFrame;
                        });
                    }

                    var disasterTime = typeof land.disasterTime !== 'undefined' && land.disasterType === 2 || land.disasterType === 3 ? land.disasterTime : null;
                    var reduceMinuteArray = typeof land.reduceTime === 'undefined' ? [0, 0, 0] : land.reduceTime;
                    var nowTime = new Date().getTime();
                    var rs = IsMatured(reduceMinuteArray, nowTime, land.sowTime, disasterTime, seedCfg.time.part, disasterCfg.effect2, land.clearDisasterTime);

                    var plantSp = prefab.getChildByName("plant").getComponent(cc.Sprite);
                    var plantImagPath = "plant/" + seedCfg.time.images[0];
                    if (rs[0]) {
                        var cast = GetDisasterCast(land, disasterCfg, seedCfg);
                        // 植物已经成熟
                        var count = typeof land.stealCount === 'undefined' ? seedCfg.output : seedCfg.output - land.stealCount;
                        timeLabel.string = "植物已经成熟\n" + "(" + (count - cast) + "/" + seedCfg.output + ")";
                        plantImagPath = "plant/" + seedCfg.time.images[2];
                    } else {
                        var partId = rs[1];
                        var remainingTime = rs[2];

                        var state;
                        if (partId === 0) {
                            state = "发芽";
                            plantImagPath = "plant/" + seedCfg.time.images[0];
                        } else if (partId == 1) {
                            state = "开花";
                            plantImagPath = "plant/" + seedCfg.time.images[1];
                        } else {
                            state = "结果";
                            plantImagPath = "plant/" + seedCfg.time.images[1];
                        }

                        var hours = Math.floor(remainingTime / HourToMinute);

                        timeLabel.string = "剩余" + (hours > 0 ? hours + "小时" : "") + Math.floor(remainingTime % HourToMinute) + "分钟" + state;
                    }
                    cc.loader.loadRes(plantImagPath, cc.SpriteFrame, function (err, spriteFrame) {
                        plantSp.spriteFrame = spriteFrame;
                    });
                }
            } else if (land.state === 2) {
                var timeNode = prefab.getChildByName('time');
                timeNode.active = true;
                var timeLabel = timeNode.getComponent(cc.Label);
                timeLabel.string = "果实已收割";

                prefab.getChildByName('plant').active = true;

                var seedCfg = Table.GetEntry("plant", land.seedId);
                var plantSp = prefab.getChildByName("plant").getComponent(cc.Sprite);
                var plantImagPath = "plant/" + seedCfg.time.images[3];
                cc.loader.loadRes(plantImagPath, cc.SpriteFrame, function (err, spriteFrame) {
                    plantSp.spriteFrame = spriteFrame;
                });
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

            this.WrapOperatorLands(prefab, landIndex);
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

    WrapOperatorLands: function WrapOperatorLands(prefab, landIndex) {
        if (this.OperatorFunc) {
            this.OperatorFunc(prefab, landIndex);
        }
    },

    // 操作土地 
    OperatorSelfLands: function OperatorSelfLands(prefab, landIndex) {
        var gameData = window.GameData;
        var lands = gameData.lands;
        if (lands.length > landIndex) {
            var land = lands[landIndex];
            var landOperator = prefab.getChildByName('operator');
            landOperator.active = true;
            var prefabBtn;
            if (land.state === enum_landsState_idle) {
                // 播种
                prefabBtn = this.CreateOpertorButton(enum_opbtn_sow);
                landOperator.addChild(prefabBtn);

                var landCfg = Table.GetEntry("landsLevel", land.level + 1);
                if (landCfg && landCfg.minLevel <= gameData.GetLevel() && landCfg.landsNumber <= lands.length) {
                    // 升级
                    prefabBtn = this.CreateOpertorButton(enum_opbtn_upgread);
                    landOperator.addChild(prefabBtn);
                }
            } else if (land.state === enum_landsState_grow) {
                // 信息 施肥 铲地
                prefabBtn = this.CreateOpertorButton(enum_opbtn_info);
                landOperator.addChild(prefabBtn);

                var seedCfg = Table.GetEntry("plant", land.seedId);
                if (seedCfg) {

                    var disasterCfg = Table.GetEntry("disaster", seedCfg.disasterId);
                    if (disasterCfg === null) return;

                    if (typeof land.disasterType !== 'undefined' && typeof land.clearDisasterTime === 'undefined') {
                        if (land.disasterType === 1) {
                            prefabBtn = this.CreateOpertorButton(enum_opbtn_debug);
                            landOperator.addChild(prefabBtn);
                        } else if (land.disasterType === 2) {
                            prefabBtn = this.CreateOpertorButton(enum_opbtn_water);
                            landOperator.addChild(prefabBtn);
                        } else if (land.disasterType === 3) {
                            prefabBtn = this.CreateOpertorButton(enum_opbtn_extraNutrition);
                            landOperator.addChild(prefabBtn);
                        }
                    }

                    var disasterTime = typeof land.disasterTime !== 'undefined' && land.disasterType === 2 || land.disasterType === 3 ? land.disasterTime : null;
                    var reduceMinuteArray = typeof land.reduceTime === 'undefined' ? [0, 0, 0] : land.reduceTime;
                    var nowTime = new Date().getTime();
                    var rs = IsMatured(reduceMinuteArray, nowTime, land.sowTime, disasterTime, seedCfg.time.part, disasterCfg.effect2, land.clearDisasterTime);

                    if (rs[0]) {
                        if (!(typeof land.disasterType !== 'undefined' && typeof land.clearDisasterTime === 'undefined')) {
                            prefabBtn = this.CreateOpertorButton(enum_opbtn_harvest);
                            landOperator.addChild(prefabBtn);
                        }
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

    OperatorVisiUserLands: function OperatorVisiUserLands(prefab, landIndex) {
        var gameData = window.GameData;
        var visitUserlands = gameData.visitUser.lands;
        if (typeof visitUserlands !== 'undefined' && visitUserlands !== null && visitUserlands.length > landIndex) {
            var land = visitUserlands[landIndex];
            var landOperator = prefab.getChildByName('operator');
            landOperator.active = true;
            var prefabBtn;
            if (land.state === enum_landsState_idle) {} else if (land.state === enum_landsState_grow) {
                // 信息 除灾 偷盗 
                prefabBtn = this.CreateOpertorButton(enum_opbtn_info);
                landOperator.addChild(prefabBtn);

                var seedCfg = Table.GetEntry("plant", land.seedId);
                if (seedCfg) {

                    var disasterCfg = Table.GetEntry("disaster", seedCfg.disasterId);
                    if (disasterCfg === null) return;

                    if (typeof land.disasterType !== 'undefined' && typeof land.clearDisasterTime === 'undefined') {
                        if (land.disasterType === 1) {
                            prefabBtn = this.CreateOpertorButton(enum_opbtn_debug);
                            landOperator.addChild(prefabBtn);
                        } else if (land.disasterType === 2) {
                            prefabBtn = this.CreateOpertorButton(enum_opbtn_water);
                            landOperator.addChild(prefabBtn);
                        } else if (land.disasterType === 3) {
                            prefabBtn = this.CreateOpertorButton(enum_opbtn_extraNutrition);
                            landOperator.addChild(prefabBtn);
                        }
                    }

                    var disasterTime = typeof land.disasterTime !== 'undefined' && land.disasterType === 2 || land.disasterType === 3 ? land.disasterTime : null;
                    var reduceMinuteArray = typeof land.reduceTime === 'undefined' ? [0, 0, 0] : land.reduceTime;
                    var nowTime = new Date().getTime();
                    var rs = IsMatured(reduceMinuteArray, nowTime, land.sowTime, disasterTime, seedCfg.time.part, disasterCfg.effect2, land.clearDisasterTime);

                    if (rs[0]) {
                        prefabBtn = this.CreateOpertorButton(enum_opbtn_steal);
                        landOperator.addChild(prefabBtn);
                    }
                }
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

        var ChangeButtonImage = function ChangeButtonImage(button, imagPath) {
            var buttonCm = button.getComponent("cc.Button");
            cc.loader.loadRes(imagPath, cc.SpriteFrame, function (err, spriteFrame) {
                this.normalSprite = spriteFrame;
                this.pressedSprite = spriteFrame;
                this.hoverSprite = spriteFrame;
                this.disabledSprite = spriteFrame;
            }.bind(buttonCm));
        };

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
            //label.getComponent('cc.Label').string = "铲除植物";
            prefabBtn.on('click', function (event) {
                this.OnUserRemovePlant();
            }.bind(this));

            label.active = false;
            ChangeButtonImage(prefabBtn, "operate/chandi");
        } else if (type === enum_opbtn_manure) {
            // 施肥
            prefabBtn = cc.instantiate(this.opertorBtnPrefab);
            label = prefabBtn.getComponent('cc.Button').node.getChildByName('Label');
            label.getComponent('cc.Label').string = "施肥";
            prefabBtn.on('click', function (event) {
                GameEvent().SendEvent("OpenPackage", "manure");
            });

            label.active = false;
            ChangeButtonImage(prefabBtn, "operate/shifei");
        } else if (type === enum_opbtn_harvest) {
            // 摘取果实
            prefabBtn = cc.instantiate(this.opertorBtnPrefab);
            label = prefabBtn.getComponent('cc.Button').node.getChildByName('Label');
            label.getComponent('cc.Label').string = "收割果实";
            prefabBtn.on('click', function (event) {
                this.OnUserHarvest();
            }.bind(this));

            label.active = false;
            ChangeButtonImage(prefabBtn, "operate/quanShou");
        } else if (type === enum_opbtn_water) {
            // 浇水
            prefabBtn = cc.instantiate(this.opertorBtnPrefab);
            label = prefabBtn.getComponent('cc.Button').node.getChildByName('Label');
            label.getComponent('cc.Label').string = "浇水";
            prefabBtn.on('click', function (event) {
                this.OnWrapClearDisaster();
            }.bind(this));

            label.active = false;
            ChangeButtonImage(prefabBtn, "operate/jiaoshui");
        } else if (type === enum_opbtn_extraNutrition) {
            // 补充营养
            prefabBtn = cc.instantiate(this.opertorBtnPrefab);
            label = prefabBtn.getComponent('cc.Button').node.getChildByName('Label');
            label.getComponent('cc.Label').string = "补充营养";
            prefabBtn.on('click', function (event) {
                this.OnWrapClearDisaster();
            }.bind(this));
        } else if (type === enum_opbtn_debug) {
            // 除虫
            prefabBtn = cc.instantiate(this.opertorBtnPrefab);
            label = prefabBtn.getComponent('cc.Button').node.getChildByName('Label');
            label.getComponent('cc.Label').string = "除虫";
            prefabBtn.on('click', function (event) {
                this.OnWrapClearDisaster();
            }.bind(this));

            label.active = false;
            ChangeButtonImage(prefabBtn, "operate/chuchong");
        } else if (type === enum_opbtn_steal) {
            // 补充营养
            prefabBtn = cc.instantiate(this.opertorBtnPrefab);
            label = prefabBtn.getComponent('cc.Button').node.getChildByName('Label');
            label.getComponent('cc.Label').string = "偷盗";
            prefabBtn.on('click', function (event) {
                this.OnUserVisitSteal();
            }.bind(this));
        } else if (type === enum_opbtn_upgread) {
            prefabBtn = cc.instantiate(this.opertorBtnPrefab);
            label = prefabBtn.getComponent('cc.Button').node.getChildByName('Label');
            label.getComponent('cc.Label').string = "升级";
            prefabBtn.on('click', function (event) {
                this.OnLandsUpgread();
            }.bind(this));
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
    },

    OnUserVisitSteal: function OnUserVisitSteal(event) {
        if (this.selectLandIndex >= 0) {
            this.CancelOperatorLands(this.lastHightLight);
            var landIndex = this.selectLandIndex;

            var gameData = window.GameData;
            var userId = gameData.visitUser.userid;

            var obj = { type: 'visitSteal', visitUserId: userId, landIndex: landIndex };
            var msg = JSON.stringify(obj);
            GameSocket().Send(msg);
        }
    },

    OnWrapClearDisaster: function OnWrapClearDisaster(event) {
        if (this.OnClearDisasterFunc) {
            this.OnClearDisasterFunc(event);
        }
    },

    OnClearDisaster: function OnClearDisaster(event) {
        if (this.selectLandIndex >= 0) {
            this.CancelOperatorLands(this.lastHightLight);
            var landIndex = this.selectLandIndex;

            var obj = { type: 'clearDisaster', landIndex: landIndex };
            var msg = JSON.stringify(obj);
            GameSocket().Send(msg);
        }
    },

    OnClearVisitUserDisaster: function OnClearVisitUserDisaster(event) {
        if (this.selectLandIndex >= 0) {
            this.CancelOperatorLands(this.lastHightLight);
            var landIndex = this.selectLandIndex;

            var gameData = window.GameData;
            var userId = gameData.visitUser.userid;

            var obj = { type: 'visitClearDisaster', visitUserId: userId, landIndex: landIndex };
            var msg = JSON.stringify(obj);
            GameSocket().Send(msg);
        }
    },

    OnLandsUpgread: function OnLandsUpgread(event) {
        if (this.selectLandIndex >= 0) {
            this.CancelOperatorLands(this.lastHightLight);
            var landIndex = this.selectLandIndex;

            var obj = { type: 'upgradeLands', landIndex: landIndex };
            var msg = JSON.stringify(obj);
            GameSocket().Send(msg);
        }
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {

        if (typeof this.interval === 'undefined') {
            this.interval = 0;
        }

        this.interval += dt;
        var refreshTime = this.refreshSecond / 60;
        if (this.interval > refreshTime) {
            if (this.ReLoadFunc) {
                this.ReLoadFunc();
            }
            this.interval -= refreshTime;
        }
    }
});

cc._RFpop();
},{}],"getLogs":[function(require,module,exports){
"use strict";
cc._RFpush(module, '9f16fhfDRVO/5jhAu5TSSaM', 'getLogs');
// script\handler\getLogs.js

"use strict";

var MessageHandler = require("msgHandler");
var getLogsSuccess = {};
getLogsSuccess['interest'] = "getLogsSuccess";
getLogsSuccess['Process'] = function (message) {
    var gameData = window.GameData;
    gameData.logs = message.logs.slice();
    GameEvent().SendEvent("UpdateLogs");
};
MessageHandler.Add(getLogsSuccess);

cc._RFpop();
},{"msgHandler":"msgHandler"}],"goBack":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'fcc0bo3P7ZASLOdUssCc8Qe', 'goBack');
// script\ui\goBack.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        goBackBtn: cc.Button
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.goBackBtn.node.on('click', this.OnGoBack, this);
    },

    OnShow: function OnShow() {
        this.node.active = true;
    },

    OnHide: function OnHide() {
        this.node.active = false;
    },

    OnGoBack: function OnGoBack() {
        GameEvent().SendEvent("EnterHome"); // 进入自己农场
        GameEvent().SendEvent("UpdateLands");
        GameEvent().SendEvent("UpdateUserInfo");
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
},{"msgHandler":"msgHandler"}],"hecheng":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'f05cdaEuUNHoKiUiVQR1TKt', 'hecheng');
// script\ui\hecheng.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        propItem: cc.Prefab,
        cailiaoItem: cc.Prefab,
        propItemScroll: cc.ScrollView,
        duihuanBtn: cc.Button,
        propNameLab: cc.Label,
        propImag: cc.Sprite,
        buzutishiLab: cc.Label,
        hechengGoldLab: cc.Label,
        cailiaoScroll: cc.ScrollView,
        hechengBtn: cc.Button
    },

    // use this for initialization
    onLoad: function onLoad() {}

});

cc._RFpop();
},{}],"info":[function(require,module,exports){
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
        expProgress: cc.ProgressBar,
        bgSprite: cc.Sprite
    },

    // use this for initialization
    onLoad: function onLoad() {
        GameEvent().OnEvent("EnterHome", this.OnEnterHome, this); // 进入自己农场
        GameEvent().OnEvent("VisitHome", this.OnVisitHome, this); // 访问别人农场
    },

    OnShow: function OnShow() {
        this.node.active = true;
    },

    OnHide: function OnHide() {
        this.node.active = false;
    },

    OnClickBg: function OnClickBg() {
        GameEvent().SendEvent("OpenDetail");
    },

    OnEnterHome: function OnEnterHome() {
        GameEvent().OnEvent("UpdateBaseData", this.ReLoadData, this);
        GameEvent().OnEvent("UpdateUserInfo", this.ReLoadData, this);

        GameEvent().OffEvent("UpdateVisitInfo", this.VisitReLoadData, this);

        this.bgSprite.node.on(cc.Node.EventType.TOUCH_END, this.OnClickBg, this);
    },

    OnVisitHome: function OnVisitHome() {
        GameEvent().OffEvent("UpdateBaseData", this.ReLoadData, this);
        GameEvent().OffEvent("UpdateUserInfo", this.ReLoadData, this);

        GameEvent().OnEvent("UpdateVisitInfo", this.VisitReLoadData, this);

        this.bgSprite.node.off(cc.Node.EventType.TOUCH_END, this.OnClickBg, this);
    },

    ReLoadData: function ReLoadData() {
        var gameData = window.GameData;
        this.roleName.string = gameData.GetUserName() + "的家园";
        this.money.string = gameData.GetMoney();
        this.level.string = "Lv." + gameData.GetLevel();
        this.expProgress.progress = gameData.GetLevelExp() / gameData.GetLevelExpMax();
        var text = this.expProgress.node.getChildByName("value").getComponent('cc.Label');
        text.string = gameData.GetLevelExp() + "/" + gameData.GetLevelExpMax();
    },

    VisitReLoadData: function VisitReLoadData(event) {
        var userData = event.detail;
        var gameData = window.GameData;

        this.roleName.string = userData.username + "的家园";
        this.money.string = userData.money;
        this.level.string = "Lv." + gameData.GetLevelByExp(userData.experience);
        this.expProgress.progress = gameData.GetLevelExpByExp(userData.experience) / gameData.GetLevelExpMax();
        var text = this.expProgress.node.getChildByName("value").getComponent('cc.Label');
        text.string = gameData.GetLevelExpByExp(userData.experience) + "/" + gameData.GetLevelExpMax();
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
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
        warehousePnl: cc.Node,
        socialPnl: cc.Node,
        visitPnl: cc.Node,
        goBackPnl: cc.Node,
        detailPnl: cc.Node
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.HideAllPnl();
        GameLog("main onLoad");

        var audioMng = window.AudioMng();
        //if (audioMng) audioMng.playMusic();
    },

    start: function start() {
        GameSocket().Connect(window.GameHost, window.GameProt);
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
        GameEvent().OnEvent("OpenDetail", this.OnOpenDetail, this);

        GameEvent().OnEvent("EnterHome", this.OnEnterHome, this); // 进入自己农场  
        GameEvent().OnEvent("VisitHome", this.OnVisitHome, this); // 访问别人农场
    },

    OnEnterHome: function OnEnterHome() {
        this.visitPnl.getComponent("visit").OnHide();
        this.goBackPnl.getComponent("goBack").OnHide();

        this.toolbarPnl.getComponent("toolbar").OnShow();
    },

    OnVisitHome: function OnVisitHome() {
        this.visitPnl.getComponent("visit").OnShow();
        this.goBackPnl.getComponent("goBack").OnShow();

        this.toolbarPnl.getComponent("toolbar").OnHide();
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
        this.socialPnl.getComponent("social").OnShow();

        GameEvent().SendEvent("EnterHome");

        //var obj = { type: 'addFriend', addUserId:11 };
        //var obj = { type: 'removeFriend', removeUserId:11 };
        //var msg = JSON.stringify(obj);
        //GameSocket().Send(msg);

        //var obj = { type: 'buyItems', kinds : 2, buyId:7, buyCount : 7 };
        //var msg = JSON.stringify(obj);
        //GameSocket().Send(msg);
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

        GameEvent().SendEvent("NeedCancelSelectLand");
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

        GameEvent().SendEvent("NeedCancelSelectLand");
    },

    OnOpenSellFruit: function OnOpenSellFruit(event) {
        var script = this.sellFruitPnl.getComponent("sellFruit");
        script.OnShow();
        script.Setup(event.detail);
    },

    OnOpenDetail: function OnOpenDetail(event) {
        var script = this.detailPnl.getComponent("detail");
        script.OnShow();
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
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
},{"msgHandler":"msgHandler"}],"maskLayer":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'b1c74rq4bhEX4QlqH8KfxeH', 'maskLayer');
// script\ui\maskLayer.js

"use strict";

cc.Class({
    extends: cc.Component,

    // use this for initialization
    onLoad: function onLoad() {

        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {});
    }
});

cc._RFpop();
},{}],"msgHandler":[function(require,module,exports){
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
},{}],"neighbourList":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'cf5e4dgpbZOS7sEK+/Nrr8r', 'neighbourList');
// script\handler\neighbourList.js

"use strict";

var MessageHandler = require("msgHandler");
var neighbourList = {};
neighbourList['interest'] = "neighbourList";
neighbourList['Process'] = function (message) {
    var gameData = window.GameData;
    gameData.neighbourList = message.list.slice();
    GameEvent().SendEvent("UpdateNeighbourList");
};
MessageHandler.Add(neighbourList);

var neighbourListSuccess = {};
neighbourListSuccess['interest'] = "neighbourListSuccess";
neighbourListSuccess['Process'] = function (message) {
    var gameData = window.GameData;
    gameData.neighbourList = message.list.slice();
    GameEvent().SendEvent("UpdateNeighbourList");
};
MessageHandler.Add(neighbourListSuccess);

cc._RFpop();
},{"msgHandler":"msgHandler"}],"notifyText":[function(require,module,exports){
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
        var fadeOut = cc.fadeOut(1.0);
        var callback = cc.callFunc(this._RemoveText, this, notify);
        var action = cc.sequence(move, fadeOut, callback);
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
                            itemId = parseInt(key);
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
},{}],"petLayer":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'c68f40tLqlPFbihPADRlB+R', 'petLayer');
// script\ui\petLayer.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        petItemPrefab: cc.Prefab,
        petScorllView: cc.ScrollView,
        petNameLab: cc.Label,
        petImag: cc.Sprite,
        petInfo: cc.Label,
        xufeiBtn: cc.Button,
        tihuanBtn: cc.Button,
        buyBtn: cc.Button,
        closeBtn: cc.Button
    },

    // use this for initialization
    onLoad: function onLoad() {}

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
        if (gameData.package[2][this.fruitId] < this.sellCount) {
            var errorEntry = Table.GetEntry("error", 17);
            if (errorEntry) {
                GameNotify().AddText(errorEntry.description, window.ErrorNotifyColor);
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
        shopPetItemPrefab: cc.Prefab,
        scrollView: cc.ScrollView,

        radioButton: {
            default: [],
            type: cc.Toggle
        },

        _currentToggle: cc.Toggle,

        closeBtn: cc.Button,

        itemImag: cc.Sprite,
        itemNameLab: cc.Label,
        itemInfoLab: cc.Label,
        itemNumLab: cc.Label,
        itemSubBtn: cc.Button,
        itemAddBtn: cc.Button,
        itemGoldLab: cc.Label,
        itemBuyBtn: cc.Button
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
            var group = new Array(["plant", this.shopSeedItemPrefab, this.InitSeedPrefab], ["property", this.shopPropItemPrefab, this.InitPropPrefab], ["pet", this.shopPetItemPrefab, this.InitPetPrefab]);

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
        var iconSp = prefab.getChildByName("icon").getComponent("cc.Sprite");

        cc.loader.loadRes(config.imagPath, cc.SpriteFrame, function (err, spriteFrame) {
            this.spriteFrame = spriteFrame;
        }.bind(iconSp));

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

    InitPetPrefab: function InitPetPrefab(prefab, config) {
        var iconSp = prefab.getChildByName("icon").getComponent("cc.Sprite");

        cc.loader.loadRes(config.headImagPath, cc.SpriteFrame, function (err, spriteFrame) {
            this.spriteFrame = spriteFrame;
        }.bind(iconSp));

        var name = prefab.getChildByName("name").getComponent('cc.Label');
        name.string = config.name;

        // 点击回调
        prefab.on(cc.Node.EventType.TOUCH_END, function (event) {
            this.OnOpenBuyPet(event.target.config);
        }, this);
    },

    OnOpenBuyPet: function OnOpenBuyPet(config) {
        GameEvent().SendEvent("OpenBuyPet", config);
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
},{}],"social":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'cba04NXrWNLzoiXEbjNHFfP', 'social');
// script\ui\social.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        radioButton: {
            default: [],
            type: cc.Toggle
        },

        flodButton: cc.Button,
        scrollView: cc.ScrollView,
        itemPrefab: cc.Prefab,

        _currentToggle: cc.Toggle,
        _flodState: cc.Integer
    },

    // use this for initialization
    onLoad: function onLoad() {

        this._flodState = 1;
        this.flodButton.node.on('click', this.OnFold, this);
        this.OnFold();

        for (var i = 0; i < this.radioButton.length; ++i) {
            if (this.radioButton[i].isChecked) {
                this._currentToggle = this.radioButton[i];
                break;
            }
        }

        GameEvent().OnEvent("UpdateNeighbourList", this.Reload, this);
        GameEvent().OnEvent("UpdateFriendsList", this.Reload, this);
    },

    OnShow: function OnShow() {
        this.node.active = true;
    },

    OnHide: function OnHide() {
        this.node.active = false;
    },

    radioButtonClicked: function radioButtonClicked(toggle) {
        if (this._currentToggle !== toggle) {
            this._currentToggle = toggle;
            this.Reload();
        }
    },

    OnFold: function OnFold() {
        var widget;
        if (this._flodState === 0) {
            //widget = this.node.getComponent(cc.Widget);
            //widget.right = -300;
            this.node.x = 326;
            this._flodState = 1;
            this.scrollView.scrollToTop(0.1);
        } else {
            //widget = this.node.getComponent(cc.Widget);
            //widget.right = 4;
            this.node.x = 630;
            this._flodState = 0;
            this.scrollView.scrollToTop(0.1);
        }
    },

    Reload: function Reload() {
        var index = this.radioButton.indexOf(this._currentToggle);
        if (index >= 0) {
            var content = this.scrollView.content;
            content.removeAllChildren();
            var gameData = window.GameData;
            var prefab, data, i;
            if (index === 0) {
                var neighbourList = gameData.neighbourList;
                for (i = 0; i < neighbourList.length; ++i) {
                    prefab = cc.instantiate(this.itemPrefab);
                    data = neighbourList[i];
                    this.InitItemPrefab(prefab, data);
                    content.addChild(prefab);
                }
            } else if (index === 1) {
                var friendsList = gameData.friendsList;
                for (i = 0; i < friendsList.length; ++i) {
                    prefab = cc.instantiate(this.itemPrefab);
                    data = friendsList[i];
                    this.InitItemPrefab(prefab, data);
                    content.addChild(prefab);
                }
            }
        }
    },

    InitItemPrefab: function InitItemPrefab(prefab, data) {
        var name = prefab.getChildByName("name").getComponent('cc.Label');
        name.string = data.username;
        var level = prefab.getChildByName("level").getComponent('cc.Label');
        level.string = "Lv." + GameData.GetLevelByExp(data.experience);
        var btnNode = prefab.getChildByName('visit');
        btnNode.userId = data.id;
        btnNode.on('click', this.OnVisit, this);
    },

    OnVisit: function OnVisit(event) {
        var userId = event.target.userId;
        var obj = { type: 'visitHome', userId: userId };
        var msg = JSON.stringify(obj);
        GameSocket().Send(msg);
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

    Connect: function Connect(address, port, router) {
        var self = this;
        if (self.webSocket) {
            return;
        } else {
            try {
                var ws = new WebSocket("ws://" + address + ":" + port + "/" + (typeof router !== "undefined" ? router : ""));
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
},{"msgHandler":"msgHandler"}],"upgradeLands":[function(require,module,exports){
"use strict";
cc._RFpush(module, '2983awHQPpL1a9J7rfXByIH', 'upgradeLands');
// script\handler\upgradeLands.js

"use strict";

var MessageHandler = require("msgHandler");
var upgradeLandsSuccess = {};
upgradeLandsSuccess['interest'] = "upgradeLandsSuccess";
upgradeLandsSuccess['Process'] = function (message) {
    GameNotify().AddText("土地升级成功!");
};
MessageHandler.Add(upgradeLandsSuccess);

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
},{"msgHandler":"msgHandler"}],"visitClearDisaster":[function(require,module,exports){
"use strict";
cc._RFpush(module, '3a92bxVC2BOf6CA9lMNUD+N', 'visitClearDisaster');
// script\handler\visitClearDisaster.js

"use strict";

var MessageHandler = require("msgHandler");
var visitClearDisasterSuccess = {};
visitClearDisasterSuccess['interest'] = "visitClearDisasterSuccess";
visitClearDisasterSuccess['Process'] = function (message) {
    var gameData = window.GameData;
    var user = message;
    var visitUserId = message.visitUserId;
    var visitLands = message.lands;

    if (message.disasterType === 1) {
        GameNotify().AddText("除虫成功!");
    } else if (message.disasterType === 2) {
        GameNotify().AddText("浇水成功!");
    } else if (message.disasterType === 3) {
        GameNotify().AddText("营养添加成功!");
    }

    if (gameData.visitUser.userid === visitUserId) {
        gameData.visitUser.lands = visitLands.slice();
        GameEvent().SendEvent("VisitUserLands");
    }
};

MessageHandler.Add(visitClearDisasterSuccess);

cc._RFpop();
},{"msgHandler":"msgHandler"}],"visitHome":[function(require,module,exports){
"use strict";
cc._RFpush(module, '0772d7783hDhruxwTPM37Iz', 'visitHome');
// script\handler\visitHome.js

"use strict";

var MessageHandler = require("msgHandler");
var visitHomeSuccess = {};
visitHomeSuccess['interest'] = "visitHomeSuccess";
visitHomeSuccess['Process'] = function (message) {
    var gameData = window.GameData;
    var user = message;
    gameData.visitUser = {
        userid: user.userid,
        username: user.username,
        money: user.money,
        experience: user.experience,
        vip: user.vip,
        lands: JSON.parse(user.lands)
    };

    GameEvent().SendEvent("VisitHome");
    GameEvent().SendEvent("UpdateVisitInfo", gameData.visitUser);
    GameEvent().SendEvent("VisitUserLands");
};
MessageHandler.Add(visitHomeSuccess);

cc._RFpop();
},{"msgHandler":"msgHandler"}],"visitSteal":[function(require,module,exports){
"use strict";
cc._RFpush(module, '26b2f7dzYxAQZVXcUAMgKN9', 'visitSteal');
// script\handler\visitSteal.js

"use strict";

var MessageHandler = require("msgHandler");
var visitStealSuccess = {};
visitStealSuccess['interest'] = "visitStealSuccess";
visitStealSuccess['Process'] = function (message) {
    var gameData = window.GameData;
    var visitUserId = message.visitUserId;
    var visitLands = message.lands;

    GameNotify().AddText("偷取成功!");

    if (gameData.visitUser.userid === visitUserId) {
        gameData.visitUser.lands = visitLands.slice();
        GameEvent().SendEvent("VisitUserLands");
    }
};
MessageHandler.Add(visitStealSuccess);

cc._RFpop();
},{"msgHandler":"msgHandler"}],"visit":[function(require,module,exports){
"use strict";
cc._RFpush(module, '30115E4E6RNaIQ31YoiZqUh', 'visit');
// script\ui\visit.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        friendBtn: cc.Button,
        messageBtn: cc.Button,
        friendLabel: cc.Label
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.friendBtn.node.on('click', this.OnFriendClick, this);
        this.messageBtn.node.on('click', this.OnMessageClick, this);

        GameEvent().OnEvent("UpdateFriendsList", this.UpdateFriendLabel, this);
    },

    OnShow: function OnShow() {
        this.node.active = true;

        this.UpdateFriendLabel();
    },

    OnHide: function OnHide() {
        this.node.active = false;
    },

    OnFriendClick: function OnFriendClick() {
        var gameData = window.GameData;
        var obj,
            isFriend,
            userId = gameData.visitUser.userid;
        isFriend = this.IsFriendOfVisit();
        if (isFriend === false) {
            obj = { type: 'addFriend', addUserId: userId };
        } else {
            obj = { type: 'removeFriend', removeUserId: userId };
        }
        var msg = JSON.stringify(obj);
        GameSocket().Send(msg);
    },

    OnMessageClick: function OnMessageClick() {},

    IsFriendOfVisit: function IsFriendOfVisit() {
        var isFriend = false;
        var gameData = window.GameData;
        var userId = gameData.visitUser.userid;
        var friendsList = gameData.friendsList;
        for (var i = 0; i < friendsList.length; ++i) {
            if (friendsList[i].id === userId) {
                isFriend = true;
                break;
            }
        }
        return isFriend;
    },

    UpdateFriendLabel: function UpdateFriendLabel() {
        var isFriend = this.IsFriendOfVisit();
        if (isFriend) {
            this.friendLabel.string = "解除\n好友";
        } else {
            this.friendLabel.string = "添加\n好友";
        }
    }
});

cc._RFpop();
},{}],"warehouse":[function(require,module,exports){
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
                    itemId = parseInt(key);
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
},{}]},{},["AudioMng","ButtonScaler","canvas","gameData","gameEvent","gameLayer","buyItemsHandler","clearDisaster","error","friendHandler","friendsList","getLogs","harvestLands","loginHandler","manureLands","neighbourList","registerHander","removePlant","sellFruitHander","sowSeeds","unlockLands","upgradeLands","userBaseData","userDataSync","visitClearDisaster","visitHome","visitSteal","msgHandler","notifyText","socket","buyProperty","buySeed","detail","duihuan","goBack","hecheng","info","login","main","maskLayer","package","petLayer","register","sell","sellFruit","shop","social","toolbar","visit","warehouse"]);
