import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import './Chatbot.css';
import strings from './chatbotStrings.json';

const apiUrl = 'https://force-velocity-9211-dev-ed.scratch.my.salesforce-sites.com/services/apexrest/AI_Copilot/api/v1.0/';
const headers = {
  'Content-Type': 'application/json',
  'api_token': '552a73ba-62dd-4472-b3c6-240711042720269',
};

const getTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
const formatBotReply = (text) => `<p>${text}</p>`;

const Chatbot = () => {
  const [triggeredPrompt, setTriggeredPrompt] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'meta', text: strings.meta_joined, timestamp: getTime() },
    { type: 'bot', text: formatBotReply(strings.bot_intro), timestamp: getTime() },
    { type: 'bot-buttons', buttons: strings.bot_buttons, timestamp: getTime() },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleBotResponse = useCallback(async (userMessage) => {
    setIsLoading(true);
    try {
      const requestBody = {
        configAiName: 'OpenAI',
        promptQuery: userMessage,
        dataSourceApiName: 'Order_&_Invoice_Details',
      };

      const response = await axios.post(apiUrl, requestBody, { headers });
      const botReply = formatBotReply(response.data.answer || strings.default_reply);
      setMessages((prev) => [...prev, { type: 'bot', text: botReply, timestamp: getTime() }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { type: 'bot', text: formatBotReply(strings.error_response), timestamp: getTime() },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    const time = getTime();
    const userMessage = input;
    setInput('');
    setMessages((prev) => [...prev, { type: 'user', text: userMessage, timestamp: time }]);
    await handleBotResponse(userMessage);
  };

  const handleButtonClick = async (text) => {
    const time = getTime();
    setMessages((prev) => [...prev, { type: 'user', text, timestamp: time }]);
    setIsLoading(true);

    try {
      if (text === strings.bot_buttons[1]) {
        setMessages((prev) => [
          ...prev,
          { type: 'bot', text: formatBotReply(strings.demo_response), timestamp: getTime() },
        ]);
      } else {
        const response = await axios.post(apiUrl, {
          configAiName: 'OpenAI',
          promptQuery: text,
          dataSourceApiName: 'Order_&_Invoice_Details',
        }, { headers });

        const botReply = formatBotReply(response.data.answer || `You selected: ${text}. Let me assist you with that.`);
        setMessages((prev) => [
          ...prev,
          { type: 'bot', text: botReply, timestamp: getTime() },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { type: 'bot', text: formatBotReply(strings.error_response), timestamp: getTime() },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (triggeredPrompt) {
      const time = getTime();
      const userMessage = triggeredPrompt;

      setMessages((prev) => [...prev, { type: 'user', text: userMessage, timestamp: time }]);
      handleBotResponse(userMessage);
      setTriggeredPrompt(null);
    }
  }, [triggeredPrompt, handleBotResponse]);

  const togglePopup = () => setIsOpen(!isOpen);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <>
      <button className="chatbot-toggle-button" onClick={togglePopup}>
        <img src="/bot-avatar.png" alt="Agentforce Bot" className="toggle-icon" />
        {strings.button_label}
      </button>

      {isOpen && (
        <div className={`chatbot-popup ${isExpanded ? 'expanded' : ''}`}>
          <div className="chatbot-header">
            <span className="title">{strings.header_title}</span>
            <div className="header-actions">
              <button title="Info" onClick={() => alert(strings.header_info)}>ℹ️</button>
              <button title="More options" onClick={() => alert(strings.header_more)}>⋮</button>
              <button title="Expand" onClick={toggleExpand}>⛶</button>
              <button title="Minimize" onClick={togglePopup}>—</button>
            </div>
          </div>

          <div className="chatbot-body">
            <h2>
              {strings.heading_question}{' '}
              <span className="highlight">{strings.heading_bot_name}</span>{' '}
              {strings.heading_suffix}
            </h2>

            <div className="chatbot-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`chatbot-message ${msg.type}`}>
                  {msg.type === 'meta' && (
                    <div className="message-bubble centered">
                      {msg.text} <span className="timestamp">{msg.timestamp}</span>
                    </div>
                  )}

                  {msg.type === 'bot' && (
                    <div className="chatbot-message bot">
                      <div className="bot-avatar-wrapper">
                        <img src="/bot-avatar.png" className="avatar" alt="Bot" />
                      </div>
                      <div
                        className="message-bubble bot-bubble"
                        dangerouslySetInnerHTML={{ __html: msg.text }}
                      />
                      <div className="timestamp bot-timestamp-left">{msg.timestamp}</div>
                    </div>
                  )}

                  {msg.type === 'user' && (
                    <div className="chatbot-message user">
                      <div className="message-bubble user-bubble">{msg.text}</div>
                      <div className="timestamp">Sent: {msg.timestamp}</div>
                    </div>
                  )}

                  {msg.type === 'bot-buttons' && (
                    <div className="chatbot-message bot-buttons">
                      {msg.buttons.map((btnText, idx) => (
                        <button key={idx} onClick={() => handleButtonClick(btnText)}>
                          {btnText}
                        </button>
                      ))}
                      <div className="timestamp">{msg.timestamp}</div>
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="chatbot-message bot shimmer-loader">
                  <div className="bot-avatar-wrapper">
                    <img src="/bot-avatar.png" className="avatar" alt="Bot" />
                  </div>
                  <div className="message-bubble shimmer-bubble">
                    <div className="shimmer-bar shimmer-bar-1"></div>
                    <div className="shimmer-bar shimmer-bar-2"></div>
                    <div className="shimmer-bar shimmer-bar-3"></div>
                  </div>
                  <div className="timestamp bot-timestamp-left">{getTime()}</div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder={strings.placeholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              disabled={isLoading}
            />
            <button onClick={handleSend} disabled={isLoading}>➤</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
