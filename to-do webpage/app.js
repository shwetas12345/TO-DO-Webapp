document.addEventListener("DOMContentLoaded",()=>{
    const storetasks=JSON.parse(localStorage.getItem('tasks'))

    if(storetasks){
        storetasks.forEach((tasks)=>tasks.push(task))
        updateTaskList();
        updatestats();
    }
})


let tasks = [];
const savetasks=()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks))
}

const addTask = () => {
    const taskinput = document.getElementById('taskinput');
    const text = taskinput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskinput.value = ''; // Clear the input after adding a task
        updateTaskList();
        updatestats();
        savetasks();
    }
};


const updateTaskList = () => {
    const tasklist = document.querySelector('.task-list');
    tasklist.innerHTML = '';

    tasks.forEach((task, index) => { // Loop through tasks array
        const listitem = document.createElement('li');

        listitem.innerHTML = `
        <div class="taskitem">
            <div class="task ${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ""} />
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="./img/delete-svgrepo-com.svg" onclick="edittask(${index})" />
                <img src="./img/edit-svgrepo-com.svg" onclick="deletetask(${index})" />
            </div>
        </div>            
        `;
        
        listitem.querySelector('.checkbox').addEventListener('change', () => toggletaskcomplete(index));

        tasklist.appendChild(listitem);
    });
};

const toggletaskcomplete = (index) => {
    tasks[index].completed = !tasks[index].completed; // Toggle the completed status
    updateTaskList(); // Update the task list after toggling
    updatestats();
    savetasks();
};

// Placeholder functions for edit and delete
const edittask = (index) => {
    const taskinput = document.getElementById('taskinput');
    taskinput.value = tasks[index].text; // Set the input to the task text for editing
    tasks.splice(index, 1); // Remove the task being edited (to avoid duplication on add)
    updateTaskList(); // Update the task list
    updatestats();
    savetasks();
};
const updatestats=()=>{
    const completetasks=tasks.filter(task=>task.completed).length
    const totaltasks=tasks.length
    const progress=(completetasks/totaltasks)*100
    const progessBar=document.getElementById('progress')

    progessBar.style.width=`${progress}%`

    document.getElementById('numbers').innerText=`${completetasks}/${totaltasks}`
}

const deletetask = (index) => {
    tasks.splice(index, 1); // Remove the task at the specified index
    updateTaskList(); // Update the task list
    updatestats();
    savetasks();
};

document.getElementById('newTask').addEventListener("click", function (e) {
    e.preventDefault();
    addTask();
});
