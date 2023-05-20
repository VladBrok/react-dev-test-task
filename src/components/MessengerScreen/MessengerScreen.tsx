import "./MessengerScreen.css";
import "../../sharedStyles.css";
import { useCallback, useEffect, useState } from "react";
import { IChat, IMessage } from "../../types";
import { IMessengerScreenProps } from "./MessengerScreen.types";
import { assert } from "../../lib/assert";
import { sendMessage } from "../../infrastructure/messages/sendMessage/sendMessage";
import Chat from "../Chat/Chat";
import { formatPhoneNumber } from "../../lib/formatPhoneNumber";
import toast, { Toaster } from "react-hot-toast";
import {
  startReceivingNotifications,
  stopReceivingNotifications,
} from "../../lib/notifications";
import NewChatIcon from "../Icons/NewChatIcon";
import CreateChatForm from "../CreateChatForm/CreateChatForm";
import ConversationPanel from "../ConversationPanel/ConversationPanel";

export default function MessengerScreen(props: IMessengerScreenProps) {
  const [chats, setChats] = useState<IChat[]>([
    {
      messages: [
        {
          from: {
            phone: "",
          },
          to: {
            phone: "79494533036",
          },
          text: "omg",
        },
        {
          from: {
            phone: "79494533036",
          },
          to: {
            phone: "",
          },
          text: "no way",
        },
        {
          from: {
            phone: "79494533036",
          },
          to: {
            phone: "",
          },
          text: "sdfjslkdfjl;sajfwjeoifjjvjsfsdfjslkdfjl;sajfwjeoifjjvjsfsdfjslkdfjl;sajfwjeoifjjvjsfsdfjslkdfjl;sajfwjeoifjjvjsfsdfjslkdfjl;sajfwjeoifjjvjsfsdfjslkdfjl;sajfwjeoifjjvjsfsdfjslkdfjl;sajfwjeoifjjvjsfsdfjslkdfjl;sajfwjeoifjjvjsfsdfjslkdfjl;sajfwjeoifjjvjsfsdfjslkdfjl;sajfwjeoifjjvjsfsdfjslkdfjl;sajfwjeoifjjvjsfsdfjslkdfjl;sajfwjeoifjjvjsfsdfjslkdfjl;sajfwjeoifjjvjsfsdfjslkdfjl;sajfwjeoifjjvjsfsdfjslkdfjl;sajfwjeoifjjvjsfsdfjslkdfjl;sajfwjeoifjjvjsfsdfjslkdfjl;sajfwjeoifjjvjsfsdfjslkdfjl;sajfwjeoifjjvjsfsdfjslkdfjl;sajfwjeoifjjvjsfsdfjslkdfjl;sajfwjeoifjjvjsfsdfjslkdfjl;sajfwjeoifjjvjsfsdfjslkdfjl;sajfwjeoifjjvjsfsdfjslkdfjl;sajfwjeoifjjvjsfsdfjslkdfjl;sajfwjeoifjjvjsfsdfjslkdfjl;sajfwjeoifjjvjsfsdfjslkdfjl;sajfwjeoifjjvjsfsdfjslkdfjl;sajfwjeoifjjvjsfsdfjslkdf",
        },
        {
          from: {
            phone: "79494533036",
          },
          to: {
            phone: "",
          },
          text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt, accusantium vitae beatae tempora maiores dolores dicta quibusdam. Tempora quasi fugiat eaque. Tempore architecto amet maiores. Quibusdam ducimus magni, id veniam eos suscipit, culpa beatae vel non aperiam accusantium, voluptas fuga impedit totam debitis nemo minus? Esse quasi porro iure animi molestias id perspiciatis. Aperiam veritatis expedita odit excepturi voluptatibus facere delectus reiciendis blanditiis laudantium sint totam omnis ab consequatur natus sapiente repellendus, suscipit explicabo dolore id aliquam et magni quod? Dicta eveniet ut, tempore impedit assumenda cumque maxime minus rerum libero incidunt blanditiis sint ex non rem nesciunt sunt est.",
        },
        {
          from: {
            phone: "79494533036",
          },
          to: {
            phone: "",
          },
          text: "peasant",
        },
        {
          from: {
            phone: "79494533036",
          },
          to: {
            phone: "",
          },
          text: "peasant",
        },
        {
          from: {
            phone: "79494533036",
          },
          to: {
            phone: "",
          },
          text: "peasant",
        },
        {
          from: {
            phone: "79494533036",
          },
          to: {
            phone: "",
          },
          text: "peasant",
        },
        {
          from: {
            phone: "79494533036",
          },
          to: {
            phone: "",
          },
          text: "peasant",
        },
        {
          from: {
            phone: "79494533036",
          },
          to: {
            phone: "",
          },
          text: "peasant",
        },
        {
          from: {
            phone: "79494533036",
          },
          to: {
            phone: "",
          },
          text: "peasant",
        },
        {
          from: {
            phone: "79494533036",
          },
          to: {
            phone: "",
          },
          text: "peasant",
        },
        {
          from: {
            phone: "79494533036",
          },
          to: {
            phone: "",
          },
          text: "peasant",
        },
        {
          from: {
            phone: "79494533036",
          },
          to: {
            phone: "",
          },
          text: "peasant",
        },
        {
          from: {
            phone: "79494533036",
          },
          to: {
            phone: "",
          },
          text: "peasant",
        },
        {
          from: {
            phone: "79494533036",
          },
          to: {
            phone: "",
          },
          text: "peasant",
        },
        {
          from: {
            phone: "79494533036",
          },
          to: {
            phone: "",
          },
          text: "peasant",
        },
        {
          from: {
            phone: "79494533036",
          },
          to: {
            phone: "",
          },
          text: "peasant",
        },
        {
          from: {
            phone: "79494533036",
          },
          to: {
            phone: "",
          },
          text: "peasant",
        },
        {
          from: {
            phone: "79494533036",
          },
          to: {
            phone: "",
          },
          text: "peasant",
        },
        {
          from: {
            phone: "79494533036",
          },
          to: {
            phone: "",
          },
          text: "peasant",
        },
        {
          from: {
            phone: "79494533036",
          },
          to: {
            phone: "",
          },
          text: "peasant",
        },
        {
          from: {
            phone: "79494533036",
          },
          to: {
            phone: "",
          },
          text: "peasant",
        },
        {
          from: {
            phone: "79494533036",
          },
          to: {
            phone: "",
          },
          text: "peasant",
        },
        {
          from: {
            phone: "79494533036",
          },
          to: {
            phone: "",
          },
          text: "peasant",
        },
        {
          from: {
            phone: "79494533036",
          },
          to: {
            phone: "",
          },
          text: "peasant",
        },
      ],
      users: [
        {
          phone: "",
        },
        {
          phone: "79494533036",
        },
      ],
    },
    {
      messages: [],
      users: [
        {
          phone: "",
        },
        {
          phone: "79493933400",
        },
      ],
    },
    {
      messages: [],
      users: [
        {
          phone: "",
        },
        {
          phone: "79493933400",
        },
      ],
    },
    {
      messages: [],
      users: [
        {
          phone: "",
        },
        {
          phone: "79493933400",
        },
      ],
    },
    {
      messages: [],
      users: [
        {
          phone: "",
        },
        {
          phone: "79493933400",
        },
      ],
    },
    {
      messages: [],
      users: [
        {
          phone: "",
        },
        {
          phone: "79493933400",
        },
      ],
    },
    {
      messages: [],
      users: [
        {
          phone: "",
        },
        {
          phone: "79493933400",
        },
      ],
    },
    {
      messages: [],
      users: [
        {
          phone: "",
        },
        {
          phone: "79493933400",
        },
      ],
    },
    {
      messages: [],
      users: [
        {
          phone: "",
        },
        {
          phone: "79493933400",
        },
      ],
    },
    {
      messages: [],
      users: [
        {
          phone: "",
        },
        {
          phone: "79493933400",
        },
      ],
    },
    {
      messages: [],
      users: [
        {
          phone: "",
        },
        {
          phone: "79493933400",
        },
      ],
    },
    {
      messages: [],
      users: [
        {
          phone: "",
        },
        {
          phone: "79493933400",
        },
      ],
    },
  ]);
  const [activeChatIndex, setActiveChatIndex] = useState<number | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isCreateChatFormOpen, setIsCreateChatFormOpen] = useState(false);

  const getChatName = (chat: IChat): string => {
    // TODO: dup with "handleSendMessageClick"
    return (
      formatPhoneNumber(
        chat.users.find((user) => user.phone !== props.user.phone)?.phone || ""
      ) || "(You)"
    );
  };

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
        from: props.user,
        to: receiver!,
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
        messages: [],
        users: [
          {
            phone,
          },
          {
            phone: "",
          },
        ],
      },
    ]);
    setIsCreateChatFormOpen(false);
  };

  const handleIncomingMessage = useCallback(
    (message: IMessage): void => {
      const targetChats = chats.filter((chat) =>
        // TODO: dup
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
      handleIncomingMessage,
      (error: unknown) => {
        console.error(error);
        toast.error("Failed to receive messages");
      }
    );

    return () => stopReceivingNotifications(abortController);
  }, [handleIncomingMessage, props.credentials]);

  // TODO: extract some components (ConversationPanel, ChatsPanel ...)
  return (
    <div className="messenger-screen__container">
      <div className="messenger-screen__chats-panel">
        {isCreateChatFormOpen ? (
          <CreateChatForm
            onCancel={() => setIsCreateChatFormOpen(false)}
            onCreate={addChat}
            chats={chats}
          />
        ) : (
          <>
            <div className="messenger-screen__chats-panel-menu">
              <button
                title="New Chat"
                onClick={() => setIsCreateChatFormOpen(true)}
              >
                <NewChatIcon />
              </button>
            </div>
            {chats.map((chat, i) => (
              <Chat
                name={getChatName(chat)}
                isActive={i === activeChatIndex}
                onClick={() => setActiveChatIndex(i)}
                key={i}
              />
            ))}
          </>
        )}
      </div>
      <ConversationPanel
        user={props.user}
        onSendMessage={handleSendMessage}
        isSending={isSending}
        chat={activeChatIndex != null ? chats[activeChatIndex] : undefined}
        name={
          activeChatIndex != null
            ? getChatName(chats[activeChatIndex])
            : undefined
        }
      />
      <Toaster />
    </div>
  );
}
