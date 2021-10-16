import { GameInterface, Winner } from "interfaces";
import { max_score } from "../constants";
import { find, pick } from "lodash";

export const findWinner = (game: GameInterface): Winner | undefined => {
  let winner: Winner | undefined = find(game.players, (p: any) => p.words.length === max_score);

  if (winner) {
    return {
      name: winner.name,
      uid: winner.uid,
    };
  }

  return winner;
};
