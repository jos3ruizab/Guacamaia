import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const LocalInsightsSection = () => {
  const insights = [
    {
      title: "Hidden Gem: Kiyosumi Gardens",
      type: "Secret Spot",
      icon: "MapPin",
      image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=250&fit=crop",
      description: "A tranquil traditional garden away from tourist crowds, perfect for morning meditation and photography.",
      tips: [
        "Visit at sunrise for the best light and fewer people",
        "The tea house serves authentic matcha with garden views",
        "Bring a book - the stone benches are perfect for reading"
      ],
      localSecret: "Ask the gardener about the 200-year-old stone lanterns - each has a unique story."
    },
    {
      title: "Authentic Ramen: Menya Saimi",
      type: "Local Favorite",
      icon: "Utensils",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=250&fit=crop",
      description: "A 12-seat counter ramen shop where locals queue for 2 hours. No English menu, pure authenticity.",
      tips: [
        "Arrive 30 minutes before opening (11 AM) to avoid long waits",
        "Point to what others are eating - it\'s all excellent",
        "Slurping loudly is encouraged and shows appreciation"
      ],
      localSecret: "The master adds a secret ingredient to the broth every Tuesday - locals call it \'Mystery Tuesday\'."
    },
    {
      title: "Sunset at Tokyo Station Rooftop",
      type: "Insider View",
      icon: "Sunrise",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=250&fit=crop",
      description: "Free access to one of Tokyo's best sunset views, unknown to most tourists but beloved by office workers.",
      tips: [
        "Access through the Marunouchi South Exit, take elevator to 6F",
        "Best views are from the western terrace around 6:30 PM",
        "Bring a jacket - it gets windy up there"
      ],
      localSecret: "Office workers gather here for 'nomikai' (drinking parties) - join them for authentic local interaction."
    }
  ];

  const culturalNuances = [
    {
      situation: "At a Traditional Restaurant",
      do: "Wait to be seated, even if tables appear empty",
      dont: "Stick chopsticks upright in rice (resembles funeral ritual)",
      insight: "Many restaurants have specific seating systems and reservation protocols that aren't obvious to visitors."
    },
    {
      situation: "On Public Transportation",
      do: "Offer your seat to elderly, pregnant, or disabled passengers",
      dont: "Eat strong-smelling food or talk loudly on phone",
      insight: "Priority seating is taken very seriously - even young people will stand for hours rather than sit inappropriately."
    },
    {
      situation: "Shopping and Services",
      do: "Receive business cards with both hands and study them briefly",
      dont: "Write on someone\'s business card or put it in your back pocket",
      insight: "Business cards (meishi) are extensions of the person - treat them with the same respect you'd show the individual."
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hidden Gems */}
      <div>
        <h4 className="font-heading font-semibold text-lg text-foreground mb-6 flex items-center">
          <Icon name="Gem" size={20} className="text-accent mr-2" />
          Authentic Experiences
        </h4>
        
        <div className="space-y-6">
          {insights.map((insight, index) => (
            <div 
              key={index}
              className="bg-gradient-to-r from-card to-muted/20 rounded-2xl overflow-hidden border border-border spring-hover hover:elevation-2"
            >
              <div className="md:flex">
                <div className="md:w-1/3">
                  <div className="relative h-48 md:h-full overflow-hidden">
                    <Image
                      src={insight.image}
                      alt={insight.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
                        {insight.type}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h5 className="font-heading font-semibold text-foreground mb-2">
                        {insight.title}
                      </h5>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {insight.description}
                      </p>
                    </div>
                    <Icon name={insight.icon} size={24} className="text-primary flex-shrink-0 ml-4" />
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    {insight.tips.map((tip, tipIndex) => (
                      <div key={tipIndex} className="flex items-start space-x-2">
                        <Icon name="Check" size={14} className="text-success mt-1 flex-shrink-0" />
                        <span className="text-sm text-foreground">{tip}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-accent/10 rounded-lg p-3 border-l-4 border-accent">
                    <div className="flex items-start space-x-2">
                      <Icon name="Whisper" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-xs font-medium text-accent uppercase tracking-wide">Local Secret</span>
                        <p className="text-sm text-accent-foreground mt-1">{insight.localSecret}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cultural Nuances */}
      <div>
        <h4 className="font-heading font-semibold text-lg text-foreground mb-6 flex items-center">
          <Icon name="Users" size={20} className="text-primary mr-2" />
          Cultural Navigation
        </h4>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {culturalNuances.map((nuance, index) => (
            <div 
              key={index}
              className="bg-card rounded-xl p-5 border border-border spring-hover hover:elevation-1"
            >
              <h5 className="font-medium text-foreground mb-4">{nuance.situation}</h5>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-start space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-xs font-medium text-success uppercase">Do</span>
                    <p className="text-sm text-foreground">{nuance.do}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Icon name="XCircle" size={16} className="text-error mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-xs font-medium text-error uppercase">Don't</span>
                    <p className="text-sm text-foreground">{nuance.dont}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <Icon name="Info" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground">{nuance.insight}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocalInsightsSection;