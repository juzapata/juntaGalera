var database = firebase.database();

var USER_ID = window.location.search.match(/\?userId=(.*)/)[1];
// console.log(USER_ID);

const remening = moment().locale('pt-BR').subtract(6, 'days').calendar();

var chooseView = $('#dropdown-views').val();

var postComment = $('#comment').val();

$(document).ready(function() {
// ref() para colocar o nome do usuário
database.ref("users/" + USER_ID).once("value").then(function (snapshot){
  var userName = snapshot.val();
  console.log(userName.name);
  $("#icon-name").text(userName.name);
  $("#hamburguer-name").text(userName.name);

});

// ref() pra colocar os amiguinhos
database.ref("users").once("value").then(function(snapshot){
  $(".log-out").click(function(){
    window.location = "index.html";
  });

  snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
    putFriends(childData.name, childKey);
      // console.log(childData.text);
    console.log(childKey);
    // console.log('valor:', childData);
  });
});

  database.ref('comments/' + USER_ID).once('value')
  .then(function(snapshot) {
    // console.log(snapshot.val());
    snapshot.forEach(function(childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      createComment(childData.text, childKey);
        // console.log(childData.text);
      // console.log('chave:', childKey);
      // console.log('valor:', childData);
    });
  });

  $('#comment-button').click((event)=>{
    event.preventDefault();
    var chooseView = $('#dropdown-views').val();
    var postComment = $('#comment').val();
    //verifica se tem algum valor dentro de textarea
    if($('#comment').val('') === "") {
      $('#comment-button').attr('disabled','true') //desabilita o botão
      $('#comment-button').addClass('add-opacity');//coloca a opacidade do botão
    } else {
      $('#comment-button').attr('disabled','false') //habilita o botão
      $('#comment-button').removeClass('add-opacity');//remove a opacidade do botão
    }
    var newCommentInDB = database.ref('comments/' + USER_ID).push({
      text: postComment,
      type: chooseView
    });
    $('#comment').val("");
    //console.log(newCommentInDB.key);
    createComment(postComment, newCommentInDB.key);
    filteredPosts(chooseView, newCommentInDB.key);
    })
  });

  function createComment(post, key) {
    $('#comment-posted').prepend(`
      <li class="card printed-comment pt-2 pb-1 pl-3 pr-3 mt-3 mb-3">
      <span id="container-buttons" class="d-flex justify-content-end">
        <button class="btn-icon-p p-2 mr-2" data-delete-id="${key}"><i class="fas fa-trash-alt"></i></button>
        <button class="btn-icon-p p-2" data-edit-id="${key}"><i class="fas fa-marker"></i></button>
      </span>
      <p data-post-id="${key}">${post}</p>
      <small id="remening" class="small-date">${remening}</small>
      </li>
    `);

    $(`button[data-delete-id=${key}]`).click(()=>{
      $('#container-buttons').parent().remove();
      database.ref('comments/' + USER_ID + "/" + key).remove();
      //console.log(key);
    });

    $(`button[data-edit-id=${key}]`).click(()=>{
      $(`p[data-post-id=${key}]`).attr('contenteditable','true');
      $('.printed-comment').append(`<button class="btn-icon-p save-changes p-2 mr-2">Salvar</button>`);
      $('.save-changes').click(()=>{
          var editablePost = $(`p[data-post-id=${key}]`).html();
          database.ref('comments/' + USER_ID + "/" + key).set({
            text: editablePost
          });
      $(`p[data-post-id=${key}]`).removeAttr('contenteditable','true');
      $('.save-changes').addClass('d-none');
      //console.log(editablePost);
      });
    });
  }
  function filteredPosts(post, key){
    var filter = database.ref('comments/' + USER_ID + "/" + key).isEqual(chooseView);
  }
  function putFriends(name, key){
    if (key !== USER_ID){
      $(".friends-list").append(`
    <li class="friends pt-2 pl-3 mb-2">
      <span>${name}</span>
      <button class="btn btn-outline-p btn-sm btn-rounded" data-user-id="${key}">Seguir</button>
    </li>`)
    }
    $(`button[data-user-id=${key}]`).click(function(){
      database.ref("friendship/" + USER_ID).push({
        friendId: key
      })

      $(`button[data-user-id=${key}]`).addClass('d-none');

    });
    database.ref("friendship/" + USER_ID).once("value")
      .then(function(snapshot){
        // console.log(snapshot.val());
        snapshot.forEach(function(childSnapshot){
          var friendId = childSnapshot.val();
          var usuarioAmigo = friendId.friendId;
          console.log(usuarioAmigo);
        if (usuarioAmigo === key){
          $(`button[data-user-id=${key}]`).addClass('d-none');
        }
        })
      })
    }
