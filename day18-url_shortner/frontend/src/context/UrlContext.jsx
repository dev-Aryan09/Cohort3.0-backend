import { useContext, useState } from "react";
import { createContext } from "react";

const UrlContext = createContext();

export const UrlContextProvider = ({ children }) => {
  const [currentUrl, setCurrentUrl] = useState(null);
  return (
    <UrlContext.Provider value={{ currentUrl, setCurrentUrl }}>
      {children}
    </UrlContext.Provider>
  );
};

export default function useUrlContext() {
  const context = useContext(UrlContext);

  if (!context) {
    throw new Error("useUrlContext must be use within UrlContextProvider");
  }

  // currentUrl, setCurrentUrl
  return context;
}
