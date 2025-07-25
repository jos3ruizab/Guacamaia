import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6"
    >
      {/* Illustration */}
      <div className="w-32 h-32 lg:w-40 lg:h-40 mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full animate-pulse" />
        <div className="absolute inset-4 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
          <Icon name="Calendar" size={48} color="white" />
        </div>
      </div>

      {/* Content */}
      <h2 className="font-heading text-2xl lg:text-3xl font-bold text-foreground mb-4">
        No Itinerary Yet
      </h2>
      
      <p className="text-muted-foreground font-body text-lg max-w-md mb-8 leading-relaxed">
        Start planning your dream trip with our AI-powered chat interface. 
        Tell us about your travel preferences and we'll create a personalized itinerary for you.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
        <Button
          variant="default"
          onClick={() => navigate('/trip-builder-chat-interface')}
          iconName="MessageCircle"
          iconPosition="left"
          iconSize={20}
          className="spring-hover"
        >
          Start Planning Trip
        </Button>
        
        <Button
          variant="outline"
          onClick={() => navigate('/landing-page')}
          iconName="ArrowLeft"
          iconPosition="left"
          iconSize={16}
          className="spring-hover"
        >
          Back to Home
        </Button>
      </div>

      {/* Features Preview */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl">
        <div className="text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="Bot" size={24} className="text-primary" />
          </div>
          <h3 className="font-medium text-foreground mb-1">AI-Powered</h3>
          <p className="text-sm text-muted-foreground">
            Intelligent trip planning
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="MapPin" size={24} className="text-accent" />
          </div>
          <h3 className="font-medium text-foreground mb-1">Personalized</h3>
          <p className="text-sm text-muted-foreground">
            Tailored to your style
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 bg-travel-green/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="Clock" size={24} className="text-travel-green" />
          </div>
          <h3 className="font-medium text-foreground mb-1">Detailed</h3>
          <p className="text-sm text-muted-foreground">
            Day-by-day timeline
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default EmptyState;