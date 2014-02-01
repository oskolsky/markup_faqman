yepnope([

  {
    load: [
      'timeout=1000!//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js',
      'timeout=1000!//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js'
    ],
    complete: function() {
      if (!window.jQuery) {
        yepnope([
          '/assets/javascripts/vendor/jquery-2.0.3.min.js',
          '/assets/javascripts/vendor/jquery-ui.min.js'
        ]);
      }
    }
  },

  {
    load: '/assets/javascripts/vendor/underscore-min.js',
    complete: function() {
      yepnope('/assets/javascripts/vendor/backbone-min.js');
    }
  },
  
  '/assets/javascripts/vendor/smartresize.js',
  '/assets/javascripts/vendor/doublehover.js',
  '/assets/javascripts/vendor/holder.js',
  
  {
    load: '/assets/javascripts/vendor/cycle2/jquery.cycle2.min.js',
    complete: function() {
      yepnope([
        '/assets/javascripts/vendor/cycle2/jquery.cycle2.center.min.js',
        '/assets/javascripts/vendor/cycle2/jquery.cycle2.swipe.min.js'
      ]);
    }
  },
  
  {
    load: '/assets/javascripts/vendor/jquery.arcticmodal-0.3.min.js',
    complete: function() {
      $.arcticmodal('setDefault', {
        overlay: {
          css: {
            backgroundColor: '#3a3a3c',
            opacity: .71
          }
        },
        openEffect: {
          speed: 200
        },
        closeEffect: {
          speed: 200
        }
      });
    }
  },
  
  '/assets/javascripts/vendor/masonry.pkgd.min.js',
  
  {
    load: '/assets/javascripts/vendor/accounting.min.js',
    complete: function() {
      accounting.settings = {
        currency: {
          symbol: '',
          format: '%v',
          decimal: '.',
          thousand: ' ',
          precision: 0
        },
        number: {
          precision: 0,
          thousand: ' ',
          decimal : '.'
        }
      }
    }
  },

  {
    test: window.matchMedia,
    nope: '/assets/javascripts/polyfill/vendor/matchMedia.js'
  },

  {
    test: Modernizr.input.placeholder,
    nope: '/assets/javascripts/polyfill/vendor/jquery.placeholder.js'
  },
  
  '/assets/javascripts/jquery.extensions.js',
  '/assets/javascripts/forms.js',
  '/assets/javascripts/components.js',
  '/assets/javascripts/comics.js',

  {
    load: '/assets/javascripts/vendor/jquery.queryloader2.js',
    complete: function() {
      $("body").queryLoader2({
        barColor: "#fff",
        backgroundColor: "#37363b",
        percentage: true,
        barHeight: 1,
        completeAnimation: "grow",
        minimumTime: 100,
        onComplete: function() {
          $('#loading-area').fadeIn();
        }
      });
    }
  },

  '/assets/javascripts/unisender.js',
  '/assets/javascripts/project.js'

]);  