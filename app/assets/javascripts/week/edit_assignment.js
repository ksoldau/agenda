// edit dialog with js after assignment has been edited (in week view?)

$(function() {
  
  $("#edit_dialog").dialog({
    closeOnEscape: true,
    title: "Update Assignment",
    width: 470, 
    draggable: true,
    resizable: false,
    modal: true,
    autoOpen: false
  });

  $(".edit_btn").on('click', editButtonClicked);
  $("#edit_dialog .edit_dialog_submit").on('click', submitEditAssignment);

});

// what to do if edit button was clicked
function editButtonClicked() {
  
  $editBtn = $(this);
  $asBox = $editBtn.closest(".as_box");
  
  // give edit dialog this assignment id
  var assignmentId = $asBox.data('assignment-id'); 
  $("#edit_dialog").data('assignment-id', assignmentId);
 
  // get default values for the dialog
  var subjectId =  $asBox.data('subject-id');
  var description = $asBox.data('description').trim();
  var date = defaultDateFromEditBtn($editBtn);
  var time = defaultTimeFromEditBtn($editBtn);
  var completed = $asBox.hasClass("completed");

  if (completed) {
    $("#edit_dialog input[value=yes]").prop('checked', true);
  }

  $("#edit_dialog .datepicker").val(date);
  $("#edit_dialog .timepicker").val(time);
  $("#edit_dialog .select_subject").val(subjectId);
  $("#edit_dialog input[name=description]").val(description);
  $("#edit_dialog").dialog('open');
  
}

function defaultDateFromEditBtn($editBtn) {
  defaultDate = $editBtn.closest(".assignment_box").data('date');
  defaultMonth = defaultDate.split('-')[1];
  defaultYear = defaultDate.split('-')[0];
  defaultDay = defaultDate.split('-')[2];
  text = defaultMonth + '/' + defaultDay + '/' + defaultYear;
  
  return text;
}

function defaultTimeFromEditBtn($editBtn) {
  defaultTime = $editBtn.closest(".as_box").data('due-time');
  defaultHour = defaultTime.split(':')[0];
  defaultMinute = defaultTime.split(':')[1];
  amPm = "am"

  if (Number(defaultHour) > 12) {
    defaultHour = String(Number(defaultHour) - 12);
    amPm = "pm";
  }
  if (Number(defaultHour) == 0) {
    defaultHour = "12";
  }

  return defaultHour + ':' + defaultMinute + " " + amPm;
}

function submitEditAssignment() {

  var assignmentId = $("#edit_dialog").data('assignment-id');
  //var $assignment = $(".as_box[data-assignment-id=" + assignmentId + "]");
  var $assignment = $editBtn.closest(".as_box");
  var $form = $("#edit_dialog");
  var subject_id = getSubjectId($form);
  var description = getDescription($form);
  var month = getMonth($form);
  var day = getDay($form);
  var year = getYear($form);
  var hour = getHour($form);
  var minute = getMinute($form);
  var completed = getCompleted($form); 
  debugger;
  $.ajax({
    type: 'PUT', 
    url: '/assignments/' + assignmentId,
    dataType: 'JSON',
    data: {
      'assignment': {
        'subject_id': subject_id,
        'description': description,
        'due_date(2i)': month,
        'due_date(3i)': day,
        'due_date(1i)': year,
        'due_date(4i)': hour, 
        'due_date(5i)': minute,
        'completed': completed,
      }
    }
  }).success(function(data, status, xhr) {
    
      $("#edit_dialog").dialog('close');

      updateSubject($assignment, data);
      
      updateDescription($assignment, data);

      updatePlacement($assignment, data);

      updateTime($assignment, data);
   
      updateCompletionBackground($assignment, data);

  }).error(function(e) {
  });
  return false;
  //.failure( function(e) {
  //});
    
}

function getSubjectId($form) {

  var $subject = $($form.find(".select_subject").find(":selected"));
  var subjectId = $subject.val();

  return subjectId;

}

function getDescription($form) {

  var $descriptionField = $($form.find("input[name=description]"));
  var description = $descriptionField.val();

  return description;

}

function getMonth($form) {
  var date = $("#edit_dialog .datepicker").val(); // ex: 06/11/2013
  var month = date.split('/')[0];

  return month;

}

function getDay($form) {

  var date = $("#edit_dialog .datepicker").val(); // ex: 06/11/2013
  var day = date.split('/')[1];

  return day;
}

function getYear($form) {

  var date = $("#edit_dialog .datepicker").val(); // ex: 06/11/2013
  var year = date.split('/')[2];

  return year;
}

function getHour($form) {
  
  var time = $("#edit_dialog .timepicker").val();
  var hour12 = time.split(':')[0];
  var amPm = time.split(' ')[1];

  var hour24 = hour12;
  

  if (hour12 == 12 && amPm == "am") {
    hour24 = String(0); 
  }
  if (hour12 >= 1 && amPm == "pm") {
    hour24 = String(Number(hour12) + 12);
  }
  
  return hour24;
}

function getMinute($form) {

  var time = $("#edit_dialog .timepicker").val();
  var minute = time.split(' ')[0].split(':')[1];

  return minute;
}

function getCompleted($form) {

  var checked = $('input[name=completed]:checked', '#add_dialog_ajax').val();

  if (checked == "yes") {
    return 'true';
  }
  else {
    return 'false';
  }
}

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
    
    var assignment_box = $assignment.closest(".assignment_box");
    var oldDate = assignment_box.data('date');
    debugger;
    var oldYear = oldDate.split('-')[0];
    var oldMonth = oldDate.split('-')[1];
    var oldDay = oldDate.split('-')[2];

    var oldTime = $assignment.data('due-time');
    var oldHour = oldTime.split(':')[0];
    var oldMinute = oldTime.split(':')[1];

    
    var old_datetime = new Date(Number(oldYear), Number(oldMonth) - 1, Number(oldDay)
      , Number(oldHour), Number(oldMinute));

    var new_datetime = new Date(new_year, new_month, new_day, new_hour, new_min);

    // if date moved to before week
    if (movedBeforeWeek(new_date)) {
      moveBeforeWeek($assignment);
    }

    // if date moved to after week
    else if (movedAfterWeek(new_date)) {
      moveAfterWeek($assignment);
    }

    // if date time of due date did not change
    else if (sameDateTime(new_datetime, old_datetime)) {
      // do nothing
    }
    
    //if date or time has changed
    else if (!sameDateTime(new_datetime, old_datetime)){
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
    if (new_hour == 00) {
      new_hour = 12;
    }
    
    // update html to show new time
    if (new_hour < 10) {
      $assignment.find(".due_time").first().text("due at " + "0" + new_hour + ":" + new_min + " " + am_pm);
    }
    else {
      $assignment.find(".due_time").first().text("due at " + new_hour + ":" + new_min + " " + am_pm);
    }
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
function movedBeforeWeek(date) {

  // find first day in week
  var $firstDay = $($(".assignment_box")[0]);
  // date of first day
  var firstDayDate = $firstDay.data('date');

  var year = firstDayDate.split('-')[0];
  var month = firstDayDate.split('-')[1];
  var day = firstDayDate.split('-')[2];

  beginningOfWeek = new Date(Number(year), Number(month) - 1, Number(day));
  
  return date.getTime() < beginningOfWeek.getTime();
}

// move the assignment to previous week 
function moveBeforeWeek($assignment) {
    // slide assignment left then make its container smaller
    $assignment.animate({left: '-1500px'}, 900, function() {
      $assignment.slideUp();
    });
}

// is the date after the end of the week?
function movedAfterWeek(date) {

  // last day in the week
  var $lastDay = $($(".assignment_box")[6]);
  // date of last day
  var lastDayDate = $lastDay.data('date');

  var year = lastDayDate.split('-')[0];
  var month = lastDayDate.split('-')[1];
  var day = lastDayDate.split('-')[2];

  endOfWeek = new Date(Number(year), Number(month) - 1, Number(day));
  
  return date.getTime() > endOfWeek.getTime();
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
      var assignmentBoxArray = $(".assignment_box");
      
      // iterate through dates on the page
      for (var i = 0; i < assignmentBoxArray.length; i++) {
        
        // the day 
        var $day = $(assignmentBoxArray[i]);
        // the date of the day
        var date = $day.data('date');

        // if assignment now in this day
        if (inRightDay(data, date)) {
            var assignments = $day.find(".as_box");
            putAssignmentInDay($assignment, assignments, $day, data); 

        } // end of if
      
      } 
}

// determines if day in header on page is same as the 
// due day of assignment after its edited
function inRightDay(data, date) {
  var new_dd = data.due_date;
  var newDate = new_dd.split('T')[0];

  return date === newDate;
}

// determines if a string is a substring of another
function subString(sub, full) {
  return full.indexOf(sub) >= 0;
}

// put assignment in the day
function putAssignmentInDay($assignment, other_assignments, $day, data) {

    // put assignment in right place in dom
    putAssignmentInOrder($assignment, other_assignments, data, $day);
    
    // show the edited assignment
    $assignment.slideDown(600, function() {
      $assignment.animate({opacity: '1'}, 600);
    });
}

// put assignment in correct order
function putAssignmentInOrder($assignment, other_assignments, data, $day) {
    
    var other_assignments_array = Array.prototype.slice.call(other_assignments);
    
    // place assignment in order with other assignments
    if (other_assignments_array.length > 0) {
      var beforeSomething = false;
      for (i = 0; i < other_assignments_array.length; i++) {
      $other_assignment =  $(other_assignments_array[i]);
        
        // if assignment comes before another, 
        // place it before it
        if (dueBefore(data, $other_assignment)) {
          $other_assignment.before($assignment);
          beforeSomething = true;
          break;
        }
      }; //end of for
      if (!beforeSomething) {
        $assignment.appendTo($day);
      }
    }
    else {
      $assignment.appendTo($day);
      console.log("FJKDSLFNJK " + $day.text());
    }
}

// is the due date in data before the other assignment?
function dueBefore(data, $other_assignment) {
  // get the new time after assignment edited
  var new_time = dataTime(data);
  
  // get the time comparing assignment to
  var other_time = otherTime($other_assignment);

  var rtrn =  new_time.getTime() <= other_time.getTime();
  return rtrn;

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
  var dueTime = $other_assignment.data('due-time');
  var hour = dueTime.split(':')[0];
  var minute = dueTime.split(':')[1];

  var time = new Date(0, 0, 1, hour, minute);
  
  return time;
}
