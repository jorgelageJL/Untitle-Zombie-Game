let playGameButton = document.querySelector("#playGame");
let created = false;

playGameButton.onclick = function () {
  if (!created) {
    playGameButton.innerText = 'Restart';
    created = true;
    map.createMap();
    loop();
  } else {
    playGameButton.innerText = 'Play Game';
    let table = document.getElementsByTagName('table')[0];
    let parent = table.parentNode;
    parent.removeChild(table);
    created = false;
  }
};