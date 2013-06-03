// what happens when edit assignment (in week view)
$(function() {
    $(".edit_dialog").each(function() {
    
    var dlg = $(this);

    //save for later
    var trigger = dlg.data("trigger");

    //when ajax succeeds
    dlg.find("form").on('ajax:success', function(e, data, status, xhr) {
        
        assignment = trigger.closest(".as_box");
      
        dlg.dialog('close');
        //change subject if edited
        updateSubject(assignment, data);

        //change description based on edit
        updateDescription(assignment, data);

        //change of placement based on time edit
        updateTimeAndPlacement(assignment, data);
   
    //when ajax fails 
    }).on('ajax:failure', function(e) {
      console.log("assignment edit FAILED");
    });
  });
})


/*** helper functions ***/

// update subject if need be
function updateSubject(trigger, data) {
    var subj = assignment.find(".subject").first();
    
    // if subject changed, show updated information
    if (subj.text().trim() !== data.subject.name.trim()) {
       subj.animate({opacity: "0"}, 700, function() {
        subj.text(data.subject.name).animate({opacity: "1"}, 700);
      });
    }
}

// update description if need be
function updateDescription(trigger, data) {
    var desc = assignment.find(".description").first()
    
    // if description changed, show updated information
    if (desc.text().trim() !== data.description.trim()) {
      desc.animate({opacity: "0"}, 700, function() {
        desc.text(data.description).animate({opacity: "1"}, 700);
      });
    }

}

//updateTimeAndPlacement if need be
function updateTimeAndPlacement(trigger, data) {
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
    else if (differentDateAndTime(new_date_and_time, old_date_and_time)) {
      //dateOrTimeChanged(trigger.closest(".as_box", new_day,)); 
      //close old assignment
      closeAssignment(trigger.closest(".as_box"));

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
              
              if (new_date_time.getTime() <= o_date.getTime()) {
                o_a.before(assignment);
              }
            }; //end of for
          }; // end of if 

          assignment.slideDown(600, function() {
            assignment.animate({opacity: '1'}, 600);
          });

        } // end of if
      
      } // end of bigger for loop 


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

// determines if two date times are the same
function sameDateAndTime(datetime1, datetime2) {
  return datetime1.getTime() === datetime2.getTime();
}

// determines if two date times are different
function differentDateAndTime(datetime1, datetime2) {
  return datetime1.getTime() !== datetime2.getTime();
}

function closeAssignment(assignment) {
  assignment.animate({opacity: '0'}, 800, function() {
      assignment.slideUp(600);
  });
// edit dialog with js after assignment has been edited (in week view?)
$(function() {
  $(".edit_dialog").each(function() {
 
    var $dlg = $(this); // the edit dialog
    var $edit_btn = $dlg.data("trigger"); // the edit button

    var $assignment = $edit_btn.closest(".as_box"); // the assignment edited

    // do this when ajax succeeds
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
    
    // do this when ajax fails
    $dlg.find("form").on('ajax:failure', function(e) {
        console.log("assignment edit FAILED");
    });

  });
})

/************************/
/*** helper functions ***/
/************************/

// update the subject after assignment's been edited
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

// update the description after assignment's been edited
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

// update placement of assignment after its been edited
function updatePlacement($assignment, data) {
    var new_dd = data.due_date;
    var new_parsed_date = new_dd.split('T')[0].split('-');
    var new_parsed_time = new_dd.split('T')[1].split(':');
    var new_min = Number(new_parsed_time[1]);
    var new_hour = Number(new_parsed_time[0]);
    var new_day = Number(new_parsed_date[2]);
    var new_month = Number(new_parsed_date[1]) -1; //0 is jan
    var new_year = Number(new_parsed_date[0]);
    var new_date = newDate(data); 

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
    console.log("old hour is " + old_hour);
    console.log("old_am_pm is " + old_am_pm);
    old_hour = make24(old_hour, old_am_pm);
    
    var old_date_and_time = new Date(old_year, 0, old_day, old_hour, old_min);

    var new_date_and_time = new Date(new_year, 0, new_day, new_hour, new_min);

    var old_date = new Date(old_year, 0, old_day);
    var new_date_no_month = new Date(new_year, 0, new_day);


    // if date moved to before week
    if (movedBeforeWeek(url_date, new_date)) {
      moveBeforeWeek($assignment);
    }

    // if date moved to after week
    else if (movedAfterWeek(url_date, new_date)) {
      moveAfterWeek($assignment);
    }

    // if date time of due date did not change
    else if (sameDateTime(new_date_and_time, old_date_and_time)) {
      // do nothing
    }
    
    //if date or time has changed
    else if (!sameDateTime(new_date_and_time, old_date_and_time)){
      move($assignment, data);
      



    }
}

// update due time of assignment after its been edited
function updateTime($assignment, data) {
    
    // due date after edit
    var new_dd = data.due_date;
    // get time from due date after edit
    var new_parsed_time = new_dd.split('T')[1].split(':');
    // due time minute after edit
    var new_min = Number(new_parsed_time[1]);
    // due time hour after edit
    var new_hour = Number(new_parsed_time[0]);
    
    // add a leading 0 if need be
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
    
    // update html to show new time
    $assignment.find(".due_time").first().text("due at " + new_hour + ":" + new_min + " " + am_pm);

}

// update the background color of assignment after its been edited
// background color signifies completion status
function updateCompletionBackground($assignment, data) {
   $assignment.addClass(data.completed ? "completed" : "not_completed", {duration: 800});
   
   $assignment.removeClass(data.completed ? "not_completed" : "completed", {duration: 800});
   
}

// change from 12 hr to 24 hour 
// based on hour and if am or pm
function make24(hour, amPm) {
    
    if (amPm === "am" && hour === 12) {
      hour = 0;
    } 
    if (amPm === "pm" && hour !== 12) {
      hour += 12;
    }

    return hour;

}

// is the date before the beginning of the week?
function movedBeforeWeek(beginning_of_week, date) {
  return date.getTime() < beginning_of_week.getTime();
}

// move the assignment to previous week 
function moveBeforeWeek($assignment) {
    // slide assignment left then make its container smaller
    $assignment.animate({left: '-1500px'}, 900, function() {
      $assignment.slideUp();
    });
}

// is the date after the end of the week?
function movedAfterWeek(beginning_of_week, date) {
  var end_of_week = new Date(beginning_of_week.getTime() + 6 * 24 * 60 * 60 * 1000);

  return date.getTime() > end_of_week.getTime();
}

// move the assignment to the next week
function moveAfterWeek($assignment) {
    $assignment.animate({left: '2000px'}, 900, function() {
        $assignment.slideUp();
    });
}

// are these two datetimes the same?
function sameDateTime(datetime1, datetime2) {
    return datetime1.getTime() === datetime2.getTime();
}

// move the assignment to new place within week

function move($assignment, data) {
    var new_dd = data.due_date;
    var new_parsed_date = new_dd.split('T')[0].split('-');
    var new_parsed_time = new_dd.split('T')[1].split(':');
    var new_min = Number(new_parsed_time[1]);
    var new_hour = Number(new_parsed_time[0]);
    var new_day = Number(new_parsed_date[2]);
    var new_date = newDate(data);

    old_date = $assignment.closest(".assignment_box").find(".day_heading").text().trim();
    old_time = $assignment.find(".due_time").text().replace(/\s+/g, ' ').trim();
    old_hour = Number(old_time.split(' ')[2].split(':')[0]);
    old_min = Number(old_time.split(' ')[2].split(':')[1]);
    old_am_pm = old_time.split(' ')[3];

    //make old_hour on 24 hour time
    console.log("old hour is " + old_hour);
    console.log("old_am_pm is " + old_am_pm);
    old_hour = make24(old_hour, old_am_pm);
    
      //close old assignment then move it and open it again
      $assignment.animate({opacity: '0'}, 800, function() {
        $assignment.slideUp(600, function (e) {
          moveAssignmentAndSlideDown($assignment, data);



        });
      });
      
}

// get the new date after assignment has been edited
function newDate(data) {
    var new_dd = data.due_date;
    var new_parsed_date = new_dd.split('T')[0].split('-');
    var new_day = Number(new_parsed_date[2]);
    var new_month = Number(new_parsed_date[1]) -1; //0 is jan
    var new_year = Number(new_parsed_date[0]);
    var new_date = new Date(new_year, new_month, new_day);

    return new_date;
}

// move assignment to new position and then show it
function moveAssignmentAndSlideDown($assignment, data) {

      // list of day headings (dates) on the page
      var dayHeadingArray = $(".day_heading");
      
      // iterate through dates on the page
      for (var i = 0; i < dayHeadingArray.length; i++) {
        
        // date in string form of day heading
        h = dayHeadingArray[i];
        // text from the day heading dom element
        htext = $(h).text();

        // if assignment now in this day
        if (inRightDay(data, htext)) {
            var new_ab = $(h).closest(".assignment_box");
            var assignments = new_ab.find(".as_box");
            putAssignmentInDay($assignment, assignments, data); 

        } // end of if
      
      } 
}

// determines if day in header on page is same as the 
// due day of assignment after its edited
function inRightDay(data, htext) {
  var new_dd = data.due_date;
  var new_parsed_date = new_dd.split('T')[0].split('-');
  var new_day = Number(new_parsed_date[2]);

  var new_day_string = String(new_day);

  return subString(new_day_string + ",", htext);
}

// determines if a string is a substring of another
function subString(sub, full) {
  return full.indexOf(sub) >= 0;
}

// put assignment in the day
function putAssignmentInDay($assignment, other_assignments, data) {
    var new_ab = $(h).closest(".assignment_box");

    // add to day in case no other assignments exist 
    // to compare it to
    $assignment.appendTo(new_ab);
    
    // put assignment in right place in dom
    putAssignmentInOrder($assignment, other_assignments, data);
    
    // show the edited assignment
    $assignment.slideDown(600, function() {
      $assignment.animate({opacity: '1'}, 600);
    });
}

// put assignment in correct order
function putAssignmentInOrder($assignment, other_assignments, data) {
    
    var other_assignments_array = Array.prototype.slice.call(other_assignments);
    
    // place assignment in order with other assignments
    if (other_assignments_array.length > 0) {
      for (i = 0; i < other_assignments_array.length; i++) {
      $other_assignment =  $(other_assignments_array[i]);
      debugger;
        
        // if assignment comes before another, 
        // place it before it
        if (dueBefore(data, $other_assignment)) {
          $other_assignment.before($assignment);
        }
      }; //end of for
    }
}

// is the due date in data before the other assignment?
function dueBefore(data, $other_assignment) {
  
  // get the new time after assignment edited
  var new_time = dataTime(data); 
  
  // get the time comparing assignment to
  var other_time = otherTime($other_assignment);

  return new_time.getTime() <= other_time.getTime();
}

// get the new time from the data given back from ajax
function dataTime(data) {
  
  var due_date = data.due_date;
  var parsed_time = due_date.split('T')[1].split(':');
  var min = Number(parsed_time[1]);
  var hour = Number(parsed_time[0]);

  var time = new Date(0, 0, 1, hour, min);

  return time;
}

// get the time from dom assignment
function otherTime($other_assignment) {
  var o_due_time = $other_assignment.find(".due_time");
  var o_due_time_text = o_due_time.text().replace(/\s+/g, ' ').trim();
  var o_hour = Number(o_due_time_text.split(' ')[2].split(':')[0]);
  var o_min = Number(o_due_time_text.split(' ')[2].split(':')[0]);
   
  var am_pm = o_due_time_text.split(' ')[3];
  
  // get the hour in terms of 24
  var o_24hour = make24(o_hour, am_pm);
  
  var time = new Date(0, 0, 1, o_24hour, o_min);
  
  return time;
}

