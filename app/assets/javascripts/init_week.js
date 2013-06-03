// javascript only needed in week view

$(function() {
  // hover effects
  $( ".assignment_box").hover(
    function() {
      $(this).find(".add_btn").css("visibility", "visible");
    },
    function() {
      $(this).find(".add_btn").css("visibility", "hidden");
    });
    
});


