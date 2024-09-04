const { Ship, Board, Player } = require("./factories");

describe("ship factory", () => {
  let shipTry;

  beforeEach(() => {
    shipTry = Ship(4);
  });

  test("create Ship factory", () => {
    expect(shipTry.length).toEqual(4);
  });

  test("register hit", () => {
    shipTry.hit();
    expect(shipTry.hits).toBe(1);
  });

  test("check if it's sunk false", () => {
    shipTry.hit();
    expect(shipTry.isSunk()).toBe(false);
  });

  test("check if it's sunk true", () => {
    shipTry.hit();
    shipTry.hit();
    shipTry.hit();
    shipTry.hit();
    expect(shipTry.isSunk()).toBe(true);
  });
});

describe("gameboard factory", () => {
  let gameBoard;
  let fakeShip;
  beforeEach(() => {
    gameBoard = Board();
    fakeShip = Ship(4);
  });

  test("check if board exist as Array", () => {
    expect(gameBoard.getBoard()).toBeInstanceOf(Array);
  });

  test("check if ship is placed", () => {
    gameBoard.placeShip(fakeShip, [1, 7]);
    expect(gameBoard.getBoard()[7][1]).toEqual(fakeShip);
    expect(gameBoard.getBoard()[7][2]).toEqual(fakeShip);
    expect(gameBoard.getBoard()[7][3]).toEqual(fakeShip);
    expect(gameBoard.getBoard()[7][4]).toEqual(fakeShip);
  });

  test("receive an attack, missed", () => {
    expect(gameBoard.receiveAttack([0, 0])).toBe(0);
    expect(gameBoard.receiveAttack([1, 1])).toBe(0);
    expect(gameBoard.receiveAttack([2, 2])).toBe(0);
  });

  test("receive an attack, find ship, hit", () => {
    gameBoard.placeShip(fakeShip, [1, 7]);
    expect(gameBoard.receiveAttack([1, 7])).toEqual(1);
    expect(gameBoard.receiveAttack([2, 7])).toEqual(2);
    expect(gameBoard.receiveAttack([3, 7])).toEqual(3);
  });

  test("all drown  false cause not enough hits", () => {
    gameBoard.placeShip(fakeShip, [1, 7]);
    fakeShip.hit();
    fakeShip.hit();
    fakeShip.hit();
    expect(gameBoard.allDrown()).toBe(false);
  });
  test("all drown if no ships left", () => {
    gameBoard.placeShip(fakeShip, [1, 7]);
    fakeShip.hit();
    fakeShip.hit();
    fakeShip.hit();
    fakeShip.hit();
    expect(gameBoard.allDrown()).toBe(true);
  });
});
