import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TripPlanningFlow = ({ currentStep, onStepSelect, tripData, onUpdateTripData }) => {
  const planningSteps = [
    {
      id: 'destination',
      title: 'Where would you like to go?',
      icon: 'MapPin',
      completed: !!tripData.destination,
      options: null
    },
    {
      id: 'duration',
      title: 'How many days?',
      icon: 'Calendar',
      completed: !!tripData.duration,
      options: [
        { value: '3', label: '3 days - Quick getaway' },
        { value: '7', label: '7 days - Perfect week' },
        { value: '14', label: '14 days - Extended adventure' },
        { value: 'custom', label: 'Custom duration' }
      ]
    },
    {
      id: 'pace',
      title: 'What\'s your travel pace?',
      icon: 'Zap',
      completed: !!tripData.pace,
      options: [
        { 
          value: 'relaxed', 
          label: 'Relaxed', 
          description: 'Take it slow, enjoy the moment',
          icon: 'Coffee'
        },
        { 
          value: 'mixed', 
          label: 'Mixed', 
          description: 'Balance of activities and rest',
          icon: 'RotateCcw'
        },
        { 
          value: 'intense', 
          label: 'Intense', 
          description: 'Pack in as much as possible',
          icon: 'Zap'
        }
      ]
    },
    {
      id: 'style',
      title: 'What interests you most?',
      icon: 'Heart',
      completed: tripData.styles && tripData.styles.length > 0,
      options: [
        { 
          value: 'luxury', 
          label: 'Luxury', 
          description: 'Premium experiences and comfort',
          icon: 'Crown'
        },
        { 
          value: 'culture', 
          label: 'Culture', 
          description: 'Museums, history, local traditions',
          icon: 'Landmark'
        },
        { 
          value: 'food', 
          label: 'Food', 
          description: 'Culinary adventures and local cuisine',
          icon: 'ChefHat'
        },
        { 
          value: 'nature', 
          label: 'Nature', 
          description: 'Outdoor activities and natural beauty',
          icon: 'Trees'
        },
        { 
          value: 'nightlife', 
          label: 'Nightlife', 
          description: 'Entertainment and social experiences',
          icon: 'Music'
        }
      ]
    }
  ];

  const handleOptionSelect = (stepId, value) => {
    if (stepId === 'style') {
      // Handle multiple selection for styles
      const currentStyles = tripData.styles || [];
      const updatedStyles = currentStyles.includes(value)
        ? currentStyles.filter(style => style !== value)
        : [...currentStyles, value];
      onUpdateTripData({ styles: updatedStyles });
    } else {
      onUpdateTripData({ [stepId]: value });
    }
  };

  const currentStepData = planningSteps.find(step => step.id === currentStep);

  if (!currentStepData || !currentStepData.options) {
    return null;
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6 max-w-md mx-auto">
      {/* Step Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon name={currentStepData.icon} size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="font-heading text-lg text-foreground">
            {currentStepData.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            Step {planningSteps.findIndex(s => s.id === currentStep) + 1} of {planningSteps.length}
          </p>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {currentStepData.options.map((option) => {
          const isSelected = currentStep === 'style' 
            ? (tripData.styles || []).includes(option.value)
            : tripData[currentStep] === option.value;

          return (
            <Button
              key={option.value}
              variant={isSelected ? "default" : "outline"}
              onClick={() => handleOptionSelect(currentStep, option.value)}
              className={`w-full justify-start p-4 h-auto spring-hover ${
                isSelected ? 'elevation-1' : ''
              }`}
            >
              <div className="flex items-center space-x-3 w-full">
                {option.icon && (
                  <Icon 
                    name={option.icon} 
                    size={18} 
                    className={isSelected ? 'text-primary-foreground' : 'text-primary'}
                  />
                )}
                <div className="flex-1 text-left">
                  <div className="font-medium">
                    {option.label}
                  </div>
                  {option.description && (
                    <div className={`text-xs mt-1 ${
                      isSelected ? 'text-primary-foreground/80' : 'text-muted-foreground'
                    }`}>
                      {option.description}
                    </div>
                  )}
                </div>
                {isSelected && (
                  <Icon 
                    name="Check" 
                    size={16} 
                    className="text-primary-foreground"
                  />
                )}
              </div>
            </Button>
          );
        })}
      </div>

      {/* Progress Indicator */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex justify-between items-center">
          <div className="text-xs text-muted-foreground">
            Progress
          </div>
          <div className="text-xs text-muted-foreground">
            {planningSteps.filter(step => step.completed).length}/{planningSteps.length}
          </div>
        </div>
        <div className="w-full bg-muted rounded-full h-2 mt-2">
          <div 
            className="bg-primary rounded-full h-2 transition-all duration-500"
            style={{ 
              width: `${(planningSteps.filter(step => step.completed).length / planningSteps.length) * 100}%` 
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TripPlanningFlow;