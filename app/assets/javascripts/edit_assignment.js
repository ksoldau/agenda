// what happens when edit assignment (in week view)
$(function() {
    $(".edit_dialog").each(function() {
    
    var dialog = $(this);

    //save for later
    var trigger = dialog.data("trigger");

    //when ajax succeeds
    dialog.find("form").on('ajax:success', function(e, data, status, xhr) {

        dialog.dialog('close');
      
        //change subject if edited
        updateSubject(trigger, data);

        //change description based on edit
        updateDescription(trigger, data);

        //change of placement based on time edit
        updateTimeAndPlacement(trigger, data);
   
    //when ajax fails 
    }).on('ajax:failure', function(e) {
      console.log("assignment edit FAILED");
    });
  });
})


/*** helper functions ***/

// update subject if need be
function updateSubject(trigger, data) {
    var subj = trigger.closest(".as_box").find(".subject").first();
    
    // if subject changed, show updated information
    if (subj.text().trim() !== data.subject.name.trim()) {
       subj.animate({opacity: "0"}, 700, function() {
        subj.text(data.subject.name).animate({opacity: "1"}, 700);
      });
    }
}

// update description if need be
function updateDescription(trigger, data) {
    var desc = trigger.closest(".as_box").find(".description").first()
    
    // if description changed, show updated information
    if (desc.text().trim() !== data.description.trim()) {
      desc.animate({opacity: "0"}, 700, function() {
        desc.text(data.description).animate({opacity: "1"}, 700);
      });
    }

}

//updateTimeAndPlacement if need be
function updateTimeAndPlacement(trigger, data) {
    console.log("UPDATING TIME AND PLACEMENT");
    var new_dd = data.due_date;
    var new_parsed_date = new_dd.split('T')[0].split('-');
    var new_parsed_time = new_dd.split('T')[1].split(':');
    var new_min = Number(new_parsed_time[1]);
    var new_hour = Number(new_parsed_time[0]);
    var new_day = Number(new_parsed_date[2]);
    var new_month = Number(new_parsed_date[1]) -1; //0 is jan
    var new_year = Number(new_parsed_date[0]);
    var new_date = new Date(new_year, new_month, new_day);
    
    //get beginning of week being shown
    var url_date = urlDate();
    //get end of week being shown
    var url_date_end_week = urlDateEndWeek(url_date);

    //the assignment before the edit 
    assignment = trigger.closest(".as_box");

    // get date and time of assignment's old due date and time
    old_date = assignment.closest(".assignment_box").find(".day_heading").text().trim();
    old_year = Number(old_date.match(/\d+/g)[1]);
    old_day = Number(old_date.match(/\d+/g)[0]);

    old_time = assignment.find(".due_time").text().replace(/\s+/g, ' ').trim();
    old_hour = Number(old_time.split(' ')[2].split(':')[0]);
    old_min = Number(old_time.split(' ')[2].split(':')[1]);
    old_am_pm = old_time.split(' ')[3];

    //make old_hour on 24 hour time
    old_hour = make24(old_hour, old_am_pm);
    
    // set dates with times for old and new to compare
    var old_date_and_time = new Date(old_year, 0, old_day, old_hour, old_min);
    var new_date_and_time = new Date(new_year, 0, new_day, new_hour, new_min);

    // set dates without times to compare old and new
    var old_date = new Date(old_year, 0, old_day);
    var new_date_no_month = new Date(new_year, 0, new_day);


    // if date moved to before week
    if (nowBeforeWeek(new_date, url_date)) {
      moveBeforeWeek(trigger);
    }
    
    // if date moved to after week
    else if (nowAfterWeek(new_date, url_date_end_week)) {
      moveAfterWeek(trigger);
    }
    
    // if due date and time have not changed
    else if (sameDateAndTime(new_date_and_time, old_date_and_time)) {
      //do nothing
    }      
    //if date or time has changed
    else if (new_date_and_time.getTime() !== old_date_and_time.getTime()){
      //old assignment
      console.log("IN THE LAST ELSE IF");
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
            console.log("GOT HERE");
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
              console.log(o_24hour);
              console.log(o_min);
              console.log(o_date.getTime());
              
              if (new_hour < 10) {
                /* new_hour = "0" + new_hour; */
              }
              if (new_min < 10) {
                /* new_min = "0" + new_min; */
              }
              var new_date_time = new Date(0, 0, 1, Number(new_hour), Number(new_min));
              console.log("this is new_date_time " + (new_date_time.getTime()/100000));

              console.log("this is o_date.getTime() " + (o_date.getTime()/100000));

              console.log(new_date_time.getTime() <= o_date.getTime());
              
              if (new_date_time.getTime() <= o_date.getTime()) { //opposite bc negative for some reason
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

    trigger.closest(".as_box").find(".due_time").first().text("due at " + new_hour + ":" + new_min + " " + am_pm);
    
 
    //change background color based on completion 
    trigger.closest(".as_box").addClass(data.completed ? "completed" : "not_completed", {duration: 800}
    ).removeClass(data.completed ? "not_completed" : "completed", {duration: 800});
}




// get the beginning of the week shown based on params in url
function urlDate() {
    var url = window.location.href;
    var url_parsed = url.split('=')[2].split('-');
    var url_day = Number(url_parsed[2]);
    var url_month = Number(url_parsed[1]) -1;
    var url_year = Number(url_parsed[0]);
    var url_date = new Date(url_year, url_month, url_day);
    
    return url_date;
}

// get the end of the week shown based on the params in url
function urlDateEndWeek(urlDate) {
  return new Date(urlDate.getTime() + 6 * 24 * 60 * 60 * 1000);
}

//make 12 hours 24
function make24(hour, amPm) {
  if (amPm === "am" && hour === 12) {
    return 0;
  }
  else if (amPm === "pm" && hour !== 12) { 
    return hour + 12;
  }
  else {
    return hour;
  }
}


// did the assignment move to before the week currently shown?
function nowBeforeWeek(newDate, urlDate) {
  return newDate.getTime() < urlDate.getTime();
}

// move assignment before current week
function moveBeforeWeek(trigger) {
  
  trigger.closest(".as_box").animate({left: '-999px'}, 800, 
      function() {
          trigger.closest(".as_box").slideUp();
  });
}

// did the assignment move to after the week currently shown?
function nowAfterWeek(newDate, urlDateEndWeek) {
  return newDate.getTime() > urlDateEndWeek.getTime();
}

// move assignment after current week
function moveAfterWeek(trigger) {
    trigger.closest(".as_box").animate({left: '999px'}, 800, 
        function() {
          trigger.closest(".as_box").slideUp();
    });
}

// determines if two times are the same
function sameDateAndTime(datetime1, datetime2) {
  return datetime1.getTime() === datetime2.getTime();
}

