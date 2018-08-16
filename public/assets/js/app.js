
$(document).ready(function(){
    $("#materialRegisterFormButton").click(function(event){
      event.preventDefault();
      var email = $("#materialRegisterFormEmail").val();
      var password = $("#materialRegisterFormPassword").val();


      firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
        window.location = "timeline.html";
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    });
    $("#materialLogInFormButton").click(function(event){
      event.preventDefault();
      var email = $("#materialLogInFormEmail").val();
      var password = $("#materialLogInFormPassword").val();

      firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
        window.location = "timeline.html";
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });

    });
<<<<<<< HEAD:public/js/app.js
   
 
 
 
 
 
 
 
 
 
=======
    var database = firebase.database();









>>>>>>> be674be77adcc30285f229aeea8f2d2afad5db03:public/assets/js/app.js
  });
