define(["jquery"], function($) {
  var Ripple;
  return Ripple = (function() {
    function Ripple(options) {
      this.options = options;
      this.options = $.extend({}, this.defaults, this.options);
      if (this.options.enableEvents) {
        this.delegateEvents();
      }
    }

    Ripple.prototype.defaults = {
      enableEvents: true,
      $body: $("body")
    };

    Ripple.prototype.delegateEvents = function() {
      this.addRipples();
      $("body").on("click.Ripples", ".ripples", function(event) {
        var $circle, $offset, $this, x, y;
        $this = $(this);
        $offset = $this.parent().offset();
        $circle = $this.find(".ripples-circle");
        x = event.pageX - $offset.left;
        y = event.pageY - $offset.top;
        $circle.css({
          top: "" + y + "px",
          left: "" + x + "px"
        });
        $this.addClass("is-active");
      });
      return $("body").on("animationend webkitAnimationEnd oanimationend MSAnimationEnd", ".ripples", function(event) {
        $(this).removeClass("is-active");
      });
    };

    Ripple.prototype.addRipples = function() {
      if (!this.options.$body.hasClass("is-mobile")) {
        return $(".btn, .food-menu-list li a, .add-ripple").not(".ripple").each(function() {
          var $this;
          $this = $(this);
          $this.addClass("ripple").removeClass("add-ripple");
          return $this.append("<div class='ripples'><span class='ripples-circle'></span></div>");
        });
      } else {
        $(".add-ripple").removeClass("add-ripple");
        return $(".ripple").removeClass("ripple");
      }
    };

    return Ripple;

  })();
});
