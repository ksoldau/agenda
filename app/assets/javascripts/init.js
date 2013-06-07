//initialize
$(function() {
  initButtons();
  initButtonSets();
  initDialogs();

  //initialize hover effects
  $( ".as_box").hover(
    function() {
      $(this).find(".delete_btn").css("visibility", "visible");
      $(this).find(".edit_btn").css("visibility", "visible");
    },
    function() {
      $(this).find(".delete_btn").css("visibility", "hidden");
      $(this).find(".edit_btn").css("visibility", "hidden");
    });
})

/**********************************/

//initialize jquery buttons
function initButtons() {
  $(".which_btn").button().click(function(event) {});
  $(".sign_out_btn").button().click(function(event) {});

}

//initialize jquery button sets
function initButtonSets() {
  $(".nav_view").buttonset();
  $(".rotate_through").buttonset();
  $(".subject_view").buttonset();
}

//initialize jquery dialogs
function initDialogs() {
  $( ".a_dialog" ).dialog({autoOpen: false}); 
  $(".a_popup").dialog({autoOpen: false});
  $(".delete_dialog").dialog({autoOpen:false});
  /* $( ".assignment_box" ).hover(function() { $(this).find(".add_btn").toggle();}); */
}
