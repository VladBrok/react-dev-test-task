import { useMemo, useRef, useState } from "react";
import "../../sharedStyles.css";
import "./AuthScreen.css";
import { IAuthProps } from "./AuthScreen.types";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { z } from "zod";
import { assert } from "../../lib/assert";

export default function AuthScreen(props: IAuthProps) {
  const [idInstanceErrorMessage, setIdInstanceErrorMessage] = useState("");
  const [apiTokenInstanceErrorMessage, setApiTokenInstanceErrorMessage] =
    useState("");
  const idInstanceInputRef = useRef<HTMLInputElement | null>(null);
  const apiTokenInstanceInputRef = useRef<HTMLInputElement | null>(null);

  const idInstanceScheme = useMemo(() => {
    return z.string().min(1, { message: "Please specify an idInstance" });
  }, []);

  const apiTokenInstanceScheme = useMemo(() => {
    return z.string().min(1, { message: "Please specify an apiTokenInstance" });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const idInstanceValidationResult = idInstanceScheme.safeParse(
      props.credentials.idInstance
    );

    if (!idInstanceValidationResult.success) {
      setIdInstanceErrorMessage(
        idInstanceValidationResult.error.errors[0].message
      );
      assert(idInstanceInputRef.current != null);
      idInstanceInputRef.current?.focus();
      return;
    }
    setIdInstanceErrorMessage("");

    const apiTokenInstanceValidationResult = apiTokenInstanceScheme.safeParse(
      props.credentials.apiTokenInstance
    );

    if (!apiTokenInstanceValidationResult.success) {
      setApiTokenInstanceErrorMessage(
        apiTokenInstanceValidationResult.error.errors[0].message
      );
      assert(apiTokenInstanceInputRef.current != null);
      apiTokenInstanceInputRef.current?.focus();
      return;
    }
    setApiTokenInstanceErrorMessage("");

    props.onAuthenticated();
  };

  return (
    <div className="auth-screen__container">
      <p className="auth-screen__title">Welcome!</p>
      <form className="auth-screen__form" onSubmit={handleSubmit}>
        <div className="auth-screen__form-element">
          <input
            ref={idInstanceInputRef}
            className="input-field"
            autoFocus
            type="password"
            placeholder="Enter an idInstance..."
            value={props.credentials.idInstance}
            onChange={(e) =>
              props.setCredentials({
                ...props.credentials,
                idInstance: e.target.value.trim(),
              })
            }
          />
          <ErrorMessage text={idInstanceErrorMessage} />
        </div>
        <div className="auth-screen__form-element">
          <input
            ref={apiTokenInstanceInputRef}
            className="input-field"
            type="password"
            placeholder="Enter an apiTokenInstance..."
            value={props.credentials.apiTokenInstance}
            onChange={(e) =>
              props.setCredentials({
                ...props.credentials,
                apiTokenInstance: e.target.value.trim(),
              })
            }
          />
          <ErrorMessage text={apiTokenInstanceErrorMessage} />
        </div>
        <button className="button-regular">Login</button>
      </form>
    </div>
  );
}
