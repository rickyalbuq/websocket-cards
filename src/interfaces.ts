export interface Player {
  playerId: string;
  username: string;
  victories: number;
  roomId: number;
}

export interface Room {
  roomId: number;
  createdAt: Date | null;
  isPrivate: boolean;
  minMatches: number;
  currentMatch: number;
}

export interface GetRoomById {
  roomId: number;
}

export interface GeneralData {
  rooms: Room[];
  players: Player[];
}

export interface Message {
  text: string;
  username: string;
}

export interface MessageData {
  roomId: number;
  text: string;
  username: string;
}

export interface GetMessageData {
  roomId: number;
}

export interface ConnectData {
  roomId: number;
  username: string;
}

export interface DisconnectionData {
  roomId: number;
  playerId: string;
  username: string;
}

export interface CreateRoomData {
  roomId: number;
  isPrivate: boolean;
  minMatches: number;
}

export interface GetRoomsData extends Room {
  players: number;
}

export interface DeleteRoomData {
  roomId: number;
}
