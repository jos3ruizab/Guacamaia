import React from 'react';
import Icon from '../../../components/AppIcon';

const EssentialInfoSection = () => {
  const essentialInfo = [
    {
      category: "Currency & Money",
      icon: "DollarSign",
      items: [
        {
          title: "Local Currency",
          content: "Japanese Yen (¥) - 1 USD ≈ 150 JPY",
          tip: "Cash is still king in Japan. Many places don't accept cards."
        },
        {
          title: "Tipping Culture",
          content: "Tipping is not customary and can be considered rude",
          tip: "Exceptional service is expected as standard, not rewarded extra."
        },
        {
          title: "Payment Methods",
          content: "Cash, IC cards (Suica/Pasmo), some international cards",
          tip: "Get a Suica card for convenient train and store payments."
        }
      ]
    },
    {
      category: "Weather & Climate",
      icon: "Cloud",
      items: [
        {
          title: "Current Season",
          content: "Summer (July) - Hot and humid, 25-35°C",
          tip: "Pack lightweight, breathable clothing and a portable fan."
        },
        {
          title: "Rainy Season",
          content: "Just ending - expect occasional afternoon showers",
          tip: "Always carry a compact umbrella, available at any convenience store."
        },
        {
          title: "Best Times to Visit",
          content: "Early morning (6-9 AM) and evening (6-9 PM)",
          tip: "Avoid midday heat and crowds at popular attractions."
        }
      ]
    },
    {
      category: "Cultural Etiquette",
      icon: "Heart",
      items: [
        {
          title: "Bowing",
          content: "Slight bow (15°) for greetings, deeper for apologies",
          tip: "When in doubt, a polite nod is always appreciated."
        },
        {
          title: "Shoes Off",
          content: "Remove shoes when entering homes, temples, some restaurants",
          tip: "Wear clean socks and slip-on shoes for easy removal."
        },
        {
          title: "Quiet Public Spaces",
          content: "Keep voices low on trains and in public areas",
          tip: "Phone calls on trains are considered very rude."
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {essentialInfo.map((category, categoryIndex) => (
        <div key={categoryIndex} className="space-y-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name={category.icon} size={18} className="text-primary" />
            </div>
            <h4 className="font-heading font-semibold text-foreground">
              {category.category}
            </h4>
          </div>
          
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
            {category.items.map((item, itemIndex) => (
              <div 
                key={itemIndex}
                className="bg-muted/30 rounded-xl p-4 border border-border/50 spring-hover hover:bg-muted/50"
              >
                <h5 className="font-medium text-foreground mb-2">
                  {item.title}
                </h5>
                <p className="text-sm text-muted-foreground mb-3">
                  {item.content}
                </p>
                <div className="flex items-start space-x-2">
                  <Icon name="Lightbulb" size={14} className="text-accent mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-accent-foreground font-medium">
                    {item.tip}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EssentialInfoSection;