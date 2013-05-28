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

        $("#" + idd).attr("aria-expanded", "true").attr("aria-hidden", "false");
        $("#" + idd).attr("style", "display:block");

      });
    });
});
