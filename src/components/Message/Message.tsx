import "./Message.css";
import { IMessageProps } from "./Message.types";

export default function Message(props: IMessageProps) {
  return (
    <div
      className={`message__container ${
        props.message.from.phone === props.user.phone
          ? "message__container_from-me"
          : "message__container_from-friend"
      }`}
    >
      <div
        className={`message__message ${
          props.message.from.phone === props.user.phone
            ? "message__message_from-me"
            : "message__message_from-friend"
        }`}
      >
        {props.message.text}
      </div>
    </div>
  );
}
