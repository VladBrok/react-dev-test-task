import "./ChatsPanel.css";
import { Suspense, lazy, useState } from "react";
import { getChatName } from "../../lib/getChatName";
import Chat from "../Chat/Chat";
import NewChatIcon from "../Icons/NewChatIcon";
import { IChatsPanelProps } from "./ChatsPanel.types";

const CreateChatForm = lazy(() => import("../CreateChatForm/CreateChatForm"));

export default function ChatsPanel(props: IChatsPanelProps) {
  const [isCreateChatFormOpen, setIsCreateChatFormOpen] = useState(false);

  const handleCreateChat = (phone: string): void => {
    props.onCreateChat(phone);
    setIsCreateChatFormOpen(false);
  };

  return (
    <div className="chats-panel__container">
      {isCreateChatFormOpen ? (
        <Suspense>
          <CreateChatForm
            onCancel={() => setIsCreateChatFormOpen(false)}
            onCreate={handleCreateChat}
            chats={props.chats}
          />
        </Suspense>
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
          {!props.chats.length && (
            <div className="chats-panel__empty">
              <p>No chats</p>
              <p>
                Click on the "
                <span className="chats-panel__new-chat-icon">
                  <NewChatIcon />
                </span>
                " icon at the top to create a chat
              </p>
            </div>
          )}
          <div className="chats-panel__chats">
            {props.chats.map((chat, i) => (
              <Chat
                name={getChatName(chat, props.user)}
                isActive={i === props.activeChatIndex}
                onClick={() => props.onChatClick(chat, i)}
                key={chat.id}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
