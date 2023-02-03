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
  this.entities = [];
  this.loop = [];
  this.gameOn = false;
}

Game.prototype.startGame = function () {
  this.addPlayer();
  this.addEnemy(3);
  this.entities.push(new Sword(5, 4, "sword"));
  this.entities.map((a) => a.show());
  this.gameOn = true;
};

Game.prototype.stopLoop = function () {
  this.gameOn = false;
};

Game.prototype.runLoop = function (keyInput) {
  // if (this.gameOn) {
  if (this.entities.length > 0) this.entities.map((b) => b.move(keyInput));
  // }
};

Game.prototype.addPlayer = function () {
  if (!this.entities.includes(this.getPlayer())) {
    this.entities.push(new Soldier(2, 2, "soldier"));
  }
};

Game.prototype.getPlayer = function () {
  return this.entities.filter((a) => a.type === "soldier")[0];
};

Game.prototype.addEnemy = function (num) {
  for (let index = 0; index < num; index++) {
    this.entities.push(new Zombie(4 + index, 8, "zombie"));
  }
};

Game.prototype.getEnemy = function (x, y) {
  return this.entities.filter((a) => a.type === "zombie"
  && a.x === x && a.y === y)[0];
};

Game.prototype.getEnemys = function () {
  return this.entities.filter((a) => a.type === "zombie");
};

Game.prototype.removeEnemy = function (x, y) {
  let del = 
  this.entities.splice()
  // let enemy = this.getEnemy(x, y);
  // console.log(enemy);
  // return ;
};

// Game.prototype.addSword = function () {
//   console.log(this.getPlayer());
//   // this.entities.push(new Sword(2, 2, "sword"));
// };

Game.prototype.getSword = function () {
  return this.entities.filter((a) => a.type === "sword")[0];
};

Game.prototype.overlap = function () {
  let a = [];
  let b = [];
  for (let i = 1; i < map.x; i++) {
    b = [];
    for (let j = 1; j < map.y; j++) {
      b.push(getCellClass(i, j));
    }
    a.push(b);
  }
  return a;
};

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
  this.blockedTerrain = [];
  this.target = [];
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
function Soldier(x, y, type) {
  Pawn.call(this, x, y, type);
  this.blockedTerrain = ["wall", "zombie"];
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
function Zombie(x, y, type) {
  Pawn.call(this, x, y, type);
  this.go = true;
  this.blockedTerrain = ["zombie", "wall"];
  this.target = ["soldier"];
}

Zombie.prototype = Object.create(Pawn.prototype);
Zombie.prototype.constructor = Zombie;

Zombie.prototype.move = function () {
  this.hide();

  if (this.go) {
    let a = Math.abs(this.x - newGame.getPlayer().x)
    <= Math.abs(this.y - newGame.getPlayer().y);
    if (!a && this.x > newGame.getPlayer().x && this.canMove.left) {
      this.x--;
    } else if (!a && this.x < newGame.getPlayer().x && this.canMove.rigth) {
      this.x++;
    } else if (a && this.y > newGame.getPlayer().y && this.canMove.up) {
      this.y--;
    } else if (a && this.y < newGame.getPlayer().y && this.canMove.down) {
      this.y++;
    }
    this.go = false;
  } else {
    this.go = true;
  }
  this.show();
};


//SWORD
function Sword(x, y, type) {
  Pawn.call(this, x, y, type);
}

Sword.prototype = Object.create(Pawn.prototype);
Sword.prototype.constructor = Sword;

Sword.prototype.throwSwordLeft = function () {
  let enemys = newGame.getEnemys();
  // console.log(this.x, this.y)
  // console.log(enemys.filter((e) => {e.x === this.x && e.y === this.y}))
  let player = newGame.getPlayer();
  // console.log(enemys)
  // console.log('x player: '+player.x)
  // console.log('x enemy: ' +enemys[0].x)
  // console.log(enemys[0].x < 8)
  // console.log(enemys.filter((e) => { e.x < player.x }));
  for (let i = player.x - 1, aux; i > 1; i--) {
    aux = newGame.getEnemy(i, player.y);
    if (typeof aux != 'undefined') {
      aux.removeEnemy();
    }
  }
}

Sword.prototype.move = function (keyInput) {
  this.hide();
  if (keyInput === "ArrowLeft" && this.canMove.left) {
    console.log('Lanzando espada a la izquierda');
    this.throwSwordLeft();
    // this.x--;
  } else if (keyInput === "ArrowRight" && this.canMove.rigth) {
    console.log('Lanzando espada a la derecha');
    this.throwSwordLeft();
    // this.x++;
  } else if (keyInput === "ArrowUp" && this.canMove.up) {
    console.log('Lanzando espada arriba');
    // this.y--;
  } else if (keyInput === "ArrowDown" && this.canMove.down) {
    console.log('Lanzando espada abajo');
    // this.y++;
  }
  this.show();
};

Sword.prototype.getSword = function (keyInput) {
  console.log(getCell(this.x, this.y));
  return getCell(this.x, this.y);
}
//LLAMADAS
