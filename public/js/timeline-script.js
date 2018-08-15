var database = firebase.database();
var USER_ID = getUserId();

$(document).ready(function() {
  $('#comment-button').click((event)=>{
    event.preventDefault();

    var postComment = $('#comment').val();
    var remening = moment().locale('pt-BR').subtract(6, 'days').calendar();
    //console.log(postComment);
    $('#comment-posted').append(`
      <li class="printed-comment">
        ${postComment}
        <small id="remening" class="small-date form-text text-muted mb-4">${remening}</small>
      </li>`);
  })
});

function getUserId() {
  var queryString = window.location.search;
  var regExpForUserId = new RegExp(/\?userId=(.+)/);
  return queryString.match(regExpForUserId)[1];
}

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
