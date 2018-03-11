/******************************************************
    M A I N   F U N C T I O N S   F O R   C A R D S
 *****************************************************/

//store cardElements in an Array
const cardElements = ['fa-grunt', 'fa-android', 'fa-google',
    'fa-github', 'fa-apple', 'fa-app-store', 'fa-codepen', 'fa-css3-alt',
    'fa-earlybirds', 'fa-chrome', 'fa-free-code-camp', 'fa-gitkraken',
    'fa-js', 'fa-html5', 'fa-jsfiddle', 'fa-node'
];

//shuffle cardsElements
//Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//set the game level
let level = 0;

function levelIncrement() {
    level += 1;
    document.querySelector('.level').innerHTML = level;
}

//set level (for playing without tutorial)
function setLevel(number) {
    level = number;
    document.querySelector('.level').innerHTML = level;
}

//take off a specific number of cards from the fullCardArray
let reducedCardArray = [];
let tutorial = 0;

function reduceArray(array) {
    if (tutorial === 1 && level === 1) {
        for (let i = 0; i < level; i++) {
            reducedCardArray.push(array[i]);
        }
    } else if (tutorial === 1 && level < 5) {
        for (let i = 0; i < level * 2; i++) {
            reducedCardArray.push(array[i]);
        }
    } else {
        for (let i = 0; i < 8; i++) {
            reducedCardArray.push(array[i]);
        }
    }
    return reducedCardArray;
}

//double cards
//from https://stackoverflow.com/questions/31644673/how-to-double-numbers-in-an-array-and-save-it-in-a-new-array
let doubleArray = [];

function doubled(arr) {
    let clone = [];
    clone = arr.slice(0);
    for (let i = 0; i < clone.length; i++) {
        doubleArray.push(arr[i]);
        doubleArray.push(clone[i]);

    }
    return doubleArray;
}

//arrange cards on the card-list (card deck)
function createDeck() {
    const deck = document.querySelector('.deck');
    deck.innerHTML = "";
    for (let i = 0; i < doubleArray.length; i++) {
        let listElement = document.createElement('li');
        listElement.classList.add('card');
        let cardFigure = document.createElement('i');
        cardFigure.classList.add('fab', doubleArray[i]);
        listElement.appendChild(cardFigure);
        deck.appendChild(listElement);
    }
    cardChange();
}
//store the current shown card into an Array
let cardArray = [];

function setCurrentCards() {
    let currentShown = document.getElementsByClassName('card');
    for (let i = 0; i < (currentShown.length); i++) {
        cardArray[i] = currentShown[i];
    }
    return cardArray;
}

/******************************************************
    M O V E S   A N D   S T A R - R A T I N G
 *****************************************************/

//set move counter
let moves = 0;
let resultStar;

function moveCounter() {
    moves += 1;
    document.querySelector('.moves').innerHTML = moves;
    const star = document.querySelector('.stars');
    const stars = '<li><i class="fas fa-star"></i></li>';
    const halfstars = '<li><i class="fas fa-star-half"></i></li>';
    if (tutorial === 1 && level === 1) {
        star.innerHTML = stars.repeat(5);
    } else if (moves < cardArray.length * 1.5) {
        star.innerHTML = stars.repeat(5);
    } else if (moves < cardArray.length * 1.7) {
        star.innerHTML = stars.repeat(4) + halfstars;
    } else if (moves < cardArray.length * 1.8) {
        star.innerHTML = stars.repeat(4);
    } else if (moves < cardArray.length * 2) {
        star.innerHTML = stars.repeat(3) + halfstars;
    } else if (moves < cardArray.length * 2.1) {
        star.innerHTML = stars.repeat(3);
    } else if (moves < cardArray.length * 2.3) {
        star.innerHTML = stars.repeat(2) + halfstars;
    } else if (moves < cardArray.length * 2.5) {
        star.innerHTML = stars.repeat(2);
    } else if (moves < cardArray.length * 2.7) {
        star.innerHTML = stars.repeat(1) + halfstars;
    } else {
        star.innerHTML = stars;
    }
    resultStar = star.innerHTML;
    //return resultStar;
};

//reset moveCounter
function resetMoveCounter() {
    moves = 0;
    document.querySelector('.moves').innerHTML = moves;
    const star = document.querySelector('.stars');
    const stars = '<li><i class="fas fa-star"></i></li>';
    star.innerHTML = stars.repeat(5);
}

/******************************************************
    T I M E R    F U N C T I O N S
 *****************************************************/
//reference for inspiration code of a Stop Watch: https://codepen.io/cathydutton/pen/GBcvo?q=javascript+stopwatch&limit=all&type=type-pens


let minutes = 00;
let seconds = 00;
let appendSeconds = document.querySelector('.seconds')
let appendMinutes = document.querySelector('.minutes')
let buttonContinue = document.querySelector('.continue');
let buttonPause = document.querySelector('.pause');
let Interval;
let timeCheck;
let timeToWin = 0;

//timing function shows the time for tutorial mode
function startTimer() {
    seconds++;
    if (seconds < 9) {
        appendSeconds.innerHTML = "0" + seconds;
    }
    if (seconds > 9) {
        appendSeconds.innerHTML = seconds;
    }
    if (seconds > 59) {
        minutes++;
        appendMinutes.innerHTML = "0" + minutes;
        seconds = 0;
        appendSeconds.innerHTML = "0" + 0;
    }
    if (minutes > 9) {
        appendMinutes.innerHTML = minutes;
    }
}

//set the timing function when going in the paused game mode
buttonPause.onclick = function() {
    clearInterval(Interval);
    clearInterval(timeCheck);
    document.querySelector('.pause-container').setAttribute('style', 'display: block');
}

//set the timing function for the paused game mode, when clicking continue
buttonContinue.onclick = function() {
    clearInterval(Interval);
    if (tutorial === 1) {
        Interval = setInterval(startTimer, 1000);
    } else {
        Interval = setInterval(stopWatch, 1000);
    }
    document.querySelector('.pause-container').setAttribute('style', 'display: none');
}

//set the time to win if playing arcade (no tutorial)
function timeSet() {
    let defaultTime = 60;
    timeToWin = defaultTime - level;
    seconds = timeToWin;
    return seconds;
}

//stopwatch function shows the time if playing arcade (no tutorial)
function stopWatch() {
    seconds--;
    if (seconds < 9) {
        appendSeconds.innerHTML = "0" + seconds;
    }
    if (seconds > 9) {
        appendSeconds.innerHTML = seconds;
    }
    if (seconds > 59) {
        minutes++;
        appendMinutes.innerHTML = "0" + minutes;
        seconds = 0;
        appendSeconds.innerHTML = "0" + 0;
    }
    if (minutes > 9) {
        appendMinutes.innerHTML = minutes;
    }
}

const lastSeconds = document.getElementsByClassName('time');
//verifies the time in arcade mode
function timeRunner() {
    //if time is out, game is lost
    if (appendMinutes.innerHTML === "00" && appendSeconds.innerHTML === "00") {
        document.querySelector('.lose').setAttribute('style', 'display: block');
        clearInterval(timeCheck);
        clearInterval(Interval);

    }
    //if there are 10 seconds left, style counter
    if (appendMinutes.innerHTML === "00" && appendSeconds.innerHTML <= "10") {
        lastSeconds["0"].classList.add('animated');
        lastSeconds["0"].setAttribute('style', 'color: #ed3131');
    }
}


/******************************************************
    O P E N   &   C L O S E  C A R D S
 *****************************************************/

//open card, count click & add to openCardArray
let t0;
let t1;
let openCardArray = [];
let clickCounter = 0;

function open() {
    clickCounter += 1;
    //start the timer for tutorial mode
    if (clickCounter === 1 && tutorial === 1) {
        t0 = performance.now();
        clearInterval(Interval);
        Interval = setInterval(startTimer, 1000);
    }
    //start the timer for arcade mode
    else if (clickCounter === 1 && tutorial === 0) {
        t0 = performance.now();
        //start the stopwatch
        clearInterval(Interval);
        Interval = setInterval(stopWatch, 1000);
        //verify if game is lost
        clearInterval(timeCheck);
        timeCheck = setInterval(timeRunner, 1000);
    }
    //let currentCard;
    //push opened card to an array, verify if card matches and check for winning
    if (openCardArray.length < 2) {
        openCardArray.push(this);
        for (let i = 0; i < openCardArray.length; i++) {
            openCardArray[i].classList.add('open', 'show', 'disabled');
        }
        matching();
        winner();
    }
}

//close cards (if they don't match)
function close() {
    for (let i = 0; i < cardArray.length; i++) {
        if (cardArray[i].classList.contains('match')) {
            //do nothing
        } else {
            cardArray[i].classList.remove('open', 'show', 'unmatched', 'animated', 'shake', 'disabled');
        }
    }
}


/******************************************************
    M A T C H I N G    C A R D S
 *****************************************************/

//check if cards are equal
function matching() {
    if (openCardArray.length === 2 && openCardArray["0"].children["0"].className === openCardArray["1"].children["0"].className) {
        //style matched cards
        openCardArray["0"].classList.add('match', 'animated', 'tada');
        openCardArray["1"].classList.add('match', 'animated', 'tada');
        //show a "awesome" notice on tutorial
        if (tutorial === 1 && level === 1) {
            document.querySelector('.status1').setAttribute('style', 'visibility: visible');
            document.querySelector('.status1').classList.add('animated', 'pulse');
        }
        //set Arcade Game Mode goodies
        if (tutorial === 0) {
            let random = Math.floor(Math.random() * 10);
            if (random === 2 || random === 4) {
                //give 5 seconds more time every time a heart appears after card matched
                statusShow();
                setTimeout(function() {
                    statusHide();
                }, 1500);
                seconds = seconds + 5;
                if (seconds < 9) {
                    appendSeconds.innerHTML = "0" + seconds;
                }
                if (seconds > 9) {
                    appendSeconds.innerHTML = seconds;
                }
                if (seconds > 59) {
                    minutes++;
                    appendMinutes.innerHTML = "0" + minutes;
                    seconds = 0;
                    appendSeconds.innerHTML = "0" + 0;
                }
                if (minutes > 9) {
                    appendMinutes.innerHTML = minutes;
                }
            }
        }
        //after checked they matched, empty the array
        openCardArray = [];
        //count the move
        moveCounter();
        //if they doens't match, they should be closed after enough time looking at them
    } else if (openCardArray.length === 2 && openCardArray["0"].children["0"].className != openCardArray["1"].children["0"].className) {
        //styles unmatched
        openCardArray["0"].classList.add('unmatched', 'animated', 'shake');
        openCardArray["1"].classList.add('unmatched', 'animated', 'shake');
        //count the move
        moveCounter();
        //reset cardset
        setTimeout(function() {
            openCardArray = [];
            close();
        }, 300);
    }
}


/******************************************************
    W I N N I N G    L E V E L
 *****************************************************/

function winner() {
    let matchedCards = document.querySelectorAll('.match').length;
    if (matchedCards === cardArray.length) {
        t1 = performance.now();
        setTimeout(function() {
            document.querySelector('.level-container').setAttribute('style', 'display: block');
            document.querySelector('.level-wmoves').innerHTML = moves;
            document.querySelector('.level-wstars').innerHTML = resultStar;
            stopedTime = Math.round(((t1 - t0) / 1000))
            document.querySelector('.level-wtime').innerHTML = stopedTime;
        }, 1500)
        clearInterval(Interval);
        lastSeconds["0"].classList.remove('animated');
        lastSeconds["0"].setAttribute('style', 'color: #222');
    }
}


/******************************************************
    C A R D   D E C K   C H A N G E S
 *****************************************************/

const cardDesign = ['houndstooth.svg',
    'dark_embroidery.png', 'dark-triangles.png', 'doodles.png',
    'halftone-yellow.png', 'wormz.png'];

function cardChange() {
    let random = Math.floor(Math.random() * 6);
    document.querySelector('.card').setAttribute('style', 'background-image: url("../img/'+cardDesign[random]+'")');
}


/******************************************************
    C O M U N I C A T I O N S
 *****************************************************/

//show status - for the random bonus of 5 seconds
function statusShow() {
    document.querySelector('.status').setAttribute('style', 'display: block');
}
//hide status - for the random bonus of 5 seconds
function statusHide() {
    document.querySelector('.status').setAttribute('style', 'display: none');
}

//hide "awesome" notice (used in tutorial at first level)
function status1Hide() {
    document.querySelector('.status1').setAttribute('style', 'display: none');
}
//hide the tutorial phrases on top of the screen
function hideStart() {
    if (tutorial === 0) {
        document.querySelector('.start').setAttribute('style', 'display: none');
        document.querySelector('.start1').setAttribute('style', 'display: none');
    }
}

//closes the informations after the tutorial
function closeLev5() {
    document.querySelector('.level5').setAttribute('style', 'display: none');
}


/******************************************************
    S C R E E N   S E T T I N G S
 *****************************************************/


//hide-show settings and header
function reduced() {
    const logo = document.querySelector('.logo');
    const h1 = document.querySelector('h1');
    const scorePanel = document.querySelector('.score-panel');
    const gameOptions = document.querySelector('.game-options');
    logo.classList.toggle('panelFixUp');
    h1.classList.toggle('panelFixUp');
    scorePanel.classList.toggle('panelFixUp');
    gameOptions.classList.toggle('panelFixDown');
}


/******************************************************
    S T A R T    F U N C T I O N S
 *****************************************************/

//starts Tutorial
function tutorialPlay() {
    tutorial = 1;
    document.querySelector('.tutorial-container').setAttribute('style', 'display: none');
    setLevel(0);
    nextLevel();
    appendMinutes.innerHTML = "00";
    appendSeconds.innerHTML = "00";
    seconds = 0;
    //make better fitting of the deck on the screen
    document.querySelector('.deck').setAttribute('style', 'margin-top: 0px');
}

//starts Arcade Game
function arcadePlay() {
    tutorial = 0;
    hideStart();
    status1Hide();
    document.querySelector('.tutorial-container').setAttribute('style', 'display: none');
    clearInterval(Interval);
}

//new Game - one level up
function nextLevel() {
    //set information if tutorial is ended
    if (tutorial === 1 && level === 4) {
        document.querySelector('.level5').setAttribute('style', 'display: block');
        document.querySelector('.close-level5').addEventListener('click', closeLev5);
        tutorial = 0;
        level = 0;
    }
    //hide elements that aren't interesting at this point
    document.querySelector('.level-container').setAttribute('style', 'display: none');
    status1Hide();
    hideStart();
    //empty arrays
    openCardArray = [];
    cardArray = [];
    reducedCardArray = [];
    doubleArray = [];
    //reset clickCounter
    clickCounter = 0;
    //reset moveCounter
    resetMoveCounter();
    //increment level
    levelIncrement();
    //set cards
    shuffle(cardElements);
    reduceArray(cardElements);
    doubled(reducedCardArray);
    shuffle(doubleArray)
    createDeck();
    setCurrentCards();
    if (tutorial === 0) {
        //set the goal time on Arcade Mode
        timeSet();
        if (seconds < 9) {
            appendSeconds.innerHTML = "0" + seconds;
        }
        if (seconds > 9) {
            appendSeconds.innerHTML = seconds;
        }
        if (seconds > 59) {
            minutes++;
            appendMinutes.innerHTML = "0" + minutes;
            seconds = 0;
            appendSeconds.innerHTML = "0" + 0;
        }
        if (minutes > 9) {
            appendMinutes.innerHTML = minutes;
        }
        //make better fitting of the deck on the screen
        document.querySelector('.deck').setAttribute('style', 'margin-top: -30px');
    }
    if (tutorial === 1) {
        seconds = 0;
        appendSeconds.innerHTML = "00";
        appendMinutes.innerHTML = "00";
    }
    //set click event (open card)
    for (let i = 0; i < cardArray.length; i++) {
        cardArray[i].addEventListener('click', open);
    }
    //show deck with cards
    document.querySelector('.container').setAttribute('style', 'display: flex');
}

//restart all
function restartAll() {
    location.reload();
}

//restart current level
function restartCurrent() {

}

//global start event listeners and function calls
document.addEventListener('DOMContentLoaded', function() {
    levelIncrement();
    shuffle(cardElements);
    reduceArray(cardElements);
    doubled(reducedCardArray);
    shuffle(doubleArray)
    createDeck();
    setCurrentCards();
    //set the goal time on Arcade Mode
    timeSet();
    if (seconds < 9) {
        appendSeconds.innerHTML = "0" + seconds;
    }
    if (seconds > 9) {
        appendSeconds.innerHTML = seconds;
    }
    if (seconds > 59) {
        minutes++;
        appendMinutes.innerHTML = "0" + minutes;
        seconds = 0;
        appendSeconds.innerHTML = "0" + 0;
    }
    if (minutes > 9) {
        appendMinutes.innerHTML = minutes;
    }
    //make better fitting of the deck on the screen
    document.querySelector('.deck').setAttribute('style', 'margin-top: -30px');
    //restart event listener
    document.querySelector('.restart').addEventListener('click', restartCurrent);
    let newGameButton = document.getElementsByClassName('new-game');
    for (let i = 0; i < newGameButton.length; i++) {
        newGameButton[i].addEventListener('click', restartAll);
    }
    //document.querySelector('.new-game').addEventListener('click', restartAll);
    document.querySelector('.start-new').addEventListener('click', restartAll);
    document.querySelector('.next-level').addEventListener('click', nextLevel);
    //set click event for hide-show settings and header
    document.querySelector('.reduced').addEventListener('click', reduced);
    //set click event (open card)
    for (let j = 0; j < cardArray.length; j++) {
        cardArray[j].addEventListener('click', open);
    }
    document.querySelector('.tutorial-container').setAttribute('style', 'display: block');
    document.querySelector('.tutorial').addEventListener('click', tutorialPlay);
    document.querySelector('.play-direct').addEventListener('click', arcadePlay);
});
