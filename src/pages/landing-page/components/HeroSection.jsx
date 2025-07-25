import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Compass, ArrowRight, Sparkles } from 'lucide-react';
import AppImage from '../../../components/AppImage';

const HeroSection = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleStartPlanning = () => {
    navigate('/trip-builder-chat-interface');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      {/* Hero Content */}
      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Brand Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-8">

          <AppImage
            src="/assets/images/bwlogo-1753301097172.png"
            alt="GuacamaIA Logo"
            className="h-16 lg:h-24 w-auto object-contain filter drop-shadow-lg" />

        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-8">

          <h1 className="fluid-heading-xl font-heading text-foreground mb-4 leading-tight">
            Where will{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">Maia

            </span>{' '}
            take you?
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="fluid-body font-body text-muted-foreground max-w-2xl mx-auto leading-relaxed">

            Experience personalized travel planning through our sophisticated AI companion. 
            Transform your wanderlust into unforgettable journeys with elegance and precision.
          </motion.p>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="space-y-6">

          {/* Primary CTA */}
          <button
            onClick={handleStartPlanning}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-primary to-accent px-8 py-4 rounded-full text-white font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/20 touch-friendly">

            <Sparkles className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'rotate-12 scale-110' : ''}`} />
            <span>Describe your dream trip</span>
            <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
            
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </button>

          {/* Secondary Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 text-muted-foreground font-body text-sm cursor-pointer hover:text-foreground transition-colors">

              <Compass className="w-4 h-4" />
              <span>AI-Powered Planning</span>
            </motion.div>
            
            <div className="hidden sm:block w-1 h-1 bg-muted rounded-full"></div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 text-muted-foreground font-body text-sm cursor-pointer hover:text-foreground transition-colors">

              <Sparkles className="w-4 h-4" />
              <span>Personalized Experiences</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Ambient Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent rounded-full blur-sm" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.8 }}
          className="absolute top-1/3 right-1/3 w-1 h-1 bg-primary rounded-full blur-sm" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2.1 }}
          className="absolute bottom-1/3 left-1/5 w-1.5 h-1.5 bg-accent rounded-full blur-sm" />

      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 1, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 right-1/4 opacity-10">

        <Compass className="w-8 h-8 text-primary" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 15, 0],
          rotate: [0, -1, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-1/4 left-1/6 opacity-10">

        <Sparkles className="w-6 h-6 text-accent" />
      </motion.div>
    </section>);

};

export default HeroSection;