export function updateTodoList(data: {task: string; isDone: boolean}[], defaultTasks: {task: string; isDone: boolean}[], ol: HTMLElement | null) {
    if (ol) {
        ol.innerHTML = "";
        for (let i=0; i < data.length; i++) {
            let li = document.createElement("li");

            let taskNumber = document.createElement("span");
            taskNumber.className = "task-number";
            taskNumber.innerHTML = (i + 1).toString();
            li.appendChild(taskNumber);

            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = data[i].isDone;
            checkbox.className = "task-checkbox";
            checkbox.addEventListener("change", function() {
                toggleDone(i, checkbox.checked, data, defaultTasks, ol);
            });

            li.appendChild(checkbox);

            let taskName = document.createElement("span");
            taskName.className = "task-name";
            taskName.innerHTML = data[i].task;
            if (data[i].isDone){
                taskName.classList.add('done');
            }
            li.appendChild(taskName);

            if (data[i].isDone) {
                let deliteButton = document.createElement("button");
                deliteButton.innerHTML = "Radera";
                deliteButton.addEventListener("click", function() {
                    deleteTask(i, data, defaultTasks, ol);
                });
                li.appendChild(deliteButton);
            }



            let moveUpButton = document.createElement("button");
            moveUpButton.className = "move-up-button";
            moveUpButton.innerHTML = "\u2191";
            moveUpButton.addEventListener("click", function () {
                moveTaskUp(i, data, defaultTasks, ol);
            });

            let moveDownButton = document.createElement("button");
            moveDownButton.className = "move-down-button";
            moveDownButton.innerHTML = "\u2193";
            moveDownButton.addEventListener("click", function () {
                moveTaskDown(i, data, defaultTasks, ol);
            });
            li.appendChild(moveUpButton);
            li.appendChild(moveDownButton);


    
            ol?.appendChild(li);
        }
    }
}

export function toggleDone(index: number, isDone: boolean, data: {task: string; isDone: boolean}[], defaultTasks: {task: string; isDone: boolean}[], ol: HTMLElement | null) {
    data[index].isDone = isDone;

    const dynamicTasks = data.slice(defaultTasks.length);
    localStorage.setItem("tasks", JSON.stringify(dynamicTasks));
    updateTodoList(data, defaultTasks, ol);
}

export function deleteTask(index: number, data: {task: string; isDone: boolean}[], defaultTasks: {task: string; isDone: boolean}[], ol: HTMLElement | null) {
    data.splice(index, 1);
    const dynamicTasks = data.slice(defaultTasks.length);
    localStorage.setItem("tasks", JSON.stringify(dynamicTasks));
    updateTodoList(data, defaultTasks, ol);
}

export function moveTaskUp(index: number, data: {task: string; isDone: boolean}[], defaultTasks: {task: string; isDone: boolean}[], ol: HTMLElement | null) {
    if (index > 0) {
        [data[index - 1], data[index]] = [data[index ], data[index - 1]];
        const dynamicTasks = data.slice(defaultTasks.length);
        localStorage.setItem("tasks", JSON.stringify(dynamicTasks));
        updateTodoList(data, defaultTasks, ol);
    }
}

export function moveTaskDown(index: number, data: {task: string; isDone: boolean}[], defaultTasks: {task: string; isDone: boolean}[], ol: HTMLElement | null) {
    if (index < data.length -1) {
        [data[index], data[index + 1]] = [data[index +1], data[index]];
        const dynamicTasks = data.slice(defaultTasks.length);
        localStorage.setItem("tasks", JSON.stringify(dynamicTasks));
        updateTodoList(data, defaultTasks, ol);
    }
}