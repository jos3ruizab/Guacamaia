import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ChatInput = ({ onSendMessage, onSurpriseMe, disabled = false, placeholder = "Type your message..." }) => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSurpriseMe = () => {
    if (!disabled && onSurpriseMe) {
      onSurpriseMe();
    }
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t border-border p-4 lg:p-6"
    >
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="flex items-end space-x-3">
          {/* Surprise Me Button */}
          {onSurpriseMe && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleSurpriseMe}
              disabled={disabled}
              className="mb-2 spring-hover"
              aria-label="Surprise me with a destination"
            >
              <Icon name="Shuffle" size={18} />
            </Button>
          )}

          {/* Input Container */}
          <div className={`flex-1 relative transition-all duration-200 ${
            isFocused ? 'elevation-2' : 'elevation-1'
          }`}>
            <div className={`bg-card border rounded-2xl transition-colors duration-200 ${
              isFocused ? 'border-primary' : 'border-border'
            }`}>
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder}
                disabled={disabled}
                rows={1}
                className="w-full px-4 py-3 bg-transparent border-none outline-none resize-none font-body text-sm text-foreground placeholder-muted-foreground min-h-[44px] max-h-[120px]"
                style={{ scrollbarWidth: 'thin' }}
              />
            </div>

            {/* Character Count */}
            {message.length > 200 && (
              <div className={`absolute -top-6 right-2 text-xs ${
                message.length > 500 ? 'text-error' : 'text-muted-foreground'
              }`}>
                {message.length}/500
              </div>
            )}
          </div>

          {/* Send Button */}
          <Button
            type="submit"
            variant="default"
            size="icon"
            disabled={!message.trim() || disabled}
            className={`mb-2 w-11 h-11 spring-hover transition-all duration-200 ${
              message.trim() && !disabled 
                ? 'bg-primary hover:bg-primary/90 scale-100' :'scale-95 opacity-50'
            }`}
            aria-label="Send message"
          >
            <Icon name="Send" size={18} color="white" />
          </Button>
        </form>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mt-3">
          {[
            "I want to explore Europe",
            "Plan a relaxing beach vacation",
            "Show me cultural destinations",
            "Adventure travel ideas"
          ].map((suggestion, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={() => !disabled && onSendMessage(suggestion)}
              disabled={disabled}
              className="text-xs text-muted-foreground hover:text-foreground hover:bg-muted spring-transition"
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatInput;