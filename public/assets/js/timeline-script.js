var database = firebase.database();

var USER_ID = window.location.search.match(/\?userId=(.*)/)[1];
// console.log(USER_ID);

const remening = moment().locale('pt-BR').subtract(6, 'days').calendar();

$(document).ready(function() {
// ref() para colocar o nome do usuário
database.ref("users/" + USER_ID).once("value").then(function (snapshot){
  var userName = snapshot.val();
  console.log(userName.name);
  $("#icon-name").text(userName.name);
  $("#hamburguer-name").text(userName.name);
})


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

    var postComment = $('#comment').val();
    var chooseView = $('#dropdown-views').val();

    var newCommentInDB = database.ref('comments/' + USER_ID).push({
      text: postComment,
      type: chooseView
    });
    //console.log(newCommentInDB.key);
    createComment(postComment, newCommentInDB.key);

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
      });


      // $(`p[data-post-id=${key}]`).text(editablePost);

      //console.log(editablePost);
    });
  }
  // function getUserId() {
  //   var queryString = window.location.search;
  //   var regExpForUserId = new RegExp(/\?userId=(.+)/);
  //   return queryString.match(regExpForUserId)[1];
  // }

  // $(document).ready(function() {
  //   getUserTasksFromDB();
  //   $(".send-task").click(addTasks);
  // });
  //
  // function getUserTasksFromDB() {
  //   database.ref('tasks/' + USER_ID).once('value')
  //   .then(function(snapshot) {
  //     renderTasksList(snapshot);
  //   });
  // }
  //
  // function renderTasksList(snapshot) {
  //   snapshot.forEach(function(childSnapshot) {
  //     var task = childSnapshot.val();
  //     createTaskItem(task.text, childSnapshot.key);
  //   });
  // }
  //
  // function createTaskItem(text, key) {
  //   $(".task-list").append(`
  //     <li>
  //       <input class="tasks-checkbox" type="checkbox" data-id=${key} />
  //       ${text}
  //     </li>`
  //   );
  //
  //   $(`input[data-id='${key}']`).click(function() {
  //     var listItem = $(this).parent();
  //     deleteTask(listItem, key);
  //   });
  // }
  //
  // function deleteTask(listItem, key) {
  //   deleteTaskFromDB(key);
  //   listItem.remove();
  // }
  //
  // function deleteTaskFromDB(key) {
  //   database.ref(`tasks/${USER_ID}/${key}`).remove();
  // }
  //
  // function addTasks(event) {
  //   event.preventDefault();
  //
  //   var taskText = $(".task-input").val();
  //   var isTextEmpty = taskText === "";
  //
  //   if (!isTextEmpty) {
  //     var newTask = addTaskToDB(taskText);
  //     var taskId = newTask.getKey();
  //
  //     createTaskItem(taskText, taskId);
  //   }
  //
  //   $(".task-input").val("");
  // }
  //
  // function addTaskToDB(text) {
  //   return database.ref('tasks/' + USER_ID).push({ text: text });
  // }
