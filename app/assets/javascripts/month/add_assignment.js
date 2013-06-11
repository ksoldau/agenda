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
            $("#add_dialog_ajax .datepicker").val(defaultText);
            $("#add_dialog_ajax .timepicker").val(defaultTime);

            $("#add_dialog_ajax").dialog('open');
          });
      }
    )
}


// what to do when a user submits adding an assignment 
function submitAddAssignment() {
  
  $("#add_dialog_ajax .add_dialog_submit").on('click', function() {
   
    $form = $("#add_dialog_ajax");
    var subject_id = getSubjectId($form);
    var description = getDescription($form);
    var month = getMonth($form);
    var day = getDay($form);
    var year = getYear($form);
    var hour = getHour($form);
    var minute = getMinute($form);
    var completed = getCompleted($form); 

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
      placeSubjectLink(data);
      });
    return false; // prevents normal behavior for submit button 
  });
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
  var date = $(".datepicker").val(); // ex: 06/11/2013
  var month = date.split('/')[0];

  return month;

}

function getDay($form) {

  var date = $(".datepicker").val(); // ex: 06/11/2013
  var day = date.split('/')[1];

  return day;
}

function getYear($form) {

  var date = $(".datepicker").val(); // ex: 06/11/2013
  var year = date.split('/')[2];

  return year;
}

function getHour($form) {
  
  var time = $(".timepicker").val();
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

  var time = $(".timepicker").val();
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

function constructSubjectLinkHtml(data) {
  
  var $subj_link = $('<div/>', {class: 'subj_link'});

  if (data['completed']) {
    $subj_link.addClass('completed'); 
  }
  else {
    $subj_link.addClass('not_completed');
  }
  
  $subj_link.data('assignment-id', data['id']);

  var dueTime = data.due_date.split('T')[1];
  var dueHour = dueTime.split(':')[0];
  var dueMinute = dueTime.split(':')[1];

  var dataDueTime = dueHour + ':' + dueMinute;
  
  $subj_link.data('due-time', dataDueTime);

  $subj_link.text(data['subject'].name);

  return $subj_link;
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

// update placement of assignment after its been edited
function placeSubjectLink(data) {

    $subjectLink = constructSubjectLinkHtml(data);
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

    var url = window.location.href;
    var url_parsed = url.split('=')[2].split('-');
    var url_day = Number(url_parsed[2]);
    var url_month = Number(url_parsed[1]) -1;
    var url_year = Number(url_parsed[0]);
    var url_date = new Date(url_year, url_month, url_day);

    // end of url month needs to be more exact
    var url_date_end_month = new Date(url_date.getTime() + 29 * 24 * 60 * 60 * 1000);

    var new_date_and_time = new Date(new_year, 0, new_day, new_hour, new_min);

    var new_date_no_month = new Date(new_year, 0, new_day);


    // if date moved to before week
    //if (movedBeforeWeek(url_date, new_date)) {
    //  moveBeforeWeek($subjectLink);
    //}

    // if date moved to after week
    //else if (movedAfterWeek(url_date, new_date)) {
    //  moveAfterWeek($subjectLink);
    //}

    //if date or time has changed
    //else {
      move($subjectLink, data);
    //}
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

function move($subjectLink, data) {
    var new_dd = data.due_date;
    var new_parsed_date = new_dd.split('T')[0].split('-');
    var new_parsed_time = new_dd.split('T')[1].split(':');
    var new_min = Number(new_parsed_time[1]);
    var new_hour = Number(new_parsed_time[0]);
    var new_day = Number(new_parsed_date[2]);
    var new_date = newDate(data);

    //close old assignment then move it and open it again
    moveAssignmentAndSlideDown($subjectLink, data);
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
function moveAssignmentAndSlideDown($subjectLink, data) {

      // list of day headings (dates) on the page
      var calDayArray = $(".cal_day");
      
      // iterate through dates on the page
      for (var i = 0; i < calDayArray.length; i++) {
        
        // date in string form of day heading
        h = calDayArray[i];
        // text from the day heading dom element
        htext = $(h).text();

        var dayDate = $(calDayArray[i]).closest("td").data('date');

        // if assignment now in this day
        if (inRightDay(data, dayDate)) {
            var new_day = $(h).closest("td").find(".day_cal");
            var others = new_day.find(".subj_link");
            putAssignmentInDay($subjectLink, others, new_day, data); 
            break;
        } // end of if
      
      } 
}

// determines if day in header on page is same as the 
// due day of assignment after its edited
function inRightDay(data, otherDate) {
  var new_dd = data.due_date;
  var new_parsed_date = new_dd.split('T')[0];

  return subString(new_parsed_date, otherDate);
}

// determines if a string is a substring of another
function subString(sub, full) {
  return full.indexOf(sub) >= 0;
}

// put assignment in the day
function putAssignmentInDay($subjectLink, others, day, data) {

    // add to day in case no other assignments exist 
    // to compare it to
    //$subjectLink.appendTo(day);
    
    // put subject link in right place in dom
    putSubjectLinkInOrder($subjectLink, others, data, day);
    
    // show the edited assignment
    $subjectLink.hide().animate({opacity: '0'}, 0).slideDown(600).animate({opacity: '1'}, 600);
}

// put assignment in correct order
function putSubjectLinkInOrder($subjectLink, others, data, day) {
    
    var other_subj_links_array = Array.prototype.slice.call(others);
    debugger; 
    // place assignment in order with other assignments
    if (other_subj_links_array.length > 0) {
      var beforeSomething = false;
      for (i = 0; i < other_subj_links_array.length; i++) {
      $other_link =  $(other_subj_links_array[i]);
        
        // if subject links comes before another, 
        // place it before it
        if (dueBefore(data, $other_link)) {
          $other_link.before($subjectLink);
          beforeSomething = true;
          break;
        }
      }; //end of for
      if (!beforeSomething) {
        $subjectLink.appendTo(day);
      }
    }
    else {
      $subjectLink.appendTo(day);
    }
}

// is the due date in data before the other assignment?
function dueBefore(data, $other_link) {
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
  debugger;
  hour = dueTime.split(':')[0];
  minute = dueTime.split(':')[1];

  // get the hour in terms of 24
  var time = new Date(0, 0, 1, hour, minute);
  
  return time;
}

