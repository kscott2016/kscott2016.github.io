define(["jquery", "jquery.mobile.events"], function($) {
  var Accordion;
  return Accordion = (function() {
    function Accordion(options) {
      this.options = options;
      this.options = $.extend({}, this.defaults, this.options);
      this.delegateEvents();
    }

    Accordion.prototype.defaults = {
      $body: $("body"),
      $navigation: $("#navigation")
    };

    Accordion.prototype.delegateEvents = function() {
      var _this;
      _this = this;
      this.options.$body.on('vclick', '.accordion-item-title', function(event) {
        return _this.accordionToggle($(this));
      });
      return this.options.$body.on('click', '.share-action', function() {
        return $(this).closest(".share-this").toggleClass("share-active");
      });
    };

    Accordion.prototype.accordionToggle = function($this) {
      var $accordionitem, _accordionheight;
      $accordionitem = $this.closest(".accordion-item");
      _accordionheight = $accordionitem.find('.accordion-item-wrap').height();
      if ($this.closest('#navigation'.length)) {
        this.options.$navigation.find('.active').not($accordionitem).height('').removeClass('active');
      }
      if ($accordionitem.hasClass('active')) {
        $accordionitem.height('');
      } else {
        $accordionitem.height(_accordionheight);
      }
      return $accordionitem.toggleClass('active');
    };

    return Accordion;

  })();
});
