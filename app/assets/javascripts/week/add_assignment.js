$(function() {

  $(".datepicker").datepicker();
  
  $(".timepicker").timepicker({
    'step': 15,
    'timeFormat': 'h:i a',
    'scrollDefaultNow': true
  });

  $("#add_dialog_ajax").dialog({
    autoOpen: false,
    width: 600,
    height: 300,
    title: 'Add assignment'
  });

  addAssignment();

  // hover effects
  $( ".assignment_box").hover(
    function() {
      $(this).find(".add_btn").css("visibility", "visible");
    },
    function() {
      $(this).find(".add_btn").css("visibility", "hidden");
    });

});


function addAssignment() {

  $(".add_btn").each( function() {
    
    $(this).on('click', function() {
      defaultDate = $(this).closest(".assignment_box").data('date');
      defaultMonth = defaultDate.split('-')[1];
      defaultYear = defaultDate.split('-')[0];
      defaultDay = defaultDate.split('-')[2];
      text = defaultMonth + "/" + defaultDay + "/" + defaultYear;
      
      // set defaults 
      defaultTime = "11:59 pm"
      $("#add_dialog_ajax .datepicker").val(text);
      $("#add_dialog_ajax .timepicker").val(defaultTime);
      $("#add_dialog_ajax input[value=no]").prop('checked', true);
      $("#add_dialog_ajax").dialog('open');
      
    });

  });

  submitAddAssignment();

}

// what to do when a user submits adding an assignment 
function submitAddAssignment() {
  
  $("#add_dialog_ajax .add_dialog_submit").on('click', function() {
   
    $form = $("#add_dialog_ajax");
    var subject_id = getSubjectIdAdd($form);
    var description = getDescriptionAdd($form);
    var month = getMonthAdd($form);
    var day = getDayAdd($form);
    var year = getYearAdd($form);
    var hour = getHourAdd($form);
    var minute = getMinuteAdd($form);
    var completed = getCompletedAdd($form);
    debugger;

    $.ajax({ 
      type: 'POST',
      url: '/assignments',
      dataType:'JSON',
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
      }, // need to fill this in
    }).success(function(data, status, xhr) {
      console.log("adding assignment via ajax a SUCCESS");
      placeAssignment(data);
      });
    return false; // prevents normal behavior 
  });
}

function getSubjectIdAdd($form) {

  var $subject = $($form.find(".select_subject").find(":selected"));
  var subjectId = $subject.val();

  return subjectId;

}

function getDescriptionAdd($form) {

  var $descriptionField = $($form.find("input[name=description]"));
  var description = $descriptionField.val();

  return description;

}

function getMonthAdd($form) {

  var date = $("#add_dialog_ajax .datepicker").val(); // ex: 06/11/2013
  var month = date.split('/')[0];

  debugger;

  return month;

}

function getDayAdd($form) {

  var date = $("#add_dialog_ajax .datepicker").val(); // ex: 06/11/2013
  var day = date.split('/')[1];

  return day;
}

function getYearAdd($form) {

  var date = $("#add_dialog_ajax .datepicker").val(); // ex: 06/11/2013
  var year = date.split('/')[2];

  return year;
}

function getHourAdd($form) {
  
  var time = $("#add_dialog_ajax .timepicker").val();
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

function getMinuteAdd($form) {

  var time = $("#add_dialog_ajax .timepicker").val();
  var minute = time.split(' ')[0].split(':')[1];

  return minute;
}

function getCompletedAdd($form) {

  var checked = $('input[name=completed]:checked', '#add_dialog_ajax').val();

  if (checked == "yes") {
    return 'true';
  }
  else {
    return 'false';
  }
}

function constructAssignmentHtml(data) {

  $due_time = constructDueTime(data);
  $subject = constructSubject(data);
  $description = constructDescription(data);
  $delete_button = constructDeleteButton(data);
  $edit_button =  constructEditButton(data); 

  var $as_box = $('<div/>', {class: 'as_box'});
  $as_box.append($due_time);
  $as_box.append($subject);
  $as_box.append($description);
  $as_box.append($delete_button);
  $as_box.append($edit_button);

  if (data['completed']) {
    $as_box.addClass('completed'); 
  }
  else {
    $as_box.addClass('not_completed');
  }
  
  var dueTime = data.due_date.split('T')[1].split(':');
  var dueHour = dueTime[0];
  var dueMinute = dueTime[1];
  var dataDueTime = dueHour + ":" + dueMinute;

  // update data on the as_box
  $as_box.data('due-time', dataDueTime);
  $as_box.data('subject-id', data.subject.id);
  $as_box.data('description', data.description);
  $as_box.data('subject', data.subject.name);
  $as_box.data('completed', data.completed);
  $as_box.data('assignment-id', data.id);
  debugger;
  
  // make edit and delete show up on hover
  $as_box.hover(
    function() {
      $(this).find(".delete_btn").css("visibility", "visible");
      $(this).find(".edit_btn").css("visibility", "visible");
    },
    function() {
      $(this).find(".delete_btn").css("visibility", "hidden");
      $(this).find(".edit_btn").css("visibility", "hidden");
    });
  
  // add needed data
  $as_box.data('assignment-id', data['id']);
  
  
  // show delete dialog when delete button clicked
  $as_box.find(".delete_btn").on('click', deleteAssignment());
  $as_box.find(".delete_btn").on('click', function() {
    updateDeleteDialogData($as_box.find(".delete_btn"));
    $(".delete_dialog").dialog('open');
  });
  
  // show edit dialog when edit button clicked

  $as_box.find(".edit_btn").on('click', editButtonClicked);

  return $as_box;
}


function constructDeleteButton(data) {
  $delete_button = $('<div/>', {class: 'delete_btn'});

  assignment_id = data['id'];
  
  return $delete_button.data('assignment-id',assignment_id);
}

function constructEditButton(data) {
  $edit_button = $('<div/>', {class: 'edit_btn'});

  assignment_id = data['id'];
  return $edit_button.data('assignment-id', assignment_id);

}

function constructDescription(data) {
  $description = $('<div/>', {class: 'description'});
  
  description_text = data['description'].trim();

  return $description.text(description_text);

}

function constructSubject(data) {
  $subject = $('<div/>', {class: 'subject'});

  subject_name = data['subject']['name'];

  return $subject.text(subject_name);

}

function constructDueTime(data) {
  var $due_time = $('<div/>', {class: 'due_time'});

  var hour24 = get24Hour(data);
  var hour = hour24;
  var minute = getMinute60(data);
  var amPm = "am"
  
  if (Number(hour24) == 0) {
      hour = "12";
      amPm = "am";
  }
  else if (Number(hour24) > 12) {
      hour = String(Number(hour24) - 12);
      amPm = "pm"
  }

  text = "due at " + hour + ":" + minute + " " + amPm;

  return $due_time.text(text);
}

function get24Hour(data) {
  var due_date = data['due_date'];
  var time = due_date.split('T')[1];
  var hour = time.split(':')[0];
  
  return hour;
}

function getMinute60(data) {
  var due_date = data['due_date'];
  var time = due_date.split('T')[1];
  var minute = time.split(':')[1];

  return minute;

}

/*** from edit assignment ***/
// update placement of assignment after its been edited
function placeAssignment(data) {

    $assignment = constructAssignmentHtml(data);
    $("#add_dialog_ajax").dialog('close');

    var new_dd = data.due_date;
    var new_parsed_date = new_dd.split('T')[0].split('-');
    var new_parsed_time = new_dd.split('T')[1].split(':');
    var new_min = Number(new_parsed_time[1]);
    var new_hour = Number(new_parsed_time[0]);
    var new_day = Number(new_parsed_date[2]);
    var new_month = Number(new_parsed_date[1]) -1; //0 is jan
    var new_year = Number(new_parsed_date[0]);
    var new_date = newDate(data); 

    var new_date_and_time = new Date(new_year, 0, new_day, new_hour, new_min);
    var new_date_no_month = new Date(new_year, 0, new_day);


    // if date moved to before week
    if (movedBeforeWeek(new_date)) {
      moveBeforeWeek($assignment);
    }

    // if date moved to after week
    else if (movedAfterWeek(new_date)) {
      moveAfterWeek($assignment);
    }

    //if date or time has changed
    else {
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
        
        // date in string form of day heading
        var $day = $(assignmentBoxArray[i]); 
        // text from the day heading dom element
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
function inRightDay(data, htext) {
  var new_dd = data.due_date;
  var newDate = new_dd.split('T')[0];

  return date === newDate; 
}

// put assignment in the day
function putAssignmentInDay($assignment, other_assignments, $day, data) {
    var new_ab = $(h).closest(".assignment_box");

    // put assignment in right place in dom
    putAssignmentInOrder($assignment, other_assignments, data, $day);
    
    // show the edited assignment
    $assignment.slideDown(10000, function() {
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
  var o_due_time = $other_assignment.find(".due_time");
  var o_due_time_text = o_due_time.text().replace(/\s+/g, ' ').trim();
  var o_hour = Number(o_due_time_text.split(' ')[2].split(':')[0]);
  var o_min = Number(o_due_time_text.split(' ')[2].split(':')[1]);
  var am_pm = o_due_time_text.split(' ')[3];
  
  // get the hour in terms of 24
  var o_24hour = make24(o_hour, am_pm);
  var time = new Date(0, 0, 1, o_24hour, o_min);
  
  return time;
}

