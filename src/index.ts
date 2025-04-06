const falloutTrillText = document.getElementById("fallouttrill") as HTMLParagraphElement;
const rbTrillText = document.getElementById("rbtrill") as HTMLParagraphElement;

const rerollText = document.getElementById("rerolls") as HTMLParagraphElement;

const doneTodayText = document.getElementById("donetoday") as HTMLParagraphElement;
const lastFinishedDateText = document.getElementById("lastfinisheddate") as HTMLParagraphElement;

const generateButton = document.getElementById("generatebutton") as HTMLButtonElement;

const date = new Date();

interface UserData {
    donetoday: boolean;
    lastfinisheddate: Date;
    rerolls: number;
}

function setCookie(name: string, val: string) {
    const date = new Date();
    const value = val;

    // Set it expire in 7 days
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));

    // Set it
    document.cookie = name+"="+value+"; expires="+date.toUTCString()+"; path=/";
}

function getCookie(name: string) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    
    if (parts.length == 2) {
        return decodeURIComponent(parts.pop().split(";").shift());
    }
}

function getUserDataCookie(): UserData {
    const userDataCookie = getCookie("userData");
    
    if (!userDataCookie) {
        return null
    }

    const userDataJSON = JSON.parse(userDataCookie);

    userDataJSON.lastfinisheddate = new Date(userDataJSON.lastfinisheddate);
    // i have to re-convert the date for some reason, thanks typescript!

    return userDataJSON;
}

function updateUserDataCookie(userData: UserData): void {
    console.log("Updating userData cookie...")

    const userDataEncoded = encodeURIComponent(JSON.stringify(userData));

    setCookie("userData", userDataEncoded);
}

let userData = getUserDataCookie();

if (!userData || isTodayDifferent(userData.lastfinisheddate)) {
    console.log("userData cookie does not exist / today is different! Creating new one...")

    const newUserData: UserData = {
        donetoday: false,
        lastfinisheddate: date,
        rerolls: 3
    }

    updateUserDataCookie(newUserData);

    userData = getUserDataCookie();
} else {
    console.log("userData cookie loaded!")
}

function isTodayDifferent(date: Date): boolean {
    const inputDay = date.getDate();

    const todaysDay = new Date().getDate();

    return inputDay !== todaysDay; // Directly return the comparison
}

function booleanToText(x: boolean): string {
    return x ? "Yes" : "No";
}

function dateToMMDDYYYYString(date: Date): string {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month}-${day}-${year}`
}

function on_load(): void {
    rerollText.innerText = "Rerolls:\n" + userData.rerolls + "x";
    doneTodayText.innerText = "Done Today?\n" + booleanToText(userData.donetoday);
    if (userData.lastfinisheddate instanceof Date) {
        lastFinishedDateText.innerText = "Last finished date: \n" + dateToMMDDYYYYString(userData.lastfinisheddate);
    } else {
        lastFinishedDateText.innerText = "Last finished date: \nN/A"
    }

    console.log(userData.rerolls);

    if (userData.rerolls == 0) {
        generateButton.disabled = true;
    }
}

function randomInt(max: number): number {
    return Math.floor(Math.random() * max);
}

function generateMethod(): void {

    const noOvertapCheckbox = document.getElementById("noovertap") as HTMLInputElement;
    const noOvertapChecked = noOvertapCheckbox.checked;

    const slowModeCheckbox = document.getElementById("slowmode") as HTMLInputElement;
    const slowModeChecked = slowModeCheckbox.checked;

    const noOvertapFalloutMethods: string[] = [
        "Agro Sliding",
        "3 Set Sliding",
        "3 Set Skip Tapping"
    ];

    const noOvertapRBMethods: string[] = [
        "Agro Sliding",
        "Nados Sliding",
        "Down-rake Tapping",
        "Sliding"
    ];

    const slowModeFalloutMethods: string[] = [
        "6 Set Skip Tapping",
        "Alt Tapping",
        "2 Finger Disjoint Rake Tapping"
    ];

    const slowModeRBMethods: string[] = [
        "3 Finger Rake Tapping"
    ];

    let falloutMethods: string[] = [
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

    let rbMethods: string[] = [
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
        falloutMethods = falloutMethods.filter(method => !noOvertapFalloutMethods.includes(method))
        rbMethods = rbMethods.filter(method => !noOvertapRBMethods.includes(method))
    }

    if (slowModeChecked) {
        falloutMethods = falloutMethods.filter(method => !slowModeFalloutMethods.includes(method))
        rbMethods = rbMethods.filter(method => !slowModeRBMethods.includes(method))
    }

    let randomFalloutMethod = falloutMethods[randomInt(falloutMethods.length)];
    let randomRBMethod = rbMethods[randomInt(rbMethods.length)];
    
    falloutTrillText.innerText = "Fallout Trill Method:\n" + randomFalloutMethod;
    rbTrillText.innerText = "RB Trill Method:\n" + randomRBMethod;

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

document.addEventListener("DOMContentLoaded", function() {
    on_load();
});

generateButton.addEventListener("click", generateMethod);