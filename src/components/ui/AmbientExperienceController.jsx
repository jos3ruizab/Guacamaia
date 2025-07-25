import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const AmbientExperienceController = () => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('ocean');
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const themes = [
    {
      id: 'ocean',
      name: 'Ocean Breeze',
      icon: 'Waves',
      description: 'Calming ocean sounds',
      color: 'text-ocean-blue'
    },
    {
      id: 'forest',
      name: 'Forest Walk',
      icon: 'Trees',
      description: 'Peaceful forest ambience',
      color: 'text-travel-green'
    },
    {
      id: 'cafe',
      name: 'Café Vibes',
      icon: 'Coffee',
      description: 'Cozy café atmosphere',
      color: 'text-sunset-orange'
    },
    {
      id: 'silence',
      name: 'Pure Focus',
      icon: 'Volume2',
      description: 'Complete silence',
      color: 'text-muted-foreground'
    }
  ];

  // Auto-hide after inactivity
  useEffect(() => {
    let timeout;
    const resetTimeout = () => {
      clearTimeout(timeout);
      setIsVisible(true);
      timeout = setTimeout(() => {
        if (!isExpanded) {
          setIsVisible(false);
        }
      }, 5000);
    };

    const handleMouseMove = () => resetTimeout();
    const handleScroll = () => resetTimeout();

    resetTimeout();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isExpanded]);

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    // Here you would integrate with actual audio system
    console.log('Audio toggled:', !isAudioEnabled);
  };

  const changeTheme = (themeId) => {
    setCurrentTheme(themeId);
    setIsExpanded(false);
    // Here you would apply the theme changes
    console.log('Theme changed to:', themeId);
  };

  const currentThemeData = themes.find(theme => theme.id === currentTheme);

  return (
    <div 
      className={`fixed bottom-6 right-6 z-30 transition-all duration-500 spring-transition ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-2'
      }`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => !isExpanded && setIsVisible(true)}
    >
      {/* Theme Selector - Expanded */}
      {isExpanded && (
        <div className="mb-4 bg-card/95 backdrop-blur-sm rounded-2xl p-4 elevation-3 border border-border animate-accordion-reveal">
          <div className="text-sm font-medium text-foreground mb-3">
            Ambient Experience
          </div>
          <div className="space-y-2">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => changeTheme(theme.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 spring-transition ${
                  currentTheme === theme.id
                    ? 'bg-primary/10 border border-primary/20' :'hover:bg-muted border border-transparent'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentTheme === theme.id ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}>
                  <Icon name={theme.icon} size={16} />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium text-foreground">
                    {theme.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {theme.description}
                  </div>
                </div>
                {currentTheme === theme.id && (
                  <Icon name="Check" size={16} className="text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Control Panel */}
      <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-3 elevation-2 border border-border">
        <div className="flex items-center space-x-2">
          {/* Audio Toggle */}
          <Button
            variant={isAudioEnabled ? "default" : "ghost"}
            size="icon"
            onClick={toggleAudio}
            className={`w-10 h-10 rounded-xl spring-hover ${
              isAudioEnabled 
                ? 'bg-primary text-primary-foreground' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
            aria-label={isAudioEnabled ? 'Disable audio' : 'Enable audio'}
          >
            <Icon 
              name={isAudioEnabled ? 'VolumeX' : 'Volume2'} 
              size={18} 
            />
          </Button>

          {/* Current Theme Indicator */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className={`w-10 h-10 rounded-xl spring-hover ${currentThemeData?.color || 'text-muted-foreground'}`}
            aria-label="Change ambient theme"
          >
            <Icon 
              name={currentThemeData?.icon || 'Settings'} 
              size={18} 
            />
          </Button>

          {/* Settings Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className={`w-10 h-10 rounded-xl spring-hover text-muted-foreground hover:text-foreground transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`}
            aria-label="Ambient settings"
          >
            <Icon name="ChevronUp" size={18} />
          </Button>
        </div>

        {/* Audio Status Indicator */}
        {isAudioEnabled && (
          <div className="mt-2 flex items-center justify-center">
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-3 bg-primary rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile-friendly touch target */}
      <div className="md:hidden absolute inset-0 -m-2" />
    </div>
  );
};

export default AmbientExperienceController;