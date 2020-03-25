var gameOn = false;
var level = 1;
var buttonId = ["green", "red", "yellow", "blue"];
var userClicked = [];
var createdSequence = [];
$(document).ready(() => {
    $("div[type='button']").click(e => {
        if (gameOn == false) return;
        userClicked.push(e.target.id);
        if (userClicked.length && userClicked[userClicked.length - 1] == createdSequence[userClicked.length - 1]) {
            if (userClicked.toString() == createdSequence.toString()) {
                increaseLevel();
            }
        } else {
            resetGame();
        }
    });
    $(document).keypress((event) => {
        if (event.key == "A" || event.key == "a") {
            console.log(event.key);
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
function startGame() {
    userClicked = [];
    createdSequence = [];
    $("#level-title").text("Level " + level);
    createdSequence = createSequence();
    createdSequence.forEach(x => {
        $("#" + x).delay(2000 - level * 50).fadeOut().fadeIn();
        console.log('done');
    });
    gameOn = true;
}
function increaseLevel() {
    level++;
    startGame();
}
function resetGame() {
    gameOn = false;
    level = 1;
    userClicked = [];
    createdSequence = [];
    $("#level-title").text("Press A Key to Start");
}