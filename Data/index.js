//VARIABLES

//LLAMADAS
let player = new Soldier(5, 2);
let enemy = new Zombie(4, 6);

let peon = new Pawn(9, 19, "dummy");

let timeID = setInterval(loop, 1000);

//console.log(getCellClass(5, 2));

//FUNCIONES SALVAJES
function getCell(col, row) {
  return document.querySelector(`#row${row}>#col${col}`);
} // INPUT: (x,y) OUTPUT: (Referencia a celda)

function getCellClass(x, y) {
  let a = getCell(x, y);
  return a.getAttribute("class");
}

window.addEventListener("keydown", (e) => {
  player.setPos(e.key);
}); // REVISAR?

function loop() {
  player.setPos();
  enemy.setPos();
  peon.updatePosition();
  //console.log(getCellClass(5, 2));
} //REVISAR MUY FUERTE

///////////////////
const clickTarget = document.getElementById("click-target");
function build() {
  window.addEventListener("click", function cacafoti(e) {
    setTerrain(e);
  });
}
function play() {
  window.removeEventListener("click", cacafoti);
}

function setTerrain(b) {
  let a = true;
  console.log(b.path);
  //b.setAttribute("class", "wall");
  //console.log(b.getAttribute("class"));
}
//////////////////

//OBJETO

function Pawn(x, y, type) {
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
}

Pawn.prototype.show = function () {
  getCell(this.x, this.y).setAttribute("class", this.type);
};

Pawn.prototype.hide = function () {
  getCell(this.x, this.y).setAttribute("class", "celda");
};

Pawn.prototype.move = function () {
  //console.log("Empty function, define by children");
};

Pawn.prototype.updatePosition = function () {
  this.hide();
  this.move();
  this.show();
};

Pawn.prototype.whatAround = function () {
  if (!null) {
    this.seeAround.up = getCellClass(this.x, this.y - 1);
  }
  if (!null) {
    this.seeAround.left = getCellClass(this.x - 1, this.y);
  }
  if (!null) {
    this.seeAround.down = getCellClass(this.x, this.y + 1);
  }
  if (!null) {
    this.seeAround.rigth = getCellClass(this.x + 1, this.y);
  }
};

// Soldado
function Soldier(x, y) {
  this.x = x;
  this.y = y;
}
Soldier.prototype.show = function () {
  getCell(this.x, this.y).setAttribute("class", "soldado");
};

Soldier.prototype.hide = function () {
  getCell(this.x, this.y).setAttribute("class", "celda");
};

Soldier.prototype.setPos = function (a) {
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
function Zombie(x, y) {
  this.x = x;
  this.y = y;
}

Zombie.prototype.show = function () {
  getCell(this.x, this.y).setAttribute("class", "zombie");
};

Zombie.prototype.hide = function () {
  getCell(this.x, this.y).setAttribute("class", "celda");
};

Zombie.prototype.setPos = function () {
  this.hide();
  if (this.x > player.x) {
    this.x--;
  } else if (this.x < player.x) this.x++ === null;
  if (this.y > player.y) {
    this.y--;
  } else if (this.y < player.y) this.y++;
  this.show();
};
