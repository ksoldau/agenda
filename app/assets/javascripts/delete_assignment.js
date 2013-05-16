$(function() {
  $(".delete_dialog").each(function() {
    var dialog = $(this);
    var trigger = dialog.data("trigger");
    dialog.find("a").on('ajax:success', function(e) {
      console.log("log successfully deleted");
      /* $(".delete_dialog a").closest(".ui-dialog").first().hide(); */
      /* $(".ui-widget-overlay").hide(); */
      dialog.dialog('close');
      trigger.closest(".as_box").slideUp();

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

