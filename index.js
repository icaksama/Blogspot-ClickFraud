(function($){$.fn.iframeTracker=function(handler){if(typeof handler=="function"){handler={blurCallback:handler}}
var target=this.get();if(handler===null||handler===!1){$.iframeTracker.untrack(target)}else if(typeof handler=="object"){$.iframeTracker.track(target,handler)}else{throw new Error("Wrong handler type (must be an object, or null|false to untrack)")}
return this};$.iframeTracker={focusRetriever:null,focusRetrieved:!1,handlersList:[],isIE8AndOlder:!1,init:function(){try{if($.browser.msie===!0&&$.browser.version<9){this.isIE8AndOlder=!0}}catch(ex){try{var matches=navigator.userAgent.match(/(msie) ([\w.]+)/i);if(matches[2]<9){this.isIE8AndOlder=!0}}catch(ex2){}}
$(window).focus();$(window).blur(function(e){$.iframeTracker.windowLoseFocus(e)});$("body").append('<div style="position:fixed; top:0; left:0; overflow:hidden;"><input style="position:absolute; left:-300px;" type="text" value="" id="focus_retriever" readonly="true" /></div>');this.focusRetriever=$("#focus_retriever");this.focusRetrieved=!1;if(this.isIE8AndOlder){this.focusRetriever.blur(function(e){e.stopPropagation();e.preventDefault();$.iframeTracker.windowLoseFocus(e)});$("body").click(function(e){$(window).focus()});$("form").click(function(e){e.stopPropagation()});try{$("body").on("click","form",function(e){e.stopPropagation()})}catch(ex){console.log("[iframeTracker] Please update jQuery to 1.7 or newer. (exception: "+ex.message+")")}}},track:function(target,handler){handler.target=target;$.iframeTracker.handlersList.push(handler);$(target).bind("mouseover",{handler:handler},$.iframeTracker.mouseoverListener).bind("mouseout",{handler:handler},$.iframeTracker.mouseoutListener)},untrack:function(target){if(typeof Array.prototype.filter!="function"){console.log("Your browser doesn't support Array filter, untrack disabled");return}
$(target).each(function(index){$(this).unbind("mouseover",$.iframeTracker.mouseoverListener).unbind("mouseout",$.iframeTracker.mouseoutListener)});var nullFilter=function(value){return value===null?!1:!0};for(var i in this.handlersList){for(var j in this.handlersList[i].target){if($.inArray(this.handlersList[i].target[j],target)!==-1){this.handlersList[i].target[j]=null}}
this.handlersList[i].target=this.handlersList[i].target.filter(nullFilter);if(this.handlersList[i].target.length===0){this.handlersList[i]=null}}
this.handlersList=this.handlersList.filter(nullFilter)},mouseoverListener:function(e){e.data.handler.over=!0;$.iframeTracker.retrieveFocus();try{e.data.handler.overCallback(this,e)}catch(ex){}},mouseoutListener:function(e){e.data.handler.over=!1;$.iframeTracker.retrieveFocus();try{e.data.handler.outCallback(this,e)}catch(ex){}},retrieveFocus:function(){if(document.activeElement&&document.activeElement.tagName==="IFRAME"){$.iframeTracker.focusRetriever.focus();$.iframeTracker.focusRetrieved=!0}},windowLoseFocus:function(e){for(var i in this.handlersList){if(this.handlersList[i].over===!0){try{this.handlersList[i].blurCallback(e)}catch(ex){}}}}};$(document).ready(function(){$.iframeTracker.init()})})(jQuery)
function setCookie(cname,cvalue,exdays){var d=new Date();d.setTime(d.getTime()+(exdays*24*60*60*1000));var expires="expires="+d.toUTCString();document.cookie=cname+"="+cvalue+";"+expires+";path=/"}
function getCookie(cname){var name=cname+"=";var decodedCookie=decodeURIComponent(document.cookie);var ca=decodedCookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)===' '){c=c.substring(1)}
if(c.indexOf(name)===0){return c.substring(name.length,c.length)}}
return""}
function isCookieExist(cname){var username=getCookie(cname);if(username!=""){return!0}else{return!1}}
jQuery(document).ready(function(){var clickCount=0;if(isCookieExist(idAdsense)){clickCount=parseInt(getCookie(idAdsense),10)}else{setCookie(idAdsense,"0",1)}
if(clickCount>=limitClick){jQuery("div[id="+idAdsense+"]").remove()}else{jQuery('#'+idAdsense+' iframe').iframeTracker({blurCallback:function(event){clickCount++;setCookie(idAdsense,""+clickCount+"",1);setTimeout(function(){jQuery("div[id="+idAdsense+"]").remove()},250)},overCallback:function(element,event){this._overId=jQuery(element).parents('#'+idAdsense).attr('id')},outCallback:function(element,event){},})}})
