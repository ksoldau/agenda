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
  
$(document).ready(function(){

 initializeEditButtonAndDialogs();
 initializeDeleteDialogs();

})

