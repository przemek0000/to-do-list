{
    const tasks = []

    const removeButtons = () => {
        const removeButtons = document.querySelectorAll(".task__remove");
        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                tasks.splice(index, 1);
                render();
            })
        })  
    }

    const doneButtons = () => {
        const doneButtons = document.querySelectorAll(".task__done");
        doneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                tasks[index].done = !tasks[index].done;
                render();
            })
        }) 
    }

    const render = () => {
        let HTMLstring = "";
        for (const task of tasks) {
            HTMLstring += `
            <li class="task">
             <ul class="task__list">
             <button class="task__done">
             ${task.done? "✔" : ""}
             </button>
             <div class="task__content ${task.done ? "task__content--done" : ""}">
             ${task.content}
             </div>
             <button class="task__remove">
             🗑
             </button>
             </ul>
            </li>`
        }
        document.querySelector(".js-tasks").innerHTML = HTMLstring;

       removeButtons();
       doneButtons();
    }

    const addNewTask = (newTask) => {
        tasks.push({
            content: newTask,
        })
        render();
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
    }


    let init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
}