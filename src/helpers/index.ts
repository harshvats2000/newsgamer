import { adminUid } from "../constants";
import { max_score } from "../constants";

const isProduction = () => process.env.NODE_ENV === "production";

const invitePlayers = (gameId: string) => {
  if (navigator.share) {
    navigator.share({
      title: "Come play NewsGamer with me.",
      text: "Come play NewsGamer with me.",
      url: "https://newsgamer.harshvats.dev/game/" + gameId
    });
  }
};

const isAdmin = (uid: string) => {
  return uid === adminUid;
};

const generateLetter = (para: string): any => {
  let letter = getRandomAlphabet();

  // Check if paragraph contains enough words with alphabet
  let arr = para.split(" ").filter((word: string) => word.toLowerCase().indexOf(letter) === 0);

  if (arr.length >= max_score && arr.length <= max_score + 5) {
    return letter;
  } else {
    return generateLetter(para);
  }
};

const getRandomAlphabet = () => {
  let emptyString = "";
  let alphabet = "abcdefghijklmnopqrstuvwxyz";

  while (emptyString.length < 1) {
    emptyString += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return emptyString;
};

export { isProduction, isAdmin, generateLetter, invitePlayers };
