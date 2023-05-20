import { IChat, IUser } from "../types";
import { formatPhoneNumber } from "./formatPhoneNumber";

export function getChatName(chat: IChat, user: IUser) {
  return (
    formatPhoneNumber(
      chat.users.find((item) => item.phone !== user.phone)?.phone || ""
    ) || "(You)"
  );
}
