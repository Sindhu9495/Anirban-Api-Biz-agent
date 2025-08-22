// Hitech.js
import React, { useState, useContext, useMemo } from "react";
import "./Hitech.css";
import { ChatContext } from "./ChatContext";

const prompts = [
  { title: "Product usage spikes", content: "Features with significant week-over-week growth." },
  { title: "Churn risk accounts", content: "Accounts with declining engagement signals." },
  { title: "Release status", content: "Open issues and blockers for the next release." },
  { title: "Competitive intel", content: "Recent launches and pricing changes by competitors." },
  { title: "Pipeline health", content: "Deal stage risks and next best actions." },
  { title: "Support hotspots", content: "Top ticket categories and deflection opportunities." },
];

const imageCycle = ["/hitechsample1.jpg", "/hitechsample2.jpg", "/hitechsample3.jpg"];

const Hitech = () => {
  const { setTriggeredPrompt, addMessage, setChatState } = useContext(ChatContext);
  const [searchText, setSearchText] = useState("");

  const cardsToShow = useMemo(
    () => prompts.map((p, i) => ({ ...p, image: imageCycle[i % imageCycle.length] })),
    []
  );

  const sendSearchToChatbot = (raw) => {
    const text = (raw || "").trim();
    if (!text) return;
    setTriggeredPrompt(text);
    addMessage({ type: "user", text, timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) });
    setChatState((prev) => ({ ...prev, isOpen: true, isExpanded: true }));
    setSearchText("");
  };

  const handleSubmit = (e) => { e.preventDefault(); sendSearchToChatbot(searchText); };

  return (
    <div className="hitech-dashboard">
      <div className="header-section">
        <h1>Good morning, Joseph! How may I help you?</h1>
        <img src="/agentforce-flying.png" alt="Agentforce Flying" className="agentforce-flying" />

        <form className="search-bar" onSubmit={handleSubmit} role="search" aria-label="Agentforce search">
          <img src="/bot-avatar.png" alt="" aria-hidden="true" />
          <input
            type="text"
            placeholder="Ask Agentforce anything…"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            aria-label="Ask Agentforce anything"
          />
          <button type="submit" className="search-send-button" aria-label="Send to Agentforce" disabled={!searchText.trim()}>
            <span className="arrow-icon">➤</span>
          </button>
        </form>

        <div className="prompt-buttons" role="group" aria-label="Quick prompts">
          {prompts.map((p, i) => (
            <button key={i} className="prompt-button" type="button" onClick={() => sendSearchToChatbot(p.title)}>
              {p.title}
            </button>
          ))}
        </div>
      </div>

      <div className="announcement-section">
        <h2>Announcements</h2>
        <div className="announcement-grid">
          {cardsToShow.slice(0, 6).map((card, i) => (
            <div className="announcement-card" key={i}>
              <img className="card-top-image" src={card.image} alt={card.title} />
              <div className="card-content">
                <div className="date">July 28, 2025</div>
                <div className="title">{card.title}</div>
                <div className="description">{card.content}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hitech;
