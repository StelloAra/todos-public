import "./style.css";
import "./style.scss";
import { updateTodoList } from "./models/functions";

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

updateTodoList(data, defaultTasks, ol);

addTaskButton?.addEventListener("click", function() {
    let task = textInput?.value;
    if (task) {
        data.push({task: task, isDone: false});
        textInput.value = "";
        const dynamicTasks = data.slice(defaultTasks.length);
        localStorage.setItem("tasks", JSON.stringify(dynamicTasks));
        updateTodoList(data, defaultTasks, ol);
    }
});






