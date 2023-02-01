//VARIABLES
//LLAMADAS
let player = new Soldier(5, 1);
let enemy = new Zombie(4, 6);

let timeID = setInterval(loop, 1000);

//OBJETO
function Soldier(x, y) {
  this.x = x;
  this.y = y;
}

//FUNCIONES SALVAJES
function getCasilla(col, row) {
  return document.querySelector(`#row${row}>#col${col}`);
} // INPUT: (x,y) OUTPUT: (Referencia a celda)

window.addEventListener("keydown", (e) => {
  player.setPos(e.key);
}); // REVISAR?

function loop() {
  player.setPos();
  enemy.setPos();
} //REVISAR MUY FUERTE

// Soldado
Soldier.prototype.show = function () {
  getCasilla(this.x, this.y).setAttribute("class", "soldado");
};

Soldier.prototype.hide = function () {
  getCasilla(this.x, this.y).classList.remove("soldado");
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
  getCasilla(this.x, this.y).setAttribute("class", "zombie");
};

Zombie.prototype.hide = function () {
  getCasilla(this.x, this.y).classList.remove("zombie");
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
