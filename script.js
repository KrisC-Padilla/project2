const introSound = new Audio("8bitadv.mp3");
const moveSound = new Audio("retroclick.wav");
const gameOverSound = new Audio("funnygameover.wav");
window.onload = playIntroSound();

//function to play sound
function playIntroSound() {
  introSound.play();
  introSound.loop = true;
  introSound.volume = 0.2;
}

//eventlistener to start animation using start button
startBtn.addEventListener("click", function () {
  block.style.animation = "slideDown 1s infinite";
});

//these are functions to move the character from left to right
function moveLeft() {
  let left = parseInt(
    window.getComputedStyle(character).getPropertyValue("left")
  );
  moveSound.play();
  left -= 100;
  if (left >= 0) {
    character.style.left = `${left}px`;
  }
}
function moveRight() {
  let left = parseInt(
    window.getComputedStyle(character).getPropertyValue("left")
  );
  moveSound.play();
  left += 100;
  if (left <= 900) {
    character.style.left = `${left}px`;
  }
}

//eventlistener to call both functions if arrow keys are pressed
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    moveLeft();
  } else {
    moveRight();
  }
});

//to change the position of the block: can be 0px-900px and initialize the score counter
let scoreCounter = 0;
let block = document.getElementById("block");
block.addEventListener("animationiteration", () => {
  let randomWay = Math.floor(Math.random() * 9);
  left = randomWay * 100;
  block.style.left = `${left}px`;
  scoreCounter++;
});

//hit detection (gameover):  function to know if the blocks hit each other
setInterval(function () {
  let characterLeft = parseInt(
    window.getComputedStyle(character).getPropertyValue("left")
  );
  let blockLeft = parseInt(
    window.getComputedStyle(block).getPropertyValue("left")
  );
  let blockTop = parseInt(
    window.getComputedStyle(block).getPropertyValue("top")
  );

  if (characterLeft == blockLeft && blockTop >= 200) {
    gameOverSound.play();
    alert(`OOPS! YOU LOSE!  SCORE:  ${scoreCounter}`);
    gameReset();
  }
}, 1);

//function to reset the game
function gameReset() {
  scoreCounter = 0;
  block.style.animation = "";
}

//function to change characters
function characterChange() {
  let charImage = document.getElementById("charImg");
  if (charImage.src.match("ava.png")) {
    charImage.src = "ian.png";
    alert("You've chosen IAN. The dashing blue block.");
  } else if (charImage.src.match("ian.png")) {
    charImage.src = "kris.png";
    alert("You've chosen KRIS. The Big Green block.");
  } else {
    charImage.src = "ava.png";
    alert("You've chosen AVA. The carefree yellow block.");
  }
}

//function to change background in the game container
function howToAlertBox() {
  alert(
    "Thank you for playing Block Oops! We hope you'll find it fun to play with. You can choose between three characters: AVA, IAN and KRIS. To play the game, use your arrow keys to move the character from left to right. Avoid being hit by DIBEL (the monster block in town!) to get a point. Hope you enjoy! Thank you."
  );
}
