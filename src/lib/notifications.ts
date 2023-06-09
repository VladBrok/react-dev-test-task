import { deleteNotification } from "../infrastructure/notifications/deleteNotification/deleteNotification";
import { isIncomingTextMessage } from "../infrastructure/notifications/receiveNotification/isIncomingTextMessage";
import { receiveNotification } from "../infrastructure/notifications/receiveNotification/receiveNotification";
import { IReceiveNotificationResponse } from "../infrastructure/notifications/receiveNotification/receiveNotification.types";
import { IAbortController, ICredentials, IMessage, IUser } from "../types";
import { extractPhoneFromChatId } from "./extractPhoneFromChatId";
import { v4 as uuidv4 } from "uuid";

const PAUSE_BETWEEN_REQUESTS_IN_MILLISECONDS = 5000;

export function startReceivingNotifications(
  credentials: ICredentials,
  user: IUser,
  onIncomingMessage: (message: IMessage) => void,
  onError: (e: unknown) => void
): IAbortController {
  const abortController: IAbortController = { abort: false };

  processNotifications(
    credentials,
    user,
    onIncomingMessage,
    onError,
    abortController
  );

  return abortController;
}

export function stopReceivingNotifications(
  abortController: IAbortController
): void {
  abortController.abort = true;
}

async function processNotifications(
  credentials: ICredentials,
  user: IUser,
  onIncomingMessage: (message: IMessage) => void,
  onError: (e: unknown) => void,
  abortController: IAbortController
): Promise<void> {
  if (abortController.abort) {
    return;
  }

  let notification: IReceiveNotificationResponse | undefined = undefined;

  do {
    notification = await dequeueNotification(
      credentials,
      abortController,
      onError
    );

    if (abortController.abort) {
      return;
    }

    if (isIncomingTextMessage(notification)) {
      const chatId = notification?.body?.senderData?.chatId;

      if (chatId) {
        onIncomingMessage({
          id: uuidv4(),
          from: {
            phone: extractPhoneFromChatId(chatId),
          },
          to: user,
          text:
            notification?.body?.messageData?.textMessageData?.textMessage || "",
        });
      }
    }
  } while (notification);

  if (abortController.abort) {
    return;
  }

  setTimeout(
    () =>
      processNotifications(
        credentials,
        user,
        onIncomingMessage,
        onError,
        abortController
      ),
    PAUSE_BETWEEN_REQUESTS_IN_MILLISECONDS
  );
}

async function dequeueNotification(
  credentials: ICredentials,
  abortController: IAbortController,
  onError: (e: unknown) => void
): Promise<IReceiveNotificationResponse | undefined> {
  try {
    const notification = await receiveNotification(credentials);

    if (abortController.abort) {
      return;
    }

    if (notification?.receiptId != null) {
      await deleteNotification(notification.receiptId, credentials);
    }

    return notification;
  } catch (e) {
    onError(e);
  }
}
