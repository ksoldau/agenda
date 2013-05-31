//initialize
$(function() {
  initButtons();
  initButtonSets();
  initDialogs();

  //initialize dropkick js 
  $(".subject_dropkick").dropkick({startSpeed: 0});
  
  //initialize tabs (subject page)
  $( "#tabs" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
  $( "#tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );

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
  $( ".assignment_box").hover(
    function() {
      $(this).find(".add_btn").css("visibility", "visible");
    },
    function() {
      $(this).find(".add_btn").css("visibility", "hidden");
    });
  $("#tabs").hover(
    function() {
      $(this).find(".edit_subj_btn").css("visibility", "visible");
      $(this).find(".delete_subj_btn").css("visibility", "visible");
    },
    function() {
      $(this).find(".edit_subj_btn").css("visibility", "hidden");
      $(this).find(".delete_subj_btn").css("visibility", "hidden");
    });

})

/**********************************/

//initialize jquery buttons
function initButtons() {
  $(".which_btn").button().click(function(event) {});
  $(".sign_out_btn").button().click(function(event) {});
  $(".delete_subj_btn").button().click(function(e) {});
  $(".add_subj_btn").button().click(function(e) {});
}

//initialize jquery button sets
function initButtonSets() {
  $( "#radio" ).buttonset(); // is this even used? 
  $(".nav_view").buttonset();
  $(".rotate_through").buttonset();
}

//initialize jquery dialogs
function initDialogs() {
  $(".delete_subj_dialog").dialog({ autoOpen:false});
  $(".edit_subj_dialog").dialog({autoOpen: false});
  $( ".a_dialog" ).dialog({autoOpen: false}); 
  $(".a_popup").dialog({autoOpen: false});
  $(".delete_dialog").dialog({autoOpen:false});
  $(".add_subj_dialog").dialog({autoOpen: false});
  $( ".assignment_box" ).hover(function() { $(this).find(".add_btn").toggle();});
}
