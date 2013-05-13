 
 function initializeAssignmentsDialogs() {
 console.log("it got to initialize assignmentsdiolags");
  $(".subj_link").each(
    function() {
      var dialog = $(this).find(".a_dialog").dialog({
       //open: function(event, ui) { $(".ui-dialog-titlebar-close").show(); },
        closeOnEscape: true,
        title: "Edit Assignment",
        width: 600,
        height: 300,
        draggable: true,
        resizable: false,
        modal: false,
        autoOpen: false,
        });

      console.log("got into the each");
      $(this).on('click', function() {
        dialog.dialog('open');
      });

    });
  }
  


$(document).ready(function(){

 initializeAssignmentsDialogs();

})
