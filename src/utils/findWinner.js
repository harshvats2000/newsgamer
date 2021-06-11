import { max_score } from "../constants";

export const findWinner = (game) => {
  let isGameOver = false;
  const winnerName = game.players.find((playerName) => game[playerName].length >= max_score);
  if (winnerName) isGameOver = true;

  return { isGameOver, winnerName };
};
