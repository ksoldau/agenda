$(function() {

  $(".datepicker").datepicker();
  
  $(".timepicker").timepicker({
    'step': 15,
    'timeFormat': 'h:i a',
    'scrollDefaultNow': true
  });


  $("#add_dialog").dialog({
    autoOpen: false,
    width: 600,
    height: 300,
    title: 'Add assignment'
  });

  openAddDialog();

  submitAddAssignment();

});

/**********************************************/

function openAddDialog() {
    $("td").each(
        function() {

          $(this).dblclick(function() {
            defaultDate = $(this).data('date');
            defaultMonth = defaultDate.split('-')[1];
            defaultYear = defaultDate.split('-')[0];
            defaultDay = defaultDate.split('-')[2];
            defaultText = defaultMonth + '/' + defaultDay + '/' + defaultYear;

            defaultTime = "11:59 pm"
            $("#add_dialog .datepicker").val(defaultText);
            $("#add_dialog .timepicker").val(defaultTime);

            // don't change subject because want to remember the last one
            
            // make sure description is nothing
            $("#add_dialog input[name=description]").val("");
            // make sure the not completed option is checked
            $("#add_dialog input[value=no]").prop('checked', true);

            $("#add_dialog").dialog('open');
          });
      }
    )
}


// what to do when a user submits adding an assignment 
function submitAddAssignment() {
  
  $("#add_dialog .add_dialog_submit").on('click', function() {
   
    $form = $("#add_dialog");
    var subject_id = getSubjectId($form);
    var description = getDescription($form);
    var month = getMonth($form);
    var day = getDay($form);
    var year = getYear($form);
    var hour = getHour($form);
    var minute = getMinute($form);
    var completed = getCompletion($form); 

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
      console.log("adding assignment via ajax in month view a SUCCESS");
      placeAssignmentLink(data, constructAssignmentLinkHtml(data));
      });
    return false; // prevents normal behavior for submit button 
  });
}

/************************/
/*** helper functions ***/
/************************/

function constructAssignmentLinkHtml(data) {
  
  var $assignment_link = $('<div/>', {class: 'assignment_link'});

  // give the subject link necessary data
  $assignment_link.data('subject', data['subject'].name);
  $assignment_link.data('description', data['description']);

  if (data['completed']) {
    $assignment_link.addClass('completed'); 
  }
  else {
    $assignment_link.addClass('not_completed');
  }
  
  $assignment_link.data('assignment-id', data['id']);

  var dueTime = data.due_date.split('T')[1];
  var dueHour = dueTime.split(':')[0];
  var dueMinute = dueTime.split(':')[1];

  var dataDueTime = dueHour + ':' + dueMinute;
  
  $assignment_link.data('due-time', dataDueTime);

  // make popup work for this new subject link
  $assignment_link.mouseover(mouseOverAssignmentLink($assignment_link));
  // make dialog work for this new subject link
  $assignment_link.click(clickOnAssignmentLink($assignment_link));

  // put subject name in 
  $assignment_link.text(data['subject'].name);

  return $assignment_link;
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
  var due_date = data['due_date/p'];
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

// update placement of assignment after its been edited
function placeAssignmentLink(data, whatToPlace) {
    $assignmentLink = whatToPlace;    
    $("#add_dialog").dialog('close');

    var new_dd = data.due_date;
    var new_parsed_date = new_dd.split('T')[0].split('-');
    var new_parsed_time = new_dd.split('T')[1].split(':');
    var new_min = Number(new_parsed_time[1]);
    var new_hour = Number(new_parsed_time[0]);
    var new_day = Number(new_parsed_date[2]);
    var new_month = Number(new_parsed_date[1]) -1; //0 is jan
    var new_year = Number(new_parsed_date[0]);
    var new_date = newDate(data); 

    // end of url month needs to be more exact
    var new_date_and_time = new Date(new_year, 0, new_day, new_hour, new_min);
    var new_date_no_month = new Date(new_year, 0, new_day);


    // if date moved to before this calendar
    // the code for this isn't done yet
    if (movedBeforeCal(new_date)) {
      moveBeforeWeek($assignmentLink);
    }

    // if date moved to after week
    else if (movedAfterCal(new_date)) { 
      moveAfterWeek($assignmentLink);
      
    }

    // if time didn't change
    else if (false) {
      // don't do anything because due time/day didn't change
    }

    //if date or time has changed
    else {
      moveAssignmentLink($assignmentLink, data);
    }
}

function movedBeforeCal(otherDate) {
  var $begOfCalendar = $($("td")[0]);
  var begCal = $begOfCalendar.data('date');

  var year = begCal.split('-')[0];
  var month = begCal.split('-')[1];
  var day = begCal.split('-')[2];

  var beginningOfCal = new Date(Number(year), Number(month) - 1, Number(day));

  return otherDate.getTime() < beginningOfCal.getTime();
}

function movedAfterCal(otherDate) {
  var $endOfCalendar = $($("td[data-date]").last());

  var endCal = $endOfCalendar.data('date');
  var year = endCal.split('-')[0];
  var month = endCal.split('-')[1];
  var day = endCal.split('-')[2];

  var endOfCal = new Date(Number(year), Number(month) - 1, Number(day));

  return otherDate.getTime() > endOfCal.getTime();
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
//function movedBeforeWeek(beginning_of_week, date) {
//  return date.getTime() < beginning_of_week.getTime();
//}

// move the assignment to previous week 
//function moveBeforeWeek($assignment) {
//    // slide assignment left then make its container smaller
//    $assignment.animate({left: '-1500px'}, 900, function() {
//      $assignment.slideUp();
//    });
//}

// is the date after the end of the week?
//function movedAfterWeek(beginning_of_week, date) {
  //var end_of_week = new Date(beginning_of_week.getTime() + 6 * 24 * 60 * 60 * 1000);
//
//  return date.getTime() > end_of_week.getTime();
//}

// move the assignment to the next week
//function moveAfterWeek($assignment) {
//    $assignment.animate({left: '2000px'}, 900, function() {
//        $assignment.slideUp();
//    });
//}

// are these two datetimes the same?
//function sameDateTime(datetime1, datetime2) {
//    return datetime1.getTime() === datetime2.getTime();
//}

// move the assignment to new place within week



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




// put assignment in correct order
function putAssignmentLinkInOrderSL($assignmentLink, others, data, day) {
    
    var other_assignment_links_array = Array.prototype.slice.call(others);
    // place assignment in order with other assignments
    if (other_assignment_links_array.length > 0) {
      var beforeSomething = false;
      for (i = 0; i < other_assignment_links_array.length; i++) {
      $other_link =  $(other_assignment_links_array[i]);
        
        // if subject links comes before another, 
        // place it before it
        if (dueBeforeSL(data, $other_link)) {
          $other_link.before($assignmentLink);
          beforeSomething = true;
          break;
        }
      }; //end of for
      if (!beforeSomething) {
        $assignmentLink.appendTo(day);
      }
    }
    else {
      $assignmentLink.appendTo(day);
    }
}

// is the due date in data before the other assignment?
function dueBeforeSL(data, $other_link) {
  // get the new time after assignment edited
  var new_time = dataTime(data);
  
  // get the time comparing assignment to
  var other_time = otherTime($other_link);

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
function otherTime($other_link) {
  
  dueTime = $other_link.data('due-time');
  hour = dueTime.split(':')[0];
  minute = dueTime.split(':')[1];

  // get the hour in terms of 24
  var time = new Date(0, 0, 1, hour, minute);
  
  return time;
}

