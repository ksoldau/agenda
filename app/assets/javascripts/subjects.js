// drop down function
$(function() {
  $(".dk_container .dk_options li a").each(
    function() {

      $(this).on('click', function() {
        var idd = $(this).data("dk-dropdown-value")
        
        // close all tab areas when pick a different one
        $(".dk_container .dk_options li a").each(
          function() {
          var iddd = $(this).data("dk-dropdown-value");

          $("#" + iddd).attr("aria-expanded", "false").attr("aria-hidden", "true");
          $("#" + iddd).attr("style", "display:none");
        });
        
        // expand correct tab area
        $("#" + idd).attr("aria-expanded", "true").attr("aria-hidden", "false");
        $("#" + idd).attr("style", "display:block");

        // change which tab would be open if viewport bigger
        var dropDownSubjectName = $(this).text().trim();
        console.log("this is dropDownSubjectName: " + dropDownSubjectName);
        
        $("li[role=tab]").each( function() {
          var tabSubjectName = $(this).text().trim();
          console.log("this is tabSubjectName: " + tabSubjectName);
          
          if (tabSubjectName.indexOf(dropDownSubjectName) >= 0) {
            $(this).addClass("ui-state-active ui-tabs-active");
          }
          else {
            $(this).removeClass("ui-state-active ui-tabs-active");
          }
        });

      });
      
    });
});


// switching drop down to right thing based on tab click in case screen size changes
$(function() {
  $("li[role=tab]").each ( function() {
    $(this).on('click', function() {
      var subjectName = $(this).find("a").text().trim();
      console.log(subjectName);
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
