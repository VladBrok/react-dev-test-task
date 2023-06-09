import "./App.css";
import { Suspense, useState } from "react";
import { ICredentials } from "./types";
import { lazy } from "react";

const MessengerScreen = lazy(
  () => import("./components/MessengerScreen/MessengerScreen")
);
const AuthScreen = lazy(() => import("./components/AuthScreen/AuthScreen"));

export default function App() {
  const [credentials, setCredentials] = useState<ICredentials>({
    idInstance: "",
    apiTokenInstance: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="app__container">
      {isAuthenticated ? (
        <Suspense>
          <MessengerScreen
            credentials={credentials}
            user={{
              phone: "",
            }}
          />
        </Suspense>
      ) : (
        <Suspense>
          <AuthScreen
            credentials={credentials}
            setCredentials={setCredentials}
            onAuthenticated={() => setIsAuthenticated(true)}
          />
        </Suspense>
      )}
    </div>
  );
}
