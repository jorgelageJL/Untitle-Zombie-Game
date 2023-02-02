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
  enemy.move();
  peon.move();
} //REVISAR MUY FUERTE

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
  this.blockedTerrain = blocked;
}

Pawn.prototype.show = function () {
  console.log(this.x, this.y)
  getCell(this.x, this.y).setAttribute("class", this.type);
};

Pawn.prototype.hide = function () {
  getCell(this.x, this.y).setAttribute("class", "floor");
};

Pawn.prototype.move = function () {
  this.hide();
  //console.log("Empty function, define by children");
  this.show();
  this.whatAround();
};

Pawn.prototype.whatAround = function () {
  this.seeAround.up = getCellClass(this.x, this.y - 1);
  this.seeAround.left = getCellClass(this.x - 1, this.y);
  this.seeAround.down = getCellClass(this.x, this.y + 1);
  this.seeAround.rigth = getCellClass(this.x + 1, this.y);
};

Pawn.prototype.canGo = function () {
  ///AQUI TE QUEDASTE
  if (this.seeAround.up === false) {
    this.canMove.up = false;
  } else if (this.seeAround.left === false) {
    this.canMove.left = false;
  } else if (this.seeAround.sown === false) {
    this.canMove.down = false;
  } else if (this.seeAround.rigth === false) {
    this.canMove.rigth = false;
  } else {
    this.canMove.up = true;
    this.canMove.left = true;
    this.canMove.down = true;
    this.canMove.rigth = true;
  }
};

// Soldado
function Soldier(x, y, type) {
  Pawn.call(this, x, y, type);
}

Soldier.prototype = Object.create(Pawn.prototype);
Soldier.prototype.constructor = Soldier;

Soldier.prototype.move = function (a) {
  this.hide();
  if (a === "a") {
    this.x--;
  } else if (a === "d") {
    this.x++;
  } else if (a === "w") {
    this.y--;
  } else if (a === "s") {
    this.y++;
  }
  this.show();
};

// ZOMBIE
function Zombie(x, y, type) {
  Pawn.call(this, x, y, type);
  this.go = true;
}

Zombie.prototype = Object.create(Pawn.prototype);
Zombie.prototype.constructor = Zombie;

Zombie.prototype.move = function () {
  this.hide();
  if (this.go) {
    if (this.x > player.x) {
      this.x--;
    } else if (this.x < player.x) this.x++ === null;
    if (this.y > player.y) {
      this.y--;
    } else if (this.y < player.y) this.y++;
    this.go = false;
  } else {
    this.go = true;
  }
  this.show();
};

//LLAMADAS
let player = new Soldier(5, 2, "soldier");
let enemy = new Zombie(4, 6, "zombie");

let peon = new Pawn(2, 2, "dummy");

loop();

window.addEventListener("keydown", (e) => {
  player.move(e.key);
  loop();
});
