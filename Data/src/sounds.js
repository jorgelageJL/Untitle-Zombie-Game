
// VARIABLES SONIDOS
let music = new Audio('./Data/assests/sounds/night.wav')

let soundPlayer = new Audio('./Data/assests/sounds/mistery.wav')

let soundSword = new Audio('./Data/assests/sounds/sword.mp3')
let soundDamage = new Audio('./Data/assests/sounds/sword_damage.mp3')

let soundvictory = new Audio('./Data/assests/sounds/victory.mp3')
let soundgameover = new Audio('./Data/assests/sounds/mistery.wav')



playGame.addEventListener("click", () => {
    music.preload = "auto";
    music.loop = true;
    music.play();
});







/*
damage.addEventListener("click", () => {
    soundDamage.preload = "auto";
    soundDamage.play();
});

let soundZombie = new Audio('./Data/assests/sounds/zombie.mp3')
let sound_Zombie = Zombie.move
sound_Zombie.addEventListener(" ", () => {
    soundZombie.play();
});

document.getElementById("zombie").onclick = soundZombie;

function soundZombie() {
    var sound_Zombie = document.getElementById("zombie");
    sound_Zombie.className += " enemy";
    var sound_Zombie = document.getElementById("zombie");
    sound_Zombie.play("./sounds/zombie.mp3");
}
 */