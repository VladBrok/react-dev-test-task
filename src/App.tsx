import "./App.css";
import MessengerScreen from "./components/MessengerScreen/MessengerScreen";

export default function App() {
  return (
    <>
      <MessengerScreen
        user={{
          phone: "",
        }}
      />
    </>
  );
}
