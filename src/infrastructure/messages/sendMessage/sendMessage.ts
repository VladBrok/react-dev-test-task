import { Client } from "../..";
import { ICredentials } from "../../../types";
import { ISendMessageRequest, ISendMessageResponse } from "./sendMessage.types";

export async function sendMessage(
  body: ISendMessageRequest,
  credentials: ICredentials
) {
  const response = await Client.post<ISendMessageRequest, ISendMessageResponse>(
    `/waInstance${credentials.idInstance}/sendMessage/${credentials.apiTokenInstance}`,
    body
  );

  return response.data;
}
