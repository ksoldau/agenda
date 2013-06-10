//initialize dialogs and make buttons open correct dialogs
$(function() {
  //initialize dialogs for assignments
  initEditDialogs();
  initDeleteDialogs();
  //initAddDialogs();


  //connect buttons and dialogs for assignments
  editButtonsAndDialogs();
  deleteButtonsAndDialogs();
  //addButtonsAndDialogs();

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
    $(".delete_dialog").dialog({
          closeOnEscape: true,
          title: "Delete Assignment", 
          width: 300, 
          height: 200, 
          draggable: false,
          resizable: false,
          modal: true, 
          autoOpen: false,
        });
}

//initialize add assignment dialogs
function initAddDialogs() {
    $(".add_dialog").each(function() {
        $(this).dialog({
          closeOnEscape: true,
          title: "Add Assignment", 
          width: 'auto',
          draggable: true, 
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

      var dlg = $(".delete_dialog"); 
      
      //open delete dialog when click on delete button
      $(this).on('click', function() {
        dlg.dialog('open');
      });
     
      //save delete button data in dialog to use later
      dlg.data("trigger", $(this));
     
      //find parent .a_dialog
      var par = $(this).closest(".a_dialog");
      dlg.data("trigger_subj", $(par).data("trgr"));

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



$(function () {
  
 $(".delete_dialog").find("button").on('click', function () {
     
     var $delete_btn = $($(".delete_dialog").data('trigger'));
     var assignment_id = $delete_btn.data('assignment-id');
    
      $.ajax({
        type: 'DELETE', 
        url: '/assignments/' + assignment_id,
      }).success(function(data, status, xhr) {
        console.log("deleteing assignment via ajax a SUCCESS");
        
        // close the delete dialog
        $(".delete_dialog").dialog('close');

        //slide associated assignment up, hiding it */
        $delete_btn.closest(".as_box").animate({opacity: '0'}, 900, function() {
          $delete_btn.closest(".as_box").slideUp();
          $delete_btn.closest(".as_box").remove();
        }); 

      });

      return false; // prevents normal behavior of submit button
    
 });

});
