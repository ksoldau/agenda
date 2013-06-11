$(function() {

  $("#add_dialog_ajax").dialog({
    autoOpen: false,
    width: 600,
    height: 300,
    title: 'Add assignment'
  });
  $("td").each(
    function() {
      var date = $(this).data('date');
      //var dlg = $(".add_dialog[data-date=" + date + "]");
      var dlg = $("#add_dialog_ajax");
      $(this).dblclick(function() {
        //alert('Handler for .dblclick() called.');
        dlg.dialog('open');
        
        
        // put in dialog to add assignment to the day
      });
    }
  )
});

