// javascript only needed in week view

$(function() {

  $("#datepicker").datepicker();
  
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

  $("#test_add_dialog").on('click', function() {
    $("#add_dialog_ajax").dialog('open');
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
      $("#add_dialog_ajax").dialog('open');
    });

  });

  submitAddAssignment();

}

// what to do when a user submits adding an assignment 
function submitAddAssignment() {
  
  console.log("in submitAddAssignment");


  $("#add_dialog_ajax .add_dialog_submit").on('click', function() {
    console.log("add assignment button clicked on");
   
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
    }).success(function(json) {
      console.log("adding assignment via ajax a SUCCESS");
      });
    return false; // prevents normal behavior 
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

  var date = $("#datepicker").val(); // ex: 06/11/2013
  var month = date.split('/')[0];

  return month;

}

function getDay($form) {

  var date = $("#datepicker").val(); // ex: 06/11/2013
  var day = date.split('/')[1];

  return day;
}

function getYear($form) {

  var date = $("#datepicker").val(); // ex: 06/11/2013
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
