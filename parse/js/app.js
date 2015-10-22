/*
    script for the index.html file
*/

Parse.initialize("x4GVtocaRnwlz9JWksKwLpvNwuJuNYbtaNuYPCgi", "rwrZBa0ASplceS9563xxmZM438jvdtJZoNfbVOPV");

$(function() {
    'use strict';

    // new Task class for Parse
    var Task = Parse.Object.extend('Task');
    // new query that will return all tasks ordered by createAt
    var tasksQuery = new Parse.Query(Task);
    tasksQuery.ascending('createdAt');
    tasksQuery.notEqualTo('done', true);

    // reference to the task list element
    var tasksList = $('#tasks-list');

    // reference to the error message alert
    var errorMessage = $('#error-message');

    // current set of tasks
    var tasks = [];
    var ratingElem = $('#rating');
    function displayError(err) {
        errorMessage.text(err.message);
        errorMessage.fadeIn();
    }

    function clearError() {
        errorMessage.hide();
    }

    function showSpinner() {
        $('.fa-spin').show();
    }

    function hideSpinner() {
        $('.fa-spin').hide();
    }

    function fetchTasks() {
        showSpinner();
        // dont need parameters for either function
        tasksQuery.find()
            .then(onData, displayError)
            .always(hideSpinner);
    }

    function onData(results) {
        tasks = results;
        renderTasks();
    }

    function renderTasks() {
        tasksList.empty();
        tasks.forEach(function(task) {
            // following three are one line
            var li = $(document.createElement('li'))
                .text(task.get('title'))
                .addClass(task.get('done') ? 'completed-task' : '')
                .appendTo(tasksList)
                .click(function() {
                    task.set('done', !task.get('done'));
                    task.save().then(renderTasks, displayError);

                });
            $(document.createElement('span'))
                .raty({readOnly: true,
                    score: (task.get('rating' ) || 0),
                    hints: ['Horrible', 'Awful', 'OK', 'Nice', 'Awesome']})
                .appendTo(li);
        });
    }

    function showMessage(message) {
        message = message || 'Hello';
        alert(message);
    }

    showMessage();

    // save the new task to your Parse database
    // if save is successful, fetch the tasks again
    // otherwise display the error
    //regardless, clear the titleinput so the user can etner the next task.
    $('#new-task-form').submit(function(evt) {
        // refreshes page itself
       evt.preventDefault();

        // find the input element in this form
        // with a name attribution set to "title"
        var titleInput = $(this).find('[name="title"]');
        // get the current value
        var title = titleInput.val();
        var task = new Task();
        task.set('title', title);
        task.set('rating', ratingElem.raty('score'));


        task.save()
            .then(fetchTasks, displayError)
            .then(function() {
                titleInput.val('');
                ratingElem.raty('set', {});
        });


        return false;
    });

    // go and fetch tasksfrom Parse
    fetchTasks();

    // enbale the rating user interface element
    // do raty({readOnly, true}) so the user cant change it
    ratingElem.raty();

    // refetch the tasks every so often
    // to get new tasks created by others
    window.setInterval(fetchTasks, 3000);
});