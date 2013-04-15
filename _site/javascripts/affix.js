/**
 * ...
 *
 */
(function ($) {
  $.fn.fixedIfNeeded = function (stopBefore) {
    return this.each(function () {
      var el = $(this);
      var elHeight = el.outerHeight();
      var offset = el.offset();
      var stopBeforeOffset = stopBefore ? $(stopBefore).offset() : false;
      var stopBeforeHeight = stopBefore ? $(stopBefore).outerHeight() : false;
      var oldCSS = {
        float: el.css('float'), 
        margin: el.css('margin'), 
        position: el.css('position'), 
        left: el.css('left'), 
        top: el.css('top')
      };
      var newCSS = {
        float: 'none', 
        margin: 0, 
        position: 'fixed', 
        left: offset.left + 'px', 
        top: 0
      };
      var absoluteCSS = {
        float: 'none', 
        margin: 0, 
        position: 'absolute', 
        left: offset.left + 'px', 
        top: 0
      };

      if (false) {
        $(this).css(newCSS);
      }

      var positionEl = function () {
        var scrollTop = $(window).scrollTop();

        if (scrollTop > offset.top) {
          if (stopBefore) {
            var limit = stopBeforeOffset.top + stopBeforeHeight;
            var top = scrollTop + elHeight;

            if (top < limit) {
              el.css(newCSS);
            }
            else {
              absoluteCSS.top = (stopBeforeOffset.top + stopBeforeHeight - elHeight) + 'px';

              el.css(absoluteCSS);
            }
          }
          else {
            el.css(newCSS);
          }
        }
        else {
          el.css(oldCSS);
        }
      };

      positionEl();

      $(window).scroll(positionEl);
    });
  };
})(jQuery);