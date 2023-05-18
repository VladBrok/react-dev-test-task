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
