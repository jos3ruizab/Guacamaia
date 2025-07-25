import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const JourneyProgress = () => {
  const location = useLocation();

  const journeySteps = [
  {
    path: '/landing-page',
    label: 'Discover',
    icon: 'Compass',
    description: 'Start your journey'
  },
  {
    path: '/trip-builder-chat-interface',
    label: 'Plan',
    icon: 'MessageCircle',
    description: 'Chat with AI'
  },
  {
    path: '/day-by-day-itinerary-timeline',
    label: 'Timeline',
    icon: 'Calendar',
    description: 'Your itinerary'
  },
  {
    path: '/travel-notes-and-tips',
    label: 'Notes',
    icon: 'BookOpen',
    description: 'Tips & insights'
  }];


  const getCurrentStepIndex = () => {
    const currentIndex = journeySteps.findIndex((step) => step.path === location.pathname);
    return currentIndex >= 0 ? currentIndex : 0;
  };

  const currentStepIndex = getCurrentStepIndex();
  const isLandingPage = location.pathname === '/landing-page' || location.pathname === '/';

  // Don't show progress on landing page
  if (isLandingPage) {
    return null;
  }

  return (
    <div className="hidden fixed bottom-20 left-1/2 transform -translate-x-1/2 z-40 bg-card/95 backdrop-blur-sm rounded-full px-6 py-3 elevation-2 border border-border">
      <div className="flex items-center space-x-4">
        {journeySteps.map((step, index) => {
          const isActive = index === currentStepIndex;
          const isCompleted = index < currentStepIndex;
          const isUpcoming = index > currentStepIndex;

          return (
            <div key={step.path} className="flex items-center">
              {/* Step Indicator */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center transition-all duration-300 spring-transition ${
                  isActive ?
                  'bg-primary text-primary-foreground elevation-1 scale-110' :
                  isCompleted ?
                  'bg-success text-success-foreground' :
                  'bg-muted text-muted-foreground'}`
                  }>

                  {isCompleted ?
                  <Icon name="Check" size={16} className="lg:w-5 lg:h-5" /> :

                  <Icon
                    name={step.icon}
                    size={16}
                    className="lg:w-5 lg:h-5" />

                  }
                </div>
                
                {/* Step Label - Hidden on mobile */}
                <div className="hidden lg:flex flex-col items-center mt-2">
                  <span
                    className={`text-xs font-medium transition-colors duration-300 ${
                    isActive ?
                    'text-primary' :
                    isCompleted ?
                    'text-success' : 'text-muted-foreground'}`
                    }>

                    {step.label}
                  </span>
                  <span className="text-xs text-muted-foreground opacity-70">
                    {step.description}
                  </span>
                </div>
              </div>

              {/* Progress Line */}
              {index < journeySteps.length - 1 &&
              <div className="w-8 lg:w-12 h-0.5 mx-2 lg:mx-3 bg-border relative overflow-hidden">
                  <div
                  className={`absolute inset-y-0 left-0 bg-gradient-to-r transition-all duration-500 ${
                  isCompleted ?
                  'w-full from-success to-success' :
                  isActive ?
                  'w-1/2 from-primary to-primary/50' : 'w-0 from-muted to-muted'}`
                  } />

                </div>
              }
            </div>);

        })}
      </div>

      {/* Mobile Step Label */}
      <div className="lg:hidden mt-2 text-center">
        <span className="text-xs font-medium text-primary">
          {journeySteps[currentStepIndex]?.label}
        </span>
        <span className="text-xs text-muted-foreground ml-2">
          {currentStepIndex + 1} of {journeySteps.length}
        </span>
      </div>
    </div>);

};

export default JourneyProgress;