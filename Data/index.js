let cuadricula = document.querySelectorAll('.celda')
let fila = []
for (let i = 1; i <= 20; i++) {
    fila.push(document.querySelector(`#row${i}>#col1`))
}
// console.log(document.querySelector(`#row3>#col4`));

function Peon(/*vida, balas,*/ x, y) {
    // this.vida = vida;
    // this.balas = balas;
    this.x = x;
    this.y = y;
}

Peon.prototype.spwan = function() {
    getCasilla(this.x, this.y).setAttribute('class', 'soldado');
}

Peon.prototype.setX = function (x) {
    this.x = x;
}


Peon.prototype.setY = function (y) {
    this.y = y;
}

function getCasilla(row, col) {
    return document.querySelector(`#row${row}>#col${col}`);
}

let s = new Peon(5, 1);
s.spwan()