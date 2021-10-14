import { GameInterface } from "interfaces";
import { max_score } from "../constants";
import { find } from "lodash";

export const findWinner = (game: GameInterface) => {
  const winner = find(game.players, (p: any) => p.words.length >= max_score);

  return { winner };
};
