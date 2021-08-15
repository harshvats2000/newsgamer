import { max_score } from "../constants";

export const findWinner = (game: any) => {
  let isGameOver = false;
  const winnerUid = game.players.find(
    (playerId: string) => game[playerId].length >= max_score
  );
  if (winnerUid) isGameOver = true;

  return { isGameOver, winnerUid };
};
