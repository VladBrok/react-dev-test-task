import "./ErrorMessage.css";
import { IErrorMessageProps } from "./ErrorMessage.types";

export default function ErrorMessage(props: IErrorMessageProps) {
  if (!props.text) {
    return <></>;
  }

  return <p className="error-message__container">{props.text}</p>;
}
