import { useCallback, useEffect, useRef, useState } from "react";
import "./MessengerScreen.css";
import { IChat, IMessage } from "../../types";
import { IMessengerScreenProps } from "./MessengerScreen.types";
import { assert } from "../../lib/assert";
import { sendMessage } from "../../infrastructure/messages/sendMessage/sendMessage";
import SendMessageIcon from "../Icons/SendMessageIcon";
import Message from "../Message/Message";
import Chat from "../Chat/Chat";
import { formatPhoneNumber } from "../../lib/formatPhoneNumber";
import toast, { Toaster } from "react-hot-toast";
import {
  startReceivingNotifications,
  stopReceivingNotifications,
} from "../../lib/notifications";

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
    {
      messages: [],
      users: [
        {
          phone: "",
        },
        {
          phone: "79493933403",
        },
      ],
    },
  ]);
  const [activeChatIndex, setActiveChatIndex] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messageInputRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const prevScrollTop = useRef(0);

  const getChatName = (chat: IChat): string => {
    // TODO: dup with "handleSendMessageClick"
    return (
      formatPhoneNumber(
        chat.users.find((user) => user.phone !== props.user.phone)?.phone || ""
      ) || "(You)"
    );
  };

  const handleSendMessageClick = async (): Promise<void> => {
    assert(message != "");
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

      setMessage("");
    } catch (e) {
      console.error(e);
      toast.error("Failed to send a message. Please try again later");
    } finally {
      setIsSending(false);
      assert(messageInputRef.current != null);
      messageInputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessageClick();
    }
  };

  const isScrolledToBottom = (): boolean => {
    if (!messagesContainerRef.current) {
      return false;
    }

    return Math.abs(messagesContainerRef.current.scrollTop) <= 3;
  };

  const addMessage = useCallback((chatIdx: number, message: IMessage): void => {
    prevScrollTop.current = messagesContainerRef.current?.scrollTop || 0;
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

  useEffect(() => {
    if (activeChatIndex === null) {
      return;
    }

    assert(messageInputRef.current != null);

    messageInputRef.current?.focus();
    setMessage("");
  }, [activeChatIndex, addMessage]);

  useEffect(() => {
    if (
      !messagesContainerRef.current ||
      activeChatIndex === null ||
      !chats[activeChatIndex].messages.length
    ) {
      return;
    }

    if (
      isScrolledToBottom() ||
      chats[activeChatIndex].messages[0].from.phone === props.user.phone
    ) {
      messagesContainerRef.current.scrollTop = 0;
    } else {
      const offset =
        (
          messagesContainerRef.current.firstChild as HTMLElement
        )?.getBoundingClientRect().height || 0;
      messagesContainerRef.current.scrollTop = prevScrollTop.current - offset;
    }
  }, [activeChatIndex, chats, props.user.phone]);

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
      handleIncomingMessage
    );

    return () => stopReceivingNotifications(abortController);
  }, [handleIncomingMessage, props.credentials]);

  // TODO: extract some components (ConversationPanel, ...)
  return (
    <div className="messenger-screen__container">
      <div className="messenger-screen__chats-panel">
        {chats.map((chat, i) => (
          <Chat
            name={getChatName(chat)}
            isActive={i === activeChatIndex}
            onClick={() => setActiveChatIndex(i)}
            key={i}
          />
        ))}
      </div>
      <div className="messenger-screen__conversation-panel">
        {activeChatIndex === null && (
          <div className="messenger-screen__no-selected-chat-view">
            <p className="messenger-screen__no-selected-chat-view-tiile">
              WhatsApp + Green API
            </p>
          </div>
        )}
        {activeChatIndex !== null && (
          <div className="messenger-screen__conversation-panel-content">
            <div className="messenger-screen__conversation-panel-header">
              {getChatName(chats[activeChatIndex])}
            </div>
            <div
              className="messenger-screen__conversation-panel-messages"
              ref={messagesContainerRef}
            >
              {chats[activeChatIndex].messages.map((message, i) => (
                <Message user={props.user} message={message} key={i} />
              ))}
            </div>
            <div className="messenger-screen__conversation-panel-footer">
              {/* TODO: increase rows value dynamically as user types (?)*/}
              <textarea
                ref={messageInputRef}
                className="messenger-screen__message-input"
                rows={1}
                placeholder="Enter a message..."
                value={message}
                onKeyDown={handleKeyDown}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>

              <button
                className={`messenger-screen__send-message-button ${
                  message ? "" : "messenger-screen__send-message-button_hidden"
                }`}
                disabled={isSending}
                onClick={handleSendMessageClick}
              >
                <SendMessageIcon />
              </button>
            </div>
          </div>
        )}
        <Toaster />
      </div>
    </div>
  );
}
