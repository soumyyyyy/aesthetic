// 🌟 Encouraging messages jo randomly change honge
const messages = [
    "💖 You're doing amazing!",
    "✨ Progress, not perfection!",
    "🚀 One step closer to your dream!",
    "🌟 Keep going, you're unstoppable!",
    "💡 Make today magical!"
];

// 📝 Completed tasks ko count karne ke liye variable
let completedTasks = parseInt(localStorage.getItem("completedTasks")) || 0;

// 🌸 Function to update encouragement text randomly
function setEncouragement() {
    document.getElementById("encouragement").innerText =
        messages[Math.floor(Math.random() * messages.length)];
}

// ✅ Function to add a new task
function addTask() {
    let taskInput = document.getElementById("taskInput"); // Input box ko access kar rahe hain
    let taskText = taskInput.value.trim(); // Extra spaces hata rahe hain

    if (taskText === "") { // Agar user ne kuch type nahi kiya toh alert show hoga
        alert("Write something dreamy to do!");
        return; // Function yahin ruk jayega
    }

    let taskList = document.getElementById("taskList"); // Task list ko access kar rahe hain
    let li = document.createElement("li"); // Naya <li> element bana rahe hain

    // ✅ ✔ aur 🗑 buttons ke sath task add kar rahe hain
    li.innerHTML = `<span>${taskText}</span>   
                    <button onclick="completeTask(this)">✔</button>   
                    <button onclick="deleteTask(this)">🗑</button>`;

    taskList.appendChild(li); // Task list me naye <li> ko add kar rahe hain
    saveTasks(); // Tasks ko save karenge
    taskInput.value = ""; // Input field ko clear kar rahe hain
}

// 🎯 Function to mark a task as completed
function completeTask(button) {
    let li = button.parentElement; // Button ke parent <li> ko access kar rahe hain
    li.classList.add("completed"); // Task me strike-through effect add kar rahe hain

    completedTasks++; // Completed task count badh raha hai
    localStorage.setItem("completedTasks", completedTasks); // Local storage me save kar rahe hain
    updateTaskCounter(); // Task counter ko update karenge

    setTimeout(() => {
        li.remove(); // Task 1 second baad remove ho jayega
        saveTasks(); // Updated list ko save karenge
    }, 1000);
}

// 🗑 Function to delete a task manually
function deleteTask(button) {
    let li = button.parentElement; // Button ke parent <li> ko access kar rahe hain
    li.remove(); // Task ko remove kar rahe hain
    saveTasks(); // Updated list save kar rahe hain
}

// 💾 Function to save tasks in local storage
function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li span").forEach(task => {
        tasks.push(task.textContent); // Har task ka text array me save kar rahe hain
    });
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Local storage me save kar rahe hain
}

// 🔄 Function to load tasks from local storage
function loadTasks() {
    let storedTasks = JSON.parse(localStorage.getItem("tasks")) || []; // Local storage se tasks nikal rahe hain

    storedTasks.forEach(taskText => {
        let li = document.createElement("li");
        li.innerHTML = `<span>${taskText}</span>   
                        <button onclick="completeTask(this)">✔</button>   
                        <button onclick="deleteTask(this)">🗑</button>`;
        document.getElementById("taskList").appendChild(li);
    });

    setEncouragement(); // Random encouragement message set karenge
    updateTaskCounter(); // Completed task counter update karenge
}

// 🔢 Function to update completed task counter
function updateTaskCounter() {
    document.getElementById("taskCounter").innerText = `Tasks Completed: ${completedTasks}`;
}

// ☀🌙 Function to toggle dark and light mode
function toggleMode() {
    document.body.classList.toggle("dark-mode"); // Dark mode class add/remove kar rahe hain
    let modeBtn = document.getElementById("modeToggle");
    modeBtn.innerText = document.body.classList.contains("dark-mode") ? "☀ Light Mode" : "🌙 Dark Mode";
}

// 🚀 Page load hone par yeh functions call honge
window.onload = function () {
    loadTasks();
    updateTaskCounter();
};
document.getElementById("modeToggle").addEventListener("click", toggleMode);