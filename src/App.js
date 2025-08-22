// App.js
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { ChatProvider } from './ChatContext';
import Chatbot from './Chatbot';
import Navbar from './Navbar';

import Healthcare from './Healthcare';
import BFSI from './BFSI';
import Hitech from './Hitech';
import Retail from './Retail';
import Logistics from './Logistics';

function App() {
  const [chatState, setChatState] = useState({
    isOpen: false,
    isExpanded: false,
  });

  return (
    <ChatProvider>
      <Navbar />

      <Routes>
        {/* Home -> Healthcare */}
        <Route path="/" element={<Navigate to="/healthcare" replace />} />

        <Route path="/healthcare" element={<Healthcare setChatState={setChatState} />} />
        <Route path="/bfsi" element={<BFSI setChatState={setChatState} />} />
        <Route path="/logistics" element={<Logistics setChatState={setChatState} />} />
        <Route path="/hi-tech" element={<Hitech setChatState={setChatState} />} />
        <Route path="/digital-commerce" element={<Retail setChatState={setChatState} />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/healthcare" replace />} />
      </Routes>

      {/* Chatbot mounted once */}
      <Chatbot
        isOpen={chatState.isOpen}
        isExpanded={chatState.isExpanded}
        setChatState={setChatState}
      />
    </ChatProvider>
  );
}

export default App;
