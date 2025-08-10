import React, { useState } from 'react';
import { ChatContext } from './ChatContext';
import Chatbot from './Chatbot';
import Healthcare from './Healthcare';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
function App() {
  const [triggeredPrompt, setTriggeredPrompt] = useState(null);

  return (
    <ChatContext.Provider value={{ triggeredPrompt, setTriggeredPrompt }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Healthcare />} />
        <Route path="/healthcare" element={<Healthcare />} />


        <Route path="/chat" element={<Chatbot />} />
      </Routes>
      <Chatbot />
    </ChatContext.Provider>
  );
}

export default App;
