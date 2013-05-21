function initializeEditButtonAndDialogs() {
  $(".edit_btn").each(
    function() {
      var dlg = $(this).find(".edit_dialog").dialog({
      closeOnEscape: true, 
      title: "Update Assignment",
      width: 470,
      height: 300, 
      draggable: false, 
      resizable: false, 
      modal: true, 
      autoOpen: false,
      //show: 'fade',
      //hide: 'fade',
      });

      $(this).on('click', function() {
        dlg.dialog('open');
      });


      dlg.data("trigger", $(this));
  });
 }

function initializeDeleteDialogs() {
  $(".delete_btn").each(
    function() {
      var dlg = $(this).find(".delete_dialog").dialog({
      closeOnEscape: true,
      title: "Delete Assignment", 
      width: 300, 
      height: 200, 
      draggable: false,
      resizable: false,
      modal: true, 
      autoOpen: false,
      });

      $(this).on('click', function() {
        dlg.dialog('open');
      });
      
      dlg.data("trigger", $(this));

     });
}

function initializeAddDialogs() {
  $(".add_btn").each(
    function() {
      var dlg = $(this).find(".add_dialog").dialog({
      closeOnEscape: true,
      title: "Add Assignment", 
      width: 450, 
      height: 300, 
      draggable: false, 
      resizable: false, 
      modal: true, 
      autoOpen: false,
      });

      $(this).on('click', function() {
        dlg.dialog('open');
      });

      $(this).hover(
        function() {}, 
        function() {}
      );

      dlg.data("trigger", $(this));


  });
}
    
  
function initializeAddSubjectDialog() {
  $(".add_subj_btn").each(
    function() {
      var dialog = $(this).find(".add_subj_dialog").dialog({
      closeOnEscape: true,
      title: "Add Subject", 
      /* width: 400, */ 
      height: 200, 
      draggable: false, 
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

function initializeDeleteSubjectDialog() {
  $(".delete_subj_btn").each(
    function() {
      var dialog = $(this).find(".delete_subj_dialog").dialog({
      closeOnEscape: true, 
      title: "Delete Subject", 
      width: 300, 
      height: 200, 
      draggable: false,
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

/* function initializeSignInDialog() { */
/*   var dialog = $(".sign_in_btn").find(".sign_in_dialog").dialog({ */
/*     closeOnEscape: true, */ 
/*     title: "Sign In", */ 
/*     width: 400, */ 
/*     height: 300, */ 
/*     draggable: false, */ 
/*     resizable: false, */ 
/*     modal: true, */ 
/*     autoOpen: false */
/*     }); */

/*     $(".sign_in_btn").on('click', function() { */
/*       dialog.dialog('open'); */
/*     }); */

/*     $(this).hover( */ 
/*       function() {}, */
/*       function() {} */
/*     ); */
/* } */


  
$(document).ready(function(){

 initializeEditButtonAndDialogs();
 initializeDeleteDialogs();
 initializeAddDialogs();
 initializeAddSubjectDialog();
 initializeDeleteSubjectDialog();
 /* initializeSignInDialog(); */

})

