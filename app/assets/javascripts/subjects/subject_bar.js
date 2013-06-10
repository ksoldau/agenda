// drop down function
$(function() {
  var dropDownOption = ".dk_container .dk_options li a"
  
  $(dropDownOption).each(
    function() {

      $(this).on('click', function() {
        var idd = $(this).data("dk-dropdown-value")
        var subjectId = idd.split('-')[1];
        
        // close all tab areas when pick a different one
        $(".dk_container .dk_options li a").each(
          function() {
          var iddd = $(this).data("dk-dropdown-value");

          $("#" + iddd).attr("aria-expanded", "false").attr("aria-hidden", "true");
          $("#" + iddd).attr("style", "display:none");
        });
        
        // expand correct tab area
        $("#" + idd).attr("aria-expanded", "true").attr("aria-hidden", "false");
        $("#" + idd).attr("style", "display:block");

        
        showDeleteButton(subjectId);
        showEditButton(subjectId);
       
      });
    });
});

function showDeleteButton(subjectId) {
  // hide all delete subject buttons when pick an option
  $(".delete_subj_btn").each( function() {
    $(this).hide();
  });

  // show the right delete button
  $(".delete_subj_btn[data-subject-id='" + subjectId + "']").show();
}

function showEditButton(subjectId) {

 // hide all the edit subjects options when pick an option
  $(".edit_subj_btn").each(function() {
    $(this).hide();
  });

  // show the correct edit button
  $(".edit_subj_btn[data-subject-id='" + subjectId + "']").show();

}
