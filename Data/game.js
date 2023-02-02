let playGameButton = document.querySelector("#playGame");
let created = false;

playGameButton.onclick = function () {
  if (!created) {
    created = true;
    map.createMap();
    loop();
  }
};
