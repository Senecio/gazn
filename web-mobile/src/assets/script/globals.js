window.GameLog=function(){var o=Array.prototype.slice.call(arguments);console.log.apply(console,o)},window.GameHost="nc.h5ii.com",window.GamePort=80,window.GameTablePort=80,window.ChatHost="nc.h5ii.com",window.ChatPort=11555,cc.loader.load("http://"+window.GameHost+":"+window.GameTablePort+"/Table.js",function(o,i){}),window.GameSocket=function(){var o=require("socket");return o.inst},window.GameEvent=function(){var o=require("gameEvent");return o.inst},window.ChatSocket=function(){return require("chatSocket")},window.GameNotify=function(){var o=cc.director.getScene().getChildByName("Canvas");if(o){var i=o.getChildByName("gameNotify");return i||(i=cc.instantiate(o.getComponent("canvas").gameNotify),o.addChild(i)),i.getComponent("notifyText")}},window.AudioMng=function(){var o=cc.director.getScene().getChildByName("Canvas");if(o){var i=o.getChildByName("AudioMng");if(i)return i.getComponent("AudioMng")}return null},window.ErrorNotifyColor=new cc.Color(255,32,32),window.GridWidth=250,window.GridHeight=116,window.CoordToGrid=function(o,i){i-=.5*window.GridHeight;var n=Math.floor(o/-window.GridWidth+i/-window.GridHeight),t=Math.floor(o/window.GridWidth+i/-window.GridHeight);return new cc.Vec2(n,t)},window.GridToCoord=function(o,i){var n=Math.floor((i-o)*window.GridWidth*.5),t=Math.floor((o+i)*-window.GridHeight*.5);return new cc.Vec2(n,t)},window.duihuanshangpinid=0,window.duihuanshangpinNum=0;