import React from 'react';
import './ChatMessage.css';
import { Bot, User, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ChatMessage = ({ message }) => {
  const { role, content, timestamp } = message;
  
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('cs-CZ', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMessageIcon = () => {
    switch (role) {
      case 'user':
        return <User size={16} color="#fff" />;
      case 'assistant':
        return <Bot size={16} color="#fff" />;
      case 'error':
        return <AlertCircle size={16} color="#e53935" />;
      default:
        return null;
    }
  };

  const getMessageClass = () => {
    switch (role) {
      case 'user':
        return 'message user-message';
      case 'assistant':
        return 'message assistant-message';
      case 'error':
        return 'message error-message';
      default:
        return 'message';
    }
  };

  return (
    <div className={getMessageClass()}>
      <div className="message-content">
        <div className="message-header">
          <div className="message-icon">
            {getMessageIcon()}
          </div>
          <span className="message-role">
            {role === 'user' ? 'Vy' : role === 'assistant' ? 'Asistent' : 'Chyba'}
          </span>
          <span className="message-time">
            {formatTime(timestamp)}
          </span>
        </div>
        <div className="message-text">
          {role === 'assistant' ? (
            <>
              {console.log('ASSISTANT RAW CONTENT:', content)}
              <ReactMarkdown>{content}</ReactMarkdown>
            </>
          ) : (
            content
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage; 