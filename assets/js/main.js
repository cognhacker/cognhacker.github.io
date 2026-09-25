(function($) {

  "use strict";

  $(window).on('load', function() {

    /* Page Loader active
    ========================================================*/
    $('#preloader').fadeOut();

    /* WOW Scroll Spy
    ========================================================*/
    if (typeof WOW !== 'undefined') {
      var wow = new WOW({
        mobile: false
      });
      wow.init();
    }

    /* Projects Slider (index.html only)
    ========================================================*/
    var $sliderCenter = $('.slider-center');
    if ($.fn.slick && $sliderCenter.length) {
      $sliderCenter.slick({
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 3,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '40px',
              slidesToShow: 3
            }
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '40px',
              slidesToShow: 1
            }
          }
        ]
      });
    }

  });

}(jQuery));
