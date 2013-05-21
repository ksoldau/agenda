 
 function initializeAssignmentsDialogs() {
  $(".subj_link").each(
    function() {
      var dlg = $(this).find(".a_dialog").dialog({
       //open: function(event, ui) { $(".ui-dialog-titlebar-close").show(); },
        closeOnEscape: true,
        title: "Assignment",
        draggable: true,
        resizable: false,
        modal: false,
        autoOpen: false,
        });

      $(this).on('click', function() {
        dlg.dialog('open');
      });

      /* $(this).mouseover( function() { */
      /*   dialog.dialog('open'); */
      /* }); */
      /* $(this).mouseout( function() { */
      /*   dialog.dialog('close'); */
      /* }); */

    $(this).mouseover(function() {
      dlg.dialog("open");
    }).mousemove(function(event) {
      /* dlg.dialog("option", "position", { */
      /*   my: "left top", */
      /*   at: "right bottom", */
      /*   of: event, */
      /*   offset: "200 2000 200 200" */
      /* }); */
      dlg.dialog("option", "position", [event.clientX - 150, event.clientY - 170]);
    }).mouseout(function() {
      dlg.dialog("close");
    });

    });
  }
  


$(document).ready(function(){

 initializeAssignmentsDialogs();

})
