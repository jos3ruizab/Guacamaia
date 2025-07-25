import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PracticalTipsSection = () => {
  const practicalCategories = [
    {
      title: "Transportation Mastery",
      icon: "Train",
      color: "text-primary",
      tips: [
        {
          title: "JR Pass Strategy",
          content: "Get a 7-day JR Pass (¥29,650) if taking more than 2 long-distance trips",
          actionable: "Calculate your planned routes before purchasing - sometimes individual tickets are cheaper",
          urgency: "high"
        },
        {
          title: "Rush Hour Navigation",
          content: "Avoid trains 7:30-9:30 AM and 5:30-7:30 PM on weekdays",
          actionable: "Use Google Maps\' departure time feature to plan around peak hours",
          urgency: "medium"
        },
        {
          title: "Station Navigation",
          content: "Major stations have English signs, but learn to recognize your destination in Japanese characters",
          actionable: "Screenshot your destination in Japanese and show it to station staff if lost",
          urgency: "low"
        }
      ]
    },
    {
      title: "Safety & Emergency",
      icon: "Shield",
      color: "text-success",
      tips: [
        {
          title: "Emergency Numbers",
          content: "Police: 110, Fire/Ambulance: 119, Tourist Hotline: 050-3816-2787",
          actionable: "Save these numbers in your phone with English labels",
          urgency: "high"
        },
        {
          title: "Natural Disasters",
          content: "Download \'Safety Tips\' app for earthquake and tsunami alerts in English",
          actionable: "Test the app notifications and learn the evacuation routes from your hotel",
          urgency: "high"
        },
        {
          title: "Lost & Found",
          content: "Japan has exceptional lost & found systems - report missing items immediately",
          actionable: "Keep photos of important items and know their Japanese names",
          urgency: "medium"
        }
      ]
    },
    {
      title: "Communication Hacks",
      icon: "MessageSquare",
      color: "text-accent",
      tips: [
        {
          title: "Language Barriers",
          content: "Download Google Translate with camera feature for real-time text translation",
          actionable: "Practice using the conversation mode before you need it urgently",
          urgency: "medium"
        },
        {
          title: "WiFi & Connectivity",
          content: "Rent a pocket WiFi device or get a data SIM at the airport",
          actionable: "Book pocket WiFi online before arrival for airport pickup",
          urgency: "high"
        },
        {
          title: "Essential Phrases",
          content: "Learn: Sumimasen (excuse me), Arigatou gozaimasu (thank you), Eigo ga dekimasu ka? (do you speak English?)",
          actionable: "Practice pronunciation with Google Translate\'s audio feature",
          urgency: "low"
        }
      ]
    }
  ];

  const quickReference = [
    {
      category: "Useful Apps",
      items: [
        { name: "Google Translate", purpose: "Camera translation & offline mode" },
        { name: "Hyperdia", purpose: "Train schedules & route planning" },
        { name: "Tabelog", purpose: "Restaurant reviews (Japanese Yelp)" },
        { name: "Safety Tips", purpose: "Emergency alerts & disaster info" }
      ]
    },
    {
      category: "Emergency Contacts",
      items: [
        { name: "Police", purpose: "110 (English support available)" },
        { name: "Fire/Ambulance", purpose: "119 (limited English)" },
        { name: "Tourist Hotline", purpose: "050-3816-2787 (24/7 English)" },
        { name: "Your Embassy", purpose: "Save your country\'s embassy number" }
      ]
    },
    {
      category: "Cultural Quick Tips",
      items: [
        { name: "Bowing", purpose: "Slight nod is sufficient for tourists" },
        { name: "Business Cards", purpose: "Receive with both hands, study briefly" },
        { name: "Gift Giving", purpose: "Wrap nicely, present with both hands" },
        { name: "Shoes", purpose: "Remove when entering homes/temples" }
      ]
    }
  ];

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'border-error bg-error/5 text-error';
      case 'medium': return 'border-warning bg-warning/5 text-warning';
      case 'low': return 'border-success bg-success/5 text-success';
      default: return 'border-muted bg-muted/5 text-muted-foreground';
    }
  };

  const getUrgencyIcon = (urgency) => {
    switch (urgency) {
      case 'high': return 'AlertTriangle';
      case 'medium': return 'Clock';
      case 'low': return 'Info';
      default: return 'Circle';
    }
  };

  return (
    <div className="space-y-8">
      {/* Detailed Tips by Category */}
      <div className="space-y-6">
        {practicalCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <Icon name={category.icon} size={20} className={category.color} />
              </div>
              <h4 className="font-heading font-semibold text-lg text-foreground">
                {category.title}
              </h4>
            </div>
            
            <div className="space-y-4">
              {category.tips.map((tip, tipIndex) => (
                <div 
                  key={tipIndex}
                  className="bg-card rounded-xl p-5 border border-border spring-hover hover:elevation-1"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h5 className="font-medium text-foreground">{tip.title}</h5>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(tip.urgency)}`}>
                      <Icon name={getUrgencyIcon(tip.urgency)} size={12} className="inline mr-1" />
                      {tip.urgency}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {tip.content}
                  </p>
                  
                  <div className="bg-accent/10 rounded-lg p-3 border-l-4 border-accent">
                    <div className="flex items-start space-x-2">
                      <Icon name="Target" size={14} className="text-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-xs font-medium text-accent uppercase tracking-wide">Action Item</span>
                        <p className="text-sm text-accent-foreground mt-1">{tip.actionable}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Reference Cards */}
      <div>
        <h4 className="font-heading font-semibold text-lg text-foreground mb-6 flex items-center">
          <Icon name="Bookmark" size={20} className="text-primary mr-2" />
          Quick Reference
        </h4>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quickReference.map((section, sectionIndex) => (
            <div 
              key={sectionIndex}
              className="bg-gradient-to-br from-card to-muted/20 rounded-xl p-5 border border-border"
            >
              <h5 className="font-medium text-foreground mb-4 pb-2 border-b border-border/50">
                {section.category}
              </h5>
              
              <div className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex justify-between items-start">
                    <div className="flex-1 mr-2">
                      <span className="text-sm font-medium text-foreground block">
                        {item.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {item.purpose}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-6 h-6 flex-shrink-0"
                    >
                      <Icon name="Copy" size={12} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Action Plan */}
      <div className="bg-gradient-to-r from-error/5 to-warning/5 rounded-2xl p-6 border border-error/20">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-error/10 flex items-center justify-center">
            <Icon name="AlertTriangle" size={20} className="text-error" />
          </div>
          <h4 className="font-heading font-semibold text-lg text-foreground">
            Emergency Action Plan
          </h4>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h5 className="font-medium text-foreground">If You Get Lost:</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Find the nearest train station or convenience store</li>
              <li>• Show your hotel address in Japanese to staff</li>
              <li>• Use Google Maps offline mode if available</li>
              <li>• Call tourist hotline: 050-3816-2787</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h5 className="font-medium text-foreground">Medical Emergency:</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Call 119 for ambulance</li>
              <li>• Show your travel insurance card</li>
              <li>• Have hotel staff translate if possible</li>
              <li>• Know your blood type and allergies in Japanese</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticalTipsSection;