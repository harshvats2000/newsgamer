export interface GameInterface {
  letter: string;
  createdAt: number;
  createdBy: string;
  players: string[];
  over: boolean;
  creationDate: {};
  gameId: string;
  paraIndex: number;
  start: boolean;
  winner?: string;
}
