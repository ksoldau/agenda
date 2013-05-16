$(function() {
  $(".edit_dialog").each(function() {
    console.log("in the each");
    var dialog = $(this);
    var trigger = dialog.data("trigger");


    dialog.find("form").on('ajax:success', function(e, data, status, xhr) {
      console.log("this is e: %o", e);
      console.log("this is data: %o", data);
      console.log("ajax success");
      console.log("assignment successfully edited");
      dialog.dialog('close', {duration: 10});
      //console.log("data.fdsaf
      console.log(data.completed);
      trigger.closest(".as_box").addClass(data.completed ? "completed" : "not_completed", {duration: 1000}
      ).removeClass(data.completed ? "not_completed" : "completed", {duration: 1000});
   }).on('ajax:failure', function(e) {
    console.log("assignment edit FAILED");
    });
  });
})


