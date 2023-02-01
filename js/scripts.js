{
    let tasks = [];
    let disabledTasks = false;
    let toggleWord = true;

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
        if (tasks.every(task => task.done === true) === false) {
            disabledTasks = false;
        }
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
            { content: newTask, done: false }
        ];
        render();
    };

    const renderTasks = () => {
        let HTMLstring = "";
        for (const task of tasks) {
            HTMLstring += `
            <ul class="task" ${task.hide ? "hidden" : ""}> 
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

    const hideDoneTasks = () => {
        const hideDoneTasks = document.querySelector(".js-hideDoneTasks");
        hideDoneTasks.addEventListener("click", () => {
            if (tasks.every(task => task.done === false)) {
                return 0;
            }

            toggleWord = !toggleWord;
            for (const task of tasks) {
                if (task.done === true) {
                    task.hide = !task.hide;
                };
            }
            render();
        });
    };
    const doneAllTasks = () => {
        const doneAllTasks = document.querySelector(".js-doneAllTasks");
        doneAllTasks.addEventListener("click", () => {
            tasks.map(task => task.done = true);
            disabledTasks = true;
            render();
        });
    };

    const renderButtons = () => {
        const twoButtons = document.querySelector(".js-showHiddenButtons");
        if (tasks.map(task => task.content) != "") {
            twoButtons.innerHTML = `
            Lista zadań
            <button class="hideDoneButton js-hideDoneTasks">
            ${toggleWord ? "Ukryj" : "Pokaż"}
             ukończone
            </button>
            <button class="doneAllButton js-doneAllTasks ${disabledTasks? "doneAllButton--disabled" : ""} " ${disabledTasks ? "disabled" : ""}>
            Ukończ wszystkie
            </button>
            `
            hideDoneTasks();
            doneAllTasks();
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
        disabledTasks = false;
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