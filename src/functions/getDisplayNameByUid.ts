import firebase from "../firebase";

export const getDisplayNameByUid = async (uid: string) => {
  const doc: any = await firebase.firestore().collection("users").doc(uid).get();
  if (doc.exists) return doc.data().displayName;
  throw new Error("No such document");
};
