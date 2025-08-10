import React, { createContext, useState } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [triggeredPrompt, setTriggeredPrompt] = useState(null);

  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  return (
    <ChatContext.Provider value={{ messages, addMessage, triggeredPrompt, setTriggeredPrompt }}>
      {children}
    </ChatContext.Provider>
  );
};
