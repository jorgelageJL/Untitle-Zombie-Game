//VARIABLES

//FUNCIONES SALVAJES
function getCell(col, row) {
  return document.querySelector(`#row${row}>#col${col}`);
} // INPUT: (x,y) OUTPUT: (Referencia a celda)

function getCellClass(x, y) {
  let a = getCell(x, y);
  return a.getAttribute("class");
}

function lose() {
  if (player.x === enemy.x && player.y === enemy.y) {
    window.alert("GAME OVER");
    location.reload();
  }
}

///////////////////

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
  if (this.gameOn) {
    if (this.player.length > 0) this.player[0].move(a);
    if (this.enemy.length > 0) {
      this.enemy.map((a) => a.move());
    }
  }
};

Game.prototype.addPlayer = function () {
  if (this.player.length < 1) {
    this.player.push(new Soldier(2, 2, "soldier", ["wall", "zombie"]));
  }
};

Game.prototype.addEnemy = function () {
  this.enemy.push(new Zombie(4, 9, "zombie", ["dummy", "wall"]));
};

//////////////////

//OBJETO

function Pawn(x, y, type, blocked) {
  this.x = x;
  this.y = y;
  this.type = type;
  this.canMove = {
    up: true,
    left: true,
    rigth: true,
    down: true,
  };
  this.seeAround = {
    up: "",
    left: "",
    rigth: "",
    down: "",
  };
  this.blockedTerrain = [...blocked];
}

Pawn.prototype.show = function () {
  this.canGo();
  getCell(this.x, this.y).setAttribute("class", this.type);
  this.whatAround();
};

Pawn.prototype.hide = function () {
  this.whatAround();
  this.canGo();
  getCell(this.x, this.y).setAttribute("class", "floor");
};

Pawn.prototype.move = function () {
  this.hide();
  //console.log("Empty function, define by children");
  this.show();
};

Pawn.prototype.whatAround = function () {
  this.seeAround.up = getCellClass(this.x, this.y - 1);
  this.seeAround.left = getCellClass(this.x - 1, this.y);
  this.seeAround.down = getCellClass(this.x, this.y + 1);
  this.seeAround.rigth = getCellClass(this.x + 1, this.y);
};

Pawn.prototype.whithMe = function () {}; //PENDIENTE

Pawn.prototype.canGo = function () {
  this.canMove.up = true;
  this.canMove.left = true;
  this.canMove.down = true;
  this.canMove.rigth = true;
  for (let index = 0; index < this.blockedTerrain.length; index++) {
    if (this.seeAround.up === this.blockedTerrain[index]) {
      this.canMove.up = false;
    }
    if (this.seeAround.left === this.blockedTerrain[index]) {
      this.canMove.left = false;
    }
    if (this.seeAround.down === this.blockedTerrain[index]) {
      this.canMove.down = false;
    }
    if (this.seeAround.rigth === this.blockedTerrain[index]) {
      this.canMove.rigth = false;
    }
  }
};

// Soldado
function Soldier(x, y, type, blocked) {
  Pawn.call(this, x, y, type, blocked);
}
Soldier.prototype = Object.create(Pawn.prototype);
Soldier.prototype.constructor = Soldier;

Soldier.prototype.move = function (keyInput) {
  this.hide();
  if (keyInput === "a" && this.canMove.left) {
    this.x--;
  } else if (keyInput === "d" && this.canMove.rigth) {
    this.x++;
  } else if (keyInput === "w" && this.canMove.up) {
    this.y--;
  } else if (keyInput === "s" && this.canMove.down) {
    this.y++;
  }
  this.show();
};

// ZOMBIE
function Zombie(x, y, type, blocked) {
  Pawn.call(this, x, y, type, blocked);
  this.go = true;
}

Zombie.prototype = Object.create(Pawn.prototype);
Zombie.prototype.constructor = Zombie;

Zombie.prototype.move = function () {
  this.hide();

  if (this.go) {
    let a =
      Math.abs(this.x - newGame.player[0].x) <=
      Math.abs(this.y - newGame.player[0].y);
    console.log(
      Math.abs(this.x - newGame.player[0].x),
      Math.abs(this.y - newGame.player[0].y)
    );
    if (!a && this.x > newGame.player[0].x && this.canMove.left) {
      this.x--;
    } else if (!a && this.x < newGame.player[0].x && this.canMove.rigth) {
      this.x++;
    } else if (a && this.y > newGame.player[0].y && this.canMove.up) {
      this.y--;
    } else if (a && this.y < newGame.player[0].y && this.canMove.down) {
      this.y++;
    }
    this.go = false;
  } else {
    this.go = true;
  }
  this.show();
};

//LLAMADAS
map.createMap();
let newGame = new Game();
newGame.startGame();

window.addEventListener("keydown", (e) => {
  console.log(e);
  newGame.runLoop(e.key);
});
