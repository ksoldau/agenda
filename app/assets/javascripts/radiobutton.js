$(function() {
  $( "#radio1" ).click(function(e) {
    $( '#week_view' )[0].click();

    $( "#radio_week" ).button( "option", "label", "custom label" );

    });
  $( "#radio2" ).click(function(e) {
    $( '#month_view' )[0].click();
    });
});

