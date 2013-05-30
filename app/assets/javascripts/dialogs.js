
//initialize dialogs and make buttons open correct dialogs
$(function() {
  //initialize dialogs
  initEditDialogs();
  initDeleteDialogs();
  initAddDialogs();

  //connect buttons and dialogs for assignments
  editButtonsAndDialogs();
  deleteButtonsAndDialogs();
  addButtonsAndDialogs();

  //connect buttons and dialogs for subjects
  initAddSubjectButtonsAndDialogs();
  initDeleteSubjectButtonsAndDialogs();
  initEditSubjectButtonsAndDialogs();
});

/*** Initialize dialogs ***/

//initialize edit assignment dialogs
function initEditDialogs() {
    $(".edit_dialog").each( function() {
      $(this).dialog({
          closeOnEscape: true,
          title: "Update Assignment",
          width: 470,
          draggable: false,
          resizeable: false,
          modal: true,
          autoOpen: false
      });
    });
}

//initialize delete assignment dialogs
function initDeleteDialogs() {
    $(".delete_dialog").each( function() {
      $(this).dialog({
          closeOnEscape: true,
          title: "Delete Assignment", 
          width: 300, 
          height: 200, 
          draggable: false,
          resizable: false,
          modal: true, 
          autoOpen: false,
        });
    });
}

//initialize add assignment dialogs
function initAddDialogs() {
    $(".add_dialog").each(function() {
        $(this).dialog({
          closeOnEscape: true,
          title: "Add Assignment", 
          width: 'auto',
          draggable: false, 
          resizable: false, 
          modal: true, 
          autoOpen: false,
      });
    });
}

/*** Connect buttons and dialogs ***/

//initialize edit assignment dialogs and assign them to buttons
function editButtonsAndDialogs() {
  $(".edit_btn").each(
    function() {
      //get assignment id of this edit button
      assignmentId = $(this).data('assignment-id');  
      //get associated edit dialog
      var dlg = $(".edit_dialog[data-assignment-id=" + assignmentId + "]");
      
      //open edit dialog when edit button clicked
      $(this).on('click', function() {
        dlg.dialog('open');
      });

      //change size of dialog based on viewport
      var viewportWidth = $(window).width();
      if (viewportWidth < 470) {
        dlg.dialog( "option", "width", viewportWidth - 30);
        $(dlg.find("#assignment_description")).css("width", viewportWidth - 70);
      }
      
      //save data to use later when submit edit form
      dlg.data("trigger", $(this));
  });
}

//initialize delete assignment dialogs and assign them to buttons
function deleteButtonsAndDialogs() {
  $(".delete_btn").each( function() {

      //get assignment id of this delete button
      assignmentId = $(this).data('assignment-id');
      //get associated delete dialog
      var dlg = $(".delete_dialog[data-assignment-id=" + assignmentId + "]");     
      
      //open delete dialog when click on delete button
      $(this).on('click', function() {
        dlg.dialog('open');
      });
     
      //save delete button data in dialog to use later
      dlg.data("trigger", $(this));
     
      //find parent .a_dialog
      var par = $(this).closest(".a_dialog");
      console.log("Par is %o", par);
      console.log("Par trgr value is: %o", $(par).data("trgr"));
      dlg.data("trigger_subj", $(par).data("trgr"));
      console.log("IN DIALOGS JS. THIS IS THE TRIGGER ABOVE %o", $(this).data("trigger"));

     });
}

//initialize add assignment dialogs and assign them to buttons
function addButtonsAndDialogs() {
    $(".add_btn").each(function() {
        //get day of this add button
        dayn = $(this).data('day');
        //get associated add dialog
        var dlg = $(".add_dialog[data-day=" + dayn + "]");
        
        $(this).on('click', function() {
          //resize if necessary
          var viewportWidth = $(window).width();
          if (viewportWidth < 470) {
            console.log("THIS WAS CALLED");
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

//initialize add subject dialogs and assign them to buttons
function initAddSubjectButtonsAndDialogs() {
  $(".add_subj_btn").each(
    function() {
      var dialog = $(this).find(".add_subj_dialog").dialog({
      closeOnEscape: true,
      title: "Add Subject", 
      draggable: true, 
      resizable: false, 
      modal: true, 
      autoOpen: false,
      });

      $(this).on('click', function() {
        dialog.dialog('open');
      });

      $(this).hover(
        function() {}, 
        function() {}
      );

  });
}

//initialize delete subject dialogs and assign them to buttons
function initDeleteSubjectButtonsAndDialogs() {
  $(".delete_subj_btn").each(
    function() {
      var dlg = $(this).find(".delete_subj_dialog").dialog({
      closeOnEscape: true, 
      title: "Delete Subject", 
      width: 300, 

      draggable: false,
      resizable: false, 
      modal: true, 
      autoOpen: false, 
      }); 

      $(this).on('click', function() {
        dlg.dialog('open');
      });
      
      var viewportWidth = $(window).width();
      if (viewportWidth < 323) {
        dlg.dialog( "option", "width", viewportWidth * .9);
      }


    });
}

//initialize edit subject dialogs and assign them to buttons
function initEditSubjectButtonsAndDialogs() {
  $(".edit_subj_btn").each(
    function() {
      var dlg = $(this).find(".edit_subj_dialog").dialog({
      closeOnEscape: true, 
      title: "Update Subject",
      height: 200,
      width: 300,
      draggable: false,
      resizable: false, 
      modal: true, 
      autoOpen: false, 
      }); 

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
