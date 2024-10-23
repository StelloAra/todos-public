import "./style.css";
import "./style.scss";

const defaultTasks = [
    { task: "Tanka", isDone: false},
    { task: "Tvätta", isDone: false},
    { task: "Handla", isDone: false},
    { task: "Laga mat", isDone: false}
];

let savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
let data: {task: string; isDone: boolean}[] = [...defaultTasks, ...savedTasks];

let ol: HTMLElement | null = document.getElementById("todoList");
let addTaskButton: HTMLElement | null = document.getElementById("addTaskButton");
let textInput: HTMLInputElement | null = document.getElementById("textInput") as HTMLInputElement;

function updateTodoList() {
    if (ol) {
        ol.innerHTML = "";
        for (let i=0; i < data.length; i++) {
            let li = document.createElement("li");
            li.innerHTML = data[i].task;

            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = data[i].isDone;
            checkbox.addEventListener("change", function() {
                toggleDone(i, checkbox.checked);
            });

            li.insertBefore(checkbox, li.firstChild);

            if (data[i].isDone) {
                let deliteButton = document.createElement("button");
                deliteButton.innerHTML = "Radera";
                deliteButton.addEventListener("click", function() {
                    deleteTask(i);
                });
                li.appendChild(deliteButton);
            }

            let moveUpButton = document.createElement("button");
            moveUpButton.innerHTML = "\u2191";
            moveUpButton.addEventListener("click", function () {
                moveTaskUp(i);
            });

            let moveDownButton = document.createElement("button");
            moveDownButton.innerHTML = "\u2193";
            moveDownButton.addEventListener("click", function () {
                moveTaskDown(i);
            });
            li.appendChild(moveUpButton);
            li.appendChild(moveDownButton);
    
            ol?.appendChild(li);
        }
    }
}

function toggleDone(index: number, isDone: boolean) {
    data[index].isDone = isDone;

    const dynamicTasks = data.slice(defaultTasks.length);
    localStorage.setItem("tasks", JSON.stringify(dynamicTasks));
    updateTodoList();
}

function deleteTask(index: number) {
    data.splice(index, 1);
    const dynamicTasks = data.slice(defaultTasks.length);
    localStorage.setItem("tasks", JSON.stringify(dynamicTasks));
    updateTodoList();
}

function moveTaskUp(index: number) {
    if (index > 0) {
        [data[index - 1], data[index]] = [data[index ], data[index - 1]];
        const dynamicTasks = data.slice(defaultTasks.length);
        localStorage.setItem("tasks", JSON.stringify(dynamicTasks));
        updateTodoList();
    }
}

function moveTaskDown(index: number) {
    if (index < data.length -1) {
        [data[index], data[index + 1]] = [data[index +1], data[index]];
        const dynamicTasks = data.slice(defaultTasks.length);
        localStorage.setItem("tasks", JSON.stringify(dynamicTasks));
        updateTodoList();
    }
}

updateTodoList();

addTaskButton?.addEventListener("click", function() {
    let task = textInput?.value;
    if (task) {
        data.push({task: task, isDone: false});
        textInput.value = "";
        const dynamicTasks = data.slice(defaultTasks.length);
        localStorage.setItem("tasks", JSON.stringify(dynamicTasks));
        updateTodoList();
    }
});






