function renderModule() {
  return {
    fillContainer: (container, array) => {
      container.innerHTML = "";
      array.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
          const box = document.createElement("div");
          box.classList.add("cellBtn");
          box.dataset.row = rowIndex;
          box.dataset.col = colIndex;
          if (col === "x") {
            box.classList.remove("cellBtn");
            box.classList.add("disabled");
          }
          if (col.partHit && col.partHit.includes(`${rowIndex},${colIndex}`)) {
            box.classList.add("hitShip");
          }
          container.appendChild(box);
        });
      });
    },
  };
}

module.exports = { renderModule };
