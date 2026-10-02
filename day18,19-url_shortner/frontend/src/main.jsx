import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UrlContextProvider } from "./context/UrlContext.jsx";

createRoot(document.getElementById("root")).render(
  <UrlContextProvider>
    <App />
  </UrlContextProvider>,
);
