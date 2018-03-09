//Create a list that holds all cards
const cards = document.getElementsByClassName('card');
//set the game level
let level = 0;

function levelIncrement() {
    level += 1;
    document.querySelector('.level').innerHTML = level;
    //console.log(level);
}
//converts the list into an array
//https://stackoverflow.com/questions/2735067/how-to-convert-a-dom-node-list-to-an-array-in-javascript
//do a full storge array of all cards
let fullCardArray = [];

function fullArray(object) {
    for (let i = 0; i < (object.length); i++) {
        fullCardArray[i] = object[i];
    }
    return fullCardArray;
}
//take off the card which will be used from the full card array
//converts the list into an array
//https://stackoverflow.com/questions/2735067/how-to-convert-a-dom-node-list-to-an-array-in-javascript
let cardArray = [];

function toArray(object) {
    for (let i = 0; i < (object.length - (16 - 2 * level)); i++) {
        cardArray[i] = object[i];
    }
    return cardArray;
}

// Shuffle function from http://stackoverflow.com/a/2450976
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

//create new deck with shuffled cards
function createDeck() {
    const deck = document.querySelector('.deck');
    deck.innerHTML = "";
    cardArray.forEach(function(element) {
        //console.log(element);
        deck.appendChild(element);
    })
}

//set move counter
let moves = 0;
let resultStar;
let t0;
let t1;

function moveCounter() {
    moves += 1;
    document.querySelector('.moves').innerHTML = moves;
    const star = document.querySelector('.stars');
    const stars = '<li><i class="fas fa-star"></i></li>';
    const halfstars = '<li><i class="fas fa-star-half"></i></li>';
    if (moves === 1) {
        t0 = performance.now();
        clearInterval(Interval);
        Interval = setInterval(startTimer, 1000);
    }
    if (level === 1) {
        if (moves === 1) {
            star.innerHTML = stars.repeat(5);
        } else {
            star.innerHTML = stars;
        }
    } else if (moves < level*1.5) {
        star.innerHTML = stars.repeat(5);
    } else if (moves < level*1.7) {
        star.innerHTML = stars.repeat(4) + halfstars;
    } else if (moves < level*1.8) {
        star.innerHTML = stars.repeat(4);
    } else if (moves < level*2) {
        star.innerHTML = stars.repeat(3) + halfstars;
    } else if (moves < level*2.1) {
        star.innerHTML = stars.repeat(3);
    } else if (moves < level*2.3) {
        star.innerHTML = stars.repeat(2) + halfstars;
    } else if (moves < level*2.5) {
        star.innerHTML = stars.repeat(2);
    } else if (moves < level*2.7) {
        star.innerHTML = stars.repeat(1) + halfstars;
    } else {
        star.innerHTML = stars;
    }
    resultStar = star.innerHTML;
};

//open card, count move & add to openCardArray
let openCardArray = [];
let openCardArray2 = [];
function open() {
    let currentCard;
    if (openCardArray.length < 2) {
        openCardArray.push(this);
        for (let i = 0; i < openCardArray.length; i++) {
            openCardArray[i].classList.add('open', 'show', 'disabled');
        }
        matching();
        winner();
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
        //console.log('matched');
        openCardArray["0"].classList.add('match');
        openCardArray["1"].classList.add('match');
        //antimation when match
        openCardArray["0"].classList.add('animated', 'tada');
        openCardArray["1"].classList.add('animated', 'tada');
        openCardArray = [];
        moveCounter();
    } else if (openCardArray.length === 2 && openCardArray["0"].children["0"].className != openCardArray["1"].children["0"].className) {
        //console.log('unmatched');
        openCardArray["0"].classList.add('unmatched');
        openCardArray["1"].classList.add('unmatched');
        //animation when unmatched
        openCardArray["0"].classList.add('animated', 'shake');
        openCardArray["1"].classList.add('animated', 'shake');
        moveCounter();
        setTimeout(function() {
            openCardArray = [];
            close();
        }, 300);
    }
}

function winner() {
    let matchedCards = document.querySelectorAll('.match').length;
    if (matchedCards === cardArray.length && cardArray.length < 16) {
        t1 = performance.now();
        setTimeout(function() {
            document.querySelector('.container').setAttribute('style', 'display: none');
            document.querySelector('.level-container').setAttribute('style', 'display: block');
            document.querySelector('.level-wmoves').innerHTML = moves;
            document.querySelector('.level-wstars').innerHTML = resultStar;
            stopedTime = Math.round(((t1 - t0) / 1000)+1)//add one second because rounding goes down to next minor second
            //console.log(stopedTime);
            document.querySelector('.level-wtime').innerHTML = stopedTime;
        }, 1500)
    }
    if (matchedCards === cardArray.length && cardArray.length === 16) {
        t1 = performance.now();
        setTimeout(function() {
            document.querySelector('.container').setAttribute('style', 'display: none');
            document.querySelector('.winner-container').setAttribute('style', 'display: block');
            document.querySelector('.win-moves').innerHTML = moves;
            document.querySelector('.win-stars').innerHTML = resultStar;
            stopedTime = Math.round(((t1 - t0) / 1000)+1)
            //console.log(stopedTime);
            document.querySelector('.win-time').innerHTML = stopedTime;
        },1500)
    }
}

let minutes = 00;
let seconds = 00;
let appendSeconds = document.querySelector('.seconds')
let appendMinutes = document.querySelector('.minutes')
let buttonContinue = document.querySelector('.continue');
let buttonPause = document.querySelector('.pause');
let Interval;

buttonContinue.onclick = function() {
    clearInterval(Interval);
    Interval = setInterval(startTimer, 1000);
    document.querySelector('.pause-container').setAttribute('style', 'display: none');
    document.querySelector('.container').setAttribute('style', 'display: flex');
}

buttonPause.onclick = function() {
    clearInterval(Interval);
    document.querySelector('.pause-container').setAttribute('style', 'display: block');
    document.querySelector('.container').setAttribute('style', 'display: none');
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

//reset cards before new game
function resetCards() {
    for (let i = 0; i < fullCardArray.length; i++) {
        fullCardArray[i].classList.remove('open', 'show', 'match','animated', 'tada', 'disabled');
    }
}

//new Game - one level up
function nextLevel() {
    openCardArray = [];
    moves = 0;
    clearInterval(Interval);
    seconds = "00";
    minutes = "00";
    appendSeconds.innerHTML = seconds;
    appendMinutes.innerHTML = minutes;
    resetCards();
    document.querySelector('.container').setAttribute('style', 'display: flex');
    document.querySelector('.level-container').setAttribute('style', 'display: none');
    levelIncrement();
    toArray(fullCardArray);
    shuffle(cardArray);
    createDeck();
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
    openCardArray = [];
    moves = 0;
    clearInterval(Interval);
    seconds = "00";
    minutes = "00";
    appendSeconds.innerHTML = seconds;
    appendMinutes.innerHTML = minutes;
    document.querySelector('.moves').innerHTML = 0;
    resetCards();
    toArray(fullCardArray);
    shuffle(cardArray);
    createDeck();
    //set click event (open card)
    for (let i = 0; i < cardArray.length; i++) {
        cardArray[i].addEventListener('click', open);
    }
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

//on window load call functions
document.addEventListener('DOMContentLoaded', function() {
    levelIncrement();
    fullArray(cards);
    toArray(fullCardArray);
    shuffle(cardArray);
    createDeck();
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
})
