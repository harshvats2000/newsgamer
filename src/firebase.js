import * as firebase from "firebase";

let config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "newsgamer-e328f.firebaseapp.com",
  databaseURL: "https://newsgamer-e328f.firebaseio.com",
  projectId: "newsgamer-e328f",
  storageBucket: "newsgamer-e328f.appspot.com",
  messagingSenderId: "934359092726",
  appId: "1:934359092726:web:b11971d68875933ebb0bd7",
  measurementId: "G-F1CTM60RR7"
};
firebase.initializeApp(config);
firebase.analytics();

export default firebase;
