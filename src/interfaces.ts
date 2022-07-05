export interface Player {
  playerId: string;
  username: string;
  victories: number;
  room: number;
}

export interface Room {
  room: number;
  createdAt: Date;
  isPrivate: boolean;
  maxMatches: number;
  currentMatch: number;
  messages: Message[];
}

export interface Message {
  text: string;
  username: string;
}

export interface MessageData {
  room: number;
  text: string;
  username: string;
}

export interface GetMessageData {
  room: number;
}

export interface ConnectData {
  room: number;
  username: string;
}

export interface DisconnectionData {
  room: number;
  playerId: string;
  username: string;
}

export interface CreateRoomData {
  room: number;
  isPrivate: boolean;
  maxMatches: number;
  username: string;
}

export interface DeleteRoomData {
  room: number;
}