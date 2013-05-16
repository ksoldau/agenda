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
      dialog.dialog('close');
      //console.log("data.fdsaf
      console.log(data.completed);

      
      
      //change subject based on edit
      trigger.closest(".as_box").find(".subject").first().text(data.subject.name);
      //change description based on edit
      trigger.closest(".as_box").find(".description").first().text(data.description);
      //change due time based on edit
      trigger.closest(".as_box").find(".due_time").first().text(data.due_date)


      //change background color based on completion 
      trigger.closest(".as_box").addClass(data.completed ? "completed" : "not_completed", {duration: 800}
      ).removeClass(data.completed ? "not_completed" : "completed", {duration: 800});
   }).on('ajax:failure', function(e) {
    console.log("assignment edit FAILED");
    });
  });
})


