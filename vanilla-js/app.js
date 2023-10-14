let user = ""
let drawings = []
let userLoggedIn = document.getElementById("user-container")
console

let form = document.getElementById("user-form")
let canvasContainer = document.getElementsByClassName("canvas-container")[0]
let sketchpad;


form.addEventListener('submit', (e) => {
    e.preventDefault();
    let name = document.getElementById("username").value;
    if (name == "") {
        name = "James"
        user = name;
    }

    data.student = name;

    userLoggedIn.style.visibility = "visible";
    userLoggedIn.style.height = "max-content";
    let placeholder = document.getElementById("username-placeholder");
    placeholder.innerHTML = name;
    form.style.visibility = "hidden";
    form.style.height = "0px";

    initSketchPad();
    updateInstructions();
})

const hideUserLog = () => {
    userLoggedIn.style.visibility = "hidden";
    userLoggedIn.style.height = "0px";
}

hideUserLog();

const initSketchPad = () => {
    let undoButton = document.getElementById('undo-btn');
    let clearButton = document.getElementById('clear-btn');
    let submitButton = document.getElementById("sketch-submit-btn")
    sketchpad = new Sketchpad(canvasContainer, 400, [undoButton, clearButton, submitButton])
}

const updateInstructions = () => {
    let placeholder = document.getElementById("draw-placeholder")
    placeholder.innerHTML = labels[index];
}

const disableActions = () => {
    let undoButton = document.getElementById('undo-btn');
    let clearButton = document.getElementById('clear-btn');
    let submitButton = document.getElementById("sketch-submit-btn")
    undoButton.disabled = true;
    clearButton.disabled = true;
    submitButton.disabled = true;
}
disableActions();

// The data collection starts here 

let index = 0;
const labels = ["car", "fish", "house", "tree",
    "bicycle", "guitar", "pencil", "clock"];

const data = {
    student: null,
    session: new Date().getTime(),
    drawings: {}
};


let submitButton = document.getElementById("sketch-submit-btn")
submitButton.addEventListener("click", () => {
    data.drawings[labels[index]] = sketchpad.paths
    console.log(data)
    index++;
    if (index < labels.length) {
        updateInstructions();
    } else {
        saveData();
    }
})

const saveData = () => {

    alert("Take your downloaded file and place it alongside the others in the dataset!")

    const element = document.createElement('a');
    element.setAttribute('href',
        'data:text/plain;charset=utf-8,' +
        encodeURIComponent(JSON.stringify(data))
    );

    const fileName = data.session + ".json";
    element.setAttribute('download', fileName);

    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    alert("Your data is now saved, thank you " + data.student + " for participating!")
}