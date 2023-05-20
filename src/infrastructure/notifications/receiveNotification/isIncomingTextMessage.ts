import { IReceiveNotificationResponse } from "./receiveNotification.types";

const INCOMING_MESSAGE_TYPE_WEBHOOK = "incomingMessageReceived";
const TEXT_MESSAGE_TYPE = "textMessage";

export function isIncomingTextMessage(
  notification?: IReceiveNotificationResponse
): boolean {
  return (
    notification?.body?.typeWebhook === INCOMING_MESSAGE_TYPE_WEBHOOK &&
    notification?.body?.messageData?.typeMessage === TEXT_MESSAGE_TYPE
  );
}
