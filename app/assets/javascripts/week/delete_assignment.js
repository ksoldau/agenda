$(function () {

  deleteAssignment();

});

// delete an assignment with ajax
function deleteAssignment() {
  console.log("called");
  $(".delete_btn").on('click', function() {
    updateDeleteDialogData($(this)); 
  });

  $(".delete_dialog").find("button").on('click', function() {
      
      var assignmentId = $(".delete_dialog").data('assignment-id');
      var $assignment = $(".delete_dialog").data('assignment');
      
      $.ajax({
        type: 'DELETE', 
        url: '/assignments/' + assignmentId,
      }).success(function(data,status, xhr) {
        console.log("deleting assignment via ajax a SUCCESS");

        //close the delete dialog
        $(".delete_dialog").dialog('close');

        // slide associated assignment up and delete it if as box
        $assignment.animate({opacity: '0'}, 900, function() {
         $assignment.slideUp(600, function() {
          $assignment.remove();
          });
        });
      });
    });


}

function updateDeleteDialogData($delete_btn) {
  var assignmentId = $delete_btn.closest(".as_box").data('assignment-id');
  
  var $assignment = $delete_btn.closest(".as_box");

  $(".delete_dialog").data('assignment-id', assignmentId);
  $(".delete_dialog").data('assignment', $assignment);
}
