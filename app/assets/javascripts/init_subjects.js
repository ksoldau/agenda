// initialize elements for subject view
$(function () {
  initButtons();
  initDialogs();

  initEditSubjectDialogs();
  initDeleteSubjectDialogs();
  initAddSubjectDialog();

  editSubjectButtonsAndDialogs();
  initAddSubjectButtonsAndDialogs();
  initDeleteSubjectButtonsAndDialogs();

  // initialize dropkick js
  $(".subject_dropkick").dropkick({startSpeed: 0});

  // initialize tabs
  $("#tabs").tabs().addClass("ui-tabs-vertical ui-helper-clearfix");
  $("tabs li").removeClass("ui-corner-top").addClass("ui-corner-left");

  // initialize hover effects
  $(".as_box").hover(
    function() {
      $(this).find(".delete_btn").css("visibility", "visibile");
      $(this).find(".edit_btn").css("visibility", "visibile");
    },
    function() {
      $(this).find(".delete_btn").css("visibility", "hidden");
      $(this).find(".edit_btn").css("visibility", "hidden");
    });
  $("#tabs").hover(
    function() {
      $(this).find(".edit_subj_btn").css("visibility", "visible");
      $(this).find(".delete_subj_btn").css("visibility", "visible");
      $(this).find(".add_btn_subj_view").css("visibility", "visible");
    },
    function() {
      $(this).find(".edit_subj_btn").css("visibility", "hidden");
      $(this).find(".delete_subj_btn").css("visibility", "hidden");
      $(this).find(".add_btn_subj_view").css("visibility", "hidden");
    });

})

/*********************************/

function initButtons() {
  $(".delete_subj_btn").button().click(function(e) {});
  $(".edit_subj_btn").button().click(function(e) {});
  $(".add_subj_btn").button().click(function(e) {});
  $(".add_subj_btn2").button().click(function(e) {});
}

function initDialogs() {
  $(".delete_subj_dialog").dialog({ autoOpen: false});
  $(".add_subj_dialog").dialog({autoOpen: false});
  $(".edit_subj_dialog").dialog({autoOpen: false});
}

// initialize edit subject dialogs
function initEditSubjectDialogs() {
  $(".edit_subj_dialog").each(function() {
    $(this).dialog({
      closeOnEscape: true,
      title: "Rename Subject",
      height: 200,
      width: 300,
      draggable: false,
      resizable: false,
      modal: true,
      autoOpen: false,
    });
  });
}

// initialize delete subject dialogs
function initDeleteSubjectDialogs() {
  $(".delete_subj_dialog").each(function() {
    $(this).dialog({
      closeOnEscape: true,
      title: "Delete Subject",
      width: 300,
      draggable: false,
      resizable: false,
      modal: true,
      autoOpen: false
    });
  });
}

// initialize add subject dialog
function initAddSubjectDialog() {
  // there's only one add subject button
  $(".add_subj_dialog").dialog({
    closeOnEscape: true,
    title: "Add Subject",
    draggable: true,
    resizable: false,
    modal: true,
    autoOpen: false
  });
}

//assign edit subject dialogs to buttons
function editSubjectButtonsAndDialogs() {
  $(".edit_subj_btn").each(
    function() {
      // get subject id of this edit subject button
      subjectId = $(this).data('subject-id');
      //get associated edit subject dialog
      var dlg = $(".edit_subj_dialog[data-subject-id=" + subjectId + "]");

      $(this).on('click', function() {
        dlg.dialog('open');
      });

      // change size of dialog if viewport too small
      var viewportWidth = $(window).width();
      if (viewportWidth < 323) {
        dlg.dialog("option", "width", viewportWidth * .9);
        dlg.fing("#subject_name").attr("size", "25");
      }
  });
}

// assign delete subject dialogs to buttons
function initDeleteSubjectButtonsAndDialogs() {
  $(".delete_subj_btn").each(
    function() {
      // get subject id of this delete subject button
      subjectId = $(this).data('subject-id');
      // get associated edit subject dialog
      var dlg = $(".delete_subj_dialog[data-subject-id=" + subjectId + "]");

      $(this).on('click', function() {
        dlg.dialog('open');
      });

      // change size of dialog if viewport too small
      var viewportWidth = $(window).width();
      if (viewportWidth < 323) {
        dlg.dialog("option", "width", viewportWidth * .9);
      }
    }
  );
}

// assign add subject dialog to button
function initAddSubjectButtonsAndDialogs() {
  $(".add_subj_btn").each(function() {
    var dlg = $(".add_subj_dialog");

    $(this).on('click', function() {
      dlg.dialog('open');
    });
  });
  
}
