 
 function initializeAssignmentsDialogs() {
  $(".subj_link").each(
    function() {
      var dialog = $(this).find(".a_dialog").dialog({
       //open: function(event, ui) { $(".ui-dialog-titlebar-close").show(); },
        closeOnEscape: true,
        title: "Assignment",
        draggable: true,
        resizable: false,
        modal: false,
        autoOpen: false,
        });

      $(this).on('click', function() {
        dialog.dialog('open');
      });

    });
  }
  


$(document).ready(function(){

 initializeAssignmentsDialogs();

})
