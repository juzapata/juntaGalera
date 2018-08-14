$(document).ready(function(){
    $("#materialRegisterFormButton").click(function(event){
      event.preventDefault();
      var email = $("#materialRegisterFormEmail").val();
      var password = $("#materialRegisterFormPassword").val();
      
     
      firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
        window.location = "tasks.html";
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    });
    // $(".sign-in-button").click(function(event){
    //   event.preventDefault();
    //   var email = $(".sign-in-email").val();
    //   var password = $(".sign-in-password").val();
      
    //   firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
    //     window.location = "testes.html";
    //   }).catch(function(error) {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     alert(errorMessage);
    //   });
      
    });
  


  