<<<<<<< HEAD
var LaravelElixirBundle = (function (exports) {
'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var menuspy$1 = createCommonjsModule(function (module, exports) {
/*! MenuSpy v1.2.1 (Nov 15 2017) - http://leocs.me/menuspy/ - Copyright (c) 2017 Leonardo Santos; MIT License */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.MenuSpy = factory());
}(commonjsGlobal, (function () { 'use strict';

var utils = {
  extend: function extend(a, b) {
    for (var key in b) {
      if (b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }

    return a;
  },

  offset: function offset(el) {
    var rect = el.getBoundingClientRect();

    return {
      top: rect.top + window.pageYOffset,
      left: rect.left + window.pageXOffset
    };
  },

  scrollTop: function scrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop;
  },

  addClass: function addClass(el, className) {
    if (el.classList) {
      el.classList.add(className);
    } else {
      var classes = el.className.split(' ');
      var existingIndex = classes.indexOf(className);

      if (existingIndex === -1) {
        classes.push(className);
      }

      el.className = classes.join(' ');
    }
  },

  removeClass: function removeClass(el, className) {
    if (el.classList) {
      el.classList.remove(className);
    } else {
      el.className = el.className.replace(new RegExp(("(^|\\b)" + (className.split(' ').join('|')) + "(\\b|$)"), 'gi'), ' ');
    }
  },

  debounce: function debounce(fn, delay) {
    var timeout = null;
    return function() {
      var args = arguments;
      var context = this;
      if (!timeout) {
        timeout = setTimeout(function () {
          timeout = 0;
          return fn.apply(context, args);
        }, delay);
      }
    };
  }
};

var MenuSpy = function MenuSpy(element, options) {
  var this$1 = this;

  if (!element) {
    return;
  }

  var defaults = {
    menuItemSelector : 'a[href^="#"]',
    activeClass      : 'active',
    threshold        : 15,
    enableLocationHash : true,
    hashTimeout      : 600,
    callback         : null
  };

  this.element = element;
  this.options = utils.extend(defaults, options);

  this.assignValues();
  this.debouncedAssignValuesFn = utils.debounce(function () { return this$1.assignValues(); });
  window.addEventListener('resize', this.debouncedAssignValuesFn);

  this.debouncedHashFn = utils.debounce(function () {
    var hash = this$1.lastInViewElm ? ("#" + (this$1.lastInViewElm.id)) : '#';
    if (history.replaceState) {
      history.replaceState(null, null, hash);
    } else {
      var st = utils.scrollTop();
      window.location.hash = hash;
      window.scrollTo(0, st);
    }
  }, this.options.hashTimeout);

  this.cacheItems();
  this.scrollFn();
};

MenuSpy.prototype.assignValues = function assignValues () {
  this.currScrollTop = 0;
  this.lastInViewElm = null;
  this.menuHeight = this.element.offsetHeight + this.options.threshold;
  this.menuItems = [].slice.call(this.element.querySelectorAll(this.options.menuItemSelector));
  this.raf = null;
};

MenuSpy.prototype.cacheItems = function cacheItems () {
  this.scrollItems = this.menuItems.map(function (elm) {
    var target = elm.dataset.target ? document.querySelector(elm.dataset.target) : document.getElementById(elm.hash.slice(1));
    if (target) {
      var offset = utils.offset(target).top;
      return { elm: elm, target: target, offset: offset };
    }
    return false;
  });
  this.scrollItems = this.scrollItems.filter(Boolean);
};

MenuSpy.prototype.tick = function tick () {
  var fromTop = this.currScrollTop + this.menuHeight;
  var inViewElms = this.scrollItems.filter(function (item) { return item.offset < fromTop; });
  this.activateItem(inViewElms.pop());
};

MenuSpy.prototype.activateItem = function activateItem (inViewElm) {
    var this$1 = this;

  var ref = this.options;
    var activeClass = ref.activeClass;
    var callback = ref.callback;

  if (!inViewElm) {
    this.scrollItems.forEach(function (item) { return utils.removeClass(item.elm.parentNode, activeClass); });
    this.lastInViewElm = null;

    if (this.options.enableLocationHash) {
      this.debouncedHashFn();
    }

    return;
  }

  if (this.lastInViewElm !== inViewElm.target) {
    this.lastInViewElm = inViewElm.target;

    this.scrollItems.forEach(function (item) {
      utils.removeClass(item.elm.parentNode, activeClass);

      if (item.target === inViewElm.target) {
        utils.addClass(item.elm.parentNode, activeClass);

        if (typeof callback === 'function') {
          callback.call(this$1, item);
        }

        if (this$1.options.enableLocationHash) {
          this$1.debouncedHashFn();
        }
      }
    });
  }
};

MenuSpy.prototype.scrollFn = function scrollFn () {
  var st = utils.scrollTop();

  if (this.currScrollTop !== st) {
    this.currScrollTop = st;
    this.tick();
  }

  this.raf = window.requestAnimationFrame(this.scrollFn.bind(this));
};

MenuSpy.prototype.destroy = function destroy () {
  if (this.raf) {
    window.cancelAnimationFrame(this.raf);
  }

  window.removeEventListener('resize', this.debouncedAssignValuesFn);
};

return MenuSpy;

})));
});

/**
 * @file
 * Menu highlighting while scroll
 *
 * @see  https://github.com/lcdsantos/menuspy
 */

var $menu = jQuery('#nav-menu-link-list');

var menuspy = new menuspy$1($menu[0],{
  enableLocationHash: false,
  threshold: 50
});

var $lis = $menu.find('>li');

$menu.find('>li>a').on('click', function(e) {
  var $this = jQuery(this);

  $lis.removeClass('active');

  $this.parent().addClass('active'); 
});

return exports;

}({}));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIkM6L3d3dy9jdXJyZW50L3RpZXRvY3Mvd2ViL3RoZW1lcy90aWV0b19hZG1pbi9ub2RlX21vZHVsZXMvbWVudXNweS9kaXN0L21lbnVzcHkuanMiLCJDOi93d3cvY3VycmVudC90aWV0b2NzL3dlYi90aGVtZXMvdGlldG9fYWRtaW4vc3JjL3NjcmlwdHMvbWVudXNweS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgTWVudVNweSB2MS4yLjEgKE5vdiAxNSAyMDE3KSAtIGh0dHA6Ly9sZW9jcy5tZS9tZW51c3B5LyAtIENvcHlyaWdodCAoYykgMjAxNyBMZW9uYXJkbyBTYW50b3M7IE1JVCBMaWNlbnNlICovXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXHR0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG5cdHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG5cdChnbG9iYWwuTWVudVNweSA9IGZhY3RvcnkoKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0ge1xuICBleHRlbmQ6IGZ1bmN0aW9uIGV4dGVuZChhLCBiKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGIpIHtcbiAgICAgIGlmIChiLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgYVtrZXldID0gYltrZXldO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhO1xuICB9LFxuXG4gIG9mZnNldDogZnVuY3Rpb24gb2Zmc2V0KGVsKSB7XG4gICAgdmFyIHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIHJldHVybiB7XG4gICAgICB0b3A6IHJlY3QudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0LFxuICAgICAgbGVmdDogcmVjdC5sZWZ0ICsgd2luZG93LnBhZ2VYT2Zmc2V0XG4gICAgfTtcbiAgfSxcblxuICBzY3JvbGxUb3A6IGZ1bmN0aW9uIHNjcm9sbFRvcCgpIHtcbiAgICByZXR1cm4gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gIH0sXG5cbiAgYWRkQ2xhc3M6IGZ1bmN0aW9uIGFkZENsYXNzKGVsLCBjbGFzc05hbWUpIHtcbiAgICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBjbGFzc2VzID0gZWwuY2xhc3NOYW1lLnNwbGl0KCcgJyk7XG4gICAgICB2YXIgZXhpc3RpbmdJbmRleCA9IGNsYXNzZXMuaW5kZXhPZihjbGFzc05hbWUpO1xuXG4gICAgICBpZiAoZXhpc3RpbmdJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKGNsYXNzTmFtZSk7XG4gICAgICB9XG5cbiAgICAgIGVsLmNsYXNzTmFtZSA9IGNsYXNzZXMuam9pbignICcpO1xuICAgIH1cbiAgfSxcblxuICByZW1vdmVDbGFzczogZnVuY3Rpb24gcmVtb3ZlQ2xhc3MoZWwsIGNsYXNzTmFtZSkge1xuICAgIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UobmV3IFJlZ0V4cCgoXCIoXnxcXFxcYilcIiArIChjbGFzc05hbWUuc3BsaXQoJyAnKS5qb2luKCd8JykpICsgXCIoXFxcXGJ8JClcIiksICdnaScpLCAnICcpO1xuICAgIH1cbiAgfSxcblxuICBkZWJvdW5jZTogZnVuY3Rpb24gZGVib3VuY2UoZm4sIGRlbGF5KSB7XG4gICAgdmFyIHRpbWVvdXQgPSBudWxsO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgaWYgKCF0aW1lb3V0KSB7XG4gICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aW1lb3V0ID0gMDtcbiAgICAgICAgICByZXR1cm4gZm4uYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgIH0sIGRlbGF5KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59O1xuXG52YXIgTWVudVNweSA9IGZ1bmN0aW9uIE1lbnVTcHkoZWxlbWVudCwgb3B0aW9ucykge1xuICB2YXIgdGhpcyQxID0gdGhpcztcblxuICBpZiAoIWVsZW1lbnQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgbWVudUl0ZW1TZWxlY3RvciA6ICdhW2hyZWZePVwiI1wiXScsXG4gICAgYWN0aXZlQ2xhc3MgICAgICA6ICdhY3RpdmUnLFxuICAgIHRocmVzaG9sZCAgICAgICAgOiAxNSxcbiAgICBlbmFibGVMb2NhdGlvbkhhc2ggOiB0cnVlLFxuICAgIGhhc2hUaW1lb3V0ICAgICAgOiA2MDAsXG4gICAgY2FsbGJhY2sgICAgICAgICA6IG51bGxcbiAgfTtcblxuICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICB0aGlzLm9wdGlvbnMgPSB1dGlscy5leHRlbmQoZGVmYXVsdHMsIG9wdGlvbnMpO1xuXG4gIHRoaXMuYXNzaWduVmFsdWVzKCk7XG4gIHRoaXMuZGVib3VuY2VkQXNzaWduVmFsdWVzRm4gPSB1dGlscy5kZWJvdW5jZShmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzJDEuYXNzaWduVmFsdWVzKCk7IH0pO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5kZWJvdW5jZWRBc3NpZ25WYWx1ZXNGbik7XG5cbiAgdGhpcy5kZWJvdW5jZWRIYXNoRm4gPSB1dGlscy5kZWJvdW5jZShmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGhhc2ggPSB0aGlzJDEubGFzdEluVmlld0VsbSA/IChcIiNcIiArICh0aGlzJDEubGFzdEluVmlld0VsbS5pZCkpIDogJyMnO1xuICAgIGlmIChoaXN0b3J5LnJlcGxhY2VTdGF0ZSkge1xuICAgICAgaGlzdG9yeS5yZXBsYWNlU3RhdGUobnVsbCwgbnVsbCwgaGFzaCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBzdCA9IHV0aWxzLnNjcm9sbFRvcCgpO1xuICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBoYXNoO1xuICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHN0KTtcbiAgICB9XG4gIH0sIHRoaXMub3B0aW9ucy5oYXNoVGltZW91dCk7XG5cbiAgdGhpcy5jYWNoZUl0ZW1zKCk7XG4gIHRoaXMuc2Nyb2xsRm4oKTtcbn07XG5cbk1lbnVTcHkucHJvdG90eXBlLmFzc2lnblZhbHVlcyA9IGZ1bmN0aW9uIGFzc2lnblZhbHVlcyAoKSB7XG4gIHRoaXMuY3VyclNjcm9sbFRvcCA9IDA7XG4gIHRoaXMubGFzdEluVmlld0VsbSA9IG51bGw7XG4gIHRoaXMubWVudUhlaWdodCA9IHRoaXMuZWxlbWVudC5vZmZzZXRIZWlnaHQgKyB0aGlzLm9wdGlvbnMudGhyZXNob2xkO1xuICB0aGlzLm1lbnVJdGVtcyA9IFtdLnNsaWNlLmNhbGwodGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5vcHRpb25zLm1lbnVJdGVtU2VsZWN0b3IpKTtcbiAgdGhpcy5yYWYgPSBudWxsO1xufTtcblxuTWVudVNweS5wcm90b3R5cGUuY2FjaGVJdGVtcyA9IGZ1bmN0aW9uIGNhY2hlSXRlbXMgKCkge1xuICB0aGlzLnNjcm9sbEl0ZW1zID0gdGhpcy5tZW51SXRlbXMubWFwKGZ1bmN0aW9uIChlbG0pIHtcbiAgICB2YXIgdGFyZ2V0ID0gZWxtLmRhdGFzZXQudGFyZ2V0ID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbG0uZGF0YXNldC50YXJnZXQpIDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxtLmhhc2guc2xpY2UoMSkpO1xuICAgIGlmICh0YXJnZXQpIHtcbiAgICAgIHZhciBvZmZzZXQgPSB1dGlscy5vZmZzZXQodGFyZ2V0KS50b3A7XG4gICAgICByZXR1cm4geyBlbG06IGVsbSwgdGFyZ2V0OiB0YXJnZXQsIG9mZnNldDogb2Zmc2V0IH07XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfSk7XG4gIHRoaXMuc2Nyb2xsSXRlbXMgPSB0aGlzLnNjcm9sbEl0ZW1zLmZpbHRlcihCb29sZWFuKTtcbn07XG5cbk1lbnVTcHkucHJvdG90eXBlLnRpY2sgPSBmdW5jdGlvbiB0aWNrICgpIHtcbiAgdmFyIGZyb21Ub3AgPSB0aGlzLmN1cnJTY3JvbGxUb3AgKyB0aGlzLm1lbnVIZWlnaHQ7XG4gIHZhciBpblZpZXdFbG1zID0gdGhpcy5zY3JvbGxJdGVtcy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuIGl0ZW0ub2Zmc2V0IDwgZnJvbVRvcDsgfSk7XG4gIHRoaXMuYWN0aXZhdGVJdGVtKGluVmlld0VsbXMucG9wKCkpO1xufTtcblxuTWVudVNweS5wcm90b3R5cGUuYWN0aXZhdGVJdGVtID0gZnVuY3Rpb24gYWN0aXZhdGVJdGVtIChpblZpZXdFbG0pIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICB2YXIgcmVmID0gdGhpcy5vcHRpb25zO1xuICAgIHZhciBhY3RpdmVDbGFzcyA9IHJlZi5hY3RpdmVDbGFzcztcbiAgICB2YXIgY2FsbGJhY2sgPSByZWYuY2FsbGJhY2s7XG5cbiAgaWYgKCFpblZpZXdFbG0pIHtcbiAgICB0aGlzLnNjcm9sbEl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuIHV0aWxzLnJlbW92ZUNsYXNzKGl0ZW0uZWxtLnBhcmVudE5vZGUsIGFjdGl2ZUNsYXNzKTsgfSk7XG4gICAgdGhpcy5sYXN0SW5WaWV3RWxtID0gbnVsbDtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZW5hYmxlTG9jYXRpb25IYXNoKSB7XG4gICAgICB0aGlzLmRlYm91bmNlZEhhc2hGbigpO1xuICAgIH1cblxuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICh0aGlzLmxhc3RJblZpZXdFbG0gIT09IGluVmlld0VsbS50YXJnZXQpIHtcbiAgICB0aGlzLmxhc3RJblZpZXdFbG0gPSBpblZpZXdFbG0udGFyZ2V0O1xuXG4gICAgdGhpcy5zY3JvbGxJdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB1dGlscy5yZW1vdmVDbGFzcyhpdGVtLmVsbS5wYXJlbnROb2RlLCBhY3RpdmVDbGFzcyk7XG5cbiAgICAgIGlmIChpdGVtLnRhcmdldCA9PT0gaW5WaWV3RWxtLnRhcmdldCkge1xuICAgICAgICB1dGlscy5hZGRDbGFzcyhpdGVtLmVsbS5wYXJlbnROb2RlLCBhY3RpdmVDbGFzcyk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGhpcyQxLCBpdGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzJDEub3B0aW9ucy5lbmFibGVMb2NhdGlvbkhhc2gpIHtcbiAgICAgICAgICB0aGlzJDEuZGVib3VuY2VkSGFzaEZuKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcblxuTWVudVNweS5wcm90b3R5cGUuc2Nyb2xsRm4gPSBmdW5jdGlvbiBzY3JvbGxGbiAoKSB7XG4gIHZhciBzdCA9IHV0aWxzLnNjcm9sbFRvcCgpO1xuXG4gIGlmICh0aGlzLmN1cnJTY3JvbGxUb3AgIT09IHN0KSB7XG4gICAgdGhpcy5jdXJyU2Nyb2xsVG9wID0gc3Q7XG4gICAgdGhpcy50aWNrKCk7XG4gIH1cblxuICB0aGlzLnJhZiA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5zY3JvbGxGbi5iaW5kKHRoaXMpKTtcbn07XG5cbk1lbnVTcHkucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiBkZXN0cm95ICgpIHtcbiAgaWYgKHRoaXMucmFmKSB7XG4gICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMucmFmKTtcbiAgfVxuXG4gIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmRlYm91bmNlZEFzc2lnblZhbHVlc0ZuKTtcbn07XG5cbnJldHVybiBNZW51U3B5O1xuXG59KSkpO1xuIiwiLyoqXG4gKiBAZmlsZVxuICogTWVudSBoaWdobGlnaHRpbmcgd2hpbGUgc2Nyb2xsXG4gKlxuICogQHNlZSAgaHR0cHM6Ly9naXRodWIuY29tL2xjZHNhbnRvcy9tZW51c3B5XG4gKi9cblxuaW1wb3J0IE1lbnVTcHkgZnJvbSAnbWVudXNweSc7XG5cbnZhciAkbWVudSA9IGpRdWVyeSgnI25hdi1tZW51LWxpbmstbGlzdCcpO1xuXG52YXIgbWVudXNweSA9IG5ldyBNZW51U3B5KCRtZW51WzBdLHtcbiAgZW5hYmxlTG9jYXRpb25IYXNoOiBmYWxzZSxcbiAgdGhyZXNob2xkOiA1MFxufSk7XG5cbnZhciAkbGlzID0gJG1lbnUuZmluZCgnPmxpJyk7XG5cbiRtZW51LmZpbmQoJz5saT5hJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICB2YXIgJHRoaXMgPSBqUXVlcnkodGhpcyk7XG5cbiAgJGxpcy5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cbiAgJHRoaXMucGFyZW50KCkuYWRkQ2xhc3MoJ2FjdGl2ZScpOyBcbn0pO1xuXG4iXSwibmFtZXMiOlsidGhpcyIsIk1lbnVTcHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLENBQUMsVUFBVSxNQUFNLEVBQUUsT0FBTyxFQUFFO0NBQzNCLE9BQU8sT0FBTyxLQUFLLFFBQVEsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEdBQUcsY0FBYyxHQUFHLE9BQU8sRUFBRTtDQUN6RixPQUFPLE1BQU0sS0FBSyxVQUFVLElBQUksTUFBTSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO0VBQzNELE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxFQUFFLENBQUMsQ0FBQztDQUM3QixDQUFDQSxjQUFJLEdBQUcsWUFBWSxFQUFFLFlBQVksQ0FBQzs7QUFFcEMsSUFBSSxLQUFLLEdBQUc7RUFDVixNQUFNLEVBQUUsU0FBUyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUM1QixLQUFLLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRTtNQUNqQixJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDekIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztPQUNqQjtLQUNGOztJQUVELE9BQU8sQ0FBQyxDQUFDO0dBQ1Y7O0VBRUQsTUFBTSxFQUFFLFNBQVMsTUFBTSxDQUFDLEVBQUUsRUFBRTtJQUMxQixJQUFJLElBQUksR0FBRyxFQUFFLENBQUMscUJBQXFCLEVBQUUsQ0FBQzs7SUFFdEMsT0FBTztNQUNMLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxXQUFXO01BQ2xDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxXQUFXO0tBQ3JDLENBQUM7R0FDSDs7RUFFRCxTQUFTLEVBQUUsU0FBUyxTQUFTLEdBQUc7SUFDOUIsT0FBTyxNQUFNLENBQUMsV0FBVyxJQUFJLFFBQVEsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDO0dBQ2pFOztFQUVELFFBQVEsRUFBRSxTQUFTLFFBQVEsQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFO0lBQ3pDLElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRTtNQUNoQixFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUM3QixNQUFNO01BQ0wsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7TUFDdEMsSUFBSSxhQUFhLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQzs7TUFFL0MsSUFBSSxhQUFhLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDeEIsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztPQUN6Qjs7TUFFRCxFQUFFLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDbEM7R0FDRjs7RUFFRCxXQUFXLEVBQUUsU0FBUyxXQUFXLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRTtJQUMvQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEVBQUU7TUFDaEIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDaEMsTUFBTTtNQUNMLEVBQUUsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLEVBQUUsU0FBUyxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQ3hIO0dBQ0Y7O0VBRUQsUUFBUSxFQUFFLFNBQVMsUUFBUSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUU7SUFDckMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ25CLE9BQU8sV0FBVztNQUNoQixJQUFJLElBQUksR0FBRyxTQUFTLENBQUM7TUFDckIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO01BQ25CLElBQUksQ0FBQyxPQUFPLEVBQUU7UUFDWixPQUFPLEdBQUcsVUFBVSxDQUFDLFlBQVk7VUFDL0IsT0FBTyxHQUFHLENBQUMsQ0FBQztVQUNaLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDaEMsRUFBRSxLQUFLLENBQUMsQ0FBQztPQUNYO0tBQ0YsQ0FBQztHQUNIO0NBQ0YsQ0FBQzs7QUFFRixJQUFJLE9BQU8sR0FBRyxTQUFTLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFO0VBQy9DLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQzs7RUFFbEIsSUFBSSxDQUFDLE9BQU8sRUFBRTtJQUNaLE9BQU87R0FDUjs7RUFFRCxJQUFJLFFBQVEsR0FBRztJQUNiLGdCQUFnQixHQUFHLGNBQWM7SUFDakMsV0FBVyxRQUFRLFFBQVE7SUFDM0IsU0FBUyxVQUFVLEVBQUU7SUFDckIsa0JBQWtCLEdBQUcsSUFBSTtJQUN6QixXQUFXLFFBQVEsR0FBRztJQUN0QixRQUFRLFdBQVcsSUFBSTtHQUN4QixDQUFDOztFQUVGLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0VBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7O0VBRS9DLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztFQUNwQixJQUFJLENBQUMsdUJBQXVCLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsT0FBTyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDN0YsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQzs7RUFFaEUsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLFlBQVk7SUFDaEQsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLGFBQWEsSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsSUFBSSxHQUFHLENBQUM7SUFDMUUsSUFBSSxPQUFPLENBQUMsWUFBWSxFQUFFO01BQ3hCLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztLQUN4QyxNQUFNO01BQ0wsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO01BQzNCLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztNQUM1QixNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUN4QjtHQUNGLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQzs7RUFFN0IsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0VBQ2xCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztDQUNqQixDQUFDOztBQUVGLE9BQU8sQ0FBQyxTQUFTLENBQUMsWUFBWSxHQUFHLFNBQVMsWUFBWSxJQUFJO0VBQ3hELElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO0VBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0VBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7RUFDckUsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO0VBQzdGLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO0NBQ2pCLENBQUM7O0FBRUYsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEdBQUcsU0FBUyxVQUFVLElBQUk7RUFDcEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsRUFBRTtJQUNuRCxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFILElBQUksTUFBTSxFQUFFO01BQ1YsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUM7TUFDdEMsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUM7S0FDckQ7SUFDRCxPQUFPLEtBQUssQ0FBQztHQUNkLENBQUMsQ0FBQztFQUNILElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7Q0FDckQsQ0FBQzs7QUFFRixPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxTQUFTLElBQUksSUFBSTtFQUN4QyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7RUFDbkQsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFJLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQzVGLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7Q0FDckMsQ0FBQzs7QUFFRixPQUFPLENBQUMsU0FBUyxDQUFDLFlBQVksR0FBRyxTQUFTLFlBQVksRUFBRSxTQUFTLEVBQUU7SUFDL0QsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDOztFQUVwQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3JCLElBQUksV0FBVyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUM7SUFDbEMsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQzs7RUFFOUIsSUFBSSxDQUFDLFNBQVMsRUFBRTtJQUNkLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxFQUFFLEVBQUUsT0FBTyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzFHLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDOztJQUUxQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUU7TUFDbkMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0tBQ3hCOztJQUVELE9BQU87R0FDUjs7RUFFRCxJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssU0FBUyxDQUFDLE1BQU0sRUFBRTtJQUMzQyxJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUM7O0lBRXRDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxFQUFFO01BQ3ZDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7O01BRXBELElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsTUFBTSxFQUFFO1FBQ3BDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7O1FBRWpELElBQUksT0FBTyxRQUFRLEtBQUssVUFBVSxFQUFFO1VBQ2xDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzdCOztRQUVELElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRTtVQUNyQyxNQUFNLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDMUI7T0FDRjtLQUNGLENBQUMsQ0FBQztHQUNKO0NBQ0YsQ0FBQzs7QUFFRixPQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxTQUFTLFFBQVEsSUFBSTtFQUNoRCxJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7O0VBRTNCLElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxFQUFFLEVBQUU7SUFDN0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7SUFDeEIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0dBQ2I7O0VBRUQsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztDQUNuRSxDQUFDOztBQUVGLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLFNBQVMsT0FBTyxJQUFJO0VBQzlDLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTtJQUNaLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7R0FDdkM7O0VBRUQsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztDQUNwRSxDQUFDOztBQUVGLE9BQU8sT0FBTyxDQUFDOztDQUVkLEVBQUUsRUFBRTs7O0FDak1MOzs7Ozs7O0FBT0EsQUFFQSxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQzs7QUFFMUMsSUFBSSxPQUFPLEdBQUcsSUFBSUMsU0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNqQyxrQkFBa0IsRUFBRSxLQUFLO0VBQ3pCLFNBQVMsRUFBRSxFQUFFO0NBQ2QsQ0FBQyxDQUFDOztBQUVILElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRTdCLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsRUFBRTtFQUMxQyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7O0VBRXpCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7O0VBRTNCLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7Q0FDbkMsQ0FBQyxDQUFDOzs7Ozs7In0=
=======
require=function(r,e,n){function t(n,o){function i(r){return t(i.resolve(r))}function f(e){return r[n][1][e]||e}if(!e[n]){if(!r[n]){var c="function"==typeof require&&require;if(!o&&c)return c(n,!0);if(u)return u(n,!0);var l=new Error("Cannot find module '"+n+"'");throw l.code="MODULE_NOT_FOUND",l}i.resolve=f;var s=e[n]=new t.Module(n);r[n][0].call(s.exports,i,s,s.exports)}return e[n].exports}function o(r){this.id=r,this.bundle=t,this.exports={}}var u="function"==typeof require&&require;t.isParcelRequire=!0,t.Module=o,t.modules=r,t.cache=e,t.parent=u;for(var i=0;i<n.length;i++)t(n[i]);return t}({3:[function(require,module,exports) {
var global = (1,eval)("this");
var t=(0,eval)("this");!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.MenuSpy=e()}(this,function(){"use strict";var t=function(t,e){for(var s in e)e.hasOwnProperty(s)&&(t[s]=e[s]);return t},e=function(t){var e=t.getBoundingClientRect();return{top:e.top+window.pageYOffset,left:e.left+window.pageXOffset}},s=function(){return window.pageYOffset||document.documentElement.scrollTop},n=function(t,e){if(t.classList)t.classList.add(e);else{var s=t.className.split(" ");-1===s.indexOf(e)&&s.push(e),t.className=s.join(" ")}},i=function(t,e){t.classList?t.classList.remove(e):t.className=t.className.replace(new RegExp("(^|\\b)"+e.split(" ").join("|")+"(\\b|$)","gi")," ")},o=function(t,e){var s=null;return function(){var n=arguments,i=this;s||(s=setTimeout(function(){return s=0,t.apply(i,n)},e))}},l=function(e,n){var i=this;if(e){this.element="string"==typeof e?document.querySelector(e):e,this.options=t({menuItemSelector:'a[href^="#"]',activeClass:"active",threshold:15,enableLocationHash:!0,hashTimeout:600,callback:null},n),this.assignValues(),this.debouncedAssignValuesFn=o(function(){return i.assignValues()}),window.addEventListener("resize",this.debouncedAssignValuesFn),this.debouncedHashFn=o(function(){var t=i.lastInViewElm?"#"+i.lastInViewElm.id:"#";if(history.replaceState)history.replaceState(null,null,t);else{var e=s();window.location.hash=t,window.scrollTo(0,e)}},this.options.hashTimeout),this.cacheItems(),this.scrollFn()}};return l.prototype.assignValues=function(){this.currScrollTop=0,this.lastInViewElm=null,this.menuHeight=this.element.offsetHeight+this.options.threshold,this.menuItems=[].slice.call(this.element.querySelectorAll(this.options.menuItemSelector)),this.raf=null},l.prototype.cacheItems=function(){this.scrollItems=this.menuItems.map(function(t){var s=t.dataset.target?document.querySelector(t.dataset.target):document.getElementById(t.hash.slice(1));return!!s&&{elm:t,target:s,offset:Math.floor(e(s).top)}}),this.scrollItems=this.scrollItems.filter(Boolean).sort(function(t,e){return t.offset-e.offset})},l.prototype.tick=function(){var t=this.currScrollTop+this.menuHeight,e=this.scrollItems.filter(function(e){return e.offset<t});this.activateItem(e.pop())},l.prototype.activateItem=function(t){var e=this,s=this.options,o=s.activeClass,l=s.callback;if(!t)return this.scrollItems.forEach(function(t){return i(t.elm.parentNode,o)}),this.lastInViewElm=null,void(this.options.enableLocationHash&&this.debouncedHashFn());this.lastInViewElm!==t.target&&(this.lastInViewElm=t.target,this.scrollItems.forEach(function(s){i(s.elm.parentNode,o),s.target===t.target&&(n(s.elm.parentNode,o),"function"==typeof l&&l.call(e,s),e.options.enableLocationHash&&e.debouncedHashFn())}))},l.prototype.scrollFn=function(){var t=s();this.currScrollTop!==t&&(this.currScrollTop=t,this.tick()),this.raf=window.requestAnimationFrame(this.scrollFn.bind(this))},l.prototype.destroy=function(){this.raf&&window.cancelAnimationFrame(this.raf),window.removeEventListener("resize",this.debouncedAssignValuesFn)},l});
},{}],1:[function(require,module,exports) {
"use strict";var e=require("menuspy"),a=n(e);function n(e){return e&&e.__esModule?e:{default:e}}var i=jQuery("#nav-menu-link-list"),t=new a.default(i[0],{enableLocationHash:!1,threshold:0,callback:function(){}}),l=i.find(">li");i.find(">li>a").on("click",function(e){var a=jQuery(this);l.removeClass("active"),a.parent().addClass("active")});
},{"menuspy":3}]},{},[1])
>>>>>>> TCS-479
