chrome.alarms.create("pomodoroTimer", {
    periodInMinutes: 1/60
})

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "pomodoroTimer") {
        chrome.storage.local.get(["timer", "isRunning", "timeInput"], (res) => {
            if (res.isRunning) {
                let timer = res.timer + 1
                let isRunning = true
                if (timer == 60 * res.timeInput) {
                    this.registration.showNotification("Pomo-Tomo Extension", {
                        body: `${res.timeInput} minutes passed!`,
                        icon: "icon.png",
                    })
                    timer = 0
                    isRunning = false
                }
                //console.log(timer)
                chrome.storage.local.set({
                    timer,
                    isRunning,
                })
            }
        })
    }
})

chrome.storage.local.get(["timer", "isRunning", "timeInput"], (res) => {
    chrome.storage.local.set({
        timer : "timer" in res ? res.timer : 0,
        timeInput : "timeInput" in res ? res.timeInput : 25,
        isRunning : "isRunning" in res ? res.isRunning : false,
    })
})

chrome.storage.local.get(["timer"], (res) => {
    const notificationTime = res.timer.value
    
})