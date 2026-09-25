import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

/*
  custom hook,
  use this for using state in other components
 */
export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
}

export const AuthProvider = ({ children }) => {
  console.log("Auth context rendering...");
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  return (
    <AuthContext.Provider
      value={{ user, setUser, accessToken, setAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
