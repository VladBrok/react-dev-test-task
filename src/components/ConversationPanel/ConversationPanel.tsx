import "./ConversationPanel.css";
import "../../sharedStyles.css";
import { useEffect, useMemo, useRef, useState } from "react";
import SendMessageIcon from "../Icons/SendMessageIcon";
import Message from "../Message/Message";
import { IConversationPanelProps } from "./ConversationPanel.types";
import { assert } from "../../lib/assert";

export default function ConversationPanel(props: IConversationPanelProps) {
  const [message, setMessage] = useState("");
  const messageInputRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const prevScrollTop = useRef(0);

  const handleSendMessageClick = (): void => {
    assert(message != "");
    assert(messageInputRef.current != null);

    messageInputRef.current?.focus();
    props.onSendMessage(message).then(() => {
      setMessage("");
    });
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

  useMemo(() => {
    prevScrollTop.current = messagesContainerRef.current?.scrollTop || 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.chat?.messages]);

  useEffect(() => {
    if (!messagesContainerRef.current || !props.chat?.messages.length) {
      return;
    }

    if (
      isScrolledToBottom() ||
      props.chat.messages[0].from.phone === props.user.phone
    ) {
      messagesContainerRef.current.scrollTop = 0;
    } else {
      const offset =
        (
          messagesContainerRef.current.firstChild as HTMLElement
        )?.getBoundingClientRect().height || 0;
      messagesContainerRef.current.scrollTop = prevScrollTop.current - offset;
    }
  }, [props.chat?.messages, props.user.phone]);

  return (
    <div className="conversation-panel__container">
      {props.chat == null ? (
        <div className="conversation-panel__no-selected-chat-view">
          <p className="conversation-panel__no-selected-chat-view-tiile">
            WhatsApp + Green API
          </p>
        </div>
      ) : (
        <div className="conversation-panel__content">
          <div className="conversation-panel__header">{props.name}</div>
          <div
            className="conversation-panel__messages"
            ref={messagesContainerRef}
          >
            {props.chat.messages.map((message, i) => (
              <Message user={props.user} message={message} key={i} />
            ))}
          </div>
          <div className="conversation-panel__footer">
            <textarea
              ref={messageInputRef}
              className="input-field"
              autoFocus
              rows={1}
              placeholder="Enter a message..."
              value={message}
              onKeyDown={handleKeyDown}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>

            <button
              className={`conversation-panel__send-message-button ${
                message ? "" : "conversation-panel__send-message-button_hidden"
              }`}
              disabled={props.isSending}
              onClick={handleSendMessageClick}
            >
              <SendMessageIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
