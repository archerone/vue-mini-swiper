function getChildNodes(e){var b=e.children||e.childNodes;var a=b.length;var d=new Array();for(var c=0;c<a;c++){if(b[c].nodeType==1){d.push(b[c])}}return d}function deepCopy(d,e,b){var e=e||{};for(var a in d){if(!d.hasOwnProperty(a)){continue}if(typeof d[a]==="object"){if(!b){e[a]=(d[a].constructor===Array)?[]:{}}deepCopy(d[a],e[a])}else{e[a]=d[a]}}return e}function cssTransform(d,b,e){if(!d.transform){d.transform={}}if(typeof e=="undefined"){if(typeof d.transform[b]=="undefined"){switch(b){case"scale":case"scaleX":case"scaleY":d.transform[b]=100;break;default:d.transform[b]=0}}return d.transform[b]}else{var a="";d.transform[b]=Number(e);for(var c in d.transform){a+=" "+c+"("+d.transform[c]+"px)"}d.style.WebkitTransform=d.style.transform=a}}function css(b,a,c){return cssTransform(b,a,c)}function hSwiper(a){this.setting={wrap:"#wrap",list:".list",isAuto:false,times:1000,clickDot:false};deepCopy(a,this.setting);this.wrap=document.querySelector(this.setting.wrap);this.list=this.wrap.querySelector(this.setting.list);this.times=this.setting.times;this.clickDot=this.setting.clickDot;this.lis=this.list.querySelectorAll("li").length;this.aA=null;this.n=0;this.nW=this.wrap.clientWidth;this.len=0;this.startPo={x:0,y:0};this.lastDis=0;this.lastTime=0;this.lastTimeDis=0;this.touchTime=0;this.iNow=0;this.nowX=0;this.disPo={x:0,y:0};this.atimer=null;this.timer=null}hSwiper.prototype={_start:function(a){if(this.setting.isAuto){clearInterval(this.atimer);clearInterval(this.timer)}var b=a.changedTouches[0];this.startPo.x=b.pageX;this.startPo.y=b.pageY;this.touchTime=this.lastTime=new Date().getTime();this.lastTimeDis=this.lastDis=0;this._checkWx()},_checkWx:function(a){this.list.style.transition="none";if(this.iNow>=0){this.iNow=-(this.len-2)}else{if(this.iNow<=-(this.len-1)){this.iNow=-1}}css(this.list,"translateX",this.iNow*this.nW);this.nowX=css(this.list,"translateX")},_move:function(c){var f=c.changedTouches[0];var g={x:f.pageX,y:f.pageY};var b={x:0,y:0};var a={x:0,y:0};var d=new Date().getTime();this.disPo.x=g.x-this.startPo.x;this.disPo.y=g.y-this.startPo.y;a.x=b.x+this.disPo.x;a.y=b.y+this.disPo.y;var h=null;if(Math.abs(a.x)>Math.abs(a.y)){c.preventDefault()}else{return false}css(this.list,"translateX",this.disPo.x+this.nowX);this.lastDis=a.x-b.x;b.x=a.x;this.lastTimeDis=d-this.lastTime;this.lastTime=d},_end:function(b){var d=this;var a=new Date().getTime();this.touchTime=a-this.touchTime;var c=Math.round(this.lastDis/this.lastTimeDis*10);if(this.touchTime>200){c=10}if(Math.abs(c)>18||(Math.abs(this.disPo.x)>this.nW/2)){if(this.lastDis>0){this.iNow++}else{if(this.lastDis<0){this.iNow--}else{if(this.lastDis==0){}}}}this._ani();this._checkPo();this._goon()},_goon:function(){var a=this;if(this.setting.isAuto){clearTimeout(this.timer);this.timer=setTimeout(function(){a._autoScroll()},3000)}},_ani:function(){this.list.style.transition=".5s";css(this.list,"translateX",this.iNow*this.nW)},_addPo:function(){var g=this;var c=document.createElement("nav");c.className="po";for(var e=0;e<this.lis;e++){var b=document.createElement("a");b.setAttribute("href","javascript:;");if(e==0){b.className="active"}c.appendChild(b)}this.wrap.appendChild(c);this.aA=c.querySelectorAll("a");if(this.clickDot){var f=null;for(var d=0;d<this.aA.length;d++){this.aA[d].index=d;this.aA[d].onclick=function(){if(g.setting.isAuto){clearInterval(g.atimer);clearInterval(g.timer)}g._goon();g._checkWx();g.iNow=-this.index-1;g._checkPo();clearTimeout(f);f=setTimeout(function(){g._ani()},30)}}}},_checkPo:function(){var a=this;this.aA[this.n].className="";this.n=Math.abs(this.iNow)-1;if(this.iNow>=0){this.n=this.lis-1}else{if(this.iNow<=-(this.len-1)){this.n=0}}this.aA[this.n].className="active"},_resize:function(){var a=this;window.addEventListener("resize",function(c){a.nW=a.wrap.clientWidth;a.list.style.width=a.nW*a.len+"px";a.list.style.transition="none";for(var b=0;b<a.len;b++){a.list.querySelectorAll("li")[b].style.width=a.nW+"px"}css(a.list,"translateX",a.iNow*a.nW)})},_autoScroll:function(){var a=this;clearInterval(this.atimer);this.atimer=setInterval(function(){a.iNow--;a._checkWx();a._checkPo();a._ani()},a.times)},init:function(){if(this.lis<=1){return}var d=this;var c=getChildNodes(this.list)[0].cloneNode(true);var b=getChildNodes(this.list)[this.lis-1].cloneNode(true);this.list.insertBefore(b,getChildNodes(this.list)[0]);this.list.appendChild(c);this.len=this.list.querySelectorAll("li").length;for(var a=0;a<this.len;a++){this.list.querySelectorAll("li")[a].style.width=this.nW+"px"}this.list.style.width=this.nW*this.len+"px";css(this.list,"translateX",-this.nW);this.nowX=css(this.list,"translateX");this.iNow=-1;this.list.addEventListener("touchstart",function(e){d._start.call(d,e)});this.list.addEventListener("touchmove",function(e){d._move.call(d,e)},false);this.wrap.addEventListener("touchmove",function(e){},false);this.list.addEventListener("touchend",function(e){d._end.call(d,e)});css(this.list,"translateZ",0);this._addPo();this._resize();if(this.setting.isAuto){this._autoScroll()}}};
export default{hSwiper}