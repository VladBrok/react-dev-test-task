import "./CreateChatForm.css";
import "../../sharedStyles.css";
import { useMemo, useRef, useState } from "react";
import { ICreateChatPanelProps } from "./CreateChatForm.types";
import BackArrowIcon from "../Icons/BackArrowIcon";
import { z } from "zod";
import { assert } from "../../lib/assert";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function CreateChatForm(props: ICreateChatPanelProps) {
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const phoneSchema = useMemo(() => {
    return z
      .string()
      .trim()
      .min(1, { message: "Please specify a phone number" })
      .regex(/^[0-9]+$/, { message: "Must contain only digits from 0 to 9" })
      .min(9, { message: "Must be 9 or more characters long" })
      .max(20, { message: "Must be 20 or fewer characters long" })
      .refine(
        (val) =>
          !props.chats.some((chat) =>
            chat.users.some((user) => user.phone === val)
          ),
        { message: "Chat with this phone already exists" }
      );
  }, [props.chats]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationResult = phoneSchema.safeParse(phone);

    if (!validationResult.success) {
      setErrorMessage(validationResult.error.errors[0].message);
      assert(inputRef.current != null);
      inputRef.current?.focus();
    } else {
      props.onCreate(validationResult.data);
    }
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
            ref={inputRef}
            autoFocus
            className="input-field"
            type="text"
            placeholder="Enter a phone number... (example: 79491234567)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <ErrorMessage text={errorMessage} />
          <div className="create-chat-form__button-form__container">
            <button className="button-regular">Create chat</button>
          </div>
        </form>
      </div>
    </div>
  );
}
