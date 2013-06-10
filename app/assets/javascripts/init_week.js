// javascript only needed in week view

$(function() {

  $("#datepicker").datepicker();

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

  $("#add_assignment_ajax input[type='submit']").on('click', function() {
    
    $.ajax({ 
      type: 'POST',
      url: '/assignments',
      dataType:'JSON',
      data: {
        assignment: {
          subject_id:, 
          description: , 
          due_date: , 
          completed: ,
        }
      }, // need to fill this in
    }).success(function(json) {
      console.log("adding assignment via ajax a SUCCESS");
    });
    return false; // prevents normal behavior?
  
  });
}
