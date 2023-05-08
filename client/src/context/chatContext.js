import { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const [showChatbox, setShowChatbox] = useState(false);
  const [chatsList, setChatsList] = useState([]);

  return (
    <ChatContext.Provider
      value={{ showChatbox, setShowChatbox, chatsList, setChatsList }}
    >
      {children}
    </ChatContext.Provider>
  );
};
