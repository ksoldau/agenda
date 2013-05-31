// drop down function
$(function() {
  console.log("AT LEAST GOT HERE");
  $(".dk_container .dk_options li a").each(
    function() {
      console.log("IN THE FIRST ONE");
      $(this).on('click', function() {
        clickOnDropDown($(this));

      });
      
    });
});


// switching drop down to right thing based on tab click in case screen size changes
$(function() {
  $("li[role=tab]").each ( function() {
  console.log("got here");
    $(this).on('click', function() {
      var subjectName = $(this).find("a").text().trim();
      console.log("subjectName is " + subjectName);
      $(".dk_container .dk_toggle .dk_label").text(subjectName);

      // remove all current states from 
      $(".dk_options .dk_options_inner li").each( function() {
        $(this).removeClass("dk_option_current");
      });
      
      // add current state to correct drop down option
      $(".dk_options .dk_options_inner li").each ( function () {
        var a = $(this).find("a").text().trim();
        console.log(a);
        if (a.indexOf(subjectName) >= 0) {
          $(this).addClass("dk_option_current");
        }
      });
    });
  });
});

// what happens when click on drop down
function clickOnDropDown(drop_down_option) {
    console.log("clickOnDropDown");
    // get the id of the subject/drop down option
    var idd = drop_down_option.data("dk-dropdown-value")
    
    // close all tab areas when pick a different subject
    closeAllTabs();
    
    // expand correct tab area
    expandCorrectTab($("#" + idd)); 

    // change which tab would be active if viewport larger
    makeCorrectTabActive(drop_down_option);

}

// close all tabs 
function closeAllTabs() {
  $(".dk_container .dk_options li a").each(
    function() {
      var iddd = $(this).data("dk-dropdown-value");

      $("#" + iddd).attr("aria-expanded", "false").attr("aria-hidden", "true");
      $("#" + iddd).attr("style", "display:none");
  });
}

// expand correct tab after subject chosen in drop down
function expandCorrectTab($tabid) {

  $tabid.attr("aria-expanded", "true").attr("aria-hidden", "false");
  $tabid.attr("style", "display:block");
}

// make correct tab active when choose from drop down subjects
function makeCorrectTabActive(drop_down_option) {
  var dropDownSubjectName = drop_down_option.text().trim();
 
  $("li[role=tab]").each( function() {
    var tabSubjectName = drop_down_option.text().trim();
    console.log("this is tabSubjectName: " + tabSubjectName);
    
    if (tabSubjectName.indexOf(dropDownSubjectName) >= 0) {
      $(this).addClass("ui-state-active ui-tabs-active");
    }
    else {
      $(this).removeClass("ui-state-active ui-tabs-active");
    }
  });
}
