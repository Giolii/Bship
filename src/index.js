import "./style.css";
import { Ship, Player } from "./factories.js";
import { renderModule } from "./dom.js";

const player1 = Player();
const player2 = Player();
const h1p1 = document.querySelector(".h1p1");
const h1p2 = document.querySelector(".h1p2");

function placeShipsManually(shipsArray, player) {
  // implement player so you can place for both
  shipsArray.forEach((ship) => {
    let input = prompt(
      `Insert coordinates (row,col) to place the ship. Length is -> ${ship.length}`
    );
    let coord = input.split(",");
    player2.board.placeShip(ship, coord);
  });
}

const p1Ship4 = Ship(4);
const p1Ship2 = Ship(2);
const p1Ship1 = Ship(1);

player1.board.placeShip(p1Ship4, [4, 3]);
player1.board.placeShip(p1Ship2, [8, 7]);
player1.board.placeShip(p1Ship1, [6, 4]);

const p2Ship4 = Ship(4);
const p2Ship2 = Ship(2);
const p2Ship1 = Ship(1);
// player2.board.placeShip(p2Ship4, [4, 2]);
// player2.board.placeShip(p2Ship2, [2, 7]);
// player2.board.placeShip(p2Ship1, [1, 2]);
const shipsToPlace = [p2Ship1, p2Ship2, p2Ship4];
placeShipsManually(shipsToPlace);

const p1board = document.querySelector(".p1Board");
const p2board = document.querySelector(".p2Board");
const render = renderModule();

render.fillContainer(p1board, player1.board.getBoard());
render.fillContainer(p2board, player2.board.getBoard());

p1board.addEventListener("click", function handleClick(e) {
  // Click listens only to 'cellBtn class square'
  if (e.target.classList.contains("cellBtn")) {
    // If the square exist send attack
    if (player1.board.getBoard()[e.target.dataset.row][e.target.dataset.col]) {
      player1.board.receiveAttack([e.target.dataset.row, e.target.dataset.col]);
    }
    // If all ship are down you win
    if (player1.board.allDrown()) {
      p1board.removeEventListener("click", handleClick);
      win("player1");
    }
    // Render squares
    render.fillContainer(p1board, player1.board.getBoard());

    // computer move after player click
    player2.board.receiveAttack(player2.computerMove());
    // If all ship are down computer win
    if (player2.board.allDrown()) {
      p1board.removeEventListener("click", handleClick);
      win("player2");
    }
    // Render squares
    render.fillContainer(p2board, player2.board.getBoard());
  }
});

function win(winner) {
  if (winner === "player1") {
    h1p1.innerText = "Player 1 WIN 🥳";
    h1p2.innerText = "Player 2 LOST 😔";
  }
  if (winner === "player2") {
    h1p1.innerText = "Player 1 LOST 😔";
    h1p2.innerText = "Player 2 WIN 🥳";
  }
}
// start again button
// place ship
// place random ships
// arund ship drown auto check
