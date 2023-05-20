import "./Chat.css";
import { IChatProps } from "./Chat.types";

export default function Chat(props: IChatProps) {
  return (
    <div
      className={`chat__container ${
        props.isActive ? "chat__container_active" : ""
      }`}
      onClick={props.onClick}
    >
      <p className="chat__name">{props.name}</p>
    </div>
  );
}
