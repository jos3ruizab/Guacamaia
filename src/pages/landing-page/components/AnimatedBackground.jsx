import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  const floatingElements = [
    { id: 1, type: 'passport', x: '10%', y: '20%', delay: 0 },
    { id: 2, type: 'bird', x: '80%', y: '15%', delay: 1 },
    { id: 3, type: 'map', x: '20%', y: '70%', delay: 2 },
    { id: 4, type: 'leaf', x: '70%', y: '60%', delay: 0.5 },
    { id: 5, type: 'wave', x: '90%', y: '80%', delay: 1.5 },
    { id: 6, type: 'compass', x: '5%', y: '50%', delay: 2.5 }
  ];

  const PassportIcon = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" className="text-primary/20">
      <rect x="8" y="6" width="24" height="28" rx="2" fill="currentColor" />
      <rect x="12" y="10" width="16" height="2" fill="white" opacity="0.7" />
      <rect x="12" y="14" width="12" height="1" fill="white" opacity="0.5" />
      <circle cx="20" cy="22" r="4" fill="white" opacity="0.6" />
    </svg>
  );

  const BirdIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" className="text-accent/30">
      <path d="M8 16c0-4 4-8 8-8s8 4 8 8c0 2-1 4-2 5l4 3c1 1 1 2 0 3s-2 1-3 0l-3-4c-1 1-3 2-5 2s-4-1-5-2l-3 4c-1 1-2 1-3 0s-1-2 0-3l4-3c-1-1-2-3-2-5z" fill="currentColor" />
    </svg>
  );

  const MapIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" className="text-muted-foreground/15">
      <path d="M6 8l12-4 12 4 12-4v32l-12 4-12-4-12 4V8z" fill="currentColor" />
      <path d="M18 4v32M30 8v32" stroke="white" strokeWidth="1" opacity="0.3" />
    </svg>
  );

  const LeafIcon = () => (
    <svg width="28" height="28" viewBox="0 0 28 28" className="text-success/25">
      <path d="M14 2C8 2 4 8 4 14c0 3 1 6 3 8l7-7 7 7c2-2 3-5 3-8 0-6-4-12-10-12z" fill="currentColor" />
      <path d="M14 2l-3 12 3 3 3-3L14 2z" fill="white" opacity="0.2" />
    </svg>
  );

  const WaveIcon = () => (
    <svg width="36" height="36" viewBox="0 0 36 36" className="text-primary/20">
      <path d="M2 18c4-4 8-4 12 0s8 4 12 0 8-4 12 0v10c-4 4-8 4-12 0s-8-4-12 0-8 4-12 0V18z" fill="currentColor" />
    </svg>
  );

  const CompassIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" className="text-accent/25">
      <circle cx="16" cy="16" r="14" fill="currentColor" />
      <circle cx="16" cy="16" r="10" fill="none" stroke="white" strokeWidth="1" opacity="0.3" />
      <path d="M16 6l-2 8 8-2-6 6z" fill="white" opacity="0.6" />
    </svg>
  );

  const getIcon = (type) => {
    switch (type) {
      case 'passport': return <PassportIcon />;
      case 'bird': return <BirdIcon />;
      case 'map': return <MapIcon />;
      case 'leaf': return <LeafIcon />;
      case 'wave': return <WaveIcon />;
      case 'compass': return <CompassIcon />;
      default: return <PassportIcon />;
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sand via-warm-white to-card" />
      
      {/* Misty Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/20" />
      
      {/* Floating Elements */}
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          style={{
            left: element.x,
            top: element.y,
          }}
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ 
            opacity: [0.3, 0.7, 0.3],
            scale: [0.8, 1.2, 0.8],
            rotate: [-10, 10, -10],
            y: [-10, 10, -10]
          }}
          transition={{
            duration: 8 + element.delay,
            repeat: Infinity,
            ease: "easeInOut",
            delay: element.delay
          }}
        >
          {getIcon(element.type)}
        </motion.div>
      ))}

      {/* Ambient Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>

      {/* Texture Overlay */}
      <div className="absolute inset-0 ambient-texture opacity-30" />
    </div>
  );
};

export default AnimatedBackground;