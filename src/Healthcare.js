import React, { useState, useContext } from 'react';
import './Healthcare.css';
import { ChatContext } from './ChatContext';

const prompts = [
  {
    title: 'HCPs attending conferences',
    content: 'List of healthcare professionals attending upcoming conferences.',
  },
  {
    title: 'Summarize clinical insights',
    content: 'Summary of the latest clinical insights across various studies.',
  },
  {
    title: 'HCPs to meet with next',
    content: 'Recommended healthcare professionals to meet next based on priorities.',
  },
  {
    title: 'Analyze differentiators',
    content: 'Comparative analysis of product differentiators and advantages.',
  },
  {
    title: 'Show me declining prescribers',
    content: 'Here are the prescribers showing declining trends.',
  },
  {
    title: 'What are my pending medical inquiries?',
    content: 'List of pending medical inquiries assigned to you.',
  },
];

const imageCycle = ['/sample1.jpg', '/sample2.jpg', '/sample3.jpg'];

const Healthcare = () => {
  const { setTriggeredPrompt, addMessage } = useContext(ChatContext); // ✅ Use context here
  const [selectedPrompt, setSelectedPrompt] = useState(prompts[0]);
  const [searchText, setSearchText] = useState('');

  const matchedPrompts = prompts.filter((prompt) => {
    const query = searchText.toLowerCase();
    return query
      ? prompt.title.toLowerCase().includes(query) ||
          prompt.content.toLowerCase().includes(query)
      : prompt.title === selectedPrompt.title;
  });

  const cardsToShow = matchedPrompts.flatMap((prompt) =>
    [1, 2, 3].map((i) => ({
      ...prompt,
      title: `${prompt.title} - Card ${i}`,
      content: `${prompt.content} (Detail ${i})`,
      image: imageCycle[(i - 1) % imageCycle.length],
    }))
  );

  return (
    <div className="healthcare-dashboard">
      <div className="header-section">
        <h1>Good morning, Joseph! How may I help you?</h1>
        <img
          src="/agentforce-flying.png"
          alt="Agentforce Flying"
          className="agentforce-flying"
        />

        <div className="search-bar">
          <img src="/bot-avatar.png" alt="Agentforce Icon" />
          <input
            type="text"
            placeholder="Ask Agentforce anything…"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="prompt-buttons">
          {prompts.map((prompt, index) => (
            <button
              key={index}
              className={`prompt-button ${
                selectedPrompt.title === prompt.title && searchText === '' ? 'selected' : ''
              }`}
              onClick={() => {
                setSelectedPrompt(prompt);
                setSearchText('');
                setTriggeredPrompt(prompt.title); // Send to chatbot context
                addMessage({
                  type: 'user',
                  text: prompt.title,
                  timestamp: new Date().toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  }),
                });
              }}
            >
              {prompt.title}
            </button>
          ))}
        </div>
      </div>

      <div className="announcement-section">
        <h2>Announcements</h2>
        <div className="announcement-grid">
          {cardsToShow.length > 0 ? (
            cardsToShow.map((card, index) => (
              <div className="announcement-card" key={index}>
                <img className="card-top-image" src={card.image} alt={card.title} />
                <div className="card-content">
                  <div className="date">July 28, 2025</div>
                  <div className="title">{card.title}</div>
                  <div className="description">{card.content}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">No results found for “{searchText}”.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Healthcare;
