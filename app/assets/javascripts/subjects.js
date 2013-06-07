// for the subject view

$(function() {
  addButtonsAndDialogsSubjectView();
})




//initialize add assignment dialogs and assign them to buttons
function addButtonsAndDialogsSubjectView() {
    $(".add_btn_subj_view").each(function() {
        //get day of this add button
        subjectId = $(this).data('subject-id');
        //get associated add dialog
        var dlg = $(".add_dialog[data-subject-id=" + subjectId + "]");
        
        $(this).on('click', function() {
          //resize if necessary
          var viewportWidth = $(window).width();
          if (viewportWidth < 470) {
            dlg.dialog( "option", "width", viewportWidth - 30);
            $(dlg.find("#assignment_description")).css("width", viewportWidth - 70);
          }
        //open the add dialog
        dlg.dialog('open');

      });
     
     //save add button in add dialog for later
     dlg.data("trigger", $(this));

  });
}

$(function() {

  $(".incomplete_assignments_button").click( function() {
    console.log("clicked the incomplete assignments button"); 

    $(this).closest(".panel").find(".all_done").hide();
    $(this).closest(".panel").find(".as_box.completed").hide();


    $(this).addClass('active').removeClass('unactive')
    $(this).closest(".panel").find(".all_assignments_button").addClass("unactive").removeClass("active");


  });

});

$(function() {

$(".all_assignments_button").click( function() {
  
  $(this).closest(".panel").find(".all_done").show();
  $(this).closest(".panel").find(".as_box.completed").show();

  $(this).addClass('active').removeClass('unactive')
  $(this).closest(".panel").find(".incomplete_assignments_button").addClass('unactive').removeClass('active');

});
});
