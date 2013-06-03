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
    $(".a_popup").each(function() {
        $(this).dialog({
          closeOnEscape: true,
          title: "Assignment",
          draggable: false, 
          resizable: false, 
          modal: false,
          autoOpen: false,
          width: 235,
          minHeight: 0,
        });
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
      
      //get assignment of this subject link
      assignmentId = $(this).data('assignment-id');
      
      //get associated assignment popup/dialog on hover
      var popup = $(".a_popup[data-assignment-id=" + assignmentId + "]");
      //get associated assignment dialog on click
      var dlg = $(".a_dialog[data-assignment-id=" + assignmentId + "]");
     
      // when mouse over a subject link
      mouseOverSubjectLink($(this), popup, dlg);
     
      // when click on a subject link
      clickOnSubjectLink($(this), popup, dlg);


      //maybe this is how you do it
      dlg.data("trgr", $(this));
      console.log("IN ASSIGNMENT_DIALOG.JS. this is the trigger: %o", $(this));

  });
}

//what happens when mouse over a subject link
function mouseOverSubjectLink(subjLink, popup, dlg) {
    
    //when mouseover subject link
    subjLink.mouseover( function() {
        
        //open popup and hide visibility of its titlebar (for style reasons)
        popup.dialog("open");
        popup.parent(".ui-dialog").find(".ui-dialog-titlebar-close").css("visibility", "hidden");
        
        //correctly color background based on assignment completion
        if (popup.hasClass("completed")) {
          popup.parent(".ui-dialog").css("background-color", "#7ECEFD");
        }
        else {
          popup.parent(".ui-dialog").css("background-color", "#FF7F66");
        }

      });

    //if popup open move it with mouse while mouse over subject link
    subjLink.mousemove(function(event) {
        popup.dialog("option", "position", [event.clientX - 150, event.clientY - 170]);
    });
    
    //close the popup when mouse moves out of subject link
    subjLink.mouseout(function() {
        popup.dialog("close");
    });

}

//what happens when a subject link is clicked on
function clickOnSubjectLink(subjLink, popup, dlg) {

    subjLink.on('click', function() {
        
        //make sure pop up closed
        popup.dialog("close");
        
        //open the dialog
        dlg.dialog('open');
        
        //dialog background color based on assignment completeion
        if (dlg.hasClass("completed")) {
          dlg.parent(".ui-dialog").css("background-color", "#7ECEFD");
        }
        else {
          dlg.parent(".ui-dialog").css("background-color", "#FF7F66");
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
