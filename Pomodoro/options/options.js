const timeInput = document.getElementById("time-input")
const saveBtn = document.getElementById("save")

timeInput.addEventListener("change", () => {
    const notificationTime = timeInput.value
    //console.log(notificationTime)
    if(notificationTime < 1 || notificationTime > 60) {
        timeInput.value = 25
    }
    // chrome.storage.local.set({
    //     notificationTime,
    // })
})

chrome.storage.local.get(["timeInput"], (res) => {
    timeInput.value = res.timeInput
})

saveBtn.addEventListener("click", () => {
    chrome.storage.local.set({
        timer : 0,
        timeInput : timeInput.value,
        isRunning : false,
    })
})