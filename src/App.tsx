import { useState } from "react";
import "./App.css";
import MessengerScreen from "./components/MessengerScreen/MessengerScreen";
import { ICredentials } from "./types";
import AuthScreen from "./components/AuthScreen/AuthScreen";

export default function App() {
  const [credentials, setCredentials] = useState<ICredentials>({
    idInstance: import.meta.env.VITE_ID_INSTANCE,
    apiTokenInstance: import.meta.env.VITE_API_TOKEN_INSTANCE,
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="app__container">
      {isAuthenticated ? (
        <MessengerScreen
          credentials={credentials}
          user={{
            phone: "",
          }}
        />
      ) : (
        <AuthScreen
          credentials={credentials}
          setCredentials={setCredentials}
          onAuthenticated={() => setIsAuthenticated(true)}
        />
      )}
    </div>
  );
}
