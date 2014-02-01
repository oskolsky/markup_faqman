(function($) {
  
  var
    updateValidDisabled = function(f, r) {
      if (r.prop('disabled')) {
        f.attr('disabled', 'disabled');    
      } else {
        f.removeAttr('disabled');
      }
      f.attr('data-valid', r.attr('data-valid'));
    },

    listenFocus = function(f, r) {
      r.focus(function() {
        f.addClass('__focus');
      }).blur(function() {
        f.removeClass('__focus');
      });
    };

  //****************************************************************************************************
  //
  // .. ELEMENTS
  //
  //****************************************************************************************************
  //
  // .. Checkbox
  //
  var
    CheckBoxHandler = function(element) {
      this.$el = $(element);
      this.$fake = this.$el.closest('.form_el.__fake');

      this.$el.change(this.refresh.bind(this));
      listenFocus(this.$fake, this.$el);
    };

    CheckBoxHandler.prototype.refresh = function() {
      this.$fake.attr('data-checked', this.$el.prop('checked'));
      updateValidDisabled(this.$fake, this.$el);
    };

  //
  // .. Radio
  //
  var
    RadioButtonHandler = function(element) {
      this.$el = $(element);
      this.$fake = this.$el.closest('.form_el.__fake');

      this.$el.change(this.change.bind(this));
      listenFocus(this.$fake, this.$el);
    };

    RadioButtonHandler.prototype.change = function() {
      var
        form = this.$el.closest('form'),
        name = this.$el.attr('name'),
        parent, toRefresh;

      if (form.size() > 0) {
        parent = form[0];
      } else {
        parent = 'body';
      }

      if (name) {
        toRefresh = $(parent).find('[name=' + name + ']:radio');
      } else {
        toRefresh = $(parent).find(':radio');
      }

      toRefresh.customForm('refresh');
    };

    RadioButtonHandler.prototype.refresh = function() {
      this.$fake.attr('data-checked', this.$el.prop('checked'));
      updateValidDisabled(this.$fake, this.$el);
    };

  //
  // .. Select
  //
  var
    SelectHandler = function(element) {
      this.$el = $(element);
      this.$fake = this.$el.closest('.form_el.__fake');
      this.$label = this.$fake.find('p');

      this.$el.change(this.refresh.bind(this));
      listenFocus(this.$fake, this.$el);
    };

    SelectHandler.prototype.refresh = function() {
      var
        text = this.$el.children('option:selected').text();

      this.$label.text(text);
      updateValidDisabled(this.$fake, this.$el);
    };

  //
  // .. File
  //
  var
    FileInputHandler = function(element) {
      this.$el = $(element);
      this.$fake = this.$el.closest('.form_el.__fake');
      this.$label = this.$fake.find('p');
      this.placeholder = this.$fake.attr('data-placeholder');

      var
        real = this.$el,
        locked = false;

      this.$fake.click(function() {
        if (locked) {
          return;
        }

        if (!real.prop('disabled')) {
          locked = true;
          real.trigger('click');
          locked = false;
        }
      });
      this.$el.change(this.refresh.bind(this));
      listenFocus(this.$fake, this.$el);
    };

    FileInputHandler.prototype.refresh = function() {
      var
        filename = this.$el.val().split(/[\\\/]/).pop();

      if (!filename) {
        filename = this.placeholder;
      }

      this.$label.text(filename);
      updateValidDisabled(this.$fake, this.$el);
    };


  //****************************************************************************************************
  //
  // .. BASE
  //
  //****************************************************************************************************
  var
    customizers = {
      checkbox: CheckBoxHandler,
      radio: RadioButtonHandler,
      select: SelectHandler,
      file: FileInputHandler
    },

    handler = function(el, type) {
      var
        dataName = 'customForm',
        data = $(el).data(dataName);
      if (!data) {
        data = new customizers[type](el);
        $(el).data(dataName, data);
      }
      return data;
    };

  var
    refreshElements = function(selector, type) {
      this.find(selector).add(this.filter(selector)).each(function() { handler(this, type).refresh(); });
    },
    methods = {
      init: function() {
        this.find('input:reset').click(function() {
          if (this.form) {
            this.form.reset();
            $(this.form).customForm('reset');
          }
          return false;
        });
        return this.customForm('refresh');
      },

      refresh: function() {
        return this.each(function() {
          var 
            r = refreshElements.bind($(this));

          r(':checkbox', 'checkbox');
          r(':radio', 'radio');
          r('select', 'select');
          r('input:file', 'file');
        });
      },

      reset: function() {
        return this.each(function() {
          $(this).find('[data-valid]').removeAttr('data-valid');
        }).customForm('refresh');
      }
    };

  $.fn.customForm = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('jQuery.customForm: unsupported method - ' +  method);
    }
  }

})(jQuery);