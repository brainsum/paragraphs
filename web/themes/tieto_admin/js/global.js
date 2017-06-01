(function ( exports ) {
  'use strict';

  /**
   * @file
   * Global scripts, loaded on every page.
   */

  (function ( $ ) {
    // Updates parallax header height with px value instead of vh, so it won't be jumping on Android
    // @todo - remove this from here
    var $header = $( '.paragraph--type--header.paragraph--view-mode--default' );
    if ( $header.length ) {
      $header.height( $header.height() );
    }

    //last child for normal nav items in mobile menu
    $("li.nav-menu-link:last").addClass("last-item");

    if ( $(".slide-in-menu").length ) {
      $("body").addClass("offcanvas");
    }

    /*** HAMBURGER START ***/
    function hasClass( element, className ) {
      return new RegExp( " " + className + " " ).test( " " + element.className + " " );
    }

    function removeClass( element, className ) {
      var classList = Array.prototype.slice.call( element.classList );

      if ( hasClass( element, className ) ) {
        element.classList = classList.filter( function ( item ) {
          return item !== className
        } ).join( " " );
      }
    }

    function toggleClass( element, className ) {
      if ( hasClass( element, className ) ) {
        removeClass( element, className );
      } else {
        element.className += " " + className;
      }
    }

    function removeFromAll( elementList, className ) {
      elementList.map( function ( element ) {
        removeClass( element, className );
      } );
    }

    window.onload = function () {
      var navLinkContainerNodes = document.getElementsByClassName( "slide-in-menu-link" );
      var navLinkContainers = Array.prototype.slice.call( navLinkContainerNodes );

      navLinkContainers.map( function ( navLink, outerIndex ) {
        navLink.onclick = function () {
          toggleClass( navLink, "selected" );
          navLinkContainers.filter( function ( element, innerIndex ) {
            return !(outerIndex === innerIndex);
          } ).map( function ( element ) {
            removeClass( element, "selected" );
          } );
        };
      } );

      var navLinkSubContainerNodes = document.getElementsByClassName( "nav-menu-sub-link" );
      var navLinkSubContainers = Array.prototype.slice.call( navLinkSubContainerNodes );
      var navMenu = $( ".nav-menu-link-list" );

      navLinkSubContainers.map( function ( navLink, outerIndex ) {
        navLink.onclick = function () {
          toggleClass( navLink, "selected" );
          navLinkSubContainers.filter( function ( element, innerIndex ) {
            return !(outerIndex === innerIndex);
          } ).map( function ( element ) {
            removeClass( element, "selected" );
          } );
        };
      } );

      // Somewhy we need "dynamic listening".
      $( document ).on( 'click', "#hamburger", function () {
        removeFromAll( navLinkContainers, "selected" );
        //toggleClass( document.body, "pushed" );
        $('body').toggleClass('pushed');
        navMenu.toggleClass("is-active");
        $( this ).toggleClass( 'is-active' );
      } );

      /*var preLoaderOverlay = document.getElementById("pre-loader-overlay");
       removeClass(preLoaderOverlay, "is-active");*/

      /*var navLogo = document.getElementById("logo");

       window.onscroll =  function () {
       var doc = document.documentElement;
       var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
       var classSet = hasClass(navLogo, "fixed");

       if (top >= 400 && !classSet) {
       navLogo.className += " fixed";
       removeClass(navLogo, "not-fixed");
       } else if (top < 400 && classSet) {
       navLogo.className += " not-fixed";
       removeClass(navLogo, "fixed");
       }
       };*/
    };

    /*** HAMBURGER END ***/

  })( jQuery );

}( (this.LaravelElixirBundle = this.LaravelElixirBundle || {}) ));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi9tbnQvZC9waHB0ZXN0L3BhcmFncmFwaHMvd2ViL3RoZW1lcy90aWV0b19hZG1pbi9zcmMvc2NyaXB0cy9nbG9iYWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZVxuICogR2xvYmFsIHNjcmlwdHMsIGxvYWRlZCBvbiBldmVyeSBwYWdlLlxuICovXG5cbigkID0+IHtcblx0Ly8gVXBkYXRlcyBwYXJhbGxheCBoZWFkZXIgaGVpZ2h0IHdpdGggcHggdmFsdWUgaW5zdGVhZCBvZiB2aCwgc28gaXQgd29uJ3QgYmUganVtcGluZyBvbiBBbmRyb2lkXG5cdC8vIEB0b2RvIC0gcmVtb3ZlIHRoaXMgZnJvbSBoZXJlXG5cdGNvbnN0ICRoZWFkZXIgPSAkKCcucGFyYWdyYXBoLS10eXBlLS1oZWFkZXIucGFyYWdyYXBoLS12aWV3LW1vZGUtLWRlZmF1bHQnKTtcblx0aWYgKCRoZWFkZXIubGVuZ3RoKSB7XG5cdFx0JGhlYWRlci5oZWlnaHQoJGhlYWRlci5oZWlnaHQoKSk7XG5cdH1cblxuXHQvKioqIEhBTUJVUkdFUiBTVEFSVCAqKiovXG5cdGZ1bmN0aW9uIGhhc0NsYXNzIChlbGVtZW50LCBjbGFzc05hbWUpIHtcblx0XHRyZXR1cm4gbmV3IFJlZ0V4cChcIiBcIiArIGNsYXNzTmFtZSArIFwiIFwiKS50ZXN0KFwiIFwiICsgZWxlbWVudC5jbGFzc05hbWUgKyBcIiBcIik7XG5cdH1cblxuXHRmdW5jdGlvbiByZW1vdmVDbGFzcyAoZWxlbWVudCwgY2xhc3NOYW1lKSB7XG5cdFx0dmFyIGNsYXNzTGlzdCA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGVsZW1lbnQuY2xhc3NMaXN0KTtcblxuXHRcdGlmIChoYXNDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpKSB7XG5cdFx0XHRlbGVtZW50LmNsYXNzTGlzdCA9IGNsYXNzTGlzdC5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdFx0cmV0dXJuIGl0ZW0gIT09IGNsYXNzTmFtZVxuXHRcdFx0fSkuam9pbihcIiBcIik7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gdG9nZ2xlQ2xhc3MgKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xuXHRcdGlmIChoYXNDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpKSB7XG5cdFx0XHRyZW1vdmVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlbGVtZW50LmNsYXNzTmFtZSArPSBcIiBcIiArIGNsYXNzTmFtZTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiByZW1vdmVGcm9tQWxsIChlbGVtZW50TGlzdCwgY2xhc3NOYW1lKSB7XG5cdFx0ZWxlbWVudExpc3QubWFwKGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cdFx0XHRyZW1vdmVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpO1xuXHRcdH0pO1xuXHR9XG5cblx0d2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgbmF2TGlua0NvbnRhaW5lck5vZGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNsaWRlLWluLW1lbnUtbGlua1wiKTtcblx0XHR2YXIgbmF2TGlua0NvbnRhaW5lcnMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChuYXZMaW5rQ29udGFpbmVyTm9kZXMpO1xuXG5cdFx0bmF2TGlua0NvbnRhaW5lcnMubWFwKGZ1bmN0aW9uIChuYXZMaW5rLCBvdXRlckluZGV4KSB7XG5cdFx0XHRuYXZMaW5rLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHRvZ2dsZUNsYXNzKG5hdkxpbmssIFwic2VsZWN0ZWRcIik7XG5cdFx0XHRcdG5hdkxpbmtDb250YWluZXJzLmZpbHRlcihmdW5jdGlvbiAoZWxlbWVudCwgaW5uZXJJbmRleCkge1xuXHRcdFx0XHRcdHJldHVybiAhKG91dGVySW5kZXggPT09IGlubmVySW5kZXgpO1xuXHRcdFx0XHR9KS5tYXAoZnVuY3Rpb24gKGVsZW1lbnQpIHtcblx0XHRcdFx0XHRyZW1vdmVDbGFzcyhlbGVtZW50LCBcInNlbGVjdGVkXCIpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH07XG5cdFx0fSk7XG5cblx0XHR2YXIgbmF2TGlua1N1YkNvbnRhaW5lck5vZGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm5hdi1tZW51LXN1Yi1saW5rXCIpO1xuXHRcdHZhciBuYXZMaW5rU3ViQ29udGFpbmVycyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG5hdkxpbmtTdWJDb250YWluZXJOb2Rlcyk7XG5cblx0XHRuYXZMaW5rU3ViQ29udGFpbmVycy5tYXAoZnVuY3Rpb24gKG5hdkxpbmssIG91dGVySW5kZXgpIHtcblx0XHRcdG5hdkxpbmsub25jbGljayA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dG9nZ2xlQ2xhc3MobmF2TGluaywgXCJzZWxlY3RlZFwiKTtcblx0XHRcdFx0bmF2TGlua1N1YkNvbnRhaW5lcnMuZmlsdGVyKGZ1bmN0aW9uIChlbGVtZW50LCBpbm5lckluZGV4KSB7XG5cdFx0XHRcdFx0cmV0dXJuICEob3V0ZXJJbmRleCA9PT0gaW5uZXJJbmRleCk7XG5cdFx0XHRcdH0pLm1hcChmdW5jdGlvbiAoZWxlbWVudCkge1xuXHRcdFx0XHRcdHJlbW92ZUNsYXNzKGVsZW1lbnQsIFwic2VsZWN0ZWRcIik7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fTtcblx0XHR9KTtcblxuXHRcdC8vIFNvbWV3aHkgd2UgbmVlZCBcImR5bmFtaWMgbGlzdGVuaW5nXCIuXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgXCIjaGFtYnVyZ2VyXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgcmVtb3ZlRnJvbUFsbChuYXZMaW5rQ29udGFpbmVycywgXCJzZWxlY3RlZFwiKTtcbiAgICAgIHRvZ2dsZUNsYXNzKGRvY3VtZW50LmJvZHksIFwicHVzaGVkXCIpO1xuICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnaXMtYWN0aXZlJylcbiAgICB9KTtcblxuXHRcdC8qdmFyIHByZUxvYWRlck92ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByZS1sb2FkZXItb3ZlcmxheVwiKTtcblx0XHRyZW1vdmVDbGFzcyhwcmVMb2FkZXJPdmVybGF5LCBcImlzLWFjdGl2ZVwiKTsqL1xuXG5cdFx0Lyp2YXIgbmF2TG9nbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9nb1wiKTtcblxuXHRcdHdpbmRvdy5vbnNjcm9sbCA9ICBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgZG9jID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXHRcdFx0dmFyIHRvcCA9ICh3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jLnNjcm9sbFRvcCkgIC0gKGRvYy5jbGllbnRUb3AgfHwgMCk7XG4gICAgICB2YXIgY2xhc3NTZXQgPSBoYXNDbGFzcyhuYXZMb2dvLCBcImZpeGVkXCIpO1xuXG5cdFx0XHRpZiAodG9wID49IDQwMCAmJiAhY2xhc3NTZXQpIHtcblx0XHRcdFx0bmF2TG9nby5jbGFzc05hbWUgKz0gXCIgZml4ZWRcIjtcblx0XHRcdFx0cmVtb3ZlQ2xhc3MobmF2TG9nbywgXCJub3QtZml4ZWRcIik7XG5cdFx0XHR9IGVsc2UgaWYgKHRvcCA8IDQwMCAmJiBjbGFzc1NldCkge1xuXHRcdFx0XHRuYXZMb2dvLmNsYXNzTmFtZSArPSBcIiBub3QtZml4ZWRcIjtcblx0XHRcdFx0cmVtb3ZlQ2xhc3MobmF2TG9nbywgXCJmaXhlZFwiKTtcblx0XHRcdH1cblx0XHR9OyovXG5cdH07XG5cbi8qKiogSEFNQlVSR0VSIEVORCAqKiovXG5cbn0pKGpRdWVyeSlcbiJdLCJuYW1lcyI6WyJjb25zdCJdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7Ozs7O0FBS0EsQ0FBQyxVQUFBLENBQUMsRUFBQzs7O0NBR0ZBLElBQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyx3REFBd0QsQ0FBQyxDQUFDO0NBQzVFLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtFQUNuQixPQUFP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
