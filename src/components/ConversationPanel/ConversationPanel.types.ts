import { IChat, IUser } from "../../types";

export interface IConversationPanelProps {
  user: IUser;
  chat?: IChat;
  name?: string;
  onSendMessage: (message: string) => Promise<void>;
  isSending: boolean;
}
