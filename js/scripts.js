{
    let tasks = []

    const removeTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1)
        ];
        render();
    };

    const removeButtons = () => {
        const removeButtons = document.querySelectorAll(".task__remove");
        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const doneToggleTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            { ...tasks[index], done: !tasks[index].done },
            ...tasks.slice(index + 1)
        ];
        render();
    };

    const doneButtons = () => {
        const doneButtons = document.querySelectorAll(".task__done");
        doneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                doneToggleTask(index);
            });
        });
    };

    const addNewTask = (newTask) => {
        tasks = [
            ...tasks,
            { content: newTask }
        ];
        render();
    };

    const renderTasks = () => {
        let HTMLstring = "";
        for (const task of tasks) {
            HTMLstring += `
            <ul class="task"> 
             <li class="task__list">
             <button class="task__done">
             ${task.done ? "✔" : ""}
             </button>
             <div class="task__content ${task.done ? "task__content--done" : ""}">
             ${task.content}
             </div>
             <button class="task__remove">
             🗑
             </button>
             </li>
            </ul>`
        };
        document.querySelector(".js-tasks").innerHTML = HTMLstring;
    };

    const renderButtons = () => { 
        const twoButtons = document.querySelector(".js-showHiddenButtons");
        if (tasks.map(task => task.content) != "") {
            twoButtons.innerHTML = `
            Lista zadań
            <button class="hideDoneTasks">
            Ukryj ukończone
            </button>
            <button class="doneAllTasks">
            Ukończ wszystkie
            </button>
            `
        }
        else {
            twoButtons.innerHTML = "Lista zadań";
        };
    };

    const render = () => {
        renderTasks();
        renderButtons();

        removeButtons();
        doneButtons();
    };


    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTask = document.querySelector(".js-task").value.trim();
        const clearTask = document.querySelector(".js-task");

        if (newTask === "") {
            return 0;
        }
        addNewTask(newTask);
        clearTask.value = "";
        clearTask.focus();
    };


    let init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
};