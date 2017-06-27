(function (exports) {
'use strict';

/**
 * @file
 * Global scripts, loaded on every page.
 */

(function ($) {
	// Updates parallax header height with px value instead of vh, so it won't be jumping on Android
	// @todo - remove this from here
	var $header = $('.paragraph--type--header.paragraph--view-mode--default');
	if ($header.length) {
		$header.height($header.height());
	}
	if ( $(".slide-in-menu").length ) {
		$("body").addClass("offcanvas");
	}

	/*** HAMBURGER START ***/
	function hasClass (element, className) {
		return new RegExp(" " + className + " ").test(" " + element.className + " ");
	}

	function removeClass (element, className) {
		var classList = Array.prototype.slice.call(element.classList);

		if (hasClass(element, className)) {
			element.classList = classList.filter(function (item) {
				return item !== className
			}).join(" ");
		}
	}

	function toggleClass (element, className) {
		if (hasClass(element, className)) {
			removeClass(element, className);
		} else {
			element.className += " " + className;
		}
	}

	function removeFromAll (elementList, className) {
		elementList.map(function (element) {
			removeClass(element, className);
		});
	}

	window.onload = function () {
		var navLinkContainerNodes = document.getElementsByClassName("slide-in-menu-link");
		var navLinkContainers = Array.prototype.slice.call(navLinkContainerNodes);

		navLinkContainers.map(function (navLink, outerIndex) {
			navLink.onclick = function () {
				toggleClass(navLink, "selected");
				navLinkContainers.filter(function (element, innerIndex) {
					return !(outerIndex === innerIndex);
				}).map(function (element) {
					removeClass(element, "selected");
				});
			};
		});

		var navLinkSubContainerNodes = document.getElementsByClassName("nav-menu-sub-link");
		var navLinkSubContainers = Array.prototype.slice.call(navLinkSubContainerNodes);

		navLinkSubContainers.map(function (navLink, outerIndex) {
			navLink.onclick = function () {
				toggleClass(navLink, "selected");
				navLinkSubContainers.filter(function (element, innerIndex) {
					return !(outerIndex === innerIndex);
				}).map(function (element) {
					removeClass(element, "selected");
				});
			};
		});

		// Somewhy we need "dynamic listening".
    $(document).on('click', "#hamburger", function() {
      removeFromAll(navLinkContainers, "selected");
      toggleClass(document.body, "pushed");
      $(this).toggleClass('is-active').parent().find("> ul.nav-menu-link-list").toggleClass('is-active');
    });

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

    window.onscroll = function() {scrollFunction();};

    function scrollFunction() {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        document.getElementById("scroll-to-top").style.display = "block";
      } else {
        document.getElementById("scroll-to-top").style.display = "none";
      }
    }

    // When the user clicks on the button, scroll to the top of the document
    $("#scroll-to-top").on('click', function () {
      $('html,body').animate({scrollTop:0},200,'swing');
    });
	};

/*** HAMBURGER END ***/

})(jQuery);

}((this.LaravelElixirBundle = this.LaravelElixirBundle || {})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi9Vc2Vycy9rZWV0ZWVhbi9TaXRlcy9wcm9qZWN0cy9icmFpbnN1bS90Y3Mvd2ViL3RoZW1lcy90aWV0b19hZG1pbi9zcmMvc2NyaXB0cy9nbG9iYWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZVxuICogR2xvYmFsIHNjcmlwdHMsIGxvYWRlZCBvbiBldmVyeSBwYWdlLlxuICovXG5cbigkID0+IHtcblx0Ly8gVXBkYXRlcyBwYXJhbGxheCBoZWFkZXIgaGVpZ2h0IHdpdGggcHggdmFsdWUgaW5zdGVhZCBvZiB2aCwgc28gaXQgd29uJ3QgYmUganVtcGluZyBvbiBBbmRyb2lkXG5cdC8vIEB0b2RvIC0gcmVtb3ZlIHRoaXMgZnJvbSBoZXJlXG5cdGNvbnN0ICRoZWFkZXIgPSAkKCcucGFyYWdyYXBoLS10eXBlLS1oZWFkZXIucGFyYWdyYXBoLS12aWV3LW1vZGUtLWRlZmF1bHQnKTtcblx0aWYgKCRoZWFkZXIubGVuZ3RoKSB7XG5cdFx0JGhlYWRlci5oZWlnaHQoJGhlYWRlci5oZWlnaHQoKSk7XG5cdH1cblx0aWYgKCAkKFwiLnNsaWRlLWluLW1lbnVcIikubGVuZ3RoICkge1xuXHRcdCQoXCJib2R5XCIpLmFkZENsYXNzKFwib2ZmY2FudmFzXCIpO1xuXHR9XG5cblx0LyoqKiBIQU1CVVJHRVIgU1RBUlQgKioqL1xuXHRmdW5jdGlvbiBoYXNDbGFzcyAoZWxlbWVudCwgY2xhc3NOYW1lKSB7XG5cdFx0cmV0dXJuIG5ldyBSZWdFeHAoXCIgXCIgKyBjbGFzc05hbWUgKyBcIiBcIikudGVzdChcIiBcIiArIGVsZW1lbnQuY2xhc3NOYW1lICsgXCIgXCIpO1xuXHR9XG5cblx0ZnVuY3Rpb24gcmVtb3ZlQ2xhc3MgKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xuXHRcdHZhciBjbGFzc0xpc3QgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlbGVtZW50LmNsYXNzTGlzdCk7XG5cblx0XHRpZiAoaGFzQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSkge1xuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QgPSBjbGFzc0xpc3QuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG5cdFx0XHRcdHJldHVybiBpdGVtICE9PSBjbGFzc05hbWVcblx0XHRcdH0pLmpvaW4oXCIgXCIpO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIHRvZ2dsZUNsYXNzIChlbGVtZW50LCBjbGFzc05hbWUpIHtcblx0XHRpZiAoaGFzQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSkge1xuXHRcdFx0cmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZWxlbWVudC5jbGFzc05hbWUgKz0gXCIgXCIgKyBjbGFzc05hbWU7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gcmVtb3ZlRnJvbUFsbCAoZWxlbWVudExpc3QsIGNsYXNzTmFtZSkge1xuXHRcdGVsZW1lbnRMaXN0Lm1hcChmdW5jdGlvbiAoZWxlbWVudCkge1xuXHRcdFx0cmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKTtcblx0XHR9KTtcblx0fVxuXG5cdHdpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIG5hdkxpbmtDb250YWluZXJOb2RlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzbGlkZS1pbi1tZW51LWxpbmtcIik7XG5cdFx0dmFyIG5hdkxpbmtDb250YWluZXJzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobmF2TGlua0NvbnRhaW5lck5vZGVzKTtcblxuXHRcdG5hdkxpbmtDb250YWluZXJzLm1hcChmdW5jdGlvbiAobmF2TGluaywgb3V0ZXJJbmRleCkge1xuXHRcdFx0bmF2TGluay5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR0b2dnbGVDbGFzcyhuYXZMaW5rLCBcInNlbGVjdGVkXCIpO1xuXHRcdFx0XHRuYXZMaW5rQ29udGFpbmVycy5maWx0ZXIoZnVuY3Rpb24gKGVsZW1lbnQsIGlubmVySW5kZXgpIHtcblx0XHRcdFx0XHRyZXR1cm4gIShvdXRlckluZGV4ID09PSBpbm5lckluZGV4KTtcblx0XHRcdFx0fSkubWFwKGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cdFx0XHRcdFx0cmVtb3ZlQ2xhc3MoZWxlbWVudCwgXCJzZWxlY3RlZFwiKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9O1xuXHRcdH0pO1xuXG5cdFx0dmFyIG5hdkxpbmtTdWJDb250YWluZXJOb2RlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJuYXYtbWVudS1zdWItbGlua1wiKTtcblx0XHR2YXIgbmF2TGlua1N1YkNvbnRhaW5lcnMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChuYXZMaW5rU3ViQ29udGFpbmVyTm9kZXMpO1xuXG5cdFx0bmF2TGlua1N1YkNvbnRhaW5lcnMubWFwKGZ1bmN0aW9uIChuYXZMaW5rLCBvdXRlckluZGV4KSB7XG5cdFx0XHRuYXZMaW5rLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHRvZ2dsZUNsYXNzKG5hdkxpbmssIFwic2VsZWN0ZWRcIik7XG5cdFx0XHRcdG5hdkxpbmtTdWJDb250YWluZXJzLmZpbHRlcihmdW5jdGlvbiAoZWxlbWVudCwgaW5uZXJJbmRleCkge1xuXHRcdFx0XHRcdHJldHVybiAhKG91dGVySW5kZXggPT09IGlubmVySW5kZXgpO1xuXHRcdFx0XHR9KS5tYXAoZnVuY3Rpb24gKGVsZW1lbnQpIHtcblx0XHRcdFx0XHRyZW1vdmVDbGFzcyhlbGVtZW50LCBcInNlbGVjdGVkXCIpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH07XG5cdFx0fSk7XG5cblx0XHQvLyBTb21ld2h5IHdlIG5lZWQgXCJkeW5hbWljIGxpc3RlbmluZ1wiLlxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIFwiI2hhbWJ1cmdlclwiLCBmdW5jdGlvbigpIHtcbiAgICAgIHJlbW92ZUZyb21BbGwobmF2TGlua0NvbnRhaW5lcnMsIFwic2VsZWN0ZWRcIik7XG4gICAgICB0b2dnbGVDbGFzcyhkb2N1bWVudC5ib2R5LCBcInB1c2hlZFwiKTtcbiAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpLnBhcmVudCgpLmZpbmQoXCI+IHVsLm5hdi1tZW51LWxpbmstbGlzdFwiKS50b2dnbGVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgfSk7XG5cblx0XHQvKnZhciBwcmVMb2FkZXJPdmVybGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmUtbG9hZGVyLW92ZXJsYXlcIik7XG5cdFx0cmVtb3ZlQ2xhc3MocHJlTG9hZGVyT3ZlcmxheSwgXCJpcy1hY3RpdmVcIik7Ki9cblxuXHRcdC8qdmFyIG5hdkxvZ28gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ29cIik7XG5cblx0XHR3aW5kb3cub25zY3JvbGwgPSAgZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGRvYyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblx0XHRcdHZhciB0b3AgPSAod2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvYy5zY3JvbGxUb3ApICAtIChkb2MuY2xpZW50VG9wIHx8IDApO1xuICAgICAgdmFyIGNsYXNzU2V0ID0gaGFzQ2xhc3MobmF2TG9nbywgXCJmaXhlZFwiKTtcblxuXHRcdFx0aWYgKHRvcCA+PSA0MDAgJiYgIWNsYXNzU2V0KSB7XG5cdFx0XHRcdG5hdkxvZ28uY2xhc3NOYW1lICs9IFwiIGZpeGVkXCI7XG5cdFx0XHRcdHJlbW92ZUNsYXNzKG5hdkxvZ28sIFwibm90LWZpeGVkXCIpO1xuXHRcdFx0fSBlbHNlIGlmICh0b3AgPCA0MDAgJiYgY2xhc3NTZXQpIHtcblx0XHRcdFx0bmF2TG9nby5jbGFzc05hbWUgKz0gXCIgbm90LWZpeGVkXCI7XG5cdFx0XHRcdHJlbW92ZUNsYXNzKG5hdkxvZ28sIFwiZml4ZWRcIik7XG5cdFx0XHR9XG5cdFx0fTsqL1xuXG4gICAgd2luZG93Lm9uc2Nyb2xsID0gZnVuY3Rpb24oKSB7c2Nyb2xsRnVuY3Rpb24oKX07XG5cbiAgICBmdW5jdGlvbiBzY3JvbGxGdW5jdGlvbigpIHtcbiAgICAgIGlmIChkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA+IDEwMCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wID4gMTAwKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2Nyb2xsLXRvLXRvcFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzY3JvbGwtdG8tdG9wXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBXaGVuIHRoZSB1c2VyIGNsaWNrcyBvbiB0aGUgYnV0dG9uLCBzY3JvbGwgdG8gdGhlIHRvcCBvZiB0aGUgZG9jdW1lbnRcbiAgICAkKFwiI3Njcm9sbC10by10b3BcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgJCgnaHRtbCxib2R5JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOjB9LDIwMCwnc3dpbmcnKTtcbiAgICB9KTtcblx0fTtcblxuLyoqKiBIQU1CVVJHRVIgRU5EICoqKi9cblxufSkoalF1ZXJ5KVxuIl0sIm5hbWVzIjpbImNvbnN0Il0sIm1hcHBpbmdzIjoiOzs7QUFBQTs7Ozs7QUFLQSxDQUFDLFVBQUEsQ0FBQyxFQUFDOzs7Q0FHRkEsSUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLHdEQUF3RCxDQUFDLENBQUM7Q0FDNUUsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFO0VBQ25CLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7RUFDakM7Q0FDRCxLQUFLLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE1BQU0sR0FBRztFQUNqQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0VB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