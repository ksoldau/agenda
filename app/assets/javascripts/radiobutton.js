$(function() {
  console.log("in the function");
  $( "#radio_week" ).click(function(e) {
    $( '#week_view' )[0].click();

    });
  $( "#radio_month" ).click(function(e) {
    $( '#month_view' )[0].click();
    });
});
    
