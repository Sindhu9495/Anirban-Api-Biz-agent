import React, { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chatState, setChatState] = useState({
    isOpen: false,
    isExpanded: false,
    messages: [],
  });

  const [triggeredPrompt, setTriggeredPrompt] = useState("");

  const addMessage = (message) => {
    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };

  return (
    <ChatContext.Provider
      value={{ chatState, setChatState, triggeredPrompt, setTriggeredPrompt, addMessage }}
    >
      {children}
    </ChatContext.Provider>
  );
};
