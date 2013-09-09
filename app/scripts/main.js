require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        bootstrap: 'vendor/bootstrap'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    }
});

require(['app', 'jquery', 'bootstrap'], function (app, $) {
    'use strict';
    // use app here
    
    // Slider stuff here.

    // Loop through CAROUSELS

    var $carousels = $('.carousel'),
        carousels = [],
        carousel_count = $carousels.length,
        carousel_i = 0;

    var Carousel = function (el) {

        this.el = el;
        this.initialize();
    }

    Carousel.prototype = {

        initialize: function initializeFn () {

            var that = this;

            // Wrap the element
            this.$el = $(this.el);

            this.loadItems();
            this.bindControls();

             // Load first item
            this.loadIndex(0);
        },

        loadItems: function loadItemsFn () {

            var that = this;

            // Set the items
            this.$items = this.$el.find('.carousel__item');

            // Bind item's click
            this.$items.on("click", function (e) {

                that.loadIndex( $(this).index() );
            });
        },

        bindControls: function bindControlsFn () {

            var that = this,
                $pag = this.$el.find(".pag");

            if ($pag.length > 0) {

                console.log("pag found!");

                var $back = $pag.find(".pag__item--back"),
                    $next = $pag.find(".pag__item--next");

                if ($back.length > 0) {

                    this.$back = $back;

                    this.$back.on("click", function (e) {

                        e.preventDefault();

                        that.loadIndex( that.currentIndex - 1 )
                    });
                }

                if ($next.length > 0) {

                    this.$next = $next;

                    $next.on("click", function (e) {

                        e.preventDefault();

                        that.loadIndex( that.currentIndex + 1 )
                    });
                }
            }
        },

        loadIndex: function loadIndexFn (index) {

            if ((index >= 0) && (index < this.$items.length)) {

                // If there's a current item, remove its active state
                if (this.currentIndex !== undefined) {

                    // If current is the same as new, kick back
                    if (this.currentIndex === index) {

                        return false;
                    }

                    var $previousItem = $(this.$items[this.currentIndex]);
                    $previousItem.removeClass("active");
                }
                
                // Update global current item
                this.currentIndex = index;

                // Create local current item for manipulated etc
                var $currentItem = $(this.$items[this.currentIndex]);

                // Set current item to active
                $currentItem.addClass("active");

                // Scroll to active element
                this.scrollToCurrent();
            }
        },

        scrollToCurrent: function scrollToCurrentFn () {

            var that = this,
                $inner = $(this.$el.find(".carousel__inner")),
                $currentItem = $(this.$items[this.currentIndex]),
                itemOffset = $currentItem.offset(),
                innerOffset = $inner.offset(),
                newMargin = innerOffset.left - itemOffset.left;

            if ($currentItem.index() === (this.$items.length - 1)) {

                that.activatePagNext(false);
            } else {

                that.activatePagNext(true);
            }

            if (this.currentIndex === 0) {

                that.activatePagBack(false);
            } else {

                that.activatePagBack(true);
            }

            $inner.css("margin-left", newMargin + "px");
        },

        activatePagNext: function activatePagNext (status) {

            if (status) {

                this.$next.removeAttr("disabled");
            } else {

                this.$next.attr("disabled", "disabled");
            }
        },

        activatePagBack: function activatePagBack (status) {

            if (status) {

                this.$back.removeAttr("disabled");
            } else {

                this.$back.attr("disabled", "disabled");
            }
        }
    };

    for (carousel_i; carousel_i < carousel_count; carousel_i += 1) {

        carousels.push(new Carousel( $carousels[carousel_i] ));
    }

    // Loop through ITEMS
    // - Bind clicking on them
    // - Add nav item for them
    // - count them

});