//VARIABLES

let cuadricula = document.querySelectorAll(".celda");
let fila = [];
for (let i = 1; i <= 20; i++) {
  fila.push(document.querySelector(`#row${i}>#col1`));
}

// console.log(document.querySelector(`#row3>#col4`));

//OBJETO

function Peon(/*vida, balas,*/ x, y) {
  // this.vida = vida;
  // this.balas = balas;
  this.x = x;
  this.y = y;
}

Peon.prototype.show = function () {
  getCasilla(this.x, this.y).setAttribute("class", "soldado");
};

/*Peon.prototype.hide = function () {
  getCasilla(this.x, this.y).setAttribute("class", "celda");
};*/

Peon.prototype.setPos = function (a) {
  if (a === "a") this.x--;
  else if (a === "d") this.x++;
  else if (a === "w") this.y--;
  else if (a === "s") this.y++;
};

//FUNCIONES SALVAJES
function getCasilla(col, row) {
  return document.querySelector(`#row${row}>#col${col}`);
}
let tecla = "d";
tecla = window.addEventListener("keydown", (e) => {
  console.log(e.key);
  s.setPos(e.key);
});

function limpiaCelda() {
  document.querySelectorAll("td").setAttribute("class", "celda");
}

function loop() {
  limpiaCelda();
  s.setPos();
  s.show();
}

///LLAMADAS
let s = new Peon(5, 1);

let timeID = setInterval(loop, 33);

console.log(document.querySelectorAll("td"));