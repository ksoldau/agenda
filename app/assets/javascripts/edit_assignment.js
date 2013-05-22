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
      
      //change subject if edited
      var subj = trigger.closest(".as_box").find(".subject").first();
      
      if (subj.text().trim() !== data.subject.name.trim()) {
         subj.animate({opacity: "0"}, 700, function() {
          subj.text(data.subject.name).animate({opacity: "1"}, 700);
        });
      }

      //change description based on edit
      var desc = trigger.closest(".as_box").find(".description").first()
      
      if (desc.text().trim() !== data.description.trim()) {
        desc.animate({opacity: "0"}, 700, function() {
          desc.text(data.description).animate({opacity: "1"}, 700);
        });
      }

      //change of placement based on time edit
      // make sure new day, min, and hour are all two digits
      var new_dd = data.due_date;
      var new_parsed_date = new_dd.split('T')[0].split('-');
      var new_parsed_time = new_dd.split('T')[1].split(':');
      var new_min = Number(new_parsed_time[1]);
      var new_hour = Number(new_parsed_time[0]);
      var new_day = Number(new_parsed_date[2]);
      var new_month = Number(new_parsed_date[1]) -1; //0 is jan
      var new_year = Number(new_parsed_date[0]);
      var new_date = new Date(new_year, new_month, new_day);

      var url = window.location.href;
      var url_parsed = url.split('=')[2].split('-');
      var url_day = Number(url_parsed[2]);
      var url_month = Number(url_parsed[1]) -1;
      var url_year = Number(url_parsed[0]);
      var url_date = new Date(url_year, url_month, url_day);
      var url_date_end_week = new Date(url_date.getTime() + 6 * 24 * 60 * 60 * 1000);

      assignment = trigger.closest(".as_box");

      old_date = assignment.closest(".assignment_box").find(".day_heading").text().trim();
      old_year = Number(old_date.match(/\d+/g)[1]);
      old_day = Number(old_date.match(/\d+/g)[0]);

      old_time = assignment.find(".due_time").text().trim();
      old_hour = Number(old_time.split(':')[0]);
      old_min = Number(old_time.split(':')[1]);
      
      var old_date_and_time = new Date(old_year, 0, old_day, old_hour, old_min);
      var new_date_and_time = new Date(new_year, 0, new_day, new_hour, new_min);

      var old_date = new Date(old_year, 0, old_day);
      var new_date_no_month = new Date(new_year, 0, new_day);


      // if date moved to before week
      if (new_date.getTime() < url_date.getTime()) {
        trigger.closest(".as_box").animate({left: '-999px'}, 800, function() {
          trigger.closest(".as_box").slideUp();
        });
      }

      // if date moved to after week
      else if (new_date.getTime() > url_date_end_week.getTime()) {
        trigger.closest(".as_box").animate({left: '999px'}, 800, function() {
          trigger.closest(".as_box").slideUp();
        });
      }
      
      // if due date and time have not changed
      else if (new_date_and_time.getTime() === old_date_and_time.getTime()) {
        //do nothing
      }
      
      // if date has not changed 
      else if (old_date.getTime() === new_date_no_month.getTime()) {
        //code not written yet

        //find new time
        new_time = new Date (0, 0, 1, new_hour, new_min);

        //find prev time
        //find next time



      }

      //if date has changed
      else if (old_date.getTime() !== new_date_no_month.getTime()) {
        //old assignment
        assignment = trigger.closest(".as_box");
        assignment.animate({opacity: '0'}, 800, function() {
          assignment.slideUp(600, function (e) {

        //figure out where to put new assignment
        var new_day_string = String(new_day);
        
        var dayHeadingArray = $(".day_heading");
        for (var i = 0; i < dayHeadingArray.length; i++) {
          h = dayHeadingArray[i];
          htext = $(h).text();

          // is it in the right day?
          if (htext.indexOf(new_day_string + ",") >= 0) {
            console.log("in this if");
            var new_ab = $(h).closest(".assignment_box");
            var assignment = trigger.closest(".as_box");

            var assignmentsArray = new_ab.find(".as_box");
            console.log("length of assignmentsArray is %o", assignmentsArray.length);

            //
            assignment.appendTo(new_ab);
            
            var aArray = Array.prototype.slice.call(assignmentsArray);
            
            if (aArray.length > 0) {
              for (i = 0; i < aArray.length; i++) { 
                var o_a = $(aArray[i]);
                var o_due_time = o_a.find(".due_time");
                var o_due_time_text = o_due_time.text().replace(/\s+/g, '');
                var o_hour = Number(o_due_time_text.split(':')[0]);
                var o_min = Number(o_due_time_text.split(':')[1]);
                var o_date = new Date (0, 0, 1, o_hour, o_min);
                console.log(o_hour);
                console.log(o_min);
                console.log(o_date.getTime());
                
                if (new_hour < 10) {
                  new_hour = "0" + new_hour;
                }
                if (new_min < 10) {
                  new_min = "0" + new_min;
                }
                var new_date_time = new Date(0, 0, 1, Number(new_hour), Number(new_min));
                console.log(new_date_time.getTime());

                if (new_date_time.getTime() <= o_date.getTime()) {
                  console.log("GOT INTO THIS IF");
                  o_a.before(assignment);
                }
              }; //end of for
            }

            assignment.slideDown(600, function() {
              assignment.animate({opacity: '1'}, 600);
            });

          } // end of if
        
        } 


          });
        });
        


      }

      //change due time based on edit
      //change to have it only change if time changed
      if (new_hour < 10) {
        new_hour = "0" + new_hour;
      }
      if (new_min < 10 ) {
        new_min = "0" + new_min;
      }
      trigger.closest(".as_box").find(".due_time").first().text(new_hour + ":" + new_min);
      
   
      //change background color based on completion 
      trigger.closest(".as_box").addClass(data.completed ? "completed" : "not_completed", {duration: 800}
      ).removeClass(data.completed ? "not_completed" : "completed", {duration: 800});}).on('ajax:failure', function(e) {
    console.log("assignment edit FAILED");
   });

/*    //find new date assignment box and change the border of it if it's today, also change border of old date */
/*       var today = new Date(); */
/*       var d = today.getDate(); */
/*       var dayhtml = trigger.closest(".as_box").parent(".assignment_box").find(".day_heading"); */
/*       var day = dayhtml.text().trim(); */
/*       var todayHuh = (day.indexOf(d + ",") >= 0); */
/*       console.log("todayHUh was %o", todayHuh); */

/*       //if no assignments go to blue */
/*       var ab = trigger.closest(".assignment_box"); */
/*       var as = $(ab).find(".as_box"); */

/*       if (todayHuh && as.length === 0) { */
/*        dlg.parent(".ui-dialog").css("border-color", "#000000"); */ 
        
/*       } */
  });
})


