const cards = document.querySelectorAll('.card');
var correctSound = new Audio("audio/correct.mp3");
var wrongSound = new Audio("audio/wrong.mp3");
var bgSound = new Audio("audio/forest.mp3");
var selectSound = new Audio("audio/select.mp3");
var turned = false;
var locked = true;
var sec = 60;
var first, second;
var score = 0;

function turnover() {
    if (locked) 
        return;

    if(this === first) 
        return;
    this.classList.add('front')

    if (!turned) {
        turned = true;
        first = this;
    } else {
        turned = false;
        second = this;     
        checkForMatch();
    }
} 

function checkForMatch() {
    if (first.dataset.framework == second.dataset.framework) {
        matchedCards();
        score = score + 1;
    } else {
        unflipCards();
    }
}

function matchedCards(){
    locked = true;
    correctSound.play();
    setTimeout(() => {
        first.removeEventListener('click',turnover);
        second.removeEventListener('click',turnover);
        reset();
    }, 1500);
}

function unflipCards(){
    locked = true;
    wrongSound.play();
    setTimeout(() => {
        first.classList.remove('front');
        second.classList.remove('front');
        reset();
    }, 1500);
}

function reset() {
    turned = false;
    locked = false;
    first = null;
    second = null;
}

function start() {
    selectSound.play();
    locked = false;
    document.getElementById("startBtn").style.display = "none";
    document.getElementById("difficulty").style.display = "none";
    document.getElementById("easyBtn").style.display = "none";
    document.getElementById("normalBtn").style.display = "none";
    document.getElementById("hardBtn").style.display = "none";
    document.getElementById("instruction").innerHTML = "Let's go!";
    bgSound.play();
    cards.forEach(card => card.addEventListener('click', turnover));
    cards.forEach(card => card.classList.remove('front'));
    shuffle();
    document.getElementById("count").innerHTML = sec;
    countdown(sec);
}

function easylvl() {
    sec = 60;
    selectSound.play();
    document.getElementById("count").innerHTML = sec;
    document.getElementById("easyBtn").style.backgroundColor = "orange";
    document.getElementById("normalBtn").style.backgroundColor = "brown";
    document.getElementById("hardBtn").style.backgroundColor = "brown";
}

function normallvl() {
    sec = 45;
    selectSound.play();
    document.getElementById("count").innerHTML = sec;
    document.getElementById("easyBtn").style.backgroundColor = "brown";
    document.getElementById("normalBtn").style.backgroundColor = "orange";
    document.getElementById("hardBtn").style.backgroundColor = "brown";
}

function hardlvl() {
    sec = 30;
    selectSound.play();
    document.getElementById("count").innerHTML = sec;
    document.getElementById("easyBtn").style.backgroundColor = "brown";
    document.getElementById("normalBtn").style.backgroundColor = "brown";
    document.getElementById("hardBtn").style.backgroundColor = "orange";
}

function finish() {
    locked = true;
    document.getElementById("startBtn").style.display = "inline-block";
    document.getElementById("difficulty").style.display = "inline-block";
    document.getElementById("easyBtn").style.display = "inline-block";
    document.getElementById("normalBtn").style.display = "inline-block";
    document.getElementById("hardBtn").style.display = "inline-block";
    if (score == 6) {
        document.getElementById("instruction").innerHTML = "Congraduations!";
    } else {
        document.getElementById("instruction").innerHTML = "Game Over...";
    }
    bgSound.pause();
    bgSound.currentTime = 0;
    score = 0;
}

function shuffle() {
    cards.forEach(card => {
        let position = Math.floor(Math.random() * 12);
        card.style.order = position;
    });
}

function countdown(sec) {    
    var time = sec;
    var timer = setInterval ( function() {
        time = time - 1;
        if (score == 6) {
            finish();
            clearInterval(timer);
        } 

        if (time > 0) {
            document.getElementById("count").innerHTML = time;
            if (time == 10) {
                document.getElementById("instruction").innerHTML = "Hurry up!";
            }
        } else if (time == 0){
            document.getElementById("count").innerHTML = time;
            clearInterval(timer);
            finish();
        }
    },1000);
}