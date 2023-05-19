import "./CreateChatForm.css";
import "../../sharedStyles.css";
import { useState } from "react";
import { ICreateChatPanelProps } from "./CreateChatForm.types";
import BackArrowIcon from "../Icons/BackArrowIcon";

export default function CreateChatForm(props: ICreateChatPanelProps) {
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!phone) {
      return;
    }

    // TODO: add validation (valid & !chats.has(phone))
    props.onCreate(phone);
  };

  return (
    <div className="create-chat-form__container">
      <div className="create-chat-form__header">
        <button
          className="create-chat-form__back-button"
          onClick={props.onCancel}
        >
          <BackArrowIcon />
        </button>
        <p className="create-chat-form__header-text">New chat</p>
      </div>
      <div className="create-chat-form__content">
        <form onSubmit={handleSubmit}>
          <input
            autoFocus
            className="input-field"
            type="text"
            placeholder="Enter a phone number..."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <div className="create-chat-form__button-form__container">
            <button className="button-regular">Create chat</button>
          </div>
        </form>
      </div>
    </div>
  );
}
