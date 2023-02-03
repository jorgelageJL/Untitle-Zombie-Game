let music = new Audio('./Data/assests/sounds/night.wav')

playGame.addEventListener("click", () => {
    music.preload = "auto";
    music.loop = true;
    music.play();
});



/*

document.getElementById("zombie").onclick = playGameButton

document.getElementById("zombie").onclick = soundZombie;

function soundZombie() {
    var sound_Zombie = document.getElementById("zombie");
    sound_Zombie.className += " enemy";
    var sound_Zombie = document.getElementById("zombie");
    sound_Zombie.play("./sounds/zombie.mp3");
}


const soundZombie = new soundZombie("./sounds/zombie.mp3");
 /sounds/mistery.wav */