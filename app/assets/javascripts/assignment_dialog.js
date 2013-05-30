// for the assignment popups/dialogs on the month view
$(function(){
  //initialize the popup that shows up on hover
  initPopUps();
  initDialogs();
  subjectLinksPopupsAndDialogs();
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
