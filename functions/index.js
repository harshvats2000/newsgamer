const functions = require("firebase-functions");

exports.deleteInactiveGames = functions.firestore
  .document("games/{gameid}")
  .onCreate((doc) => {
    if (doc.data()) {
      setTimeout(() => {
        return doc.ref.delete();
      }, 300000);
    } else {
      return null;
    }
  });
