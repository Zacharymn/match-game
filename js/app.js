
//******Card List*************************************
 const diamond = '"fa fa-diamond"';
 const paperPlane = '"fa fa-paper-plane-o"';
 const bicycle = '"fa fa-bicycle"';
 const cube = '"fa fa-cube"';
 const anchor = '"fa fa-anchor"';
 const leaf = '"fa fa-leaf"';
 const bomb = '"fa fa-bomb"';
 const bolt = '"fa fa-bolt"';

 let cards = [ diamond, paperPlane, 
 			   bicycle, cube, 
 			   anchor, leaf, 
 			   bomb, bolt, 
 			   diamond, paperPlane, 
 			   bicycle, cube, 
 			   anchor, leaf, 
 			   bomb, bolt  ];
//********************************************************

//********SHUFFLES DECK AND RESTARTS BOARD****************
function newDeck(array) {
	shuffle(array);
	let newCards = "";
	for (let i = 0;i < array.length; i++) {
		newCards += '<li class=card><i class=' + array[i] + '></i></li>';
	}
	matchedCards = [];
	document.querySelector(".deck").innerHTML = newCards;
	return matchedCards;
}
//*********************************************************

//******RESETS GAME METRICS********************************
function reload() {
	newDeck(cards);
	stopTimer();
	openCards = [];
	youWonMessage.style.visibility = "hidden";
	moves = 0;
	counter.textContent = moves;
	time.textContent = seconds;
	starMaker(stars);
	return moves;
}
//**********************************************************


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
//***********************************************************

//*****OPENS A CARD WHEN CLICKED*****************************
const deck = document.querySelector('.deck');
const reloadButton = document.querySelector('.restart');
const playAgainButton = document.querySelector('.play-again');
const exit = document.querySelector('.exit');
let openCards = [];
let matchedCards = [];

function showCard(event) { 
	if (event.target.classList.contains('open')) {
		return;
	}
	else if (event.target.classList.contains('card')) {
	event.target.classList.add('open');
	event.target.classList.add('show');
	openCards.push(event.target.children[0]);
	startTimer();
	countMoves(event.target);
	}
	checkOpenCards(openCards);
}
//**********************************************************

//****LISTENERS*********************************************
deck.addEventListener("click", showCard);
// deck.addEventListener("click", countMoves);
reloadButton.addEventListener("click", reload);
playAgainButton.addEventListener("click", reload);
exit.addEventListener("click", exitGame);
//**********************************************************

//****CHECK CARDS FOR MATCHES*******************************
function checkOpenCards(array) {
	if (openCards.length > 1) {
		checkIfMatch(openCards);
	}
}

function checkIfMatch(array) {
		if (openCards[0].className === openCards[1].className) {
			openCards[0].parentElement.classList.add("right");
			openCards[1].parentElement.classList.add("right");
			setTimeout(isMatch,500);
		} else {
			openCards[0].parentElement.classList.add('wrong')
			openCards[1].parentElement.classList.add('wrong')
			setTimeout(notMatch,800);
		}
}

function isMatch() {
	for(let i = 0;i < openCards.length;i++) {
		openCards[i].parentElement.classList.remove('right');
		openCards[i].parentElement.classList.add('match');
		matchedCards.push(openCards[i]);
	}
	openCards = [];
	wonGameMessage(matchedCards);
	return matchedCards;
}

function notMatch() {
	for (let i = 0;i < openCards.length;i++) {
		openCards[i].parentElement.classList.remove('show');
		openCards[i].parentElement.classList.remove('open');
		openCards[i].parentElement.classList.remove('wrong')
	}
	openCards = [];
}
//************************************************************

//******COUNT MOVES*******************************************
let moves = 0;
let counter = document.querySelector('.moves');
function countMoves(event) {
	if (event.classList.contains('match')) {
		return;
	}
	else if (event.classList.contains('card')) {
		moves += 1;
		counter.textContent = moves;
	} else {return}
	starTaker();
	return moves;
}

//*************GAME WON MESSAGE*******************************
const youWonMessage = document.querySelector('.game-won-screen');
const score = document.querySelector('.your-score');

function wonGameMessage(array) {
	if (array.length === 16) {
		score.textContent = `You finished in ${secondsToMinutes()}, with ${moves} moves.`;
		earnedStarsMessage();
		stopTimer();
		youWonMessage.style.visibility = "visible";
	} else {return}
}
//************************************************************

//*************EXIT BUTTON************************************
function exitGame() {
	youWonMessage.style.visibility = "hidden";
}
//************************************************************

//***********TIMER********************************************
const time = document.querySelector('.time');
let intervalTimer = null;
let seconds = 0;
function timer() {
	seconds += 1;
	time.textContent = seconds;
	return time;
}

function startTimer() {
	if (seconds === 0) {
		stopTimer();
		intervalTimer = setInterval(timer,1000);
	}
	else {return}

	return intervalTimer;
}

function stopTimer() {
		clearInterval(intervalTimer);
		seconds = 0;
		return seconds;
}

//********SECONDS TO MINUTES************************************
function secondsToMinutes() {
	let minutes = 0;
	if (seconds >= 60) {
		minutes = Math.floor(seconds / 60);
		seconds = seconds - (minutes * 60);
		if (minutes === 1 && seconds === 1) {
			return minutes + " minute and " + seconds + " second";
		} else if (minutes === 1) {
			return minutes + " minute and " + seconds + " seconds";
		} else if (seconds === 1) {
			return minutes + " minutes and " + seconds + " second";
		} else {return minutes + " minutes and " + seconds + " seconds";}
	} else {return seconds + " seconds";}
}
//**************************************************************

//*********STARS************************************************
const stars = document.querySelectorAll('.score-panel .fa-star');
const starOne = stars[0];
const starTwo = stars[1];
const starThree = stars[2];
let goldStars = [starOne, starTwo, starThree];

function starTaker() {
	if (moves > 20 && starThree.classList.contains('gold')) {
		starThree.classList.remove('gold');
		goldStars.pop();
		return goldStars;
	} else if (moves >32 && starTwo.classList.contains('gold')) {
		starTwo.classList.remove('gold');
		goldStars.pop();
		return goldStars;
	} 
}

function starMaker(array) {
	for (let i = 0;i < array.length;i++) {
		array[i].classList.add('gold');
	}
	goldStars = [starOne, starTwo, starThree];
	return array, goldStars;
}


function earnedStarsMessage() {
	const yourStars = document.querySelector('.your-stars');
	let earnedStars = `You earned ${goldStars.length} stars!`;
	if (goldStars.length === 1) {
		earnedStars = `You earned ${goldStars.length} star.`;	
	} else {}
	yourStars.textContent = earnedStars;
	earnedStarsGraphic(goldStars);	
}


function earnedStarsGraphic(array) {
	const starUl = document.querySelector('.game-won-content .stars');
	let earnedStars = '';
	for (let i = 0;i < array.length;i++) {
		earnedStars += '<li><i class="fa fa-star gold"></i></li>';
	}
	starUl.innerHTML = earnedStars
}
//*****************************************************************





