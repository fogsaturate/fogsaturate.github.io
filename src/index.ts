const falloutTrillText = document.getElementById("fallouttrill") as HTMLParagraphElement;
const rbTrillText = document.getElementById("rbtrill") as HTMLParagraphElement;
const generateButton = document.getElementById("generatebutton") as HTMLButtonElement;

function randomInt(max: number): number {
    return Math.floor(Math.random() * max);
}

function generateMethod(): void {

    const falloutMethods: string[] = [
        "4 Set Sliding",
        "6 Set Skip Tapping",
        "4 Set Skip Tapping",
        "3 Set Skip Tapping", 
        "2 Finger Disjoint Rake Tapping",
        "3 Finger Disjoint Rake Tapping",
        "Alt Tapping",
        "Nados Sliding",
        "Agro Sliding"
    ];
    const rbMethods: string[] = [
        "4 Finger Meme Raking",
        "3 Finger Meme Raking",
		"4 Finger Rake Tapping",
        "3 Finger Rake Tapping",
		"Sliding",
        "Down-rake Tapping",
        "Nados Sliding",
        "Agro Sliding"
    ];

    let randomFalloutMethod = falloutMethods[randomInt(falloutMethods.length)]
    let randomRBMethod = rbMethods[randomInt(rbMethods.length)]
    
    document.getElementById("fallouttrill").innerText = "Fallout Trill Method:\n" + randomFalloutMethod;
    document.getElementById("rbtrill").innerText = "RB Trill Method:\n" + randomRBMethod;
}

generateButton.addEventListener("click", generateMethod)