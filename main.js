let CARD_ARRAY = ['fa-anchor', 'fa-anchor', 'fa-bicycle', 'fa-bolt', 'fa-cube', 'fa-gem', 'fa-gem', 'fa-plane', 'fa-leaf', 'fa-bomb', 'fa-leaf', 'fa-bomb', 'fa-bolt', 'fa-bicycle', 'fa-plane', 'fa-cube','fa-heart','fa-heart','fa-star-of-david','fa-star-of-david'];
const INIT_TIME = 0;
const startBtn = document.querySelector('.start');
const stopBtn = document.querySelector('.stop');
const gameTimer = document.querySelector('.time');
const score = document.querySelector('.score');
const tries = document.querySelector('.tries');
const popUp = document.querySelector('.popup');
const popUpText = document.querySelector('.popup__message');
const popUpBtn = document.querySelector('.popup__btn');
let firstClick = null, secondClick = null;
let li1 = null, li2 = null; 
let move = 0;
let totalScore = 0;
let machedCard = 0;
let timer = undefined;

startBtn.addEventListener('click',()=>{
    startGame();
});
stopBtn.addEventListener('click',()=>{
    stopGameTimer();
    showPopUpWithText('REPLAY❓');
    hideBtn();
});
popUpBtn.addEventListener('click',()=>{
    startGameTimer();
    hidePopUp();
    initValue();
    restartClick();
    showBtn();
});
function startGame(){
    initValue();
    startGameTimer();
    let list = document.getElementsByClassName("board");
    list[0].innerHTML = '';
    let cardsShuffled = shuffle(CARD_ARRAY);
    for (let card of cardsShuffled) {
        let c = newCard(card);
        list[0].appendChild(c);
    }
    let cards = list[0].getElementsByClassName("card")
    for (let c of cards) {
        pickACard(c);
    }
}
function finishGame(){
    stopGameTimer();
    showPopUpWithText('Congraturations🎉🎉🎉');
    hideBtn();
}
function initValue(){
    machedCard = 0;
    startGame = 0;
    moves = 0;
    score.textContent = 0;
    tries.textContent = 0;
    li1 = null;
    li2 = null;
}
function showBtn(){
    startBtn.style.visibility ='visible';
    stopBtn.style.visibility ='visible';
}
function hideBtn(){
    startBtn.style.visibility ='hidden';
    stopBtn.style.visibility ='hidden';
}

const pickACard = card => {
    card.addEventListener('click', function(e){
        let li = e.currentTarget;
        if (li.classList.contains('open') && li.classList.contains('show')) {
            return true;
        }
        let icon = li.getElementsByClassName('fa')[0].className;
        if (firstClick === null && secondClick === null) {
            firstClick = icon;
            li1 = li; 
        } else if (firstClick !== null && secondClick === null) {
            secondClick = icon;
            li2 = li; 
            if (firstClick === secondClick) {
                li1.classList.add('match');
                li1.classList.add('true');
                li2.classList.add('match');
                li2.classList.add('true');
                totalScore+=5;
                score.innerHTML = totalScore;
                machedCard++;
                if (machedCard === 10) {
                    finishGame();
                }
            } 
            else {
                li1.classList.add('unMatch');
                li2.classList.add('unMatch');
                totalScore -= 1;
                score.innerHTML = totalScore;
                setTimeout(function () {
                    closeUnmatchedCards();
                }, 750)
            }
            moveCounter();
            restartClick();
        }
        displaySymbol(li);
    })
};
function restartClick() {
    firstClick = null;
    secondClick = null;
}
function closeUnmatchedCards() {
    let els = document.getElementsByClassName('unMatch');
    Array.from(els).forEach(el => {
        el.classList.remove('unMatch');
        el.classList.remove('show');
        el.classList.remove('open');
    });
}
function displaySymbol(el) {
    el.classList.add("open");
    el.classList.add("show");
}
function moveCounter() {
    move++;
    tries.innerHTML = move;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

const newCard = cardClass => {
    let li = document.createElement("li");
    li.classList.add("card");
    let icon = document.createElement("i");
    li.appendChild(icon);
    icon.classList.add("fa");
    icon.classList.add(cardClass);
    return li;
};

function startGameTimer(){
    let gameTime = INIT_TIME;
    updateTimerText(gameTime);
    timer = setInterval(() => {updateTimerText(++gameTime)},1000);
}
function stopGameTimer(){
    clearInterval(timer);
}
function hidePopUp(){
    popUp.classList.add('popup__hide');
}
function showPopUpWithText(text){
    popUpText.innerText = text;
    popUp.classList.remove('popup__hide');
}
function updateTimerText(time){
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerText = `${minutes}:${seconds}`;
}