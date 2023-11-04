var highscores = document.querySelector('#highscores');
var clearButton = document.querySelector('#clear');
var wrapper = document.querySelector('.wrapper');

var usersList = [];

if (localStorage.getItem('users') !== null){
    var usersList = JSON.parse(localStorage.getItem('users'));

    usersList.shift();

    usersList.sort(function(a, b) {
    return b.score - a.score;
});

    for(var i = 0; i < usersList.length; i++){
        var liEl = document.createElement('li');
        liEl.textContent = usersList[i].initials + " - " + usersList[i].score;
        highscores.appendChild(liEl);
        console.log('initials ' + usersList[i].initials);
        console.log('score ' + usersList[i].score);
}
}




clearButton.addEventListener('click', function(e){
    console.log(e);
    console.log('working');
    localStorage.clear();
    location.reload();
})