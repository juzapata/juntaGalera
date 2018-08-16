var database = firebase.database();
$(document).ready(function(){
  // codigo do cadastro  
  $("#materialRegisterFormButton").click(function(event){
      event.preventDefault();
      var email = $("#materialRegisterFormEmail").val();
      var password = $("#materialRegisterFormPassword").val();
      var name = $("#materialRegisterFormName").val();
      firebase.auth().createUserWithEmailAndPassword(email, password).then(function (response){
        var userId = response.uid;
        database.ref("users/" + userId).set({
          name: name, email: email
        });
        window.location = "timeline.html?userId=" + userId;
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode, errorMessage);
      });
    });
    // código do login
    $("#materialLogInFormButton").click(function(event){
      event.preventDefault();
      var email = $("#materialLogInFormEmail").val();
      var password = $("#materialLogInFormPassword").val();
      firebase.auth().signInWithEmailAndPassword(email, password).then(function(response){
        var userId = response.uid;
        window.location = "timeline.html?userId=" + userId;
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });

    });
   
 
 
 
 
 
 
 
 
 
  });
