function Ship(length) {
  return {
    length: length,
    hits: 0,
    partHit: [],

    isSunk() {
      return this.hits === this.length;
    },
    hit: function () {
      if (this.hits < this.length) {
        this.hits++;
      }
    },
  };
}

function Board() {
  let shipPlaced = [];
  let missedAttack = [];
  const boardArray = Array(10)
    .fill()
    .map(() => Array(10).fill("0"));
  return {
    getBoard() {
      return boardArray;
    },
    placeShip(ship, coord) {
      shipPlaced.push(ship);
      let row = coord[0];
      let col = coord[1];
      for (let i = 0; i < ship.length; i++) {
        boardArray[row][col] = ship;
        col++;
      }
    },
    receiveAttack(coord) {
      let row = coord[0];
      let col = coord[1];
      let target = this.getBoard()[row][col];

      if (typeof target === "object") {
        target.hit();
        target.partHit.push(`${row},${col}`);
        return target.isSunk();
      }
      if (target === "0") {
        missedAttack.push([row, col]);
        this.getBoard()[row][col] = "x";
      }
    },
    allDrown() {
      return shipPlaced.every((ship) => ship.isSunk());
    },
  };
}

function Player(name) {
  return {
    name: name,
    board: Board(),
    computerMove: function () {
      let row;
      let col;

      do {
        row = random(10);
        col = random(10);
      } while (
        this.board.getBoard()[row][col] === "x" || // If the cell has already been attacked
        (typeof this.board.getBoard()[row][col] === "object" && // Check if it is an object
          this.board.getBoard()[row][col].partHit && // If it has a partHit property
          this.board.getBoard()[row][col].partHit.includes(`${row},${col}`))
      );
      return [row, col];
    },
  };
}
function random(max) {
  return Math.floor(Math.random() * max);
}

module.exports = { Ship, Board, Player };
