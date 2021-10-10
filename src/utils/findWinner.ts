import { GameInterface } from "interfaces";
import { max_score } from "../constants";
import { find } from "lodash";

export const findWinner = (game: GameInterface) => {
  let isGameOver = false;
  const winnerUid = find(game.players, (p: any) => p.words.length >= max_score);
  if (winnerUid) isGameOver = true;

  return { isGameOver, winnerUid };
};
