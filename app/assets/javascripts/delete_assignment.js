$(function() {
  $(".delete_dialog").each(function() {
    var dlg = $(this);
    var trigger = dlg.data("trigger");
    var trigger_subj = dlg.data("trigger_subj");

    dlg.find("a").on('ajax:success', function(e) {
      console.log("log successfully deleted");
      /* $(".delete_dialog a").closest(".ui-dialog").first().hide(); */
      /* $(".ui-widget-overlay").hide(); */
      dlg.dialog('close');
      //trigger.closest(".as_box").slideUp();
      trigger.closest(".as_box").animate({opacity: '0'}, 900, function() {
        trigger.closest(".as_box").slideUp()
        });

      //find all open ui-dialogs
      $(".a_dialog").dialog('close');
      trigger_subj.delay(400).slideUp();
   }).on('ajax:failure', function(e) {
    console.log("log deletion FAILED");
    });
  });
})

/* /1* a a char *1/ */
/* /1* . any char *1/ */
/* /1* a* zero or more *1/ */
/* /1* a? zerp pr oen *1/ */
/* /1* a+ one or more *1/ */
/* /1* | or *1/ */

