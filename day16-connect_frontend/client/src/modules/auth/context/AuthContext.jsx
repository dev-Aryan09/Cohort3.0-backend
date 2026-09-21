import { createContext, useState } from "react";

export const AuthStore = createContext();

export const AuthProvider = ({ children }) => {
  console.log("Auth context rendering...");
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  <AuthStore.Provider value={{ user, setUser, accessToken, setAccessToken }}>
    {children}
  </AuthStore.Provider>;
};
