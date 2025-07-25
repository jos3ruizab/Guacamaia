import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import Button from '../../../components/ui/Button';

const SurpriseButton = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const surpriseDestinations = [
    "Santorini, Greece",
    "Kyoto, Japan", 
    "Bali, Indonesia",
    "Tuscany, Italy",
    "Maldives",
    "Swiss Alps",
    "Morocco",
    "New Zealand",
    "Iceland",
    "Costa Rica"
  ];

  const handleSurpriseMe = () => {
    const randomDestination = surpriseDestinations[Math.floor(Math.random() * surpriseDestinations.length)];
    // Store the surprise destination in localStorage for the chat interface
    localStorage.setItem('surpriseDestination', randomDestination);
    navigate('/trip-builder-chat-interface');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.5 }}
      className="mt-8 lg:mt-12"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Button
          variant="outline"
          size="lg"
          onClick={handleSurpriseMe}
          iconName="Shuffle"
          iconPosition="left"
          className="bg-white/20 backdrop-blur-sm border-2 border-accent/30 text-midnight-black hover:bg-accent/10 hover:border-accent/50 px-6 py-3 lg:px-8 lg:py-4 text-base lg:text-lg font-medium rounded-full spring-transition"
        >
          <motion.span
            animate={{ 
              color: isHovered ? '#d4af37' : '#1e1e1e'
            }}
            transition={{ duration: 0.2 }}
          >
            Surprise me with a destination
          </motion.span>
        </Button>
      </motion.div>

      {/* Floating hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
        className="text-sm text-sophisticated-gray/70 mt-4 font-body"
      >
        Let AI choose your next adventure
      </motion.p>
    </motion.div>
  );
};

export default SurpriseButton;