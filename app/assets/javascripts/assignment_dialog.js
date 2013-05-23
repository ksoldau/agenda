function initializeAssignmentsDialogs() {
  $(".subj_link").each(
    function() {
      var popup = $(this).find(".a_popup").dialog({
        closeOnEscape: true,
        title: "Assignment",
        draggable: false, 
        resizable: false, 
        modal: false,
        autoOpen: false,
        width: 'auto',
        minHeight: 0,
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



$(function(){

 initializeAssignmentsDialogs();

})
