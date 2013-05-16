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


    /* $.ajax({ */
    /*   type: "DELETE", */ 
    /*   url: url, */ 
    /*   //"user_assignment_path(current_user, a), :method => :delete", */
    /*   /1* data: { assignment: { *1/ */
    /*   /1*   subject_id: subject_id, *1/ */ 
    /*   /1*   description: description, *1/ */ 
    /*   /1*   due_date: due_date *1/ */
    /*   /1* }}, *1/ */
    /*   dataType: 'JSON', */
    /*   success: function(data) { */
    /*     console.log("it was a success") */
    /*     //$(this).parents(".as_box").css("visibility", "hidden"); */

        
    /*   //manually update dom *s
    /*   //close modal */

    /*   } */
    /* }); */
/* /1* a a char *1/ */
/* /1* . any char *1/ */
/* /1* a* zero or more *1/ */
/* /1* a? zerp pr oen *1/ */
/* /1* a+ one or more *1/ */
/* /1* | or *1/ */

