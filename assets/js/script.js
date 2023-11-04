var questionList = [
    {
        "question": "What does HTML stand for?",
        "A": "Hyper Text Markup Language",
        "B": "Hyper Transfer Markup Language",
        "C": "Hyperlinks and Text Markup Language",
        "D": "Home Tool Markup Language",
        "correct": "A",
    },
    {
        "question": "In JavaScript, what is the purpose of the 'document.getElementById' method?",
        "A": "Define a variable in the document",
        "B": "Create a new HTML element",
        "C": "Change the document's font size",
        "D": "Retrieve an HTML element by its ID",
        "correct": "D",
    },
    {
        "question": "Which HTML tag is used to link an external JavaScript file?",
        "A": "<js>",
        "B": "<link>",
        "C": "<script>",
        "D": "<javascript>",
        "correct": "C", 
    },
    {
        "question": "What is the correct way to comment out a single line of code in JavaScript?",
        "A": "// This is a comment",
        "B": "<!-- This is a comment -->",
        "C": "/* This is a comment */",
        "D": "# This is a comment", 
        "correct": "A", 
    },
    {
        "question": "Which CSS property is used to change the text color of an element?",
        "A": "text-color",
        "B": "color",
        "C": "font-color",
        "D": "style-color", 
        "correct": "B", 
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
var totalTime = 50;
var totalInterval;


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


/* ----------------- QUESTIONS -------------------- */

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
        questions.setAttribute('class', 'hide');
        endScreen.setAttribute('class', 'start');
        clearInterval(totalInterval);
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
    showAnswer();
    n++;
    runQuestion(n);
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
    totalInterval = setInterval(function() {
        remainingTime.textContent = Math.max(totalTime, 0);
        totalTime--;
        if(totalTime <= 0){
            questions.setAttribute('class', 'hide');
            endScreen.setAttribute('class', 'start');
        } 
    }, 1000);
}