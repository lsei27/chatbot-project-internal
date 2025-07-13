import React, { useState, useEffect, useRef } from 'react';
import './ChatInterface.css';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import ChatService from '../services/ChatService';

const ChatInterface = ({ isConnected, setIsConnected }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [threadId, setThreadId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      let currentThreadId = threadId;
      // Pokud není threadId, vytvoř nový thread
      if (!currentThreadId) {
        const threadResponse = await ChatService.createThread();
        currentThreadId = threadResponse.data?.threadId || threadResponse.threadId;
        setThreadId(currentThreadId);
      }

      // Odeslat zprávu
      const data = await ChatService.sendMessage(message, currentThreadId);

      // Uložit threadId pokud je v odpovědi
      if (data.threadId && !threadId) {
        setThreadId(data.threadId);
      }

      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: data.assistantMessage,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsConnected(true);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        role: 'error',
        content: error.message || 'Nepodařilo se odeslat zprávu. Zkontrolujte připojení k serveru.',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-interface">
      <div className="chat-container">
        <div className="messages-container">
          {messages.length === 0 && (
            <div className="welcome-message">
              <div className="welcome-icon">👥</div>
              <h2>Vítejte u interního asistenta</h2>
              <p>Zeptejte se na cokoliv ohledně onboardingu, interních procesů nebo procedur.</p>
            </div>
          )}
          
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {isLoading && (
            <div className="loading-message">
              <div className="loading-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <p>Asistent přemýšlí...</p>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatInterface; 