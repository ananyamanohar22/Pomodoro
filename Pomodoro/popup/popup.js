let tasks =[]

function updateTime() {
    
    chrome.storage.local.get(["timer", "timeInput"], (res) => {
        const time = document.getElementById("time")
        const minutes = `${res.timeInput - Math.ceil(res.timer / 60)}`.padStart(2, "0")
        let seconds = "00"
        if (res.timer % 60 != 0 ) {
            seconds = `${60 - res.timer % 60}`.padStart(2, "0")
        }
        time.textContent = `${minutes}:${seconds}`
    })
}
updateTime()
setInterval(updateTime, 1000)

const addTaskBtn = document.getElementById("tasks")
addTaskBtn.addEventListener("click", () => addTasks())

// chrome.storage.local.get(["isRunning"], (res) => {
//     chrome.storage.local.set({
//         if (isRunning=true) {
//             startBtn.textContent = "PAUSE"
//         }
        
//     })
// })

const startBtn = document.getElementById("start")
startBtn.addEventListener("click", () =>{
    //startBtn.textContent = "PAUSE"
    chrome.storage.local.get(["isRunning"], (res) => {
        chrome.storage.local.set({
            isRunning: !res.isRunning,
        }, () => {
            startBtn.textContent = !res.isRunning ? "PAUSE" : "RESUME" 
        })
    })
    
})

const resetBtn = document.getElementById("reset")
resetBtn.addEventListener("click", () => {
    chrome.storage.local.get(["isRunning"], (res) => {
        chrome.storage.local.set({
            timer : 0,
            isRunning: false,
        }, () => {
            startBtn.textContent = "START"
        })
    })
})

chrome.storage.sync.get(["tasks"], (res) => {
    tasks = res.tasks ? res.tasks : []
    renderTasks()
})

function savetasks() {
    chrome.storage.sync.set({
        tasks,
    })
}

function renderTask(tasksLength) {
    const taskFrame = document.createElement("div")

    const text = document.createElement("input")
    text.type = "text"
    text.placeholder = "My task....."
    text.value = tasks[tasksLength]
    text.addEventListener("change", () => {
        tasks[tasksLength] = text.value
        savetasks()
        //console.log(tasks)
    })

    const deleteBtn = document.createElement("input")
    deleteBtn.type = "button"
    deleteBtn.value = "x"

    deleteBtn.addEventListener("click", () =>{
        deleteTask(tasksLength)
    })

    taskFrame.appendChild(text)
    taskFrame.appendChild(deleteBtn)

    const textContainer = document.getElementById("text-box")
    textContainer.appendChild(taskFrame)
}

 function addTasks() {
    const tasksLength = tasks.length
    tasks.push("")
    
    renderTask(tasksLength)
 }

 function deleteTask(tasksLength){
    tasks.splice(tasksLength, 1)
    //textContainer.removeChild(taskFrame)
    renderTasks()
    savetasks()
    //console.log(tasks)
 }

 function renderTasks() {
    const textContainer = document.getElementById("text-box")
    textContainer.textContent = ""
    tasks.forEach((taskText,tasksLength) => {
        renderTask(tasksLength)
    })
 }