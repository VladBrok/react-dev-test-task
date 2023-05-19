export interface ISendMessageRequest {
  chatId: string;
  message: string;
}

export interface ISendMessageResponse {
  idMessage?: string;
}
