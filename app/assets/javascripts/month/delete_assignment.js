$(function () {

  deleteAssignment();

});

// delete an assignment with ajax
function deleteAssignment() {

  // update assignment id data of delete dialog 
  // based on what assignment trying to delete
  $(".delete_btn").on('click', function() {

      var assignmentId = $(this).closest(".a_dialog").data('assignment-id');
      debugger;
      var $deleteButton = $(this);

      var $assignment = $(".a_dialog").data('assignment');

      $(".delete_dialog").data('assignment-id', assignmentId);
      $(".delete_dialog").data('assignment', $assignment);
      
  });

  $(".delete_dialog").find("button").on('click', function() {
      
      var assignmentId = $(".delete_dialog").data('assignment-id');
      var $assignmentLink = $(".delete_dialog").data('assignment');

      debugger; 
      $.ajax({
        type: 'DELETE', 
        url: '/assignments/' + assignmentId,
      }).success(function(data,status, xhr) {
        console.log("deleting assignment via ajax a SUCCESS");

        // close the delete dialog
        $(".delete_dialog").dialog('close');

        // close the assignment dialog
        $(".a_dialog").dialog('close');

        // slide associated subject link up and delete it if as box
        $assignmentLink.animate({opacity: '0'}, 900, function() {
         $assignmentLink.slideUp(600, function() {
          $assignmentLink.remove();
          });
        });
      });
    });
}
