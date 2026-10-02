import { useContext, useState } from "react";
import { createContext } from "react";

const UrlContext = createContext();

export const UrlContextProvider = ({ children }) => {
  const [currentUrl, setCurrentUrl] = useState(null);
  const [urls, setAllUrls] = useState([]);
  return (
    <UrlContext.Provider value={{ currentUrl, setCurrentUrl, urls, setAllUrls }}>
      {children}
    </UrlContext.Provider>
  );
};

export default function useUrlContext() {
  const context = useContext(UrlContext);

  if (!context) {
    throw new Error("useUrlContext must be use within UrlContextProvider");
  }

  // currentUrl, setCurrentUrl, urls, allUrls
  return context;
}
