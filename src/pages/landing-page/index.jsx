import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedBackground from './components/AnimatedBackground';
import HeroSection from './components/HeroSection';
import ThemeToggle from './components/ThemeToggle';
import AmbientAudioControls from './components/AmbientAudioControls';
import SurpriseButton from './components/SurpriseButton';

const LandingPage = () => {
  useEffect(() => {
    // Set page title
    document.title = 'GuacamaIA - Where will GuacamaIA take you?';
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Experience personalized travel planning through our sophisticated AI companion. Transform your wanderlust into unforgettable journeys with GuacamaIA.');
    }

    // Preload critical resources
    const preloadLinks = [
      'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap',
      'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap'
    ];
    
    preloadLinks.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      document.head.appendChild(link);
    });

    // Cleanup function
    return () => {
      document.title = 'GuacamaIA';
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative min-h-screen bg-gradient-to-br from-sand via-warm-white to-card overflow-hidden"
    >
      {/* Animated Background Layer */}
      <AnimatedBackground />
      
      {/* Theme Toggle */}
      <ThemeToggle />
      
      {/* Ambient Audio Controls */}
      <AmbientAudioControls />
      
      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Surprise Button */}
        <div className="flex justify-center pb-16 lg:pb-24">
          <SurpriseButton />
        </div>
      </main>

      {/* Accessibility Improvements */}
      <div className="sr-only">
        <h1>GuacamaIA - AI-Powered Travel Planning</h1>
        <p>
          Welcome to GuacamaIA, your sophisticated AI travel companion. 
          Start planning your dream trip with our personalized travel planning experience.
        </p>
      </div>

      {/* Reduced Motion Support */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default LandingPage;