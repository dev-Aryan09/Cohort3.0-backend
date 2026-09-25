import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./routes/AppRoutes.jsx";
import {
  AuthContext,
  AuthProvider,
} from "./modules/auth/context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider value={AuthContext}>
    <AppRoutes />
  </AuthProvider>,
);
