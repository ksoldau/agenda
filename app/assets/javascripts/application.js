// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery.ui.all
//= require jquery_ujs
//= require radiobutton
//= require dialogs
//= require assignment_dialog
//= require delete_assignment
//= require edit_assignment
//= require_tree .
 $(function() {
    $( "#tabs" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
    $( "#tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
  });

$(function() { 
    $( "#radio" ).buttonset(); 
});

$(function() {
    $( ".which_btn" )
    .button()
    .click(function( event ) {
  });
});

$(function() {
    $( ".sign_out_btn")
    .button()
    .click(function ( event ) {
  });
});

$(function() {
  $(".add_subj_btn").button()
  .click(function (e) {
  });
});
$(function() {
  $(".delete_subj_btn").button()
  .click(function (e) {
  });
});
$(function() {
  $(".delete_subj_dialog").dialog({
    autoOpen:false
  });
})

$(function() {
  $(".nav_view").buttonset()
});

$(function() {
  $(".rotate_through").buttonset()
});

$(function() {
     $( ".a_dialog" ).dialog({
     }); 
});

$(function() {
  $(".edit_dialog").dialog({
    autoOpen: false
  });
});

$(function() {
  $(".delete_dialog").dialog({
    autoOpen:false
  });
});

$(function() {
  $(".delete_dialog").dialog({
    autoOpen: false
  });
})

$(function() {
  $(".add_subj_dialog").dialog({
    autoOpen: false
  });
});

$(function() {
  $( ".assignment_box" ).hover(function() {
    $(this).find(".add_btn").toggle();
    
    })
})

$(function() {
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

$(function() {
  $(".ui-tabs-panel").hover(
    function() {
      $(this).find(".add_btn").css("visibility", "visible");
    },
    function() {
      $(this).find(".add_btn").css("visibility", "hidden");
    });
})

