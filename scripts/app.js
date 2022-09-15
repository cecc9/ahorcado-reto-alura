const sectionQuestion = document.querySelector(".section-question");
const sectionGame = document.querySelector(".section-game");
const sectionWord = document.querySelector(".section-word");

// buttons section-question
const gameButton = document.getElementById("game");
const addWordButton = document.getElementById("add-word");

// buttons section-word
const saveWordButton = document.getElementById("save-word");
const backMenuButton = document.getElementById("back-menu");
const inputText = document.getElementById("input-text");

// buttons section-game
const newGame = document.getElementById("new-game");
const resign = document.getElementById("resign");
const back = document.getElementById("back");

const containerWords = document.querySelector(".container-words");
const containerLetters = document.querySelector(".container-letters");

const image = document.querySelector(".image");

let letters = [];
let letterWin = [];
let wordChosen = ""; // palabra elegida
let sectionBoolGame = false;

let words = [
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
    "domingo",
];

gameButton.addEventListener("click", () => {
    sectionQuestion.style.display = "none";
    sectionGame.style.display = "grid";
    sectionBoolGame = true;
    selectWord();
    createContainerWord();
});
addWordButton.addEventListener("click", () => {
    sectionWord.style.display = "grid";
    sectionQuestion.style.display = "none";
});

saveWordButton.addEventListener("click", function (e) {
    if (inputText.value !== "") {
        words = [...words, inputText.value];
        inputText.value = "";
        Swal.fire({
            icon: "success",
            title: "Palabra agregada",
        });
        sectionWord.style.display = "none";
        sectionQuestion.style.display = "grid";
    } else {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "No puedes dejar el campo vacio",
        });
    }
});
backMenuButton.addEventListener("click", function (e) {
    sectionWord.style.display = "none";
    sectionQuestion.style.display = "grid";
});

newGame.addEventListener("click", function (e) {
    resetGame();
    selectWord();
    createContainerWord();
});
resign.addEventListener("click", function (e) {
    Swal.fire({
        title: "¿Estas seguro?",
        text: "No podras recuperar la palabra",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, estoy seguro",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: "error",
                title: "Perdiste!!",
                html: `La palabra era <b>${wordChosen.toUpperCase()}</b>`,
            }).then(() => {
                resetGame();
            });
        }
    });
});
back.addEventListener("click", function (e) {
    sectionQuestion.style.display = "grid";
    sectionGame.style.display = "none";
    sectionBoolGame = false;
});

document.addEventListener("keydown", function (e) {
    if (sectionBoolGame) {
        if (e.code.includes("Key")) {
            if (wordChosen.split("").some((item) => item === e.key)) {
                addLetter(e.key);
            } else {
                if (!letters.some((item) => item === e.key)) {
                    letters = [...letters, e.key];
                    createContainerLetters();
                }
            }
        }
    }
});

function letterLength() {
    image.src = `./images/ahorcado/${letters.length}.png`;
    if (letters.length === 7) {
        Swal.fire({
            icon: "error",
            title: "Perdiste!!",
            html: `La palabra era <b>${wordChosen.toUpperCase()}</b>`,
        }).then(() => {
            resetGame();
        });
    }
}

function selectWord() {
    wordChosen = words[Math.floor(Math.random() * words.length)];
}

function createContainerWord() {
    const valueWordArray = wordChosen.split("");
    valueWordArray.forEach((letter) => {
        const parragraph = document.createElement("p");
        parragraph.classList.add("letter", "letter-border");
        parragraph.setAttribute("letter-attribute", letter);
        containerWords.appendChild(parragraph);
    });
}

function createContainerLetters() {
    containerLetters.innerHTML = "";
    letters.forEach((letter) => {
        const parragraph = document.createElement("p");
        parragraph.classList.add("letter-random");
        parragraph.textContent = letter;
        containerLetters.appendChild(parragraph);
    });

    letterLength();
}

function addLetter(letterKey) {
    if (!letterWin.some((item) => item === letterKey)) {
        containerWords.childNodes.forEach((letter) => {
            if (letter.getAttribute("letter-attribute") === letterKey) {
                letter.textContent = letterKey;
                letterWin = [...letterWin, letterKey];
                if (letterWin.length === wordChosen.length) {
                    Swal.fire({
                        icon: "success",
                        title: "Ganaste!!",
                    }).then(() => {
                        resetGame();
                    });
                }
            }
        });
    }
}

function resetGame() {
    containerWords.innerHTML = "";
    containerLetters.innerHTML = "";
    letters = [];
    letterWin = [];
    wordChosen = "";
    image.src = "./images/ahorcado/0.png";
}
