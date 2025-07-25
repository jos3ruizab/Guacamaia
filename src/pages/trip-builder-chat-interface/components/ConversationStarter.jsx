import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ConversationStarter = ({ onStartConversation }) => {
  const starterPrompts = [
    {
      id: 'romantic',
      title: 'Romantic Getaway',
      description: 'Plan a perfect trip for two with intimate experiences',
      icon: 'Heart',
      color: 'from-pink-500 to-rose-500',
      prompt: "I want to plan a romantic getaway for my partner and me. We love intimate settings, beautiful sunsets, and memorable experiences together."
    },
    {
      id: 'adventure',
      title: 'Adventure Seeker',
      description: 'Thrilling activities and outdoor exploration',
      icon: 'Mountain',
      color: 'from-green-500 to-emerald-500',
      prompt: "I'm looking for an adventure-packed trip with hiking, outdoor activities, and exciting experiences in nature."
    },
    {
      id: 'cultural',
      title: 'Cultural Explorer',
      description: 'Immerse in local history, art, and traditions',
      icon: 'Landmark',
      color: 'from-purple-500 to-violet-500',
      prompt: "I want to explore rich cultures, visit museums, historical sites, and experience authentic local traditions and cuisine."
    },
    {
      id: 'relaxation',
      title: 'Pure Relaxation',
      description: 'Unwind with spa treatments and peaceful settings',
      icon: 'Waves',
      color: 'from-blue-500 to-cyan-500',
      prompt: "I need a relaxing vacation with spa treatments, beautiful beaches, and peaceful environments to recharge."
    },
    {
      id: 'foodie',
      title: 'Culinary Journey',
      description: 'Discover amazing food and local flavors',
      icon: 'ChefHat',
      color: 'from-orange-500 to-amber-500',
      prompt: "I'm a food lover looking to explore incredible cuisine, local markets, cooking classes, and unique dining experiences."
    },
    {
      id: 'surprise',
      title: 'Surprise Me!',
      description: 'Let AI choose the perfect destination for you',
      icon: 'Shuffle',
      color: 'from-indigo-500 to-purple-500',
      prompt: "surprise"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="font-heading text-2xl lg:text-3xl text-foreground mb-3">
          What kind of journey calls to you?
        </h2>
        <p className="font-body text-muted-foreground max-w-2xl mx-auto">
          Choose a travel style that resonates with your wanderlust, or describe your own unique vision
        </p>
      </motion.div>

      {/* Starter Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
      >
        {starterPrompts.map((starter) => (
          <motion.div
            key={starter.id}
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="ghost"
              onClick={() => onStartConversation(starter.prompt)}
              className="w-full h-auto p-0 bg-card border border-border rounded-2xl hover:bg-card hover:elevation-2 spring-transition overflow-hidden"
            >
              <div className="p-6 text-left w-full">
                {/* Icon with Gradient Background */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${starter.color} flex items-center justify-center mb-4`}>
                  <Icon name={starter.icon} size={24} color="white" />
                </div>

                {/* Content */}
                <h3 className="font-heading text-lg text-foreground mb-2">
                  {starter.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {starter.description}
                </p>

                {/* Arrow Indicator */}
                <div className="flex justify-end mt-4">
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                    <Icon name="ArrowRight" size={14} />
                  </div>
                </div>
              </div>
            </Button>
          </motion.div>
        ))}
      </motion.div>

      {/* Custom Input Prompt */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-center"
      >
        <p className="font-body text-sm text-muted-foreground mb-4">
          Or start typing below to describe your perfect trip...
        </p>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent mx-auto" />
      </motion.div>
    </div>
  );
};

export default ConversationStarter;