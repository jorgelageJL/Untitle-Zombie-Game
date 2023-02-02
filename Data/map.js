function calculateX() {
  let x = parseInt(document.querySelector("#cols").value);
  if (!x) {
    x = 10;
  }
  return x < 10 ? 10 : x;
}

function calculateY() {
  let y = parseInt(document.querySelector("#rows").value);
  if (!y) {
    y = 10;
  }
  return y < 10 ? 10 : y;
}

let map = {
  x: calculateX(),
  y: calculateY(),
  createMap: function () {
    let row;
    const parent = document.getElementsByTagName("table")[0];
    for (let a = 1; a <= this.x; a++) {
      row = document.createElement("tr");
      row.setAttribute("id", `row${a}`);
      for (let b = 1; b <= this.y; b++)
        row.innerHTML += `<td class="floor" id="col${b}"></td>`;
      parent.appendChild(row);
    }
  },
};

map.createMap();
