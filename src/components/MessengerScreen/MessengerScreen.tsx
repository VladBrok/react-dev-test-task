import { useState } from "react";
import "./MessengerScreen.css";
import { IChat } from "../../types";
import { IMessengerScreenProps } from "./MessengerScreen.types";

export default function MessengerScreen(props: IMessengerScreenProps) {
  const [chats, setChats] = useState<IChat[]>([
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

  const getChatName = (chat: IChat): string => {
    // TODO: format phone number
    return (
      chat.users.find((user) => user.phone !== props.user.phone)?.phone ||
      "(You)"
    );
  };

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
          <div className="messenger-screen__conversation-panel-content"></div>
        )}
      </div>
    </div>
  );
}
