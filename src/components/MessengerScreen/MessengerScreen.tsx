import "./MessengerScreen.css";
import "../../sharedStyles.css";
import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { IChat, IMessage } from "../../types";
import { IMessengerScreenProps } from "./MessengerScreen.types";
import { assert } from "../../lib/assert";
import { sendMessage } from "../../infrastructure/messages/sendMessage/sendMessage";
import toast, { Toaster } from "react-hot-toast";
import {
  startReceivingNotifications,
  stopReceivingNotifications,
} from "../../lib/notifications";
import ConversationPanel from "../ConversationPanel/ConversationPanel";
import { getChatName } from "../../lib/getChatName";
import ChatsPanel from "../ChatsPanel/ChatsPanel";

export default function MessengerScreen(props: IMessengerScreenProps) {
  const [chats, setChats] = useState<IChat[]>([]);
  const [activeChatIndex, setActiveChatIndex] = useState<number | null>(null);
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async (message: string): Promise<void> => {
    assert(activeChatIndex != null);

    if (activeChatIndex == null) {
      return;
    }

    try {
      setIsSending(true);

      const receiver = chats[activeChatIndex].users.find(
        (user) => user.phone !== props.user.phone
      );

      await sendMessage(
        {
          chatId: `${receiver?.phone}@c.us`,
          message,
        },
        props.credentials
      );

      addMessage(activeChatIndex, {
        id: uuidv4(),
        from: props.user,
        to: receiver!, // TODO: fix
        text: message,
      });
    } catch (e) {
      console.error(e);
      toast.error("Failed to send a message. Please try again later");
    } finally {
      setIsSending(false);
    }
  };

  const addMessage = useCallback((chatIdx: number, message: IMessage): void => {
    setChats((prev) =>
      prev.map((chat, i) =>
        i === chatIdx
          ? {
              ...chat,
              messages: [message, ...chat.messages],
            }
          : chat
      )
    );
  }, []);

  const addChat = (phone: string): void => {
    setChats((prev) => [
      ...prev,
      {
        id: uuidv4(),
        messages: [],
        users: [
          {
            phone,
          },
          props.user,
        ],
      },
    ]);
  };

  const handleIncomingMessage = useCallback(
    (message: IMessage): void => {
      const targetChats = chats.filter((chat) =>
        chat.users.find((user) => user.phone === message.from.phone)
      );

      assert(targetChats.length === 1 || targetChats.length === 0);

      if (!targetChats.length) {
        return;
      }

      const chatIdx = chats.findIndex((chat) => chat === targetChats[0]);
      assert(chatIdx > -1);
      addMessage(chatIdx, message);
    },
    [addMessage, chats]
  );

  useEffect(() => {
    const abortController = startReceivingNotifications(
      props.credentials,
      props.user,
      handleIncomingMessage,
      (error: unknown) => {
        console.error(error);
        toast.error("Failed to receive messages");
      }
    );

    return () => stopReceivingNotifications(abortController);
  }, [handleIncomingMessage, props.credentials, props.user]);

  return (
    <div className="messenger-screen__container">
      <ChatsPanel
        chats={chats}
        activeChatIndex={activeChatIndex}
        user={props.user}
        onCreateChat={addChat}
        onChatClick={(_, i) => setActiveChatIndex(i)}
      />
      <ConversationPanel
        user={props.user}
        onSendMessage={handleSendMessage}
        isSending={isSending}
        chat={activeChatIndex != null ? chats[activeChatIndex] : undefined}
        name={
          activeChatIndex != null
            ? getChatName(chats[activeChatIndex], props.user)
            : undefined
        }
      />
      <Toaster />
    </div>
  );
}
