


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



function countTime(){
    setInterval(function() {
        remainingTime.textContent = totalTime;
        totalTime--;
        if(totalTime === 0){
            questions.setAttribute('class', 'hide');
            endScreen.setAttribute('class', 'start');
        }
    }, 1000);
}