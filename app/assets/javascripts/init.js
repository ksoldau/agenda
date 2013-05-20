
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
   autoOpen: false
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
  $("#tabs").hover(
    function() {
      $(this).find(".add_btn").css("visibility", "visible");
      $(this).find(".delete_subj_btn").css("visibility", "visible");
    },
    function() {
      $(this).find(".add_btn").css("visibility", "hidden");
      $(this).find(".delete_subj_btn").css("visibility", "hidden");
    });
})


$(function() {
  $( ".a_dialog").hover(
    function() {
      $(this).find(".delete_btn").css("visibility", "visible");
      $(this).find(".edit_btn").css("visibility", "visible");
    },
    function() {
      $(this).find(".delete_btn").css("visibility", "hidden");
      $(this).find(".edit_btn").css("visibility", "hidden");
      });
})


