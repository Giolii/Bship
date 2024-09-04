function comp() {
  player2.board.receiveAttack(player2.computerMove());
  render.fillContainer(p2board, player2.board.getBoard());
  if (player2.board.allDrown()) {
    console.log("P2 WIN!");
    return;
  }
  // For autoplay
  setTimeout(() => {
    p1();
  }, 50);
}
function p1() {
  player1.board.receiveAttack(player1.computerMove());
  render.fillContainer(p1board, player1.board.getBoard());
  if (player1.board.allDrown()) {
    console.log("P1 WIN!");
    return;
  }
  setTimeout(() => {
    comp();
  }, 50);
}
comp();
