import firebase from "../firebase";

export const getDisplayNameByUid = async (uid) => {
  const doc = await firebase.firestore().collection("users").doc(uid).get();
  if (doc.exists) return doc.data().displayName;
  throw new Error("No such document");
};

export const getDiplayNamesByUidArray = async (uidArray) => {
  const playerNames = await Promise.all(
    uidArray.map(async (uid) => {
      const doc = await firebase.firestore().collection("users").doc(uid).get();
      return doc.data().displayName;
    })
  );
  return playerNames;
};
