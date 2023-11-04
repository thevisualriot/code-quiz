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

var numberOfQuestions = questionList.length;
var selectedAnswer;
var correctAnswer;
var message;
var score = 0;
var points = 10;
var n = 0;
var totalTime = 50;

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
    countTime();
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
    if (selectedAnswer == correctAnswer) {
        console.log("that's correct");
        score += points;
        storeScore(score);
        console.log(score);
        localStorage.setItem("answer", "Correct!");
    } else {
        console.log("that's wrong");
        console.log(score);
        storeScore(score);
        localStorage.setItem("answer", "Wrong!");
    }
    showAnswer();
    runQuestion(n+1);
}); 

function showQuestion () {
    var line = document.createElement('hr');
    questions.appendChild(line);
    message = document.createElement('p');
    if (selectedAnswer === correctAnswer) {
        message.textContent = "Correct!";
        questions.appendChild(message);
    } else {
        message.textContent = "Wrong!";
        questions.appendChild(message);
    }
}

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
        totalTime--;
        if(totalTime === 0){
            questions.setAttribute('class', 'hide');
            endScreen.setAttribute('class', 'start');
        }
    }, 1000);
}