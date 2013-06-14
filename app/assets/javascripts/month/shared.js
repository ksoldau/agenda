// get the due date (not time) from data recieved
function retrieveDate(data) {
  var newDateTime = data.due_date;
  var newDate = newDateTime.split('T')[0];

  return newDate;
}


// move assignment link to the correct day based on data recieved
function moveAssignmentLink($assignmentLink, data) {
  
  // get list of all possible dates in cal
  var dayArray = $("td[data-date]");

  // go through the dates to find right one 
  // and put assignment link in right one
  for (var i = 0; i < dayArray.length; i ++) {
    var newDate = retrieveDate(data);
    var tdDate = $(dayArray[i]).data('date');
    debugger;
    if (inRightDayMonth(newDate, tdDate)) {
      var new_day = $(dayArray[i]).find(".day_cal");
      var others = new_day.find(".assignment_link");
      putAssignmentInDayMonth($assignmentLink, others, new_day, data);
      break;
    }
  }
}

// determines if date from received data and 
// other date are the same
function inRightDayMonth(date1, date2) {
  return date1.trim() == date2.trim();
}

// put assignment in right day of the month
function putAssignmentInDayMonth($assignmentLink, others, day, data) {
    
    // put assignment in right order in the dom 
    putAssignmentLinkInOrderMonth($assignmentLink, others, data, day);
    
    // show the assignment 
    $assignmentLink.hide().animate({opacity: '0'}, 0).slideDown(600).animate({opacity: '1'}, 600);
}


// put assignment in correct order
function putAssignmentLinkInOrderMonth($assignmentLink, others, data, day) {
    
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

/*** Get values from a form ***/

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
  var date = $form.find(".datepicker").val();
  var month = date.split('/')[0];

  return month;
}

function getDay($form) {
  var date = $form.find(".datepicker").val();
  var day = date.split('/')[1];

  return day;
}

function getYear($form) {
  var date = $form.find(".datepicker").val();
  var year = date.split('/')[2];

  return year;
}

function getHour($form) {
  var time = $form.find(".timepicker").val();
  var hour12 = time.split(':')[0];
  var amPm = time.split(' ')[1];

  var hour24 = hour12;

  if (hour12 == 12 && amPm == "am") {
    hour24 = String(Number(hour12) + 12);
  }

  return hour24;
}

function getMinute($form) {
  var time = $form.find(".timepicker").val();
  var minute = time.split(' ')[0].split(':')[1];

  return minute;
}

function getCompletion($form) {
  var checked = $('input[name=completed]:checked', $form).val();

  if (checked == 'yes') {
    return 'true';
  }
  else {
    return 'false';
  }
}
