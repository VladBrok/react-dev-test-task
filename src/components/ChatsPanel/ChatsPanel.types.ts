import { IChat, IUser } from "../../types";

export interface IChatsPanelProps {
  user: IUser;
  chats: IChat[];
  activeChatIndex: number | null;
  onCreateChat: (phone: string) => void;
  onChatClick: (chat: IChat, index: number) => void;
}
