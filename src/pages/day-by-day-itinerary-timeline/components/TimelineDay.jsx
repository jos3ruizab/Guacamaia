import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TimelineDay = ({ day, isLast, onBookmark, onShare }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'meal':
        return 'Utensils';
      case 'attraction':
        return 'MapPin';
      case 'experience':
        return 'Camera';
      case 'transport':
        return 'Car';
      default:
        return 'Clock';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'meal':
        return 'text-sunset-orange';
      case 'attraction':
        return 'text-ocean-blue';
      case 'experience':
        return 'text-travel-green';
      case 'transport':
        return 'text-sophisticated-gray';
      default:
        return 'text-muted-foreground';
    }
  };

  // Safety check for day prop
  if (!day) {
    return (
      <div className="relative">
        <div className="bg-card border border-border rounded-2xl p-6 mb-8">
          <p className="text-muted-foreground">Day information not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-border via-border/50 to-transparent" />
      )}

      {/* Day Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative bg-card border border-border rounded-2xl p-6 mb-8 elevation-2 spring-hover ambient-texture"
      >
        {/* Timeline Dot */}
        <div className="absolute -left-3 top-6 w-6 h-6 bg-primary rounded-full border-4 border-background flex items-center justify-center">
          <div className="w-2 h-2 bg-primary-foreground rounded-full" />
        </div>

        {/* Day Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-heading text-xl lg:text-2xl font-semibold text-foreground mb-2">
              {day?.title || 'Day Title'}
            </h3>
            <p className="text-muted-foreground font-body text-sm lg:text-base leading-relaxed">
              {day?.vibe || 'Explore and enjoy your day'}
            </p>
          </div>
          
          <div className="flex items-center space-x-2 ml-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onBookmark?.(day?.id)}
              className="w-8 h-8 text-muted-foreground hover:text-accent"
              aria-label="Bookmark day"
            >
              <Icon name={day?.isBookmarked ? "BookmarkCheck" : "Bookmark"} size={16} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onShare?.(day?.id)}
              className="w-8 h-8 text-muted-foreground hover:text-primary"
              aria-label="Share day"
            >
              <Icon name="Share2" size={16} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              className={`w-8 h-8 text-muted-foreground hover:text-foreground transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : ''
              }`}
              aria-label={isExpanded ? "Collapse day" : "Expand day"}
            >
              <Icon name="ChevronDown" size={16} />
            </Button>
          </div>
        </div>

        {/* Day Summary */}
        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={14} />
            <span>{day?.date || 'Date TBD'}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="MapPin" size={14} />
            <span>{day?.location || 'Location TBD'}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={14} />
            <span>{day?.activities?.length || 0} activities</span>
          </div>
        </div>

        {/* Activities List */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="space-y-4 pt-4 border-t border-border">
                {day?.activities?.map((activity, index) => (
                  <motion.div
                    key={activity?.id || index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className="flex items-start space-x-4 p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors duration-200"
                  >
                    {/* Activity Icon */}
                    <div className={`w-10 h-10 rounded-full bg-background flex items-center justify-center flex-shrink-0 ${getActivityColor(activity?.type)}`}>
                      <Icon name={getActivityIcon(activity?.type)} size={18} />
                    </div>

                    {/* Activity Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-medium text-foreground text-sm lg:text-base">
                          {activity?.name || 'Activity'}
                        </h4>
                        <span className="text-xs text-muted-foreground font-data ml-2 flex-shrink-0">
                          {activity?.time || 'Time TBD'}
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
                        {activity?.description || 'Activity description'}
                      </p>
                      
                      <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Icon name="MapPin" size={12} />
                          <span>{activity?.location || 'Location TBD'}</span>
                        </div>
                        
                        {activity?.duration && (
                          <div className="flex items-center space-x-1">
                            <Icon name="Timer" size={12} />
                            <span>{activity.duration}</span>
                          </div>
                        )}
                        
                        {activity?.cost && (
                          <div className="flex items-center space-x-1">
                            <Icon name="DollarSign" size={12} />
                            <span>{activity.cost}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )) || (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No activities planned for this day</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Preview (when collapsed) */}
        {!isExpanded && day?.activities?.length > 0 && (
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {day.activities.slice(0, 3).map((activity, index) => (
              <div
                key={activity?.id || index}
                className="flex items-center space-x-2 bg-muted/30 rounded-full px-3 py-1 text-xs text-muted-foreground whitespace-nowrap flex-shrink-0"
              >
                <Icon name={getActivityIcon(activity?.type)} size={12} className={getActivityColor(activity?.type)} />
                <span>{activity?.name || 'Activity'}</span>
              </div>
            ))}
            {day.activities.length > 3 && (
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <span>+{day.activities.length - 3} more</span>
              </div>
            )}
          </div>
        )}

        {/* Empty state when no activities and collapsed */}
        {!isExpanded && (!day?.activities || day.activities.length === 0) && (
          <div className="text-center py-4">
            <p className="text-muted-foreground text-sm">No activities planned - expand to see more details</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default TimelineDay;