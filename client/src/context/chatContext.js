import { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const [showChatbox, setShowChatbox] = useState(false);

  return (
    <ChatContext.Provider value={{ showChatbox, setShowChatbox }}>
      {children}
    </ChatContext.Provider>
  );
};
