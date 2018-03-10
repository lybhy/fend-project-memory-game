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
    //console.log(level);
}

//take off a specific number of cards from the fullCardArray

let reducedCardArray = [];

function reduceArray(array) {
    if (level === 1) {
        for (let i = 0; i < level; i++) {
            reducedCardArray.push(array[i]);
        }
    } else if (level < 5) {
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
        console.log(doubleArray[i]);
        let listElement = document.createElement('li');
        listElement.classList.add('card');
        let cardFigure = document.createElement('i');
        cardFigure.classList.add('fab', doubleArray[i]);
        listElement.appendChild(cardFigure);
        deck.appendChild(listElement);
    }
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

//set move counter
let moves = 0;
let resultStar;

function moveCounter() {
    moves += 1;
    document.querySelector('.moves').innerHTML = moves;
    const star = document.querySelector('.stars');
    const stars = '<li><i class="fas fa-star"></i></li>';
    const halfstars = '<li><i class="fas fa-star-half"></i></li>';
    if (level === 1) {
        if (moves === 1) {
            star.innerHTML = stars.repeat(5);
        } else {
            star.innerHTML = stars;
        }
    } else if (moves < level * 1.5) {
        star.innerHTML = stars.repeat(5);
    } else if (moves < level * 1.7) {
        star.innerHTML = stars.repeat(4) + halfstars;
    } else if (moves < level * 1.8) {
        star.innerHTML = stars.repeat(4);
    } else if (moves < level * 2) {
        star.innerHTML = stars.repeat(3) + halfstars;
    } else if (moves < level * 2.1) {
        star.innerHTML = stars.repeat(3);
    } else if (moves < level * 2.3) {
        star.innerHTML = stars.repeat(2) + halfstars;
    } else if (moves < level * 2.5) {
        star.innerHTML = stars.repeat(2);
    } else if (moves < level * 2.7) {
        star.innerHTML = stars.repeat(1) + halfstars;
    } else {
        star.innerHTML = stars;
    }
    resultStar = star.innerHTML;
};

//open card, count click & add to openCardArray
let t0;
let t1;
let openCardArray = [];
let clickCounter = 0;

function open() {
    clickCounter += 1;
    if (clickCounter === 1 && level < 5) {
        t0 = performance.now();
        clearInterval(Interval);
        Interval = setInterval(startTimer, 1000);
    }
    if (clickCounter === 1 && level >= 5) {
        t0 = performance.now();
        timeSet();
        clearInterval(Interval);
        Interval = setInterval(stopWatch, 1000);
    }
    let currentCard;
    if (openCardArray.length < 2) {
        openCardArray.push(this);
        for (let i = 0; i < openCardArray.length; i++) {
            openCardArray[i].classList.add('open', 'show', 'disabled');
        }
        matching();
        winner();
        clearInterval(timeCheck);
        timeCheck = setInterval(timeRunner, 1000);
    }
}

//close cards
function close() {
    for (let i = 0; i < cardArray.length; i++) {
        if (cardArray[i].classList.contains('match')) {
            //do nothing
        } else {
            cardArray[i].classList.remove('open', 'show', 'unmatched', 'animated', 'shake', 'disabled');
        }
    }
}

//check if cards are equal
function matching() {
    //check if they are the same
    if (openCardArray.length === 2 && openCardArray["0"].children["0"].className === openCardArray["1"].children["0"].className) {
        openCardArray["0"].classList.add('match', 'animated', 'tada');
        openCardArray["1"].classList.add('match', 'animated', 'tada');
        if (level === 1) {
            document.querySelector('.status1').setAttribute('style', 'visibility: visible');
            document.querySelector('.status1').classList.add('animated', 'pulse');
        }
        let random = Math.floor(Math.random() * 10);
        if (level >= 5) {
            if (random === 2 || random === 4) {
                statusShow();
                setTimeout(function() {
                    statusHide();
                }, 1500);
            }
        }
        openCardArray = [];
        moveCounter();

    } else if (openCardArray.length === 2 && openCardArray["0"].children["0"].className != openCardArray["1"].children["0"].className) {
        //console.log('unmatched');
        openCardArray["0"].classList.add('unmatched', 'animated', 'shake');
        openCardArray["1"].classList.add('unmatched', 'animated', 'shake');
        moveCounter();
        setTimeout(function() {
            openCardArray = [];
            close();
        }, 300);
    }
}

function timeRunner() {
    if (level > 4 && appendMinutes.innerHTML === "00" && appendSeconds.innerHTML === "00") {
        document.querySelector('.lose').setAttribute('style', 'display: block');
        clearInterval(timeCheck);
    } else {
        console.log('check');
    }
}

function winner() {
    let matchedCards = document.querySelectorAll('.match').length;
    if (matchedCards === cardArray.length /*&& cardArray.length < 16*/ ) {
        t1 = performance.now();
        setTimeout(function() {
            /*document.querySelector('.container').setAttribute('style', 'display: none');*/
            document.querySelector('.level-container').setAttribute('style', 'display: block');
            document.querySelector('.level-wmoves').innerHTML = moves;
            document.querySelector('.level-wstars').innerHTML = resultStar;
            stopedTime = Math.round(((t1 - t0) / 1000))
            document.querySelector('.level-wtime').innerHTML = stopedTime;
        }, 1500)
        clearInterval(Interval);
    }
}

let minutes = 00;
let seconds = 00;
let appendSeconds = document.querySelector('.seconds')
let appendMinutes = document.querySelector('.minutes')
let buttonContinue = document.querySelector('.continue');
let buttonPause = document.querySelector('.pause');
let Interval;
let timeCheck;

buttonContinue.onclick = function() {
    clearInterval(Interval);
    if (level < 5) {
        Interval = setInterval(startTimer, 1000);
    } else {
        Interval = setInterval(stopWatch, 1000);
    }
    document.querySelector('.pause-container').setAttribute('style', 'display: none');
}

buttonPause.onclick = function() {
    clearInterval(Interval);
    clearInterval(timeCheck);
    document.querySelector('.pause-container').setAttribute('style', 'display: block');
}

//reference for inspiration code of a Stop Watch: https://codepen.io/cathydutton/pen/GBcvo?q=javascript+stopwatch&limit=all&type=type-pens
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
//set the time to win after level 4
let timeToWin = 0;

function timeSet() {
    let defaultTime = 60;
    timeToWin = defaultTime - level;
    seconds = timeToWin;
    return seconds;
}

function stopWatch() {
    seconds--;
    if (seconds < 9) {
        appendSeconds.innerHTML = "0" + seconds;
    }
    if (seconds > 9) {
        appendSeconds.innerHTML = seconds;
    }
    if (seconds > 59) {
        //console.log("minutes");
        minutes++;
        appendMinutes.innerHTML = "0" + minutes;
        seconds = 0;
        appendSeconds.innerHTML = "0" + 0;
    }
    if (minutes > 9) {
        appendMinutes.innerHTML = minutes;
    }
}


//show status
function statusShow() {
    document.querySelector('.status').setAttribute('style', 'display: block');
}
//hide status
function statusHide() {
    document.querySelector('.status').setAttribute('style', 'display: none');
}

//hide first status
function status1Hide() {
    document.querySelector('.status1').setAttribute('style', 'display: none');
}
//hide the start message
function hideStart() {
    document.querySelector('.start').setAttribute('style', 'display: none');
    document.querySelector('.start1').setAttribute('style', 'display: none');
}


//new Game - one level up
function nextLevel() {
    clickCounter = 0;
    status1Hide();
    openCardArray = [];
    cardArray = [];
    reducedCardArray = [];
    doubleArray = [];
    moves = 0;
    if (level < 4) {
        clearInterval(Interval);
        seconds = "00";
        minutes = "00";
        appendSeconds.innerHTML = seconds;
        appendMinutes.innerHTML = minutes;
    } else {
        clearInterval(Interval);
        /*seconds = timeToWin;
        minutes = "00";
        appendSeconds.innerHTML = seconds;
        appendMinutes.innerHTML = minutes;*/
    }
    document.querySelector('.container').setAttribute('style', 'display: flex');
    document.querySelector('.level-container').setAttribute('style', 'display: none');
    levelIncrement();
    shuffle(cardElements);
    reduceArray(cardElements);
    doubled(reducedCardArray);
    shuffle(doubleArray)
    createDeck();
    setCurrentCards();
    //set click event (open card)
    for (let i = 0; i < cardArray.length; i++) {
        cardArray[i].addEventListener('click', open);
    }
}

//restart all
function restartAll() {
    location.reload();
}

//restart current level
function restartCurrent() {

}

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


document.addEventListener('DOMContentLoaded', function() {
    levelIncrement();
    shuffle(cardElements);
    reduceArray(cardElements);
    doubled(reducedCardArray);
    shuffle(doubleArray)
    createDeck();
    setCurrentCards();
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
});
