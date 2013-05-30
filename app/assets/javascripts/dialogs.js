function initializeEditButtonAndDialogs() {
  $(".edit_btn").each(
    function() {
      var dlg = $(this).find(".edit_dialog").dialog({
      closeOnEscape: true, 
      title: "Update Assignment",
      width: 470,
      draggable: false, 
      resizable: false, 
      modal: true, 
      autoOpen: false,
      //show: 'fade',
      //hide: 'fade',
      });

      var viewportWidth = $(window).width();
      if (viewportWidth < 470) {
        dlg.dialog( "option", "width", viewportWidth - 30);
        $(dlg.find("#assignment_description")).css("width", viewportWidth - 70);
      }

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
      
      /* var viewportWidth = $(window).width(); */
      /* if (viewportWidth < 470) { */
      /*   dlg.dialog( "option", "width", viewportWidth - 4); */
      /* } */

      $(this).on('click', function() {
        dlg.dialog('open');
      });
      
      dlg.data("trigger", $(this));
     
      //find parent .a_dialog
      var par = $(this).closest(".a_dialog");
      console.log("Par is %o", par);
      console.log("Par trgr value is: %o", $(par).data("trgr"));
      dlg.data("trigger_subj", $(par).data("trgr"));
      console.log("IN DIALOGS JS. THIS IS THE TRIGGER ABOVE %o", $(this).data("trigger"));

     });
}

function initializeAddDialogs() {
  $(".add_btn").each(
    function() {
      var dlg = $(this).find(".add_dialog").dialog({
      closeOnEscape: true,
      title: "Add Assignment", 
      width: 'auto',
      draggable: false, 
      resizable: false, 
      modal: true, 
      autoOpen: false,
      });

      var viewportWidth = $(window).width();
      if (viewportWidth < 470) {
        dlg.dialog( "option", "width", viewportWidth - 30);
        $(dlg.find("#assignment_description")).css("width", viewportWidth - 70);
      }

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

function initializeDeleteSubjectDialog() {
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


function initializeEditSubjectDialog() {
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
  
$(document).ready(function(){

 initializeEditButtonAndDialogs();
 initializeDeleteDialogs();
 initializeAddDialogs();
 initializeAddSubjectDialog();
 initializeDeleteSubjectDialog();
 initializeEditSubjectDialog();
 /* initializeSignInDialog(); */

})

