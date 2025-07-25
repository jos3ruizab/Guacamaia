import React from 'react';
import { motion } from 'framer-motion';

import Button from '../../../components/ui/Button';

const TimelineNavigation = ({ days, currentDay, onDaySelect, onPrevious, onNext }) => {
  // Handle case where days might be undefined or empty
  if (!days || days.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-20 z-30 bg-background/95 backdrop-blur-sm border-b border-border p-4 mb-6">
      <div className="flex items-center justify-between">
        {/* Previous Day Button */}
        <Button
          variant="ghost"
          onClick={onPrevious}
          disabled={currentDay === 0}
          iconName="ChevronLeft"
          iconPosition="left"
          iconSize={16}
          className="spring-hover disabled:opacity-50"
        >
          Previous
        </Button>

        {/* Day Selector */}
        <div className="flex items-center space-x-2 overflow-x-auto max-w-md">
          {days?.map((day, index) => (
            <Button
              key={day?.id || `day-${index}`}
              variant={currentDay === index ? "default" : "ghost"}
              size="sm"
              onClick={() => onDaySelect?.(index)}
              className={`min-w-0 px-3 py-2 spring-hover ${
                currentDay === index 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="flex flex-col items-center">
                <span className="text-xs font-medium">
                  Day {index + 1}
                </span>
                <span className="text-xs opacity-70 truncate max-w-16">
                  {day?.title?.split(':')[1]?.trim() || day?.title || `Day ${index + 1}`}
                </span>
              </div>
            </Button>
          ))}
        </div>

        {/* Next Day Button */}
        <Button
          variant="ghost"
          onClick={onNext}
          disabled={currentDay === days?.length - 1}
          iconName="ChevronRight"
          iconPosition="right"
          iconSize={16}
          className="spring-hover disabled:opacity-50"
        >
          Next
        </Button>
      </div>

      {/* Progress Indicator */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>Day {currentDay + 1} of {days?.length || 0}</span>
          <span>{Math.round(((currentDay + 1) / (days?.length || 1)) * 100)}% Complete</span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentDay + 1) / (days?.length || 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
};

export default TimelineNavigation;