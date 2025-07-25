import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import MarkdownRenderer from '../../../components/ui/MarkdownRenderer';

const ChatMessage = ({ message, isTyping = false }) => {
  const { content, isUser, timestamp } = message;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex gap-4 mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {/* Avatar */}
      {!isUser && (
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center shadow-lg">
            <img
              src="/assets/images/maia.png" // <-- update path as needed
              alt="GuacamaIA Bot"
              className="w-10 h-10 object-contain"
            />
          </div>
        </div>
      )}

      {/* Message Content */}
      <div className={`max-w-[80%] ${isUser ? 'order-first' : ''}`}>
        {/* Message Bubble */}
        <div
          className={`p-4 rounded-2xl shadow-sm ${
            isUser
              ? 'bg-primary text-primary-foreground ml-auto'
              : 'bg-card text-card-foreground border border-border'
          }`}
        >
          {(isTyping || (!isUser && !content)) ? (
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-sm text-muted-foreground">Maia is thinking...</span>
            </div>
          ) : (
            <div className="prose prose-sm max-w-none">
              {isUser ? (
                <p className="font-body leading-relaxed m-0">{content}</p>
              ) : (
                <MarkdownRenderer 
                  content={content} 
                  className="text-card-foreground [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
                />
              )}
            </div>
          )}
        </div>

        {/* Timestamp */}
        {timestamp && !isTyping && (
          <div className={`text-xs text-muted-foreground mt-2 ${isUser ? 'text-right' : 'text-left'}`}>
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        )}
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center shadow-lg border border-border">
            <User className="w-5 h-5 text-secondary-foreground" />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ChatMessage;