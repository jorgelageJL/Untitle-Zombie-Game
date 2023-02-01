//VARIABLES

// let cuadricula = document.querySelectorAll(".celda");
let fila = [];
for (let i = 1; i <= 20; i++) {
  fila.push(document.querySelector(`#row${i}>#col1`));
}

console.log(document.querySelector(`#row3>#col4`));

//OBJETO

function Peon(/*vida, balas,*/ x, y) {
  // this.vida = vida;
  // this.balas = balas;
  this.x = x;
  this.y = y;
}

// PEON
Peon.prototype.show = function () {
  getCasilla(this.x, this.y).setAttribute("class", "soldado");
};

Peon.prototype.hide = function () {
  // console.log(this.x, this.y)
  getCasilla(this.x, this.y).classList.remove("soldado");
};
Peon.prototype.setPos = function (a) {
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
};

// ZOMBIE
function Zombie(/*vida, balas,*/ x, y) {
  // this.vida = vida;
  // this.balas = balas;
  this.x = x;
  this.y = y;
}

Zombie.prototype.show = function () {
  getCasilla(this.x, this.y).setAttribute("class", "zombie");
};

Zombie.prototype.hide = function () {
  // console.log(this.x, this.y)
  getCasilla(this.x, this.y).classList.remove("zombie");
};

Zombie.prototype.move = function () {
  let posSoldado = document.querySelector('.soldado')
  let posXsoldado = separarFilas(posSoldado.getAttribute('id'))
  let posYsoldado = separarFilas(posSoldado.parentElement.getAttribute('id'))

   console.log(posYsoldado)


  this.hide()
  /*if (this.x === 1) {
    this.x = 20;
    this.y--;
  } else {
    this.x--;
  }*/
  if (this.x > posXsoldado) {
    this.x--
 } else if (this.x < posXsoldado)
    this.x++
    if (this.y > posYsoldado) {
      this.y--
    } else if (this.y < posYsoldado)
    this.y++
  this.show()
};

//FUNCIONES SALVAJES
function getCasilla(col, row) {
  return document.querySelector(`#row${row}>#col${col}`);
}
let tecla = "d";
tecla = window.addEventListener("keydown", (e) => {
  //   console.log(e.key);
  s.setPos(e.key);
});

function separarFilas(str) {
  let s = ''
  for (let i of str) {
    if (i >= 0 && i <= 9)
    s += i
  }
  return parseInt(s)
}

function limpiaCelda() {
  // document.querySelectorAll("td").setAttribute("class", "celda");
  s.setPos();
  s.show();
  ene1.show();
  ene1.move();
  // s.hide();
}

function loop() {
  limpiaCelda();
}

///LLAMADAS
let s = new Peon(5, 1);
let ene1 = new Zombie(4, 6);

let timeID = setInterval(loop, 1000);

// console.log(document.querySelectorAll("td"));
