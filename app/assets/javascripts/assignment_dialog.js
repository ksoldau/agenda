
 function initializeAssignmentsDialogs() {
 console.log("it got to initialize assignmentsdiolags");
  $(".subj_link").each(
    function() {
      var dialog = $(this).find(".a_dialog").dialog({
       //open: function(event, ui) { $(".ui-dialog-titlebar-close").show(); },
        closeOnEscape: true,
        title: "Terms",
        width: 600,
        height: 500,
        draggable: false,
        resizable: false,
        modal: true,
        });

      console.log("got into the each");
      $(this).on('click', function() {
        dialog.dialog('open');

      })
    })
    }
  


$(document).ready(function(){

 initializeAssignmentsDialogs();

})
