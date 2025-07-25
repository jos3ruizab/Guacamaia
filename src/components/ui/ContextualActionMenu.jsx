import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const ContextualActionMenu = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef(null);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const getContextualActions = () => {
    const currentPath = location.pathname;
    
    switch (currentPath) {
      case '/trip-builder-chat-interface':
        return [
          {
            label: 'Clear Chat',
            icon: 'Trash2',
            action: () => console.log('Clear chat'),
            variant: 'ghost',
            description: 'Start fresh conversation'
          },
          {
            label: 'Save Progress',
            icon: 'Save',
            action: () => console.log('Save progress'),
            variant: 'default',
            description: 'Save current planning state'
          },
          {
            label: 'Export Chat',
            icon: 'Download',
            action: () => console.log('Export chat'),
            variant: 'outline',
            description: 'Download conversation'
          }
        ];
      
      case '/day-by-day-itinerary-timeline':
        return [
          {
            label: 'Edit Trip',
            icon: 'Edit3',
            action: () => console.log('Edit trip'),
            variant: 'default',
            description: 'Modify your itinerary'
          },
          {
            label: 'Share Itinerary',
            icon: 'Share2',
            action: () => console.log('Share itinerary'),
            variant: 'outline',
            description: 'Share with others'
          },
          {
            label: 'Export PDF',
            icon: 'FileText',
            action: () => console.log('Export PDF'),
            variant: 'ghost',
            description: 'Download as PDF'
          },
          {
            label: 'Add Notes',
            icon: 'PlusCircle',
            action: () => console.log('Add notes'),
            variant: 'ghost',
            description: 'Add personal notes'
          }
        ];
      
      case '/travel-notes-and-tips':
        return [
          {
            label: 'Add Note',
            icon: 'Plus',
            action: () => console.log('Add note'),
            variant: 'default',
            description: 'Create new note'
          },
          {
            label: 'Search Notes',
            icon: 'Search',
            action: () => console.log('Search notes'),
            variant: 'outline',
            description: 'Find specific notes'
          },
          {
            label: 'Export Notes',
            icon: 'Download',
            action: () => console.log('Export notes'),
            variant: 'ghost',
            description: 'Download all notes'
          }
        ];
      
      default:
        return [];
    }
  };

  const actions = getContextualActions();
  const isLandingPage = location.pathname === '/landing-page' || location.pathname === '/';

  // Don't show on landing page or if no actions
  if (isLandingPage || actions.length === 0) {
    return null;
  }

  const handleActionClick = (action) => {
    action.action();
    setIsOpen(false);
  };

  return (
    <div className="fixed top-20 right-6 lg:right-12 z-40" ref={menuRef}>
      {isMobile ? (
        // Mobile: Floating Action Button
        <>
          <Button
            variant="default"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className={`w-12 h-12 rounded-full elevation-3 bg-primary hover:bg-primary/90 spring-transition ${
              isOpen ? 'rotate-45' : ''
            }`}
            aria-label="Actions menu"
          >
            <Icon name="Plus" size={24} color="white" />
          </Button>

          {/* Mobile Action Menu */}
          {isOpen && (
            <div className="absolute bottom-16 right-0 flex flex-col-reverse space-y-reverse space-y-3">
              {actions.map((action, index) => (
                <div
                  key={action.label}
                  className="flex items-center space-x-3 animate-slide-in-message"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="text-sm font-medium text-foreground bg-card px-3 py-1 rounded-full elevation-1 whitespace-nowrap">
                    {action.label}
                  </span>
                  <Button
                    variant={action.variant}
                    size="icon"
                    onClick={() => handleActionClick(action)}
                    className="w-10 h-10 rounded-full elevation-2 spring-hover"
                  >
                    <Icon name={action.icon} size={18} />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        // Desktop: Dropdown Menu
        <>
          <Button
            variant="outline"
            onClick={() => setIsOpen(!isOpen)}
            iconName="MoreVertical"
            iconPosition="right"
            className="bg-card/95 backdrop-blur-sm elevation-1 border-border spring-hover"
          >
            Actions
          </Button>

          {/* Desktop Dropdown Menu */}
          {isOpen && (
            <div className="absolute top-12 right-0 w-64 bg-popover border border-border rounded-lg elevation-3 overflow-hidden">
              <div className="py-2">
                {actions.map((action, index) => (
                  <button
                    key={action.label}
                    onClick={() => handleActionClick(action)}
                    className="w-full px-4 py-3 text-left hover:bg-muted transition-colors duration-200 flex items-center space-x-3 group"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                      action.variant === 'default' ?'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground' :'bg-muted text-muted-foreground group-hover:bg-accent group-hover:text-accent-foreground'
                    }`}>
                      <Icon name={action.icon} size={16} />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm text-foreground">
                        {action.label}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {action.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ContextualActionMenu;