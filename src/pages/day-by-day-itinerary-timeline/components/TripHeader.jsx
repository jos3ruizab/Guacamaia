import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TripHeader = ({ trip, onEdit, onShare, onExport }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card border border-border rounded-2xl p-6 mb-8 elevation-2 ambient-texture"
    >
      {/* Trip Title and Destination */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
        <div className="flex-1 mb-4 lg:mb-0">
          <h1 className="font-heading text-2xl lg:text-3xl font-bold text-foreground mb-2">
            {trip.title}
          </h1>
          <div className="flex items-center space-x-4 text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" size={16} />
              <span className="font-body">{trip.destination}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={16} />
              <span className="font-body">{trip.dateRange}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} />
              <span className="font-body">{trip.travelers}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={onEdit}
            iconName="Edit3"
            iconPosition="left"
            iconSize={16}
            className="spring-hover"
          >
            Edit Trip
          </Button>
          
          <Button
            variant="ghost"
            onClick={onShare}
            iconName="Share2"
            iconPosition="left"
            iconSize={16}
            className="spring-hover"
          >
            Share
          </Button>
          
          <Button
            variant="ghost"
            onClick={onExport}
            iconName="Download"
            iconPosition="left"
            iconSize={16}
            className="spring-hover"
          >
            Export
          </Button>
        </div>
      </div>

      {/* Trip Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-xl">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary font-heading">
            {trip.totalDays}
          </div>
          <div className="text-sm text-muted-foreground font-body">
            Days
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-accent font-heading">
            {trip.totalActivities}
          </div>
          <div className="text-sm text-muted-foreground font-body">
            Activities
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-travel-green font-heading">
            {trip.totalMeals}
          </div>
          <div className="text-sm text-muted-foreground font-body">
            Meals
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-sunset-orange font-heading">
            {trip.estimatedBudget}
          </div>
          <div className="text-sm text-muted-foreground font-body">
            Budget
          </div>
        </div>
      </div>

      {/* Trip Description */}
      {trip.description && (
        <div className="mt-6 p-4 bg-background/50 rounded-xl border border-border/50">
          <p className="text-muted-foreground font-body leading-relaxed">
            {trip.description}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default TripHeader;