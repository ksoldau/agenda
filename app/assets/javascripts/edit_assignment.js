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

      
      
      //change subject if edited
      var subj = trigger.closest(".as_box").find(".subject").first();
      if (subj.text() !== data.subject.name) {
         subj.animate({opacity: "0"}, 700, function() {
          subj.text(data.subject.name).animate({opacity: "1"}, 700);
        });
      }
      //change description based on edit
      var desc = trigger.closest(".as_box").find(".description").first()
      if (desc.text() !== data.description) {
        desc.animate({opacity: "0"}, 700, function() {
          desc.text(data.description).animate({opacity: "1"}, 700);
        });
      }
      //change due time based on edit
      //change to have it only change if time changed
      trigger.closest(".as_box").find(".due_time").first().text(data.due_date)
      
      //change of placement based on time edit
      var dd = data.due_date;
      var new_parsed = dd.split('T')[0].split('-');

      var url = window.location.href
      var url_parsed = url.split('=')[2].split('-');

      var new_day = Number(new_parsed[2]);
      var new_month = Number(new_parsed[1]) -1; //0 is jan
      var new_year = Number(new_parsed[0]);
      var new_date = new Date(new_year, new_month, new_day)
      
      var url_day = Number(url_parsed[2]);
      var url_month = Number(url_parsed[1]) -1;
      var url_year = Number(url_parsed[0]);
      var url_date = new Date(url_year, url_month, url_day)
      var url_date_end_week = new Date(url_date.getTime() + 6 * 24 * 60 * 60 * 1000);

      if (new_date.getTime() < url_date.getTime()) {
        trigger.closest(".as_box").animate({left: '-999px'}, 800, function() {
          trigger.closest(".as_box").slideUp();
        });
      }
      else if (new_date.getTime() > url_date_end_week.getTime()) {
        trigger.closest(".as_box").animate({left: '999px'}, 800, function() {
          trigger.closest(".as_box").slideUp();
        });
      }
      else if (url_date.getTime() <= new_date.getTime() &&
        new_date.getTime() <= url_date_end_week.getTime()) {
        console.log("got here");
        //assuming position has to change
        
        var new_day_string = String(new_day);
        var headingArray = $(".day_heading");

        for (var i = 0; i < headingArray.length; i++) {
          console.log("got hereeee");
          h = headingArray[i];
          htext = $(h).text();
          if (htext.indexOf(new_day_string + ",") >= 0) {
            console.log("it's in " + new_day_string);
            var day = $(h).closest(".assignment_box");
            var assignment = trigger.closest(".as_box");

            assignment.slideUp(600, function () {
              assignment.appendTo(day);
              assignment.slideDown();
            });            
          }
        }
        
        }
   
      //change background color based on completion 
      trigger.closest(".as_box").addClass(data.completed ? "completed" : "not_completed", {duration: 800}
      ).removeClass(data.completed ? "not_completed" : "completed", {duration: 800});
   }).on('ajax:failure', function(e) {
    console.log("assignment edit FAILED");
    });
  });
})


