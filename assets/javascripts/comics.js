$(function() {

  $('#layer-01').fadeIn();
  $('#layer-02').fadeIn();
  $('#alternative-01').fadeIn();

  $('#alternative-01').find('.alternative_i_a').click(function() {
    var rel = $(this).attr('rel');

    $('#alternative-01').remove();

    if (rel == 'go-to-3') {
      $('#layer-03').fadeIn();
      $('#layer-04').fadeIn();
      $('#layer-05').remove();
      $('#layer-06').remove();
    }

    if (rel == 'go-to-5') {
      $('#layer-03').remove();
      $('#layer-04').remove();
      $('#layer-05').fadeIn();
      $('#layer-06').fadeIn();
    }

    $('#layer-07').fadeIn();
    $('#layer-08').fadeIn();
    $('#alternative-02').fadeIn();

    return false
  });

  $('#alternative-02').find('.alternative_i_a').click(function() {
    var rel = $(this).attr('rel');

    $('#alternative-02').remove();

    if (rel == 'go-to-9') {
      $('#layer-09').fadeIn();
      $('#layer-10').remove();
    }

    if (rel == 'go-to-10') {
      $('#layer-09').remove();
      $('#layer-10').fadeIn();
    }

    $('#layer-11').fadeIn();
    $('#layer-12').fadeIn();

    $('#footer').fadeIn();

    return false
  });

});