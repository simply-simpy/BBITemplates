'use strict';
/* eslint no-unused-vars: 0 */
/* eslint no-invalid-this: 0 */

// Init all Bootstrap generated tooltips
$('[data-toggle="tooltip"]').tooltip();

// Init all Slick Slider Carousels
$('.hero-carousel').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  dots: true,
  prevArrow: $('.arrow-left'),
  nextArrow: $('.arrow-right'),
});

// Special Instructions Character Limit Counter
const countChar = (val) => {
  const len = val.value.length;

  len >= 36
    ? val.value = val.value.substring(0, 36)
    : $('#charNum').text(36 - len);

  $('#characterCount').text(len); // Update character count (0 of 36)
};

// Toggle Phone Number on click
$('.toggle-phone').click(function() {
  /* eslint-disable */
  const $this = $(this);
  /* eslint-enable */
  $this.text(function(_i, v) {
    let num = $this.data('tel');
    let label = 'View Number';
    if ($this.data('label')) {
      label = $this.data('label');
    }
    return v === label ? num : label;
  });
});

// Date picker on order review page modal
$(function() {
  if (window.datetimepicker && window.moment) {
    let pickupTime = '';
    let $datepicker = $('#datetimepicker');
    let $datepickerToggle = $('#datetimepicker-toggle');
    let $datepickerShow = $('#datetimepicker-show');

    // Deactivates switching to month view
    let turnOffMonthPicker = () => {
      $('.picker-switch').on('click', function() {
        return false;
      });
    };

    // Sets the active class for the times and sets the data of the pickup time stored in pickupTime
    $('.choose-time li').on('click', function() {
      $('.choose-time li').removeClass('active');
      $(this).toggleClass('active'); // eslint-disable-line no-invalid-this
      pickupTime = $(this).data('pickup-time'); // eslint-disable-line no-invalid-this
    });

    // Changes class names on calendar icons
    $.fn.datetimepicker.Constructor.Default = $.extend({}, $.fn.datetimepicker.Constructor.Default, {
      icons: {
        previous: 'icon-arrow-left',
        next: 'icon-arrow-right',
      },
    });

    // Toggles the calendar
    $datepickerToggle.click(function(event) {
      $($datepicker).datetimepicker('toggle');
      $(event.target)
        .closest('.modal')
        .toggleClass('datepicker-open');
      turnOffMonthPicker();
    });

    // Shows picked date on page load for display only. This is not the value sent from the input field when submitting the form. The value is in a hidden text input.
    $($datepicker).on('change.datetimepicker', function(event) {
      let theValue = event.date.format('L');
      $('.date-picked').text(theValue);
      $(this).datetimepicker('hide');
    });

    // Shows today's date on page load for display only. This is not the value sent from the input field when submitting the form. The value is in a hidden text input.
    let today = moment().format('L');
    $('.date-picked, .date-time-picker-trigger .text').text(today);

    turnOffMonthPicker();

    // TODO: This should be removed once in Sitecore. It gets values from picker and logs them.
    $('form').submit(function(event) {
      event.preventDefault();
      console.log('date: ' + $('.datepicker .active').data('day'));
      console.log('time: ' + pickupTime);
    });
  }
});

// Toggle item deletion confirmation and remove item
$(function() {
  $('.edit-buttons .delete').on('click', function() {
    /* eslint-disable */
    $(this).closest('.edit-buttons').addClass('confirm-delete');
    /* eslint-enable */
  });
  $('.edit-buttons .cancel-delete').on('click', function() {
    /* eslint-disable */
    $(this).closest('.edit-buttons').removeClass('confirm-delete');
    /* eslint-enable */
  });
  $('.edit-order .confirm-delete').on('click', function() {
    /* eslint-disable */
    $(this).closest('.menu-item').slideUp(200, function() {
      $(this).remove();
    });
    /* eslint-enable */
  });
});

// Toggle item deletion confirmation and remove item
$(function() {
  $('.edit-buttons .delete').on('click', function() {
    /* eslint-disable */
    $(this).closest('.edit-buttons').addClass('confirm-delete');
    /* eslint-enable */
  });
  $('.edit-buttons .cancel-delete').on('click', function() {
    /* eslint-disable */
    $(this).closest('.edit-buttons').removeClass('confirm-delete');
    /* eslint-enable */
  });
  $('.edit-order .confirm-delete').on('click', function() {
    /* eslint-disable */
    $(this).closest('.menu-item').slideUp(200, function() {
      $(this).remove();
    });
    /* eslint-enable */
  });
});

// Truncate titles on pre-checkout modal based on character length
$(function() {
  $('[data-component=custom-product-options] .title, [data-component=custom-product-options] .title')
    .each(function() {
      /* eslint-disable */
      if ($(this).text().length > 25) {
        let sliced = $(this).text().slice(0, 24);
        $(this).text(sliced).append('…');
      }
      /* eslint-enable */
    });
});

/* eslint-disable */
function PhoneFormat(input) {
  if (input == null)
  {
    return '';
  }
  // Strip all characters from the input except digits
  input = input.replace(/\D/g, '');

  // Trim the remaining input to ten characters, to preserve phone number format
  input = input.substring(0, 10);

  // Based upon the length of the string, we add formatting as necessary
  const size = input.length;
  if (size === 0) {
    input = input;
  } else if (size < 4) {
    input = '(' + input;
  } else if (size < 7) {
    input = '(' + input.substring(0, 3) + ') ' + input.substring(3, 6);
  } else {
    input = '(' + input.substring(0, 3) + ') ' + input.substring(3, 6) + ' - ' + input.substring(6, 10);
  }
  return input;

};
/* eslint-enable */

// Mask Phone Number on keyup
$('.phone-mask').keyup(function() {
  /* eslint-disable */
  var $this = $(this);
  $this.val(PhoneFormat($this.val()));
  /* eslint-enable */
});

// Mask Phone Number on keyup
$('.phone-mask').keypress(function(evt) {
  /* eslint-disable */
  // A function to determine if the pressed key is an integer
  const charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode < 36 || charCode > 40)) {
    return false;
  }
  return true;
  /* eslint-enable */
});


// Toggle password visibility
$.toggleShowPassword = function(options) {
  let settings = $.extend({
    field: '.password_input',
    control: '.toggle_password_visibility',
  }, options);

  console.log(settings);

  const control = $(settings.control);
  const field = $(settings.field);

  control.bind('click', function() {
    let $this = $(this);
    field.attr('type', function(i, oldType) {
      console.log(oldType);
      // Toggle 'field' type.
      this.type = oldType === 'password' ? 'text' : 'password';
    });

    $(this).text(function(i, text) {
      return text === 'HIDE' ? 'SHOW' : 'HIDE';
    });
  });
};

$.toggleShowPassword({
  field: '.passwordInput',
  control: '.passwordToggle',
});

// Prevent two modals from being open at the same time.
$('.modal').on('show.bs.modal', function() {
  $('.modal').not($(this)).each( function() {
    $(this).modal('hide');
  });
});

// Collapse time and change time in UI
$('.times input').change(function(evt) {
  let input = $(evt.target);
  input
    .closest('.choose-time')
    .addClass('collapsed')
    .find('.time')
    .text(input.data('time'));
});

// Toggle time picker
$('.show-times-btn').on('click', function(evt) {
  $(evt.target).closest('.choose-time').toggleClass('collapsed');
});
