import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for header elevation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navigationItems = [
    {
      label: 'Plan Trip',
      path: '/trip-builder-chat-interface',
      icon: 'MessageCircle',
      description: 'Start planning with AI'
    },
    {
      label: 'My Itinerary',
      path: '/day-by-day-itinerary-timeline',
      icon: 'Calendar',
      description: 'View your timeline'
    },
    {
      label: 'Travel Notes',
      path: '/travel-notes-and-tips',
      icon: 'BookOpen',
      description: 'Tips and insights'
    }
  ];

  const isLandingPage = location.pathname === '/landing-page' || location.pathname === '/';
  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Don't render header on landing page
  if (isLandingPage) {
    return null;
  }

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border transition-all duration-300 spring-transition ${
          scrolled ? 'elevation-2' : 'elevation-1'
        }`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer hover-lift"
              onClick={() => handleNavigation('/landing-page')}
            >
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white flex items-center justify-center mr-3">
                <img 
                  src="assets/images/bwlogo-1753301097172.png"
                  alt="GuacamaIA Logo"
                  className="lg:w-12 lg:h-12 w-12 h-12 object-contain"
                />
              </div>
              <span
                className="font-heading text-lg lg:text-xl text-foreground"
                style={{ fontFamily: 'Futura, sans-serif' }}
              >
                GuacamaIA
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <Button
                  key={item.path}
                  variant={isActive(item.path) ? "default" : "ghost"}
                  onClick={() => handleNavigation(item.path)}
                  iconName={item.icon}
                  iconPosition="left"
                  iconSize={18}
                  className={`px-4 py-2 spring-transition ${
                    isActive(item.path) 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {item.label}
                </Button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="lg:hidden"
              aria-label="Toggle menu"
            >
              <Icon 
                name={isMobileMenuOpen ? "X" : "Menu"} 
                size={24} 
                className="spring-transition"
              />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div 
          className={`lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border transition-all duration-300 spring-transition ${
            isMobileMenuOpen 
              ? 'opacity-100 translate-y-0 elevation-3' :'opacity-0 -translate-y-2 pointer-events-none'
          }`}
        >
          <nav className="px-6 py-4 space-y-2">
            {navigationItems.map((item) => (
              <Button
                key={item.path}
                variant={isActive(item.path) ? "default" : "ghost"}
                onClick={() => handleNavigation(item.path)}
                iconName={item.icon}
                iconPosition="left"
                iconSize={20}
                fullWidth
                className={`justify-start px-4 py-3 spring-transition ${
                  isActive(item.path) 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <div className="flex flex-col items-start ml-2">
                  <span className="font-medium">{item.label}</span>
                  <span className="text-xs opacity-70">{item.description}</span>
                </div>
              </Button>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;