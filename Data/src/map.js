function calculateX() {
  let x = parseInt(document.querySelector("#cols").value);
  return !x || x < 10 ? 10 : x;
}

function calculateY() {
  let y = parseInt(document.querySelector("#rows").value);
  return !y || y < 10 ? 10 : y;
}

let map = {
  x: calculateX(),
  y: calculateY(),
  createMap: function () {
    const parent = document.getElementsByTagName("body")[0];
    let table = document.createElement("table");
    // INICIO
    let row = document.createElement("tr");
    row.setAttribute("id", `row1`);
    for (let b = 1; b <= this.y; b++)
      row.innerHTML += `<td class="wall" id="col${b}"></td>`;
    table.appendChild(row);
    // MEDIO
    for (let a = 2; a < this.x; a++) {
      row = document.createElement("tr");
      row.setAttribute("id", `row${a}`);
      // FIRST
      row.innerHTML += `<td class="wall" id="col1"></td>`;
      for (let b = 2; b < this.y; b++)
        row.innerHTML += `<td class="floor" id="col${b}"></td>`;
      // LAST
      row.innerHTML += `<td class="wall" id="col${this.y}"></td>`;
      table.appendChild(row);
    }
    // FINAL
    row = document.createElement("tr");
    row.setAttribute("id", `row${this.x}`);
    for (let b = 1; b <= this.y; b++)
      row.innerHTML += `<td class="wall" id="col${b}"></td>`;
    table.appendChild(row);
    parent.appendChild(table);
  },
};
