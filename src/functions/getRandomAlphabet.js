export const getRandomAlphabet = () => {
  let emptyString = "";
  let alphabet = "abcdefghijklmnopqrstuvwxyz";

  while (emptyString.length < 1) {
    emptyString += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return emptyString;
};
