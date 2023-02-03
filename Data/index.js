//VARIABLES

//FUNCIONES SALVAJES
function getCell(col, row) {
  return document.querySelector(`#row${row}>#col${col}`);
} // INPUT: (x,y) OUTPUT: (Referencia a celda)

function getCellClass(x, y) {
  let a = getCell(x, y);
  return a.getAttribute("class");
}

function loop() {
  player.move();
  enemy1.move();
  enemy2.move();
  enemy3.move();
  enemy4.move();
  //lose();
  //peon.move();
} //REVISAR MUY FUERTE

function lose() {
  if (player.x === enemy.x && player.y === enemy.y) {
    window.alert("GAME OVER");
    location.reload();
  }
}

/////////////////// IMPLEMENTAR CON VARIABLE GRLOBAL "CAN BUILD"

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

Soldier.prototype.move = function (a) {
  this.hide();
  if (a === "a" && this.canMove.left) {
    this.x--;
  } else if (a === "d" && this.canMove.rigth) {
    this.x++;
  } else if (a === "w" && this.canMove.up) {
    this.y--;
  } else if (a === "s" && this.canMove.down) {
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
    let a = Math.abs(this.x - player.x) <= Math.abs(this.y - player.y);
    console.log(Math.abs(this.x - player.x), Math.abs(this.y - player.y));
    if (!a && this.x > player.x && this.canMove.left) {
      this.x--;
    } else if (!a && this.x < player.x && this.canMove.rigth) {
      this.x++;
    } else if (a && this.y > player.y && this.canMove.up) {
      this.y--;
    } else if (a && this.y < player.y && this.canMove.down) {
      this.y++;
    }
    this.go = false;
  } else {
    this.go = true;
  }
  this.show();
};

//LLAMADAS
let player = new Soldier(5, 2, "soldier", ["dummy", "wall"]);
let enemy1 = new Zombie(4, 9, "zombie", ["dummy", "soldier", "wall"]);
let enemy2 = new Zombie(3, 6, "zombie", ["dummy", "soldier", "wall"]);
let enemy3 = new Zombie(4, 4, "zombie", ["dummy", "soldier", "wall"]);
let enemy4 = new Zombie(2, 2, "zombie", ["dummy", "soldier", "wall"]);

//let peon = new Pawn(5, 5, "dummy", []);

window.addEventListener("keydown", (e) => {
  player.move(e.key);
  loop();
});
