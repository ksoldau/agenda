function initializeEditButtonAndDialogs() {
  $(".edit_btn").each(
    function() {
      var dialog = $(this).find(".edit_dialog").dialog({
      closeOnEscape: true, 
      title: "Edit Assignment",
      width: 600, 
      height: 300, 
      draggable: false, 
      resizable: false, 
      modal: true, 
      autoOpen: false, 
      });

      $(this).on('click', function() {
        dialog.dialog('open');
      });
  });
 }

function initializeDeleteDialogs() {
  $(".delete_btn").each(
    function() {
      var dialog = $(this).find(".delete_dialog").dialog({
      closeOnEscape: true,
      title: "Delete Assignment", 
      width: 300, 
      height: 200, 
      draggable: false,
      resizable: false,
      modal: true, 
      autoOpen: false,
      });

      $(this).on('click', function() {
        dialog.dialog('open');
      });

      $(this).hover(
        function() {
          $(this).css("background-color", "#fff");
        },
        function() {
          $(this).css("background-color", "transparent");
        });
  });
}

function initializeAddDialogs() {
  $(".add_btn").each(
    function() {
      var dialog = $(this).find(".add_dialog").dialog({
      closeOnEscape: true,
      title: "Add Assignment", 
      width: 600, 
      height: 300, 
      draggable: false, 
      resizable: false, 
      modal: true, 
      autoOpen: false,
      });

      $(this).on('click', function() {
        dialog.dialog('open');
      });

      $(this).hover(
        function() {}, 
        function() {}
      );

  });
}
    
  
function initializeAddSubjectDialog() {
  $(".add_subj_btn").each(
    function() {
      var dialog = $(this).find(".add_subj_dialog").dialog({
      closeOnEscape: true,
      title: "Add Assignment", 
      width: 600, 
      height: 300, 
      draggable: false, 
      resizable: false, 
      modal: true, 
      autoOpen: false,
      });

      $(this).on('click', function() {
        dialog.dialog('open');
      });

      $(this).hover(
        function() {}, 
        function() {}
      );

  });
}

function initializeDeleteSubjectDialog() {
  $(".delete_subj_btn").each(
    function() {
      var dialog = $(this).find(".delete_subj_dialog").dialog({
      closeOnEscape: true, 
      title: "Delete Subject", 
      width: 300, 
      height: 200, 
      draggable: false,
      resizable: false, 
      modal: true, 
      autoOpen: false, 
      }); 

      $(this).on('click', function() {
        dialog.dialog('open');
      });

      $(this).hover( 
        function() {}, 
        function() {}
      );
    });
}

  
$(document).ready(function(){

 initializeEditButtonAndDialogs();
 initializeDeleteDialogs();
 initializeAddDialogs();
 initializeAddSubjectDialog();
 initializeDeleteSubjectDialog();

})

