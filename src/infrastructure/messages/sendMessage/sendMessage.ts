import { Client } from "../..";
import { ICredentials } from "../../../types";
import { ISendMessageRequest, ISendMessageResponse } from "./sendMessage.types";

export async function sendMessage(
  body: ISendMessageRequest,
  credentials: ICredentials
): Promise<ISendMessageResponse | undefined> {
  const response = await Client.post<
    ISendMessageRequest,
    ISendMessageResponse | undefined
  >(
    `/waInstance${credentials.idInstance}/sendMessage/${credentials.apiTokenInstance}`,
    body
  );

  return response.data;
}
