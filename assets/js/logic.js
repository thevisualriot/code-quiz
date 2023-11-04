var startButton = document.querySelector('#submit');
var startScreen = document.querySelector('#start-screen');
var questions = document.querySelector('#questions');
var wrapper = document.querySelector('.wrapper');
var endScreen = document.querySelector('#end-screen');
var finalScore = document.querySelector('#final-score');
var initials = document.querySelector('#initials');
var users =[];


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