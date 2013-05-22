 
 function initializeAssignmentsDialogs() {
  $(".subj_link").each(
    function() {
      var dlg = $(this).find(".a_dialog").dialog({
       //open: function(event, ui) { $(".ui-dialog-titlebar-close").show(); },
        closeOnEscape: true,
        title: "Assignment",
        draggable: true,
        resizable: false,
        modal: true,
        autoOpen: false,
        });

      $(this).on('click', function() {
        dlg.dialog('open');
        if (dlg.hasClass("completed")) {
          dlg.parent(".ui-dialog").css("background-color", "#7ECEFD");
        }
        else {
          dlg.parent(".ui-dialog").css("background-color", "#FF7F66");
        }
      });

      /* $(this).mouseover( function() { */
      /*   dialog.dialog('open'); */
      /* }); */
      /* $(this).mouseout( function() { */
      /*   dialog.dialog('close'); */
      /* }); */

    /* $(this).mouseover(function() { */
    /*   dlg.dialog("open"); */
    /* }).mousemove(function(event) { */
    /*   /1* dlg.dialog("option", "position", { *1/ */
    /*   /1*   my: "left top", *1/ */
    /*   /1*   at: "right bottom", *1/ */
    /*   /1*   of: event, *1/ */
    /*   /1*   offset: "200 2000 200 200" *1/ */
    /*   /1* }); *1/ */
    /*   dlg.dialog("option", "position", [event.clientX - 150, event.clientY - 170]); */
    /* }).mouseout(function() { */
    /*   dlg.dialog("close"); */
    /* }); */

    });
  }

function initializeAssignmentPopups() {
  $(".subj_link").each(
    function() {
      var popup = $(this).find(".a_popup").dialog({
        closeOnEscape: true,
        title: "Assignment",
        draggable: false, 
        resizable: false, 
        modal: false,
        autoOpen: false,
      });

      $(this).mouseover( function() {
        popup.dialog("open");
        popup.parent(".ui-dialog").find(".ui-dialog-titlebar-close").css("visibility", "hidden");
        if (popup.hasClass("completed")) {
          popup.parent(".ui-dialog").css("background-color", "#7ECEFD");
        }
        else {
          popup.parent(".ui-dialog").css("background-color", "#FF7F66");
        }

      }).mousemove(function(event) {
        popup.dialog("option", "position", [event.clientX - 150, event.clientY - 170]);
      }).mouseout(function() {
        popup.dialog("close");
      });

      $(this).click( function() {
        popup.dialog("close");
      });
    
  });
}


$(document).ready(function(){

 initializeAssignmentsDialogs();
 initializeAssignmentPopups();

})
