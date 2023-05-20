import "./ChatsPanel.css";
import { useState } from "react";
import { getChatName } from "../../lib/getChatName";
import Chat from "../Chat/Chat";
import CreateChatForm from "../CreateChatForm/CreateChatForm";
import NewChatIcon from "../Icons/NewChatIcon";
import { IChatsPanelProps } from "./ChatsPanel.types";

export default function ChatsPanel(props: IChatsPanelProps) {
  const [isCreateChatFormOpen, setIsCreateChatFormOpen] = useState(false);

  const handleCreateChat = (phone: string): void => {
    props.onCreateChat(phone);
    setIsCreateChatFormOpen(false);
  };

  return (
    <div className="chats-panel__container">
      {isCreateChatFormOpen ? (
        <CreateChatForm
          onCancel={() => setIsCreateChatFormOpen(false)}
          onCreate={handleCreateChat}
          chats={props.chats}
        />
      ) : (
        <>
          <div className="chats-panel__menu">
            <button
              title="New Chat"
              onClick={() => setIsCreateChatFormOpen(true)}
            >
              <NewChatIcon />
            </button>
          </div>
          {props.chats.map((chat, i) => (
            <Chat
              name={getChatName(chat, props.user)}
              isActive={i === props.activeChatIndex}
              onClick={() => props.onChatClick(chat, i)}
              key={i}
            />
          ))}
        </>
      )}
    </div>
  );
}