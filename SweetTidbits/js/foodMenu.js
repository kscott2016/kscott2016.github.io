  define(["jquery", "modules/util", "modules/buttonRipple", "jquery.mobile.events"], function($, Util, Ripple) {
  var FoodMenu;
  return FoodMenu = (function() {
    function FoodMenu(options) {
      this.options = options;
      this.options = $.extend({}, this.defaults, this.options);
      if (this.options.isMobile || this.util.isIE8or9()) {
        this.options._timeoutLength = 50;
        this.options._slideLength = 50;
      }
      this.additionalSelectors();
      if (this.options.enableEvents) {
        this.delegateEvents();
      }
    }
    FoodMenu.prototype.defaults = {
      _slideLength: 500,
      _timeoutLength: 300,
      isMobile: false,
      enableEvents: true,
      foodMenu: "#foodMenu",
      foodMenuBack: ".food-menu-category-back",
      foodMenuInfo: ".food-menu-category-info",
      foodMenuCategory: ".food-menu-category",
      foodMenuCategoryWrapper: ".food-menu-category-wrapper",
      foodMenuWrapper: "#foodMenuPanels",
      foodViewCategories: "#foodViewCategories",
      foodSearch: "#foodSearch",
      foodSearchSubmit: "#foodSearchSubmit",
      foodPanelResults: ".food-panel-results",
      foodPanelCategories: ".food-panel-categories",
      foodPanelListings: ".food-panel-listings",
      foodPanelDetail: ".food-panel-detail",
      imageEnlarge: "#imgEnlarge",
      royalSlider: "#mainCarousel .royalSlider",
      queuedSlide: "#mainCarousel .queued-slide",
      $body: $("body"),
      $html: $("html"),
      $document: $(document),
      $window: $(window)
    };
    FoodMenu.prototype.additionalSelectors = function() {
      this.options.$foodMenu = $(this.options.foodMenu);
      this.options.$foodMenuBack = $(this.options.foodMenuBack);
      this.options.$foodMenuInfo = $(this.options.foodMenuInfo);
      this.options.$foodMenuCategory = $(this.options.foodMenuCategory);
      this.options.$foodMenuCategoryWrapper = $(this.options.foodMenuCategoryWrapper);
      this.options.$foodMenuWrapper = $(this.options.foodMenuWrapper);
      this.options.$foodViewCategories = $(this.options.foodViewCategories);
      this.options.$foodSearch = $(this.options.foodSearch);
      this.options.$foodSearchSubmit = $(this.options.foodSearchSubmit);
      this.options.$foodPanelResults = $(this.options.foodPanelResults);
      this.options.$foodPanelCategories = $(this.options.foodPanelCategories);
      this.options.$foodPanelListings = $(this.options.foodPanelListings);
      this.options.$foodPanelDetail = $(this.options.foodPanelDetail);
      this.options.$imageEnlarge = $(this.options.imageEnlarge);
      this.options.$royalSlider = $(this.options.royalSlider);
      return this.options.$queuedSlide = $(this.options.queuedSlide);
    };
    FoodMenu.prototype.delegateEvents = function() {
      this.util.placeholderFix();
      this.options.$body.on("click", ".food-menu-category-info", (function(_this) {
        return function(event) {
          return _this.menuToggleInfo();
        };
      })(this));
      this.options.$body.on("click", "#foodSearchSubmit", (function(_this) {
        return function(event) {
          event.preventDefault();
          return _this.menuSearch();
        };
      })(this));
      this.options.$body.on("keyup keydown keypress", "#foodSearch", (function(_this) {
        return function(event) {
          if (event.keyCode === 13) {
            event.preventDefault();
            if (event.type === "keyup") {
              _this.menuSearch();
            }
            return false;
          }
        };
      })(this));
      this.options.$body.on("click", "#imgEnlarge", (function(_this) {
        return function(event) {
          return _this.fullScreenImageOpen();
        };
      })(this));
      this.options.$html.on("click", ".close-full-screen", (function(_this) {
        return function(event) {
          return _this.fullScreenImageClose(true);
        };
      })(this));
      if (!this.options.isMobile) {
        this.scrollThrobber();
      }
      if (this.options.isMobile) {
        this.mobileResizer(true);
        return this.options.$window.resize((function(_this) {
          return function() {
            return _this.mobileResizer();
          };
        })(this));
      }
    };
    FoodMenu.prototype.util = new Util();
    FoodMenu.prototype.buttonRipple = new Ripple({
      enableEvents: false
    });
    FoodMenu.prototype.openMenu = function() {
      this.additionalSelectors();
      this.buttonRipple.addRipples();
      if (!this.options.$body.hasClass("show-food-menu")) {
        this.sliderPause();
        this.options.$body.addClass("opening-menu");
        return setTimeout((function(_this) {
          return function() {
            var royalSliderApi;
            if (_this.options.isMobile) {
              royalSliderApi = _this.options.$royalSlider.data('royalSlider');
              if (royalSliderApi) {
                royalSliderApi.st.transitionSpeed = _this.options._slideLength;
              }
            }
            _this.options.$body.addClass("menu-animating");
            return setTimeout(function() {
              _this.options.$body.addClass("show-food-menu").removeClass("menu-animating");
              if (_this.options.isMobile) {
                _this.options.$foodMenuWrapper.height($(".food-panel-categories").height());
                return $("body,html").stop(true).animate({
                  scrollTop: 0
                }, 500);
              }
            }, _this.options._slideLength);
          };
        })(this), this.options._timeoutLength);
      }
    };
    FoodMenu.prototype.closeMenu = function() {
      var royalSliderApi;
      this.additionalSelectors();
      if (this.options.$body.hasClass("show-food-menu")) {
        this.options.$body.addClass("going-home");
        royalSliderApi = this.options.$royalSlider.data('royalSlider');
        if (royalSliderApi) {
          royalSliderApi.st.transitionSpeed = this.options._slideLength;
          this.sliderPlay();
          if (this.options.isMobile) {
            setTimeout(((function(_this) {
              return function() {
                return royalSliderApi.st.transitionSpeed = 500;
              };
            })(this)), 400);
          }
        }
        return setTimeout((function(_this) {
          return function() {
            _this.options.$body.removeClass("show-food-menu").addClass("menu-animating");
            setTimeout(function() {
              return _this.options.$body.removeClass("menu-animating");
            }, _this.options._slideLength);
            if (_this.options.isMobile) {
              $("body,html").stop(true).animate({
                scrollTop: 0
              }, 500);
              return setTimeout((function() {
                return $(window).trigger("scroll");
              }), 50);
            }
          };
        })(this), this.options._slideLength);
      }
    };
    FoodMenu.prototype.menuToggleInfo = function(closeMe) {
      var _categoryHeight;
      if (this.options.$foodMenu.hasClass("show-info")) {
        this.options.$foodMenu.removeClass("show-info");
        this.options.$foodMenuCategory.css("height", "");
        if (!this.options.isMobile) {
          return this.options.$foodMenuWrapper.css("height", "");
        }
      } else if (!closeMe) {
        _categoryHeight = this.options.$foodMenuCategoryWrapper.height();
        this.options.$foodMenu.addClass("show-info");
        this.options.$foodMenuCategory.css("height", _categoryHeight);
        if (!this.options.isMobile) {
          return this.options.$foodMenuWrapper.css("height", (this.options.$foodMenu.height() - 60) - _categoryHeight + (this.util.isIE8() ? 100 : 0));
        }
      }
    };
    FoodMenu.prototype.menuSearch = function() {
      var linkUrl, searchQuery, stateObj, urlArray, urlFlag;
      searchQuery = $('#foodSearch').val();
      linkUrl = "/search/?q=" + searchQuery;
      if (searchQuery === null || searchQuery === "") {
        $('#foodSearch').trigger('focus');
        return false;
      }
      if (this.util.isIE8or9()) {
        return location.href = linkUrl;
      } else {
        urlArray = linkUrl.toLowerCase().replace(/^\/+|\/+$/g, '').split('/');
        urlFlag = linkUrl;
        stateObj = {
          path: urlArray,
          id: ""
        };
        return History.pushState(stateObj, "The Cheesecake Factory | Search Results", linkUrl);
      }
    };
    FoodMenu.prototype.menuSearchSubmit = function() {      var searchQuery;
      this.additionalSelectors();
      searchQuery = this.util.getParameterByName('q');
      $('#foodSearch').val(searchQuery);
      this.options.$foodPanelResults.find('.food-menu-content').scrollTop(0);
      $("#siteLoader").delay(450).fadeIn(300);
      return $.ajax({
        url: '/search/cp?t=XML&q=' + searchQuery + '&acc=5411fb1251c3&s=the-cheesecake-factory',
        dataType: 'XML',
        xhrFields: {
          withCredentials: false
        },
        complete: function() {
          return $("#siteLoader").stop(true).fadeOut(250);
        },
        error: function() {
          return window.location.reload();
        },
        success: (function(_this) {
          return function(data, textStatus, jqXHR) {
            var $responseText, resultsList;
            if (null !== data) {
              $responseText = $(jqXHR.responseXML);
              resultsList = "";
              $responseText.find('document').each(function(index, value) {
                var $value, _resultDescription, _resultHasPhoto, _resultID, _resultIsFeatured, _resultTitle, _resultURL;
                $value = $(value);
                _resultID = $value.find("id").text();
                _resultURL = $value.find("url").text() + ("?q=" + searchQuery);
                _resultTitle = $value.find("title").text();
                _resultDescription = $value.find("description").text();
                _resultHasPhoto = $value.find("photo").text() !== "" ? "has-photo " : "";
                _resultIsFeatured = $value.find("featured").text() !== "" ? "special" : "";
                return resultsList += "<li class=\"" + (_resultHasPhoto + _resultIsFeatured) + "\">\n	<a href=\"" + _resultURL + "\" data-internal=\"" + _resultID + "\">\n		<span class=\"item-title\">" + _resultTitle + "</span>\n		<span class=\"item-description\">" + _resultDescription + "</span>\n	</a>\n</li>";
              });
              $(".food-panel-results .food-menu-list").html(resultsList);
              $(".food-panel-results-title").html("" + ($responseText.find("resultsFound").text()) + " results for " + searchQuery);
              _this.buttonRipple.addRipples();
              return _this.panelSwitch("results");
            }
          };
        })(this),
        error: (function(_this) {
          return function(jqXHR, textStatus, errorThrown) {
            return console.log('Search error');
          };
        })(this)
      });
    };
    FoodMenu.prototype.panelSwitch = function(panel, newBackground, noDelay) {
      this.additionalSelectors();
      return setTimeout((function(_this) {
        return function() {
          var notNewPanel, preloadImage, _newPosition;
          if (_this.options.$foodMenu.hasClass("show-" + panel)) {
            notNewPanel = true;
          }
          _this.menuToggleInfo(true);
          if (_this.options.$foodMenu.hasClass("show-results") && panel === "categories") {
            _this.options.$foodSearch.val('');
          }
          if ((_this.options.$foodMenu.hasClass("show-subcategories") && panel !== "categories" && panel !== "subsubcategories") || (!_this.options.$foodMenu.hasClass("show-categories") && !_this.options.$foodMenu.hasClass("show-subsubcategories") && panel === "subcategories")) {
            _this.options.$foodMenu.addClass("transition-subcategories");
          }
          if ((_this.options.$foodMenu.hasClass("show-subsubcategories") && panel !== "categories" && panel !== "subcategories") || (!_this.options.$foodMenu.hasClass("show-categories") && !_this.options.$foodMenu.hasClass("show-subcategories") && panel === "subsubcategories")) {
            _this.options.$foodMenu.addClass("transition-subsubcategories");
          }
          _this.options.$foodMenu.removeClass("show-results").removeClass("show-categories").removeClass("show-subcategories").removeClass("show-subsubcategories").removeClass("show-listings").removeClass("show-detail");
          _this.options.$foodMenu.addClass("show-" + panel);
          if (!notNewPanel) {
            _this.options.$body.addClass("food-menu-animating");
          }
          if (newBackground && (!notNewPanel || _this.options.$body.hasClass("opening-menu")) && !(_this.options.isMobile && panel === "detail" && !_this.options.$body.hasClass("opening-menu"))) {
            preloadImage = new Image();
            preloadImage.src = newBackground.image;
            if (_this.options.$body.hasClass("opening-menu")) {
              _this.options.$body.removeClass("opening-menu");
              setTimeout(function() {
                return _this.sliderNewSlide(newBackground);
              }, _this.options._slideLength);
            } else {
              _this.sliderNewSlide(newBackground);
            }
          }
          if (_this.options.isMobile) {
            if (panel === "detail") {
              $("body,html").scrollTop(0);
            } else {
              _newPosition = _this.options.$foodMenu.offset().top - 50;
              if (_this.options.$body.scrollTop() > _newPosition) {
                $("body,html").scrollTop(_newPosition);
              }
            }
          }
          return setTimeout(function() {
            _this.options.$body.removeClass("food-menu-animating");
            _this.options.$foodMenu.removeClass("transition-subcategories").removeClass("transition-subsubcategories");
            if (_this.options.isMobile) {
              _this.options.$foodMenuWrapper.height($(".food-panel-" + panel + ":last").height());
              return _this.options.$window.trigger("scroll");
            }
          }, _this.options._timeoutLength);
        };
      })(this), noDelay ? 0 : this.options._timeoutLength);
    };
    FoodMenu.prototype.fullScreenImageOpen = function() {
      var newBackground, royalSliderApi;
      if (!this.options.$body.hasClass("full-screen-image")) {
        royalSliderApi = this.options.$royalSlider.data('royalSlider');
        if (royalSliderApi) {
          royalSliderApi.st.transitionSpeed = 500;
          newBackground = {
            image: $(".food-menu-item-photo img").attr("src")
          };
          this.sliderNewSlide(newBackground);
        }
        this.options.$body.addClass("full-screen-image");
        return setTimeout((function(_this) {
          return function() {
            return _this.options.$body.addClass("close-full-screen");
          };
        })(this), this.options._slideLength);
      }
    };
    FoodMenu.prototype.fullScreenImageClose = function(clickedClose) {
      var newBackground;
      this.additionalSelectors();
      if (this.options.$body.hasClass("full-screen-image")) {
        if (clickedClose) {
          newBackground = {
            image: $(".food-panel-detail .food-menu-content").attr("data-background")
          };
          this.sliderNewSlide(newBackground);
        }
        return this.options.$body.removeClass("full-screen-image").removeClass("close-full-screen");
      }
    };
    FoodMenu.prototype.sliderPause = function() {
      var royalSliderApi;
      if (this.options.$royalSlider.length) {
        royalSliderApi = this.options.$royalSlider.data('royalSlider');
        if (royalSliderApi) {
          return royalSliderApi.stopAutoPlay();
        }
      }
    };
    FoodMenu.prototype.sliderPlay = function() {
      var royalSliderApi;
      if (this.options.$royalSlider.length) {
        royalSliderApi = this.options.$royalSlider.data('royalSlider');
        if (royalSliderApi) {
          if (this.options.$royalSlider.hasClass("started-on-menu")) {
            royalSliderApi.goTo(1);
            this.options.$royalSlider.removeClass("started-on-menu");
          } else {
            royalSliderApi.goTo(0);
          }
          return royalSliderApi.startAutoPlay();
        }
      }
    };
    FoodMenu.prototype.sliderNewSlide = function(newBackground) {
      var backgroundImage, itemID, itemName, itemPath, newSlide, royalSliderApi;
      if (this.options.$royalSlider.length) {
        royalSliderApi = this.options.$royalSlider.data('royalSlider');
        if (royalSliderApi) {
          backgroundImage = newBackground.image;
          itemName = newBackground.caption;
          itemPath = newBackground.linkUrl;
          itemID = newBackground.linkId;
          newSlide = "<div class=\"rsContent\" style=\"background-image:url('" + backgroundImage + "');\">";
          if (itemPath && itemName && itemID) {
            newSlide += "<a class=\"background-item-name ripple\" href=\"" + itemPath + "\" data-internal=\"" + itemID + "\">" + itemName + "<div class=\"ripples\"><span class=\"ripples-circle\"></span></div></a>";
          }
          newSlide += "</div>";
          if (this.options.$body.hasClass("slider-animating")) {
            this.options.$queuedSlide.html(newSlide);
            return this.options.$body.addClass("slider-queued");
          } else {
            royalSliderApi.appendSlide(newSlide);
            return setTimeout((function(_this) {
              return function() {
                return royalSliderApi.goTo(-1);
              };
            })(this), this.options._slideLength + 50);
          }
        }
      }
    };
    FoodMenu.prototype.scrollThrobber = function() {
      var $categoriesContainer, $menuDownArrow;
      $categoriesContainer = $(".food-menu-content.food-panel-categories");
      $menuDownArrow = $(".food-menu-down-arrow");
      $categoriesContainer.scroll(function() {
        $categoriesContainer.unbind("scroll");
        return $menuDownArrow.fadeOut(400);
      });
      return $menuDownArrow.on("mouseenter", function() {
        return $menuDownArrow.fadeOut(400);
      });
    };
    FoodMenu.prototype.mobileResizer = function(firstRun) {
      var panelNames, thisPanel, viewportHeight, windowHeight, windowWidth, _i, _len, _results;
      if (firstRun) {
        windowWidth = this.options.$window.width();
        windowHeight = this.options.$window.height();
        viewportHeight = windowHeight > windowWidth ? windowHeight : windowWidth;
        this.options.$foodMenu.append("<style type=\"text/css\">\n.food-menu .food-menu-wrapper#foodMenuPanels { min-height: " + (viewportHeight - 300) + "px }\n.food-menu.show-detail .food-menu-wrapper#foodMenuPanels,\n.food-menu.show-results .food-menu-wrapper#foodMenuPanels { min-height: " + (viewportHeight - 140) + "px }\n</style>");
      }
      panelNames = ["results", "categories", "subcategories", "subsubcategories", "listings", "detail"];
      _results = [];
      for (_i = 0, _len = panelNames.length; _i < _len; _i++) {
        thisPanel = panelNames[_i];
        if (this.options.$foodMenu.hasClass("show-" + thisPanel)) {
          setTimeout((function(_this) {
            return function() {
              return _this.options.$foodMenuWrapper.height($(".food-panel-" + thisPanel + ":last").height());
            };
          })(this), 150);
          break;
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
    return FoodMenu;
  })();
});