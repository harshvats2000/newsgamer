import { max_score } from "../constants";

export const findWinner = (game) => {
  let isGameOver = false;
  const winnerUid = game.players.find(
    (playerName) => game[playerName].length >= max_score
  );
  if (winnerUid) isGameOver = true;

  return { isGameOver, winnerUid };
};
