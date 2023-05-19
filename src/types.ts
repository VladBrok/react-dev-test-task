export interface IUser {
  phone: string;
}

export interface IMessage {
  from: IUser;
  to: IUser;
  text: string;
}

export interface IChat {
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
