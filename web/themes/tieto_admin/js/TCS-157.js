require=function(r,e,n){function t(n,o){function i(r){return t(i.resolve(r))}function f(e){return r[n][1][e]||e}if(!e[n]){if(!r[n]){var c="function"==typeof require&&require;if(!o&&c)return c(n,!0);if(u)return u(n,!0);var l=new Error("Cannot find module '"+n+"'");throw l.code="MODULE_NOT_FOUND",l}i.resolve=f;var s=e[n]=new t.Module(n);r[n][0].call(s.exports,i,s,s.exports)}return e[n].exports}function o(r){this.id=r,this.bundle=t,this.exports={}}var u="function"==typeof require&&require;t.isParcelRequire=!0,t.Module=o,t.modules=r,t.cache=e,t.parent=u;for(var i=0;i<n.length;i++)t(n[i]);return t}({1:[function(require,module,exports) {
!function(t,n){"use strict";t.behaviors.flyingCTA={attach:function(t,o){var i=!1,s=n(".paragraph--type--header .field--name-parade-call-to-action .button").first().once("flying-cta"),e=null,a=!1,l=!1;function d(){i=!1;var t,o=s[0].getBoundingClientRect(),d=o.top<50,p=window.innerWidth<768;if(d&&!e&&(t=s.clone().css({"padding-top":s.css("padding-top"),"padding-right":s.css("padding-right"),"padding-bottom":s.css("padding-bottom"),"padding-left":s.css("padding-left")}),s.css("transition","none"),s.css("visibility","hidden"),e=n("<div>").append(t).addClass("fly").appendTo(n("body"))),!a&&d){e.css({position:"fixed",top:p?"auto":"50%",right:p?"auto":"20px",bottom:p?"0":"auto",left:p?0:"auto"});var c=r(),f=o.left-c.left,u=o.top-c.top;e.css("transform","translateX("+f+"px) translateY("+u+"px)"),a=!0,setTimeout(function(){e.css("transform","").addClass("in")})}else if(a&&!d&&!l){c=r();l=!0,e.removeClass("in").css({position:"absolute",top:o.top+window.scrollY,right:"auto",left:o.left,transform:"translateX("+(c.left-o.left)+"px) translateY("+(c.top-o.top)+"px)"}),setTimeout(function(){e.css("transform","").addClass("out"),e.one("transitionend",function(){a=!1,l=!1,o=s[0].getBoundingClientRect(),e.removeClass("out").css({position:"absolute",top:o.top+window.scrollY+"px",right:"auto",left:o.left+"px"})})})}}function r(){return e[0].getBoundingClientRect()}window.addEventListener("scroll",function(){window.scrollY,!i&&s.length>0&&window.requestAnimationFrame(d),i=!0},!1)}}}(Drupal,jQuery);
},{}]},{},[1])