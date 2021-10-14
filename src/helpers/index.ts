import { adminUid } from "../constants";
import { content, max_score } from "../constants";

const isProduction = () => process.env.NODE_ENV === "production";

const getCurrentDateAndTime = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  const overdate = dd + "/" + mm + "/" + yyyy;
  const overtime = today.getHours() + ":" + today.getMinutes();

  return { overdate, overtime };
};

const invitePlayers = (gameId: string) => {
  if (navigator.share) {
    navigator.share({
      title: "Come play NewsGamer with me.",
      text: "Come play NewsGamer with me.",
      url: "https://newsgamer.vercel.app/game/" + gameId,
    });
  }
};

const isAdmin = (uid: string) => {
  return uid === adminUid;
};

const generateLetter = (paraIndex: number): any => {
  let letter = getRandomAlphabet();

  // Check if paragraph contains enough words with alphabet
  let arr = content[paraIndex]
    .split(" ")
    .filter((word: string) => word.toLowerCase().indexOf(letter) === 0);

  if (arr.length >= max_score && arr.length <= max_score + 5) {
    return letter;
  } else {
    return generateLetter(paraIndex);
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

export { isProduction, getCurrentDateAndTime, isAdmin, generateLetter, invitePlayers };
