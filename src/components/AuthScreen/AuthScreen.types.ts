import { ICredentials } from "../../types";

export interface IAuthProps {
  credentials: ICredentials;
  setCredentials: (value: ICredentials) => void;
  onAuthenticated: () => void;
}
