var gameStarted = false;
var level = 1;
var buttonId = ["green", "red", "yellow", "blue"];
var userClicked = [];
var createdSequence = [];

$(document).ready(() => {
    $(".btn").click(e => {
        if (gameStarted == false) return;
        userClicked.push(e.target.id); //using js
        console.log($(e.target).attr("id")); //using jquery
        e.target.classList.add("pressed");
        $("#" + e.target.id + "Audio")[0].play();
        setTimeout(() => { e.target.classList.remove("pressed") }, 100);
        if (userClicked.length && userClicked[userClicked.length - 1] == createdSequence[userClicked.length - 1]) {
            if (userClicked.toString() == createdSequence.toString()) {
                increaseLevel();
            }
        } else {
            playSound("wrong.mp3");
            setTimeout(resetGame(), 200);

        }
    });
    $(document).keypress((event) => {
        if (gameStarted == false && (event.key == "A" || event.key == "a")) {
            startGame();
        }
    });
});
function createSequence() {
    var sq = [];
    for (let i = 0; i < level + 3; i++) {
        sq.push(buttonId[Math.floor(Math.random() * 4)]);
    }
    return sq;
}
function playSound(name) {
    var audioFile = new Audio("/sounds/" + name);
    audioFile.play();
}
function startGame() {
    userClicked = [];
    createdSequence = [];
    $("#level-title").text("Level " + level);
    createdSequence = createSequence();
    createdSequence.forEach(x => {
        $("#" + x).delay(600 - level * 5).fadeOut().fadeIn();
    });
    gameStarted = true;
}
function increaseLevel() {
    level++;
    startGame();
}
function resetGame() {
    gameStarted = false;
    level = 1;
    userClicked = [];
    createdSequence = [];
    $("#level-title").text("Game Over,Press A Key to Start");
}