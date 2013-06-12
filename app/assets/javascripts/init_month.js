// for the assignment popups/dialogs on the month view
$(function(){
  initPopUps();
  initDialogs();
  subjectLinksPopupsAndDialogs();

  //initialize dialogs for editing/deleting subject
  initEditSubjectDialogs();
  initDeleteSubjectDialogs();
  initAddSubjectDialog();

  //connect buttons and dialogs for subjects
  editSubjectButtonsAndDialogs();
  initAddSubjectButtonsAndDialogs();
  initDeleteSubjectButtonsAndDialogs();

})

function initPopUps() {
    $(".a_popup").dialog({
          closeOnEscape: true,
          title: "Assignment",
          draggable: false, 
          resizable: false, 
          modal: false,
          autoOpen: false,
          width: 235,
          minHeight: 0,
    });
}

function initDialogs() {
    $(".a_dialog").each(function() {
        $(this).dialog({
          closeOnEscape: true,
          title: "Assignment",
          draggable: true,
          resizable: false,
          modal: true,
          autoOpen: false,
          width: '235', 
      });
  });
}

//connect subject links with their assignment 
// popups and dialogs
function subjectLinksPopupsAndDialogs() {
  $(".subj_link").each(function() {
      

      // when mouse over a subject link
      $(this).mouseover(mouseOverSubjectLink($(this)));
      //mouseOverSubjectLink($(this));
     
      // when click on a subject link
      clickOnSubjectLink($(this));


      //maybe this is how you do it
      //dlg.data("trgr", $(this));

  });
}

//what happens when mouse over a subject link
function mouseOverSubjectLink($subjLink) {
    
    var $popUp = $(".a_popup");

    //when mouseover subject link
    $subjLink.mouseover( function() {
        
        var subject = $subjLink.data('subject').trim();
        var description = $subjLink.data('description').trim();
        var dueDateTime = aPopUpDueDateTime($subjLink); 
        
        // change the subject
        $popUp.find(".subject").text(subject);
        // change the description
        $popUp.find(".description").text(description);
        // change the due date
        $popUp.find(".due_time").text(dueDateTime);
        // change the color based on completion
        if ($subjLink.hasClass("completed")) {
          $popUp.addClass("completed").removeClass("not_completed");
        }
        else {
          $popUp.addClass("not_completed").removeClass("completed");
        }

        //open popup and hide visibility of its titlebar (for style reasons)
        $popUp.dialog("open");
        $popUp.parent(".ui-dialog").find(".ui-dialog-titlebar-close").css("visibility", "hidden");
        
        //correctly color background based on assignment completion
        if ($popUp.hasClass("completed")) {
          $popUp.parent(".ui-dialog").css("background-color", "#7ECEFD");
        }
        else {
          $popUp.parent(".ui-dialog").css("background-color", "#FF7F66");
        }

      });

    //if popup open move it with mouse while mouse over subject link
    $subjLink.mousemove(function(event) {
        $popUp.dialog("option", "position", [event.clientX - 150, event.clientY - 170]);
    });
    
    //close the popup when mouse moves out of subject link
    $subjLink.mouseout(function() {
        $popUp.dialog("close");
    });

}
var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

function aPopUpDueDateTime($subjLink) {
  var date = $subjLink.closest("td").data('date');
  var year = date.split('-')[0];
  var month = date.split('-')[1];
  var day = date.split('-')[2];

  var time = $subjLink.data('due-time');
  var hour = Number(time.split(':')[0]);
  var minute = time.split(':')[1];

  var amPm = "am";

  if (hour > 12) {
    hour = hour - 12;
    amPm = "pm"
  }

  var newDate = new Date(Number(year), Number(month) - 1, Number(day));

  return "due on " + monthNames[Number(month)] + " " + day + "," + year + " at " + hour + ":" + minute + " " + amPm;


}

//what happens when a subject link is clicked on
function clickOnSubjectLink($subjLink) {
    
    $subjLink.on('click', function() {
        var subject = $subjLink.data('subject').trim();
        var description = $subjLink.data('description').trim();
        var dueDateTime = aPopUpDueDateTime($subjLink); 

        var $popUp = $(".a_popup");
        var $dialog = $(".a_dialog");
        
        // change the subject
        $dialog.find(".subject").text(subject);
        // change the description
        $dialog.find(".description").text(description);
        // change the due date
        $dialog.find(".due_time").text(dueDateTime);
        // change the color based on completion
        if ($subjLink.hasClass("completed")) {
          $dialog.addClass("completed").removeClass("not_completed");
        }
        else {
          $dialog.addClass("not_completed").removeClass("completed");
        }

        // change data assignment id
        $dialog.data('assignment-id', $subjLink.data('assignment-id'));

        //make sure pop up closed
        $popUp.dialog("close");
        
        //open the dialog
        $dialog.dialog('open');
        
        //dialog background color based on assignment completeion
        if ($dialog.hasClass("completed")) {
          $dialog.parent(".ui-dialog").css("background-color", "#7ECEFD");
        }
        else {
          $dialog.parent(".ui-dialog").css("background-color", "#FF7F66");
        }
    });
}

//initialize edit subject dialogs
function initEditSubjectDialogs() {
  $(".edit_subj_dialog").each(function() {
      $(this).dialog({
          closeOnEscape: true, 
          title: "Update Subject",
          height: 200,
          width: 300,
          draggable: false,
          resizable: false, 
          modal: true, 
          autoOpen: false, 
      });
  });
}

//initialize delete subject dialogs
function initDeleteSubjectDialogs() {
    $(".delete_subj_dialog").each(function() {
        $(this).dialog({
            closeOnEscape: true, 
            title: "Delete Subject", 
            width: 300, 
            draggable: false,
            resizable: false, 
            modal: true, 
            autoOpen: false, 
        });
    });
}

//initialize add subject dialogs
function initAddSubjectDialog() {
    //there's only one add subject button
    $(".add_subj_dialog").dialog({
        closeOnEscape: true,
        title: "Add Subject", 
        draggable: true, 
        resizable: false, 
        modal: true, 
        autoOpen: false,
    });
}
//initialize edit subject dialogs and assign them to buttons
function editSubjectButtonsAndDialogs() {
  $(".edit_subj_btn").each(
    function() {
      //get subject of this edit subject button
      subjectId = $(this).data('subject-id');
      //get associated edit subject dialog
      var dlg = $(".edit_subj_dialog[data-subject-id=" + subjectId + "]");
      
      $(this).on('click', function() {
        dlg.dialog('open');
      });

      var viewportWidth = $(window).width();
      if (viewportWidth < 323) {
        dlg.dialog( "option", "width", viewportWidth * .9);
        dlg.find("#subject_name").attr("size", "25");
      }
    });
}

//initialize delete subject dialogs and assign them to buttons
function initDeleteSubjectButtonsAndDialogs() {
  $(".delete_subj_btn").each(
    function() {
      //get subject of this delete subject button
      subjectId = $(this).data('subject-id');
      //get associated edit subject dialog
      var dlg = $(".delete_subj_dialog[data-subject-id=" + subjectId + "]");

      $(this).on('click', function() {
        dlg.dialog('open');
      });
      
      var viewportWidth = $(window).width();
      if (viewportWidth < 323) {
        dlg.dialog( "option", "width", viewportWidth * .9);
      }

    });
}

//initialize add subject dialogs and assign them to buttons
function initAddSubjectButtonsAndDialogs() {
  $(".add_subj_btn").each(function() {
      var dlg = $(".add_subj_dialog");

      $(this).on('click', function() {
        dlg.dialog('open');
      });
  });
}
