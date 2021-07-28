import { adminUid } from "../constants";
import store from "../store";

export const isAdmin = () => {
  let currentUserUid = store.getState().auth.user.uid;
  return currentUserUid === adminUid;
};
