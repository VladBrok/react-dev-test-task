export interface IReceiveNotificationResponse {
  receiptId?: number;
  body?: {
    typeWebhook?: string;
    messageData?: {
      typeMessage?: string;
      textMessageData?: {
        textMessage?: string;
      };
    };
    senderData?: {
      chatId?: string;
    };
  };
}
