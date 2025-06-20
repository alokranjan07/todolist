document.addEventListener('DOMContentLoaded', () => {
    const inputTasks = document.getElementById('inputTask');
    const addTodoBtn = document.querySelector('.add-btn');
    const taskList = document.querySelector('.item-list');  
 
    

     
    let Tasks = JSON.parse(localStorage.getItem('Tasks')) || [];

   
    Tasks.forEach(task => renderTask(task));

 
    addTodoBtn.addEventListener('click', () => {
        const taskText = inputTasks.value.trim();
        if (taskText === "") return; 

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
        };

        Tasks.push(newTask);
        saveTasks();
        renderTask(newTask);  
        inputTasks.value = ""; 
    });

    
    function renderTask(task) {
        const li = document.createElement('li');
        li.setAttribute('data-id', task.id);

        li.innerHTML = `
            <h3 class="tasklist">${task.text}</h3>
            <button class="btn1">Delete</button>
        `;

     
        taskList.appendChild(li);

    
        li.querySelector(".btn1").addEventListener("click", () => {
            deleteTask(task.id);
        });
    }
 
    function deleteTask(taskId) {
        Tasks = Tasks.filter(task => task.id !== taskId); 
        saveTasks();
        document.querySelector(`[data-id="${taskId}"]`).remove(); 
    }
 
    function saveTasks() {
        localStorage.setItem('Tasks', JSON.stringify(Tasks));
    }
});
