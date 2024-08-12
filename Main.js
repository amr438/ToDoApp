let addTask = document.querySelector(".main button")
let input = document.querySelector("input")
let taskDiv = document.querySelector(".tasks")
let arrayOfTasks = []
if (localStorage.getItem("Task")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("Task"))
}
addTask.onclick = function () {
    if (input.value != "") {
        AddTaskToArray(input.value)
        input.value = ""
    }
}
function AddTaskToArray (Task) {
    const task =  {
        id : Date.now(),
        title : Task
    }
    arrayOfTasks.push(task)
    AddDataToPage(arrayOfTasks)
    AddDataToLocalStorage(arrayOfTasks)
}
function AddDataToPage (arrayOfTasks) { 
    taskDiv.innerHTML = ""
    arrayOfTasks.forEach((task)=> {
        let Task = document.createElement("div")
        Task.classList.add("Task")
        Task.id = task.id
        let p = document.createElement("p")
        let info = document.createElement("div")
        let btnRemove = document.createElement("button")
        let edit = document.createElement("span")
        info.appendChild(btnRemove)
        info.appendChild(edit)
        edit.innerHTML = "Edit"
        edit.onclick  = function () {
            edit.remove()
            btnRemove.remove()
            let cancel = document.createElement("button")
            cancel.innerHTML =  "Cancel"
            cancel.onclick = function () {
                cancel.remove()
                save.remove()
                info.appendChild(btnRemove)
                info.appendChild(edit)
                inp.remove()
                info.before(p)
            }
            let save = document.createElement("span")
            save.innerHTML = "Save"
            p.remove()
            let inp = document.createElement("input")
            inp.classList.add("input-edit")
            info.before(inp)
            inp.focus()
            inp.value = p.textContent
            info.appendChild(cancel)
            info.appendChild(save)
            if (inp.value.length >= 1) {
                save.onclick = function () {
                    cancel.remove()
                    save.remove()
                    info.appendChild(btnRemove)
                    info.appendChild(edit)
                    inp.remove()
                    if (inp.value != "") {
                        p.textContent=inp.value
                    }
                    info.before(p)
                    task.title = inp.value
                    console.log(task)
                    AddDataToLocalStorage(arrayOfTasks)
                }
            }
        }
        btnRemove.innerHTML = "Remove"
        p.innerHTML = task.title
        Task.appendChild(p)
        Task.appendChild(info)
        taskDiv.appendChild(Task)
        // Remove Task
        function removeTask () {
            btnRemove.onclick = function () {
                removeDataFromLocalStorage(Task.id)
                Task.remove()
            }
        }
        removeTask()
    })
}   
function AddDataToLocalStorage(arr) {
localStorage.setItem("Task" , JSON.stringify(arrayOfTasks))
}   
AddDataToPage(arrayOfTasks)
function removeDataFromLocalStorage(id) {
    arrayOfTasks = arrayOfTasks.filter((e)=> {
        return e.id != id
    })
    AddDataToLocalStorage(arrayOfTasks)
}

