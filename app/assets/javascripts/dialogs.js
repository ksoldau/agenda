
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
  
$(document).ready(function(){

 initializeEditButtonAndDialogs();

})

