

function initializeAddForms() {
  $(".add_form").each( function () {
  console.log("initializeAddForms was called");
  
  var form = $(this);

  $(this).find(".fake_submit_button").on('click', function() {
    var subject = form.find("select[name=subject]").val();
    console.log("subject is " + subject);
    var description = form.find("input[name=description]").val(); 
  
    var due_date = form.find("input[name=date]").val();
    console.log("due date is " + due_date);
    var month = due_date.split('/')[0];
    var day = due_date.split('/')[1];
    var year = due_date.split('/')[2];
  
    var hour = form.find("select[name=hour]").val();
    var minute = form.find("select[name=minute]").val();

    console.log("subject " + subject);
    console.log("due_date " + due_date);
    console.log("month " + month);
    console.log("day " + day);
    console.log("year " + year);
    console.log("hour " + hour);
    console.log("minute " + minute);

/*     $.ajax({ */
/*       url: /1*  *1/; */
/*       dataType: json; */
/*       data: { */
/*         asignment: { */
/*           "subject_id" => , */  
/*           "description" => description, */ 
/*           "due_date(1i)" => year, */
/*           "due_date(2i)" => month, */
/*           "due_date(3i)" => day, */
/*           "due_date(4i)" => hour, */
/*           "due_date(5i)" => minute, */
/*           "completed" => "false" */ 
/*         }; */
/*       }; */
/*     }); */
  
  });
  
});
}

/* $(function() { */
/*   $(".add_dialog").each(function() { */
/*     console.log("in the add assignment JS"); */
    
/*     var dialog = $(this); */ 
/*     var trigger = dialog.data("trigger"); */

/*       dialog.find("form").on('ajax:success', function(e, data, status, xhr) { */
/*       console.log("this is e: %o", e); */
/*       console.log("this is data: %o", data); */
/*       console.log("ajax success in added"); */
/*       console.log("assignment successfully added"); */
/*       dialog.dialog('close'); */
      
/*       //WILL NEED TO CREATE NEW HTML STUFF */
/*       //fix stuff below, but data gets sent now */
/*       var dd = data.due_date; */
/*       var new_parsed = dd.split('T')[0].split('-'); */
/*       var new_parsed_time = dd.split('T')[1].split(':'); */

/*       var url = window.location.href */
/*       var url_parsed = url.split('=')[2].split('-'); */

/*       var new_min = Number(new_parsed_time[1]); */
/*       var new_hour = Number(new_parsed_time[0]); */
/*       var new_day = Number(new_parsed[2]); */
/*       var new_month = Number(new_parsed[1]) -1; //0 is jan */
/*       var new_year = Number(new_parsed[0]); */
/*       var new_date = new Date(new_year, new_month, new_day) */
      
/*       var url_day = Number(url_parsed[2]); */
/*       var url_month = Number(url_parsed[1]) -1; */
/*       var url_year = Number(url_parsed[0]); */
/*       var url_date = new Date(url_year, url_month, url_day) */
/*       var url_date_end_week = new Date(url_date.getTime() + 6 * 24 * 60 * 60 * 1000); */


/*       if (url_date.getTime() <= new_date.getTime() && */
/*         new_date.getTime() <= url_date_end_week.getTime()) { */
/*         console.log("got here"); */
/*         //assuming position has to change */
        
/*         var new_day_string = String(new_day); */
/*         var headingArray = $(".day_heading"); */

/*         for (var i = 0; i < headingArray.length; i++) { */
/*           console.log("got hereeee"); */
/*           h = headingArray[i]; */
/*           htext = $(h).text(); */

/*           //if in right day */
/*           if (htext.indexOf(new_day_string + ",") >= 0) { */
/*             console.log("it's innnn " + new_day_string); */
/*             console.log("it's logging here"); */
            
/*             var day = $(h).closest(".assignment_box"); */
/*             //var htmla = render 'assignment' */
/*             //var assignment = $("%o", htmla) */
/*             //var assignment = trigger.closest(".as_box"); */ 





/*             //maybe could always have a blank haml element with display none whose html could be copied? idk */



/*             // ^^ need to make html */
            
/*             trigger.closest(".as_box"); */
/*             console.log("it's logging here 2"); */

/*             assignment.slideDown(600, function () { */
/*             assignment.appendTo(day); */
/*             console.log("it's logging here 3"); */
              
/*             var assignmentsArray = day.find(".as_box"); */
/*             console.log("logging" + "%o", assignmentsArray); */
/*             console.log("it should be logging"); */

/*             outer_loop: */
/*             for (var i = 0; i <assignmentsArray.length; i++) { */
/*               console.log("in the loop"); */
/*               var o_a = $(assignmentsArray[i]); */
/*               var o_due_time = o_a.find(".due_time"); */
/*               var o_due_time_text = o_due_time.text().replace(/\s+/g, ''); */
/*               var o_hour = Number(o_due_time_text.split(':')[0]); */
/*               var o_min = Number(o_due_time_text.split(':')[1]); */
/*               console.log(o_hour); */
/*               console.log(o_min); */
/*               var o_date = new Date(0, 0, 1, o_hour, o_min); */

/*               var new_date_time = new Date(0, 0, 1, new_hour, new_min); */

/*               if (new_date_time.getTime() <= o_date.getTime()) { */
/*                 o_a.before(assignment); */
/*                 break outer_loop; */
/*               } */
/*             } */
/*             assignment.slideDown(); */
/*             }); */            
/*           } */
/*         } */
        
/*         } */
/* }); */
/* }); */
/* }) */


$(function() {
  initializeAddForms();
});
