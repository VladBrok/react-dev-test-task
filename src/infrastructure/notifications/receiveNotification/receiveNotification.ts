import { Client } from "../..";
import { ICredentials } from "../../../types";
import { IReceiveNotificationResponse } from "./receiveNotification.types";

export async function receiveNotification(
  credentials: ICredentials
): Promise<IReceiveNotificationResponse | undefined> {
  const response = await Client.get<IReceiveNotificationResponse | undefined>(
    `/waInstance${credentials.idInstance}/receiveNotification/${credentials.apiTokenInstance}`
  );

  return response.data;
}
