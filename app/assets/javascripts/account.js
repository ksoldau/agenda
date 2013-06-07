$(function () {
  initCancelAccountDialog();

  associateButtonAndDialog();
});

function initCancelAccountDialog() {
  $("#cancel_account_dialog").dialog( {
    closeOnEscape: true,
    title: "Cancel my account",
    draggable: false,
    resizeable: false,
    autoOpen: false,
    modal: true
  });
}

// associate the cancel account button and the dialog
function associateButtonAndDialog() {
  $("#cancel_account_button").click( function() {
    
    $("#cancel_account_dialog").dialog('open');
  });
}
