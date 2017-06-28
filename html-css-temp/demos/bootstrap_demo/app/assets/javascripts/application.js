// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .
//= require bootstrap


$(document).ready(function(){
  //trigger tooltip functionality
  $(".has-tooltip").tooltip();
  
  //front end JS without a framework is a nightmare...

  $("#contact-form-button").on("click", function(e){
    //assume the form is valid until empty input found
    var validForm = true;
    var invalidInputs = [];
    //check each input and add validation classes
    $(".form-group").each(function(i, group){
      var $group = $(group);
      var $input = $group.find("input");
      if($input.length === 0){
        $input = $group.find("textarea");
      }
      //remove any old validation classes
      $group.removeClass("has-error has-success");
      if($input.val().length === 0){
        validForm = false;
        $group.addClass("has-error");
        var label = $("label[for="+$input.attr('id')+"]").text();
        invalidInputs.push(label);
      } else {
        $group.addClass("has-success");
      }
    });
    //remove any old alerts
    $(".alert").remove();
    //add alert
    var myAlert = $("<div>").addClass("alert alert-dismissable")
    if(validForm){
      myAlert.addClass("alert-success").text("Contact form submitted!  :)");
      $("#bootstrap-demo-modal").modal();
    } else {
      var alertText = "Form not submitted!  Please fill out the following inputs:";
      invalidInputs.forEach(function(inputLabel){
        //would add commas but I can't be bothered
        alertText += (inputLabel + " ");
      })
      myAlert.addClass("alert-warning").text(alertText);
    }
    $("#contact-form-wrapper").append(myAlert);
  });
});
