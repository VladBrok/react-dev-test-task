import { IChat } from "../../types";

export interface ICreateChatPanelProps {
  onCancel: () => void;
  onCreate: (phone: string) => void;
  chats: IChat[];
}
