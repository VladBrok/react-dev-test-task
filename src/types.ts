export interface IUser {
  phone: string;
}

export interface IMessage {
  id: string;
  from: IUser;
  to: IUser;
  text: string;
}

export interface IChat {
  id: string;
  users: IUser[];
  messages: IMessage[];
}

export interface ICredentials {
  idInstance: string;
  apiTokenInstance: string;
}

export interface IAbortController {
  abort: boolean;
}
