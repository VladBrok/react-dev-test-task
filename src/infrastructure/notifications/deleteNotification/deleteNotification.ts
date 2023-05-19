import { Client } from "../..";
import { ICredentials } from "../../../types";
import { IDeleteNotificationResponse } from "./deleteNotification.types";

export async function deleteNotification(
  receiptId: number,
  credentials: ICredentials
): Promise<IDeleteNotificationResponse | undefined> {
  const response = await Client.delete<IDeleteNotificationResponse | undefined>(
    `/waInstance${credentials.idInstance}/deleteNotification/${credentials.apiTokenInstance}/${receiptId}`
  );

  return response.data;
}
