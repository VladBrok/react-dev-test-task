import "./App.css";
import MessengerScreen from "./components/MessengerScreen/MessengerScreen";

export default function App() {
  return (
    <>
      <MessengerScreen
        credentials={{
          idInstance: import.meta.env.VITE_ID_INSTANCE,
          apiTokenInstance: import.meta.env.VITE_API_TOKEN_INSTANCE,
        }}
        user={{
          phone: "",
        }}
      />
    </>
  );
}
