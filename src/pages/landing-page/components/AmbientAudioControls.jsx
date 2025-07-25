import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AmbientAudioControls = () => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [currentTrack, setCurrentTrack] = useState('waves');
  const [isExpanded, setIsExpanded] = useState(false);

  const audioTracks = [
    {
      id: 'waves',
      name: 'Ocean Waves',
      icon: 'Waves',
      description: 'Gentle ocean sounds'
    },
    {
      id: 'birds',
      name: 'Tropical Birds',
      icon: 'Bird',
      description: 'Exotic bird calls'
    },
    {
      id: 'nature',
      name: 'Rainforest',
      icon: 'Trees',
      description: 'Ambient nature sounds'
    },
    {
      id: 'silence',
      name: 'Silence',
      icon: 'VolumeX',
      description: 'Pure quiet'
    }
  ];

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    if (!isAudioEnabled && currentTrack === 'silence') {
      setCurrentTrack('waves');
    }
  };

  const selectTrack = (trackId) => {
    setCurrentTrack(trackId);
    if (trackId === 'silence') {
      setIsAudioEnabled(false);
    } else {
      setIsAudioEnabled(true);
    }
    setIsExpanded(false);
  };

  const currentTrackData = audioTracks.find(track => track.id === currentTrack);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1.8 }}
      className="fixed bottom-6 left-6 z-20"
    >
      {/* Track Selection Menu */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mb-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 elevation-3 border border-white/30 min-w-48"
          >
            <div className="text-sm font-medium text-midnight-black mb-3">
              Ambient Audio
            </div>
            <div className="space-y-2">
              {audioTracks.map((track) => (
                <button
                  key={track.id}
                  onClick={() => selectTrack(track.id)}
                  className={`w-full flex items-center space-x-3 p-2 rounded-xl transition-all duration-200 spring-transition ${
                    currentTrack === track.id
                      ? 'bg-primary/10 border border-primary/20' :'hover:bg-muted/50 border border-transparent'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    currentTrack === track.id ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                  }`}>
                    <Icon name={track.icon} size={14} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium text-midnight-black">
                      {track.name}
                    </div>
                    <div className="text-xs text-sophisticated-gray">
                      {track.description}
                    </div>
                  </div>
                  {currentTrack === track.id && (
                    <Icon name="Check" size={14} className="text-primary" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Control */}
      <div className="flex items-center space-x-2">
        {/* Audio Toggle */}
        <Button
          variant={isAudioEnabled ? "default" : "ghost"}
          size="icon"
          onClick={toggleAudio}
          className={`w-12 h-12 rounded-full backdrop-blur-sm border spring-transition ${
            isAudioEnabled 
              ? 'bg-primary text-white border-primary/30' :'bg-white/10 text-midnight-black border-white/20 hover:bg-white/20'
          }`}
          aria-label={isAudioEnabled ? 'Disable audio' : 'Enable audio'}
        >
          <Icon 
            name={isAudioEnabled ? currentTrackData?.icon || 'Volume2' : 'VolumeX'} 
            size={18} 
          />
        </Button>

        {/* Track Selector */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 spring-transition text-midnight-black transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
          aria-label="Audio settings"
        >
          <Icon name="ChevronUp" size={18} />
        </Button>
      </div>

      {/* Audio Status Indicator */}
      {isAudioEnabled && currentTrack !== 'silence' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -top-2 -right-2 w-4 h-4 bg-success rounded-full flex items-center justify-center"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 bg-white rounded-full"
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default AmbientAudioControls;