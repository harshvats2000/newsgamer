export interface GameInterface {
  letter: string;
  createdAt: number;
  createdBy: { uid: string; name: string };
  players: { [key: string]: { name: string; uid: string; words: string[]; photoURL: string; email: string } };
  over: boolean;
  creationDate: {};
  gameId: string;
  paraIndex: number;
  start: boolean;
  winner: { uid: string; name: string; photoURL: string; email: string };
  overtimestamp: number;
}

export interface UserInterface {
  displayName: string;
  uid: string;
  email: string;
  creation_time: string;
  lastSignInTime: string;
  photoURL: string;
}
