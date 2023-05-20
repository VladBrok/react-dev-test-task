export function extractPhoneFromChatId(chatId: string): string {
  const indexOfAtSign = chatId.indexOf("@");

  if (indexOfAtSign < 0) {
    return chatId;
  }

  return chatId.slice(0, indexOfAtSign);
}
