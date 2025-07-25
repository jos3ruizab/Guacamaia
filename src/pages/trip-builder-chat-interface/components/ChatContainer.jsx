import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ChatMessage from './ChatMessage';

const ChatContainer = ({ messages, isTyping = false }) => {
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive or typing indicator changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'end'
    });
  }, [messages, isTyping]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="flex-1 overflow-hidden bg-background ambient-texture">
      <div 
        ref={containerRef}
        className="h-full overflow-y-auto custom-scrollbar px-4 lg:px-6 py-6"
      >
        <div className="max-w-4xl mx-auto">
          {/* Welcome Message */}
          {messages.length === 0 && !isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <svg width="32" height="32" viewBox="0 0 100 100" className="text-white">
                    <circle cx="50" cy="50" r="45" fill="currentColor" stroke="white" strokeWidth="2"/>
                    <circle cx="35" cy="40" r="3" fill="white"/>
                    <circle cx="65" cy="40" r="3" fill="white"/>
                    <path d="M30 60 Q50 75 70 60" stroke="white" strokeWidth="2" fill="none"/>
                    <path d="M45 25 Q50 15 55 25" stroke="white" strokeWidth="2" fill="none"/>
                  </svg>
                </motion.div>
              </div>
              <h2 className="font-heading text-2xl lg:text-3xl text-foreground mb-3">
                Welcome to GuacamaIA
              </h2>
              <p className="font-body text-muted-foreground max-w-md mx-auto leading-relaxed">
                I'm your AI travel companion, ready to craft the perfect journey for you. 
                Tell me about your dream destination!
              </p>
            </motion.div>
          )}

          {/* Messages */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {messages.map((message, index) => (
              <ChatMessage
                key={message.id || index}
                message={message}
              />
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <ChatMessage
                message={{ content: '', isUser: false, timestamp: null }}
                isTyping={true}
              />
            )}
          </motion.div>
        </div>

        {/* Scroll anchor - moved outside max-w-4xl */}
        <div ref={messagesEndRef} />
      </div>

      {/* Gradient Overlay for better readability */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
};

export default ChatContainer;