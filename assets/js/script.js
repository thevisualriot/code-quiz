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
var remainingTime = document.querySelector('#time');
var startButton = document.querySelector('#submit');
var startScreen = document.querySelector('#start-screen');
var wrapper = document.querySelector('.wrapper');
var endScreen = document.querySelector('#end-screen');
var finalScore = document.querySelector('#final-score');
var initials = document.querySelector('#initials');

var numberOfQuestions = questionList.length;
var correctAnswer;
var message;
var score = 0;
var points = 10;
var n = 0;
var users =[];
var totalTime = 60;
var totalInterval;


// get Users from local storage
if(localStorage.getItem('users') !== null){
    users = JSON.parse(localStorage.getItem('users'));
} else {
    users = [{
        'initials': '',
        'score': '',
    }];
}

/* ------------------ START THE QUIZ ----------------------- */
startScreen.addEventListener('click', function(e){
    if (e.target.matches('button')){
    startScreen.setAttribute('class', 'hide');
    questions.setAttribute('class', 'start');
    countTime();
    } 
});


/* ----------------- QUESTIONS -------------------- */

// add buttons
var answerA = document.createElement('button');
answerA.setAttribute('id', 'A');
var answerB = document.createElement('button');
answerB.setAttribute('id', 'B');
var answerC = document.createElement('button');
answerC.setAttribute('id', 'C');
var answerD = document.createElement('button');
answerD.setAttribute('id', 'D');

// display questions
runQuestion(n);


// RUN QUESTION FUNCTION
function runQuestion(n){
    if (n < numberOfQuestions) { // run if there are still questions left
        // update text of buttons and questions title
        title.textContent = questionList[n].question;
        answerA.textContent = questionList[n].A;
        answerB.textContent = questionList[n].B;
        answerC.textContent = questionList[n].C;
        answerD.textContent = questionList[n].D;
        correctAnswer = questionList[n].correct; // store the correct answer

        choices.append(answerA);
        choices.append(answerB);
        choices.append(answerC);
        choices.append(answerD); 

    } else { // if there is no more questions
        questions.setAttribute('class', 'hide');
        endScreen.setAttribute('class', 'start');
        clearInterval(totalInterval); // stop the timer
    }
}

// Set up the ANSWER BUTTON action
choices.addEventListener('click', function(e){
    var selectedAnswer = e.target.id; // store the selected answer
    if (selectedAnswer === correctAnswer) {  // if the answer is correct
        score += points; // add points to the score
        finalScore.textContent = score;
        storeScore(score); // store score
        localStorage.setItem("answer", "Correct!"); 
    } else { // if the answer was wrong
        totalTime -= points; // subtract time from the clock
        finalScore.textContent = score;
        storeScore(score); // store score
        localStorage.setItem("answer", "Wrong!");
    } 
    showAnswer(); // run function to display if the answer is correct or not
    n++; // jump to the next question
    runQuestion(n);
}); 


// STORE SCORE function
function storeScore(score){
    localStorage.setItem("score", score);
}

// SHOW IF ANSWER WAS CORRECT function
function showAnswer(){
    var line = document.createElement('hr'); // create a line
    questions.appendChild(line); // show the line
    var isItCorrect = document.createElement('p'); // create a paragraph
    isItCorrect.textContent = localStorage.getItem('answer'); // show if last answer was correct
    questions.appendChild(isItCorrect); // display
    // make it disappear after a second
    var counter = 1;
    var timer = setInterval(function() {
        counter--;
        if(counter === 0){
            questions.removeChild(line);
            questions.removeChild(isItCorrect);
        }
    }, 1000);
}

// CLOCK function
function countTime(){
    totalInterval = setInterval(function() {
        remainingTime.textContent = Math.max(totalTime, 0); //only display values over or equal 0
        totalTime--;
        if(totalTime <= 0){ // if time is over jump to end screen
            questions.setAttribute('class', 'hide');
            endScreen.setAttribute('class', 'start');
        } 
    }, 1000);
}



/* -------------------- GET DATA ABOUT NEW PLAYER ---------------------------*/

endScreen.addEventListener('click', function(e){
    if(e.target.matches('button')){
        // add new player and score to the localStorage
        var newInitials = initials.value;
        var newScore = localStorage.getItem('score');
        var newUser = {
            'initials': newInitials,
            'score': newScore,
        }
        users.push(newUser); // add new player's data to array with all users
        localStorage.setItem('users', JSON.stringify(users)); // update localStorage

        // Go to HIGHSCORES.HTML
        window.location.href='highscores.html';
    }
})