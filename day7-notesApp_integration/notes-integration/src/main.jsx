import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { MyContext, MyContextProvider } from "./context/MyContext.jsx";

createRoot(document.getElementById("root")).render(
  <MyContextProvider value={MyContext}>
    <App />
  </MyContextProvider>,
);
