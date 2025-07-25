import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FloatingActionMenu = ({ onAddNote, onViewNotes }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const actions = [
    {
      label: 'Travel Notes',
      icon: 'BookOpen',
      action: () => navigate('/travel-notes-and-tips'),
      color: 'bg-travel-green text-white'
    },
    {
      label: 'Add Note',
      icon: 'Plus',
      action: onAddNote,
      color: 'bg-accent text-midnight-black'
    },
    {
      label: 'Quick Tip',
      icon: 'Lightbulb',
      action: () => console.log('Quick tip'),
      color: 'bg-sunset-orange text-white'
    }
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action Items */}
      <AnimatePresence>
        {isOpen && (
          <div className="absolute bottom-16 right-0 flex flex-col-reverse space-y-reverse space-y-3">
            {actions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.2,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                className="flex items-center space-x-3"
              >
                {/* Action Label */}
                <div className="bg-card/95 backdrop-blur-sm px-3 py-2 rounded-full elevation-2 border border-border">
                  <span className="text-sm font-medium text-foreground whitespace-nowrap">
                    {action.label}
                  </span>
                </div>

                {/* Action Button */}
                <Button
                  variant="default"
                  size="icon"
                  onClick={() => {
                    action.action();
                    setIsOpen(false);
                  }}
                  className={`w-12 h-12 rounded-full elevation-3 spring-hover ${action.color}`}
                  aria-label={action.label}
                >
                  <Icon name={action.icon} size={20} />
                </Button>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <Button
        variant="default"
        size="icon"
        onClick={toggleMenu}
        className={`w-14 h-14 rounded-full bg-primary hover:bg-primary/90 elevation-4 spring-hover transition-transform duration-200 ${
          isOpen ? 'rotate-45' : ''
        }`}
        aria-label="Actions menu"
      >
        <Icon name="Plus" size={24} color="white" />
      </Button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingActionMenu;