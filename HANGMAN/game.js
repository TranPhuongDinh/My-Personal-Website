const canvasMainScreen = document.getElementById('canvasMainScreen');
const cMainScreen = canvasMainScreen.getContext("2d");

const none = new Image();
const giaTreoCo = new Image();
const step1= new Image();
const step2 = new Image();
const step3 = new Image();
const step4 = new Image();
const step5 = new Image();
const step6 = new Image();

none.src = "images/none.png";
giaTreoCo.src = "images/giatreoco.png";
step1.src = "images/step1.png";
step2.src = "images/step2.png";
step3.src = "images/step3.png";
step4.src = "images/step4.png";
step5.src = "images/step5.png";
step6.src = "images/step6.png";

const nopeSound = new Audio();
const correctSound = new Audio();
const winSound = new Audio();
const loseSound = new Audio();
const newSound = new Audio();
const themesong = new Audio();

themesong.src = "sounds/themesong.wav";
nopeSound.src = "sounds/nope.wav";
correctSound.src = "sounds/correct.wav";
winSound.src = "sounds/win.wav";
loseSound.src = "sounds/lose.wav";
newSound.src = "sounds/swoosh.wav";

var list = [
['BADMINTON', 'VOLLEYBALL', 'FOOTBALL', 'ARCHERY', 'BASEBALL', 'CANOEING', 'BOXING', 'BASKETBALL', 'KARATEDO', 'TAEKWONDO', 'GYMNASTICS', 'RUBGY', 'SWIMMING', 'WRESTLING'],
['BREAD', 'EGG', 'CHEESE', 'RICE', 'CHIP', 'SALAD', 'SOUP', 'PASTA', 'PIZZA', 'CAKE', 'NUT'],
['BEAR', 'CHIMPANZEE', 'ELEPHANT', 'FOX', 'GIRAFFE', 'JAGUAR', 'LION', 'PORCUPINE', 'RACCOON', 'DINOSAUR', 'SQUIRREL', 'RHINOCEROS'],
['CAULDRON', 'WAND', 'BROOMSTICK', 'POTION', 'CURSE', 'SPELL'],
];

var hintPress;
var wordList;
var category;
var activeChoice;
var wordToFind;
var choice;
var countWrong;
var countRight;
var win = 0;
var lose = 0;
var onOffSound = 1;
var isPressed;
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var countHint;

//FUNCTIONS
function randomIntFromRange(min, max) {
    return Math.floor(Math.random()*(max - min + 1) + min);
}

function init() {
    newSound.play();
    themesong.play();
    var choice = randomIntFromRange(0, list.length - 1);
    wordList = list[choice];
    switch(choice) {
        case 0: category = 'SPORTS'; break;
        case 1: category = 'FOOD'; break;
        case 2: category = 'ANIMALS'; break;
        case 3: category = 'MAGIC'; break;
    }
    wordToFind = wordList[randomIntFromRange(0,wordList.length - 1)];

    countWrong = 0;
    countRight = 0;
    hintPress = true;
    isPressed = [];
    for (i = 0; i < 26; i++)
        isPressed.push(false);
    countHint = Math.floor(wordToFind.length / 2) - 1;

    var wordPlace = "";

    for (i = 0; i < wordToFind.length; i++)
        wordPlace += "<button id=letter" + i.toString() + "></button>";

    document.getElementById('wordToFind').innerHTML = wordPlace;
    document.getElementById('categoryName').innerHTML = category;
    document.getElementById('wrongWordList').innerHTML = 'INCORRECT LETTERS: ';
    cMainScreen.clearRect(0,0,400,300);

    draw(countWrong);
}

init();

const mute = () => {
    let soundIcon = $('#btnSound')
    if (onOffSound == 1)
    {
        $(soundIcon).removeClass()
        $(soundIcon).addClass('fa fa-volume-off')
        themesong.pause()
        onOffSound = 0
    }
    else
    {
        $(soundIcon).removeClass()
        $(soundIcon).addClass('fa fa-volume-up')
        themesong.play()
        onOffSound = 1
    }
}

function hint() {
    if (hintPress) {
        if (countHint >= 0) {
            alert('THE WORD HAS THE LETTER ' + wordToFind[randomIntFromRange(0, wordToFind.length - 1)] + ' (HINTS LEFT ' + countHint.toString() + ')');
            countHint--;
        }
        else 
            alert('NO MORE HINTS LEFT');
    }
}

function gameFinished() {
    hintPress = false;
    for (i = 0; i < isPressed.length; i++)
        isPressed[i] = true;
}

function draw(countWrong) {
    switch(countWrong) {
        case 1: cMainScreen.drawImage(giaTreoCo, 0, 0); break;
        case 2: cMainScreen.drawImage(step1, 0, 0); break;
        case 3: cMainScreen.drawImage(step2, 0, 0); break;
        case 4: cMainScreen.drawImage(step3, 0, 0); break;
        case 5: cMainScreen.drawImage(step4, 0, 0); break;
        case 6: cMainScreen.drawImage(step5, 0, 0); break;
        case 7: cMainScreen.drawImage(step6, 0, 0); break;
    }
    requestAnimationFrame(draw);
}

draw(countWrong);

function drawLoseAndWin(win, lose) {
    document.getElementById('win').innerHTML = win;
    document.getElementById('lose').innerHTML = lose;
}

drawLoseAndWin(win, lose);

var btnWords = $('.btn-word')

for (let i = 0; i < btnWords.length; i++) {
    const index = i;
    btnWords[index].onclick = () => {
        if (isPressed[index] === false) {
            activeChoice = alphabet[index];
            var isCorrect = false;
            var count = 0;
        
            for (j = 0; j < wordToFind.length; j++) {
                if (activeChoice === wordToFind[j]) {
                    document.getElementById('letter' + j.toString()).innerHTML = activeChoice;
                    countRight++;
                    isCorrect = true;
                    isPressed[index] = true;
                }
            }
        
            if(countRight === wordToFind.length) {
                gameFinished();
                winSound.play();
                win++;
                drawLoseAndWin(win, lose);
                alert('THE WORD IS: ' + wordToFind + '. CONGRATULATIONS! PRESS NEW BUTTON TO START NEW GAME!');
            }
        
            if (isCorrect === false) {
                nopeSound.play();
                countWrong++;
                document.getElementById("wrongWordList").innerHTML += activeChoice + " ";
                isPressed[index] = true;
            } 
            else correctSound.play();
            
            if(countWrong === 7) {
                alert('THE WORD IS: ' + wordToFind + '. BETTER NEXT TIME! PRESS NEW BUTTON TO START NEW GAME!');
                gameFinished();
                loseSound.play();
                lose++;
                drawLoseAndWin(win, lose);
            }
            
            draw(countWrong);
        }
    }
}




