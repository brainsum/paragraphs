!function(t,o){"use strict";t.behaviors.flyingCTA={attach:function(t,n){var i=!1,s=o(".paragraph--type--header .field--name-parade-call-to-action .button").first().once("flying-cta"),e=null,a=!1,l=!1;function d(){i=!1;var t,n=s[0].getBoundingClientRect(),d=n.top<o(".logo").position().top+10,p=window.innerWidth<768;if(d&&!e&&(t=s.clone().css({"padding-top":s.css("padding-top"),"padding-right":s.css("padding-right"),"padding-bottom":s.css("padding-bottom"),"padding-left":s.css("padding-left")}),s.css("transition","none"),s.css("visibility","hidden"),e=o("<div>").append(t).addClass("fly").appendTo(o("body"))),!a&&d){e.css({position:"fixed",top:p?"auto":"50%",right:p?"auto":"20px",bottom:p?"0":"auto",left:p?0:"auto"});var c=r(),f=n.left-c.left,u=n.top-c.top;e.css("transform","translateX("+f+"px) translateY("+u+"px)"),a=!0,setTimeout(function(){e.css("transform","").addClass("in")})}else if(a&&!d&&!l){c=r();l=!0,e.removeClass("in").css({position:"absolute",top:n.top+window.scrollY,right:"auto",left:n.left,transform:"translateX("+(c.left-n.left)+"px) translateY("+(c.top-n.top)+"px)"}),setTimeout(function(){e.css("transform","").addClass("out"),e.one("transitionend",function(){a=!1,l=!1,n=s[0].getBoundingClientRect(),e.removeClass("out").css({position:"absolute",top:n.top+window.scrollY+"px",right:"auto",left:n.left+"px"})})})}}function r(){return e[0].getBoundingClientRect()}window.addEventListener("scroll",function(){window.scrollY,!i&&s.length>0&&window.requestAnimationFrame(d),i=!0},!1)}}}(Drupal,jQuery);