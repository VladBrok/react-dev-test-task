import { useEffect, useRef, useState } from "react";
import "./MessengerScreen.css";
import { IChat } from "../../types";
import { IMessengerScreenProps } from "./MessengerScreen.types";
import { assert } from "../../lib/assert";
import { sendMessage } from "../../infrastructure/messages/sendMessage/sendMessage";

export default function MessengerScreen(props: IMessengerScreenProps) {
  const [chats, setChats] = useState<IChat[]>([
    {
      messages: [],
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
          phone: "79493933400",
        },
      ],
    },
  ]);
  const [activeChatIndex, setActiveChatIndex] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messageInputRef = useRef<HTMLTextAreaElement | null>(null);

  const getChatName = (chat: IChat): string => {
    // TODO: format phone number
    // TODO: dup with "handleSendMessageClick"
    return (
      chat.users.find((user) => user.phone !== props.user.phone)?.phone ||
      "(You)"
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

      setChats((prev) =>
        prev.map((chat, i) =>
          i === activeChatIndex
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  { from: props.user, to: receiver!, text: message },
                ],
              }
            : chat
        )
      );
      setMessage("");
    } catch (e) {
      // TODO: show notification
      console.error("Failed to send a message. Please try again later", e);
    } finally {
      setIsSending(false);
      assert(messageInputRef.current != null);
      messageInputRef.current?.focus();
    }
  };

  useEffect(() => {
    if (activeChatIndex === null) {
      return;
    }

    assert(messageInputRef.current != null);

    messageInputRef.current?.focus();
    setMessage("");
  }, [activeChatIndex]);

  // TODO: extract some components (ConversationPanel, ...)
  return (
    <div className="messenger-screen__container">
      <div className="messenger-screen__chats-panel">
        {chats.map((chat, i) => (
          <div
            className={`messenger-screen__chat-container ${
              i === activeChatIndex
                ? "messenger-screen__chat-container_active"
                : ""
            }`}
            key={i}
            onClick={() => setActiveChatIndex(i)}
          >
            <p className="messenger-screen__chat-name">{getChatName(chat)}</p>
          </div>
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
            <div className="messenger-screen__conversation-panel-messages"></div>
            <div className="messenger-screen__conversation-panel-footer">
              {/* TODO: increase rows value dynamically as user types (?)*/}
              <textarea
                ref={messageInputRef}
                className="messenger-screen__message-input"
                rows={1}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>

              <button
                className={`messenger-screen__send-message-button ${
                  message ? "" : "messenger-screen__send-message-button_hidden"
                }`}
                disabled={isSending}
                onClick={handleSendMessageClick}
              >
                <svg
                  viewBox="0 0 24 24"
                  height="24"
                  width="24"
                  preserveAspectRatio="xMidYMid meet"
                  version="1.1"
                  x="0px"
                  y="0px"
                  enableBackground="new 0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
