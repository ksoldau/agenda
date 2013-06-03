$(function() {
  $("td").each(
    function() {
      var date = $(this).data('date');
      var dlg = $(".add_dialog[data-date=" + date + "]");
      $(this).dblclick(function() {
        //alert('Handler for .dblclick() called.');
        dlg.dialog('open');
        
        
        // put in dialog to add assignment to the day
      });
    }
  )
});



