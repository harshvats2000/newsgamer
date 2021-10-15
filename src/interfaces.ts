export interface GameInterface {
  letter: string;
  createdAt: number;
  createdBy: { uid: string; name: string };
  players: { [key: string]: { name: string; uid: string; words: string[] } };
  over: boolean;
  creationDate: {};
  gameId: string;
  paraIndex: number;
  start: boolean;
  winner: { uid: string; name: string };
}

export interface Chat {
  uid: string;
  displayName: string;
  postedAt: string;
  msg: string;
}
