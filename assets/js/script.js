var questionList = [
    {
        "question": "Question 1",
        "A": "Answer 1",
        "B": "Answer 2",
        "C": "Answer 3",
        "D": "Answer 4",
        "correct": "D",
    },
    {
        "question": "Question 2",
        "A": "Answer 1",
        "B": "Answer 2",
        "C": "Answer 3",
        "D": "Answer 4",
        "correct": "D",
    },
    {
        "question": "Question 3",
        "A": "Answer 1",
        "B": "Answer 2",
        "C": "Answer 3",
        "D": "Answer 4",
        "correct": "D", 
    },
    {
        "question": "Question 4",
        "A": "Answer 1",
        "B": "Answer 2",
        "C": "Answer 3",
        "D": "Answer 4", 
        "correct": "D", 
    },
    {
        "question": "Question 5",
        "A": "Answer 1",
        "B": "Answer 2",
        "C": "Answer 3",
        "D": "Answer 4", 
        "correct": "D", 
    }
];

var questions = document.querySelector('#questions');
var title = document.querySelector('#question-title');
var choices = document.querySelector('#choices');
var endScreen = document.querySelector('#end-screen');
var remainingTime = document.querySelector('#time');
var startButton = document.querySelector('#submit');
var startScreen = document.querySelector('#start-screen');
var wrapper = document.querySelector('.wrapper');
var endScreen = document.querySelector('#end-screen');
var finalScore = document.querySelector('#final-score');
var initials = document.querySelector('#initials');

var numberOfQuestions = questionList.length;
var selectedAnswer;
var correctAnswer;
var message;
var score = 0;
var points = 10;
var n = 0;
var users =[];
var totalTime = 5;


if(localStorage.getItem('users') !== null){
    users = JSON.parse(localStorage.getItem('users'));
} else {
    users = [{
        'initials': '',
        'score': '',
    }];
}


startScreen.addEventListener('click', function(e){
    if (e.target.matches('button')){
    startScreen.setAttribute('class', 'hide');
    questions.setAttribute('class', 'start');
    countTime();
    } 
});


finalScore.textContent = localStorage.getItem('score');

endScreen.addEventListener('click', function(e){
    if(e.target.matches('button')){
        var newInitials = initials.value;
        var newScore = localStorage.getItem('score');
        var newUser = {
            'initials': newInitials,
            'score': newScore,
        }
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        window.location.href='highscores.html';
    }
})




var answerA = document.createElement('button');
answerA.setAttribute('id', 'A');
var answerB = document.createElement('button');
answerB.setAttribute('id', 'B');
var answerC = document.createElement('button');
answerC.setAttribute('id', 'C');
var answerD = document.createElement('button');
answerD.setAttribute('id', 'D');

runQuestion(n);


function runQuestion(n){
    if (n < numberOfQuestions) {
        title.textContent = questionList[n].question;
        answerA.textContent = questionList[n].A;
        answerB.textContent = questionList[n].B;
        answerC.textContent = questionList[n].C;
        answerD.textContent = questionList[n].D;
        correctAnswer = questionList[n].correct;

        choices.append(answerA);
        choices.append(answerB);
        choices.append(answerC);
        choices.append(answerD); 

    } else {
        return;
    }
}


choices.addEventListener('click', function(e){
    selectedAnswer = e.target.id;
    if (selectedAnswer == correctAnswer && totalTime > 0) {
        console.log("that's correct");
        score += points;
        storeScore(score);
        console.log(score);
        localStorage.setItem("answer", "Correct!");
    } else if (selectedAnswer != correctAnswer) {
        console.log("that's wrong");
        totalTime -= points;
        console.log(score);
        storeScore(score);
        localStorage.setItem("answer", "Wrong!");
    } 
    // else if (selectedAnswer != correctAnswer && totalTime <= 10) {
    //     questions.setAttribute('class', 'hide');
    //     endScreen.setAttribute('class', 'start');
    // }
    showAnswer();
    runQuestion(n+1);
}); 




function storeScore(score){
    localStorage.setItem("score", score);
}

function init(){
    var storedScore = localStorage.getItem('score');
    if(storedScore) {
        score = storedScore;
    }
}

function showAnswer(){
    var line = document.createElement('hr');
    questions.appendChild(line);
    var isItCorrect = document.createElement('p');
    isItCorrect.textContent = localStorage.getItem('answer');
    questions.appendChild(isItCorrect);
    var counter = 1;
    var timer = setInterval(function() {
        counter--;
        if(counter === 0){
            questions.removeChild(line);
            questions.removeChild(isItCorrect);
        }
    }, 1000);
}


function countTime(){
    setInterval(function() {
        remainingTime.textContent = Math.max(totalTime, 0);
        totalTime--;
        if(totalTime <= 0){
            questions.setAttribute('class', 'hide');
            endScreen.setAttribute('class', 'start');
        } 
    }, 1000);
}