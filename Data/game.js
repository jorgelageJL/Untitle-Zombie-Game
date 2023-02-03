function Game() {
  this.player = [];
  this.enemy = [];
  this.loop = [];
  this.gameOn = false;
}

Game.prototype.startGame = function () {
  this.addPlayer();
  this.addEnemy();
  this.player[0].show();
  this.enemy[0].show();
  this.gameOn = true;
};

Game.prototype.runLoop = function (a) {
  if (this.player.length > 0) this.player[0].move(a);
  if (this.enemy.length > 0)
    this.enemy.map((a) => a.move());
};

Game.prototype.stopLoop = function () {
  this.gameOn = false;
};

Game.prototype.addPlayer = function () {
  if (this.player.length < 1) {
    this.player.push(new Soldier(2, 2, "soldier", ["wall", "zombie"]));
  }
};

Game.prototype.addEnemy = function () {
  this.enemy.push(new Zombie(4, 9, "zombie", ["dummy", "wall"]));
};


let playGameButton = document.querySelector("#playGame");
let newGame;

playGameButton.onclick = function () {
  if (!newGame /*|| !newGame.gameOn*/) {
    playGameButton.innerText = 'Restart';
    map.createMap();
    newGame = new Game();
    newGame.startGame();

    window.addEventListener("keydown", (e) => {
      newGame.runLoop(e.key);
    });
  } else {
    playGameButton.innerText = 'Play Game';
    newGame.stopLoop();
    location.reload();
  }
};