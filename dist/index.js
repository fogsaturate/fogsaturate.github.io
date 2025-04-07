const falloutTrillText = document.getElementById("fallouttrill");
const rbTrillText = document.getElementById("rbtrill");
const rerollText = document.getElementById("rerolls");
const doneTodayText = document.getElementById("donetoday");
const lastFinishedDateText = document.getElementById("lastfinisheddate");
const generateButton = document.getElementById("generatebutton");
const date = new Date();
function getUserDataCookie() {
    const userDataCookie = localStorage.getItem("userData");
    if (!userDataCookie) {
        return null;
    }
    const userDataJSON = JSON.parse(userDataCookie);
    userDataJSON.lastfinisheddate = new Date(userDataJSON.lastfinisheddate);
    // i have to re-convert the date for some reason, thanks typescript!
    return userDataJSON;
}
function updateUserDataCookie(userData) {
    console.log("Updating userData cookie...");
    localStorage.setItem("userData", JSON.stringify(userData));
}
let userData = getUserDataCookie();
if (!userData || isTodayDifferent(userData.lastfinisheddate)) {
    console.log("userData cookie does not exist / today is different! Creating new one...");
    const newUserData = {
        falloutMethod: "N/A",
        rbMethod: "N/A",
        donetoday: false,
        lastfinisheddate: date,
        rerolls: 3
    };
    if (userData) {
        newUserData.falloutMethod = userData.falloutMethod;
        newUserData.rbMethod = userData.rbMethod;
        newUserData.lastfinisheddate = userData.lastfinisheddate;
    }
    updateUserDataCookie(newUserData);
    userData = getUserDataCookie();
}
else {
    console.log("userData cookie loaded!");
}
function isTodayDifferent(date) {
    const inputDay = date.getDate();
    const todaysDay = new Date().getDate();
    return inputDay !== todaysDay; // Directly return the comparison
}
function booleanToText(x) {
    return x ? "Yes" : "No";
}
function dateToMMDDYYYYString(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
}
function on_load() {
    falloutTrillText.innerText = "Fallout Trill Method:\n" + userData.falloutMethod;
    rbTrillText.innerText = "RB Trill Method:\n" + userData.rbMethod;
    rerollText.innerText = "Rerolls:\n" + userData.rerolls + "x";
    doneTodayText.innerText = "Done Today?\n" + booleanToText(userData.donetoday);
    if (userData.lastfinisheddate instanceof Date) {
        lastFinishedDateText.innerText = "Last finished date: \n" + dateToMMDDYYYYString(userData.lastfinisheddate);
    }
    else {
        lastFinishedDateText.innerText = "Last finished date: \nN/A";
    }
    console.log(userData.rerolls);
    if (userData.rerolls == 0) {
        generateButton.disabled = true;
    }
}
function randomInt(max) {
    return Math.floor(Math.random() * max);
}
function generateMethod() {
    const noOvertapCheckbox = document.getElementById("noovertap");
    const noOvertapChecked = noOvertapCheckbox.checked;
    const slowModeCheckbox = document.getElementById("slowmode");
    const slowModeChecked = slowModeCheckbox.checked;
    const noOvertapFalloutMethods = [
        "Agro Sliding",
        "3 Set Sliding",
        "3 Set Skip Tapping"
    ];
    const noOvertapRBMethods = [
        "Agro Sliding",
        "Nados Sliding",
        "Down-rake Tapping",
        "Sliding"
    ];
    const slowModeFalloutMethods = [
        "6 Set Skip Tapping",
        "Alt Tapping",
        "2 Finger Disjoint Rake Tapping"
    ];
    const slowModeRBMethods = [
        "3 Finger Rake Tapping"
    ];
    let falloutMethods = [
        "4 Set Sliding",
        "3 Set Sliding",
        "6 Set Skip Tapping",
        "4 Set Skip Tapping",
        "3 Set Skip Tapping",
        "2 Finger Disjoint Rake Tapping",
        "3 Finger Disjoint Rake Tapping",
        "Alt Tapping",
        "Nados Sliding",
        "Agro Sliding",
        "Any! Go Crazy!"
    ];
    let rbMethods = [
        "4 Finger Meme Raking",
        "3 Finger Meme Raking",
        "4 Finger Rake Tapping",
        "3 Finger Rake Tapping",
        "Sliding",
        "Down-rake Tapping",
        "Nados Sliding",
        "Agro Sliding",
        "Any! Go Crazy!"
    ];
    if (noOvertapChecked) {
        falloutMethods = falloutMethods.filter(method => !noOvertapFalloutMethods.includes(method));
        rbMethods = rbMethods.filter(method => !noOvertapRBMethods.includes(method));
    }
    if (slowModeChecked) {
        falloutMethods = falloutMethods.filter(method => !slowModeFalloutMethods.includes(method));
        rbMethods = rbMethods.filter(method => !slowModeRBMethods.includes(method));
    }
    let randomFalloutMethod = falloutMethods[randomInt(falloutMethods.length)];
    let randomRBMethod = rbMethods[randomInt(rbMethods.length)];
    falloutTrillText.innerText = "Fallout Trill Method:\n" + randomFalloutMethod;
    rbTrillText.innerText = "RB Trill Method:\n" + randomRBMethod;
    userData.falloutMethod = randomFalloutMethod;
    userData.rbMethod = randomRBMethod;
    userData.rerolls -= 1;
    userData.donetoday = true;
    userData.lastfinisheddate = date;
    if (userData.rerolls == 0) {
        generateButton.disabled = true;
    }
    rerollText.innerText = "Rerolls:\n" + userData.rerolls + "x";
    doneTodayText.innerText = "Done Today?\n" + booleanToText(userData.donetoday);
    lastFinishedDateText.innerText = "Last finished date: \n" + dateToMMDDYYYYString(date);
    updateUserDataCookie(userData);
}
document.addEventListener("DOMContentLoaded", function () {
    on_load();
});
generateButton.addEventListener("click", generateMethod);
