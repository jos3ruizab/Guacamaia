import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SectionCard = ({ 
  title, 
  icon, 
  children, 
  isExpanded = false, 
  onToggle,
  bookmarked = false,
  onBookmark,
  className = ""
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`bg-card border border-border rounded-2xl overflow-hidden elevation-1 spring-transition hover:elevation-2 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div 
        className="flex items-center justify-between p-6 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center transition-all duration-300 ${
            isExpanded ? 'from-primary/20 to-accent/20 scale-110' : ''
          }`}>
            <Icon 
              name={icon} 
              size={24} 
              className={`transition-colors duration-300 ${
                isExpanded ? 'text-primary' : 'text-muted-foreground'
              }`}
            />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isExpanded ? 'Click to collapse' : 'Click to expand'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Bookmark Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onBookmark?.();
            }}
            className={`w-10 h-10 spring-hover ${
              bookmarked ? 'text-accent' : 'text-muted-foreground hover:text-accent'
            }`}
          >
            <Icon name={bookmarked ? "Bookmark" : "BookmarkPlus"} size={18} />
          </Button>
          
          {/* Expand/Collapse Button */}
          <div className={`transition-transform duration-300 ${
            isExpanded ? 'rotate-180' : ''
          }`}>
            <Icon 
              name="ChevronDown" 
              size={20} 
              className={`transition-colors duration-300 ${
                isHovered ? 'text-primary' : 'text-muted-foreground'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`transition-all duration-300 overflow-hidden ${
        isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-6 pb-6 border-t border-border/50">
          <div className="pt-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionCard;