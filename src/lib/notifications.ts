import { deleteNotification } from "../infrastructure/notifications/deleteNotification/deleteNotification";
import { isIncomingTextMessage } from "../infrastructure/notifications/receiveNotification/isIncomingTextMessage";
import { receiveNotification } from "../infrastructure/notifications/receiveNotification/receiveNotification";
import { IReceiveNotificationResponse } from "../infrastructure/notifications/receiveNotification/receiveNotification.types";
import { IAbortController, ICredentials, IMessage } from "../types";
import { extractPhoneFromChatId } from "./extractPhoneFromChatId";

const PAUSE_BETWEEN_REQUESTS_IN_MILLISECONDS = 5000;

export function startReceivingNotifications(
  credentials: ICredentials,
  onIncomingMessage: (message: IMessage) => void,
  onError: (e: unknown) => void
): IAbortController {
  const abortController: IAbortController = { abort: false };

  processNotifications(
    credentials,
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
          from: {
            phone: extractPhoneFromChatId(chatId),
          },
          to: {
            phone: "",
          },
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

    // TODO: remove
    console.log("receive", notification);

    if (notification?.receiptId != null) {
      await deleteNotification(notification.receiptId, credentials);
    }

    return notification;
  } catch (e) {
    onError(e);
  }
}
