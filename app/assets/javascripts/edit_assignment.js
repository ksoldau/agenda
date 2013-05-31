$(function() {
  $(".edit_dialog").each(function() {
    
    var $dlg = $(this);
    var $edit_btn = $dlg.data("trigger");

    var $assignment = $edit_btn.closest(".as_box");


    $dlg.find("form").on('ajax:success', function(e, data, status, xhr) {
      $dlg.dialog('close');
      
      //update assignment's subject
      updateSubject($assignment, data);
      
      //update description based on edit
      updateDescription($assignment, data);

      //update of placement based on edit
      updatePlacement($assignment, data);

      //update time based on edit
      updateTime($assignment, data);
      console.log("after updateTime");
           
   
      //change background color based on completion
      updateCompletionBackground($assignment, data);


  });

    $dlg.find("form").on('ajax:failure', function(e) {
        console.log("assignment edit FAILED");
    });

  });
})

/************************/
/*** helper functions ***/
/************************/

//update the subject after edit assigment
function updateSubject($assignment, data) {

    //get the subject 
    var $subj = $assignment.find(".subject").first();
    
    //update subject if needs to be updated
    if ($subj.text().trim() !== data.subject.name.trim()) {
       $subj.animate({opacity: "0"}, 700, function() {
        $subj.text(data.subject.name).animate({opacity: "1"}, 700);
      });
    }

}

function updateDescription($assignment, data) {
  
  //get the description
  var $desc = $assignment.find(".description").first()
  
  //update the descirption if it needs to be updated
  if ($desc.text().trim() !== data.description.trim()) {
    $desc.animate({opacity: "0"}, 700, function() {
      $desc.text(data.description).animate({opacity: "1"}, 700);
    });
  }

}

function updatePlacement($assignment, data) {
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

    old_date = $assignment.closest(".assignment_box").find(".day_heading").text().trim();
    old_year = Number(old_date.match(/\d+/g)[1]);
    old_day = Number(old_date.match(/\d+/g)[0]);

    old_time = $assignment.find(".due_time").text().replace(/\s+/g, ' ').trim();
    old_hour = Number(old_time.split(' ')[2].split(':')[0]);
    old_min = Number(old_time.split(' ')[2].split(':')[1]);
    old_am_pm = old_time.split(' ')[3];

    //make old_hour on 24 hour time
    if (old_am_pm === "am" && old_hour === 12) {
      old_hour = 0;
    } 
    if (old_am_pm === "pm" && old_hour !== 12) {
      old_hour += 12;
    }
    
    var old_date_and_time = new Date(old_year, 0, old_day, old_hour, old_min);
    var new_date_and_time = new Date(new_year, 0, new_day, new_hour, new_min);

    var old_date = new Date(old_year, 0, old_day);
    var new_date_no_month = new Date(new_year, 0, new_day);


    // if date moved to before week
    if (new_date.getTime() < url_date.getTime()) {
      $assignment.animate({left: '-999px'}, 800, function() {
       $assignment.slideUp();
      });
    }

    // if date moved to after week
    else if (new_date.getTime() > url_date_end_week.getTime()) {
      $assignment.animate({left: '999px'}, 800, function() {
        $assignment.slideUp();
      });
    }

    // if due date and time have not changed
    else if (new_date_and_time.getTime() === old_date_and_time.getTime()) {
      //do nothing
    }
    
    //if date or time has changed
    else if (new_date_and_time.getTime() !== old_date_and_time.getTime()){
      //old assignment
      $assignment.animate({opacity: '0'}, 800, function() {
        $assignment.slideUp(600, function (e) {

      //figure out where to put new assignment
      var new_day_string = String(new_day);
      
      var dayHeadingArray = $(".day_heading");
      for (var i = 0; i < dayHeadingArray.length; i++) {
        h = dayHeadingArray[i];
        htext = $(h).text();

        // is it in the right day?
        if (htext.indexOf(new_day_string + ",") >= 0) {
          var new_ab = $(h).closest(".assignment_box");

          var assignmentsArray = new_ab.find(".as_box");

          //
          $assignment.appendTo(new_ab);
          
          var aArray = Array.prototype.slice.call(assignmentsArray);
          
          if (aArray.length > 0) {
            for (i = 0; i < aArray.length; i++) { 
              var o_a = $(aArray[i]);
              var o_due_time = o_a.find(".due_time");
              
              var o_due_time_text = o_due_time.text().replace(/\s+/g, ' ').trim();
              
              var o_hour = Number(o_due_time_text.split(' ')[2].split(':')[0]);
              var o_min = Number(o_due_time_text.split(' ')[2].split(':')[1]);
              
              var am_or_pm = o_due_time_text.split(' ')[3];
              
              var o_24hour = o_hour;
              
              if (am_or_pm === "am" && o_hour === 12) {
                var o_24hour = 0;
              }
              if (am_or_pm === "pm" && o_hour > 12) {
                var o_24hour = o_hour + 12;
              }

              var o_date = new Date (0, 0, 1, o_24hour, o_min);

              
              if (new_hour < 10) {
                /* new_hour = "0" + new_hour; */
              }
              if (new_min < 10) {
                /* new_min = "0" + new_min; */
              }
              var new_date_time = new Date(0, 0, 1, Number(new_hour), Number(new_min));
                           
              if (new_date_time.getTime() <= o_date.getTime()) { //opposite bc negative for some reason
                o_a.before($assignment);
              }
            }; //end of for
          }

          $assignment.slideDown(600, function() {
            $assignment.animate({opacity: '1'}, 600);
          });

        } // end of if
      
      } 


        });
      });
      


    }
}

function updateTime($assignment, data) {
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

    old_date = $assignment.closest(".assignment_box").find(".day_heading").text().trim();
    old_year = Number(old_date.match(/\d+/g)[1]);
    old_day = Number(old_date.match(/\d+/g)[0]);

    old_time = $assignment.find(".due_time").text().replace(/\s+/g, ' ').trim();
    old_hour = Number(old_time.split(' ')[2].split(':')[0]);
    old_min = Number(old_time.split(' ')[2].split(':')[1]);
    old_am_pm = old_time.split(' ')[3];

    //make old_hour on 24 hour time
    if (old_am_pm === "am" && old_hour === 12) {
      old_hour = 0;
    } 
    if (old_am_pm === "pm" && old_hour !== 12) {
      old_hour += 12;
    }
    
    var old_date_and_time = new Date(old_year, 0, old_day, old_hour, old_min);
    var new_date_and_time = new Date(new_year, 0, new_day, new_hour, new_min);

    var old_date = new Date(old_year, 0, old_day);
    var new_date_no_month = new Date(new_year, 0, new_day);



    console.log("in update time");
    if (new_hour < 10) {
      new_hour = "0" + new_hour;
    }
    if (new_min < 10 ) {
      new_min = "0" + new_min;
    }
    // back to 12 hr time
    var am_pm = "am";
    if (new_hour >= 12) {
      var am_pm = "pm";
    }
    if (new_hour > 12) {
      new_hour = new_hour - 12;
    }
    if (new_hour === 0) {
      new_hour = 12;
    }

    $assignment.find(".due_time").first().text("due at " + new_hour + ":" + new_min + " " + am_pm);
    debugger;

}

function updateCompletionBackground($assignment, data) {
   $assignment.addClass(data.completed ? "completed" : "not_completed", {duration: 800});
   
   $assignment.removeClass(data.completed ? "not_completed" : "completed", {duration: 800});
   
}
