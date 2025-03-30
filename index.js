document.addEventListener('DOMContentLoaded', () => {
    const inputTasks = document.getElementById('inputTask');
    const addTodoBtn = document.querySelector('.add-btn');
    const taskList = document.querySelector('.item-list'); // Correct container for tasks

    // Retrieve tasks from localStorage or initialize an empty array
    let Tasks = JSON.parse(localStorage.getItem('Tasks')) || [];

    // Render saved tasks on page load
    Tasks.forEach(task => renderTask(task));

    // Add task event
    addTodoBtn.addEventListener('click', () => {
        const taskText = inputTasks.value.trim();
        if (taskText === "") return; // Prevent empty tasks

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
        };

        Tasks.push(newTask);
        saveTasks();
        renderTask(newTask); // Display task immediately
        inputTasks.value = ""; // Clear input field
    });

    // Function to render a task
    function renderTask(task) {
        const li = document.createElement('li');
        li.setAttribute('data-id', task.id);

        li.innerHTML = `
            <h3 class="tasklist">${task.text}</h3>
            <button class="btn1">Delete</button>
        `;

        // Append to the correct task list
        taskList.appendChild(li);

        // Add event listener to the delete button
        li.querySelector(".btn1").addEventListener("click", () => {
            deleteTask(task.id);
        });
    }

    // Function to delete a task
    function deleteTask(taskId) {
        Tasks = Tasks.filter(task => task.id !== taskId); // Remove task from array
        saveTasks();
        document.querySelector(`[data-id="${taskId}"]`).remove(); // Remove from UI
    }

    // Function to save tasks in localStorage
    function saveTasks() {
        localStorage.setItem('Tasks', JSON.stringify(Tasks));
    }
});
