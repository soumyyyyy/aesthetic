
function addTask() {
    let taskInput = document.getElementById("taskInput"); 
    let taskText = taskInput.value.trim(); 

    if (taskText === "") {
        alert("Write something dreamy to do!");
        return;
    }

    let taskList = document.getElementById("taskList"); 
    let li = document.createElement("li"); 

    li.innerHTML = `<span>${taskText}</span>   
                    <button onclick="completeTask(this)">✔</button>   
                    <button onclick="deleteTask(this)">🗑</button>`;

    taskList.appendChild(li);
    saveTasks(); 
    taskInput.value = ""; // Input field khali
}

function completeTask(button) {
    let li = button.parentElement; 
    li.classList.add("completed"); // strike-through

    
    localStorage.setItem("completedTasks"); 

    setTimeout(() => {
        li.remove(); 
        saveTasks(); 
    }, 1000);
}

function deleteTask(button) {
    let li = button.parentElement; //parent <li> ko access 
    li.remove();  
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li span").forEach(task => {
        tasks.push(task.textContent); // Har task ka text array me save kar rahe hain
    });
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Local storage me save kar rahe hain
}

//  load tasks from storage
function loadTasks() {
    let storedTasks = JSON.parse(localStorage.getItem("tasks")) || []; // Local storage se tasks nikal rahe hain

    storedTasks.forEach(taskText => {
        let li = document.createElement("li");
        li.innerHTML = `<span>${taskText}</span>   
                        <button onclick="completeTask(this)">✔</button>   
                        <button onclick="deleteTask(this)">🗑</button>`;
        document.getElementById("taskList").appendChild(li);
    });

}


function toggleMode() {
    document.body.classList.toggle("dark-mode");
    let modeBtn = document.getElementById("modeToggle");
    modeBtn.innerText = document.body.classList.contains("dark-mode") ? "☀ Light Mode" : "🌙 Dark Mode";
}

//  load hone parfunction call 
window.onload = function () {
    loadTasks();
   
};
document.getElementById("modeToggle").addEventListener("click", toggleMode);
