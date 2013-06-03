$(function() {
  $(".delete_dialog").each(function() {
    var dlg = $(this);


    dlg.find("a").on('ajax:success', function(e) {
      
      //close delete dialog
      dlg.dialog('close');
      
      //slide associated assignment up, hiding it
      trigger.closest(".as_box").animate({opacity: '0'}, 900, function() {
        trigger.closest(".as_box").slideUp()
        });

      //find open dialogs and close them?
      $(".a_dialog").dialog('close');
      //trigger_subj.delay(400).slideUp();
      
      // log to console if ajax fails
      }).on('ajax:failure', function(e) {
      console.log("log deletion FAILED");
      });
    
    //save this data for later use
    var trigger = dlg.data("trigger");
    var trigger_subj = dlg.data("trigger_subj");

  });
})
