import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Header from '../../components/ui/Header';
import JourneyProgress from '../../components/ui/JourneyProgress';
import ContextualActionMenu from '../../components/ui/ContextualActionMenu';
import AmbientExperienceController from '../../components/ui/AmbientExperienceController';
import TripHeader from './components/TripHeader';
import TimelineDay from './components/TimelineDay';
import TimelineNavigation from './components/TimelineNavigation';
import FloatingActionMenu from './components/FloatingActionMenu';
import EmptyState from './components/EmptyState';
import MarkdownRenderer from '../../components/ui/MarkdownRenderer';

const DayByDayItineraryTimeline = () => {
  const navigate = useNavigate();
  const [tripData, setTripData] = useState(null);
  const [currentDay, setCurrentDay] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [parsedItinerary, setParsedItinerary] = useState([]);

  useEffect(() => {
    // Load itinerary from localStorage or create demo data
    const storedItinerary = localStorage.getItem('guacamaia_itinerary');
    
    if (storedItinerary) {
      try {
        const data = JSON.parse(storedItinerary);
        setTripData(data);
        parseItinerary(data.itinerary, parseInt(data.duration));
      } catch (error) {
        console.error('Error parsing stored itinerary:', error);
        createDemoItinerary();
      }
    } else {
      createDemoItinerary();
    }
    
    setIsLoading(false);
  }, []);

  const createDemoItinerary = () => {
    const demo = {
      destination: "Santorini, Greece",
      duration: "5",
      pace: "relaxed",
      styles: ["luxury", "culture", "food"],
      itinerary: `# Your Santorini Adventure Awaits!

## Trip Overview
Santorini is a breathtaking Greek island known for its dramatic cliffs, stunning sunsets, and distinctive white-washed buildings with blue domes. The best time to visit is during late spring through early fall.

## Daily Itinerary

### Day 1: Arrival & Oia Exploration
**Morning (9:00 AM - 12:00 PM)**
- Arrive at Santorini Airport
- Check into luxury accommodation in Oia
- Light breakfast at a cliffside café

**Afternoon (12:00 PM - 6:00 PM)**
- Explore the charming streets of Oia
- Visit local art galleries and boutiques
- Lunch at Ambrosia Restaurant

**Evening (6:00 PM - 10:00 PM)**
- Famous Santorini sunset viewing
- Dinner at Katharos Lounge
- Evening stroll through illuminated streets

**💡 Insider Tips**
- Book sunset dinner reservations well in advance
- Wear comfortable walking shoes for cobblestone streets

### Day 2: Fira & Cultural Discovery
**Morning (9:00 AM - 12:00 PM)**
- Cable car ride to Fira
- Visit Archaeological Museum of Thera
- Coffee at a traditional kafeneio

**Afternoon (12:00 PM - 6:00 PM)**
- Explore Fira's cliff-side shops
- Lunch with caldera views
- Visit local wine museum

**Evening (6:00 PM - 10:00 PM)**
- Traditional Greek taverna dinner
- Folk music and dancing experience
- Cocktails with panoramic views

**🍽️ Food Highlights**
- Fresh seafood and local catch
- Santorini cherry tomatoes
- Vinsanto dessert wine

### Day 3: Beach Day & Relaxation
**Morning (9:00 AM - 12:00 PM)**
- Visit Red Beach for unique volcanic landscape
- Swimming and sunbathing
- Beach café refreshments

**Afternoon (12:00 PM - 6:00 PM)**
- Lunch at seaside taverna
- Spa treatment at luxury resort
- Private pool time

**Evening (6:00 PM - 10:00 PM)**
- Romantic dinner at cliff-side restaurant
- Stargazing from hotel terrace
- Local dessert tasting

### Day 4: Wine Tasting & Villages
**Morning (9:00 AM - 12:00 PM)**
- Visit Santo Wines winery
- Wine tasting with caldera views
- Learn about volcanic soil viticulture

**Afternoon (12:00 PM - 6:00 PM)**
- Explore Pyrgos village
- Traditional lunch in village square
- Visit Monastery of Profitis Ilias

**Evening (6:00 PM - 10:00 PM)**
- Farewell dinner at Selene Restaurant
- Traditional Greek desserts
- Final sunset viewing

### Day 5: Departure
**Morning (9:00 AM - 12:00 PM)**
- Last-minute souvenir shopping
- Breakfast at hotel
- Airport transfer

**💡 Final Tips**
- Keep camera battery charged for endless photo opportunities
- Try the local fava beans - a Santorini specialty
- Book airport transfer in advance during peak season`
    };
    
    setTripData(demo);
    parseItinerary(demo.itinerary, parseInt(demo.duration));
  };

  const parseItinerary = (itineraryText, totalDays) => {
    if (!itineraryText) return;
    
    const days = [];
    const dayRegex = /### Day (\d+):(.*?)(?=### Day \d+:|$)/gs;
    let match;
    
    while ((match = dayRegex.exec(itineraryText)) !== null) {
      const dayNumber = parseInt(match[1]);
      const dayContent = match[2];
      
      // Parse day content
      const timeSlots = [];
      const timeSlotRegex = /\*\*(Morning|Afternoon|Evening).*?\*\*(.*?)(?=\*\*(?:Morning|Afternoon|Evening|\d|💡|🍽️)|$)/gs;
      let timeMatch;
      
      while ((timeMatch = timeSlotRegex.exec(dayContent)) !== null) {
        const timeOfDay = timeMatch[1];
        const activities = timeMatch[2].trim();
        
        timeSlots.push({
          timeOfDay,
          activities: activities.split('\n').filter(line => line.trim()).map(line => line.replace(/^[-•]\s*/, ''))
        });
      }
      
      // Extract title
      const titleMatch = dayContent.match(/^(.*?)$/m);
      const title = titleMatch ? titleMatch[1].trim() : `Day ${dayNumber}`;
      
      days.push({
        day: dayNumber,
        title,
        timeSlots,
        tips: extractTips(dayContent),
        foodHighlights: extractFoodHighlights(dayContent)
      });
    }
    
    // Fill in missing days if needed
    for (let i = 1; i <= totalDays; i++) {
      if (!days.find(d => d.day === i)) {
        days.push({
          day: i,
          title: `Day ${i}`,
          timeSlots: [],
          tips: [],
          foodHighlights: []
        });
      }
    }
    
    setParsedItinerary(days.sort((a, b) => a.day - b.day));
  };

  const extractTips = (dayContent) => {
    const tipsMatch = dayContent.match(/💡.*?Tips\*\*(.*?)(?=\*\*🍽️|\*\*\d|$)/s);
    if (!tipsMatch) return [];
    
    return tipsMatch[1].split('\n')
      .filter(line => line.trim())
      .map(line => line.replace(/^[-•]\s*/, '').trim());
  };

  const extractFoodHighlights = (dayContent) => {
    const foodMatch = dayContent.match(/🍽️.*?Highlights\*\*(.*?)(?=\*\*💡|\*\*\d|$)/s);
    if (!foodMatch) return [];
    
    return foodMatch[1].split('\n')
      .filter(line => line.trim())
      .map(line => line.replace(/^[-•]\s*/, '').trim());
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your itinerary...</p>
        </div>
      </div>
    );
  }

  if (!tripData) {
    return <EmptyState />;
  }

  const totalDays = parseInt(tripData.duration) || parsedItinerary.length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <JourneyProgress />
      <ContextualActionMenu />
      <AmbientExperienceController />

      {/* Main Content */}
      <div className="pt-16 lg:pt-20 pb-20">
        {/* Back Navigation */}
        <div className="px-4 lg:px-6 py-4 border-b border-border">
          <button
            onClick={() => navigate('/trip-builder-chat-interface')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-body text-sm">Back to Chat</span>
          </button>
        </div>

        {/* Trip Header */}
        <TripHeader 
          trip={{
            title: tripData?.destination ? `${tripData.destination} Adventure` : 'Your Trip',
            destination: tripData?.destination || 'Unknown Destination',
            dateRange: tripData?.duration ? `${tripData.duration} days` : 'Duration not set',
            travelers: '1 traveler', // Default value, can be made dynamic later
            totalDays: parseInt(tripData?.duration) || totalDays,
            totalActivities: parsedItinerary?.reduce((sum, day) => sum + (day?.timeSlots?.length || 0), 0) || 0,
            totalMeals: parsedItinerary?.reduce((sum, day) => sum + (day?.timeSlots?.filter(slot => slot?.activities?.some(activity => activity?.toLowerCase()?.includes('lunch') || activity?.toLowerCase()?.includes('dinner') || activity?.toLowerCase()?.includes('breakfast')))?.length || 0), 0) || 0,
            estimatedBudget: 'TBD', // Can be calculated or set based on trip data
            description: `A ${tripData?.pace || 'perfectly paced'} ${tripData?.duration || 'multi'}-day journey through ${tripData?.destination || 'your chosen destination'}${tripData?.styles ? ` featuring ${tripData.styles.join(', ')} experiences` : ''}.`
          }}
          onEdit={() => navigate('/trip-builder-chat-interface')}
          onShare={() => {
            // Share functionality can be implemented later
            console.log('Share trip functionality');
          }}
          onExport={() => {
            // Export functionality can be implemented later  
            console.log('Export trip functionality');
          }}
        />

        {/* Timeline Navigation */}
        <TimelineNavigation
          days={parsedItinerary}
          currentDay={currentDay - 1}
          onDaySelect={(index) => setCurrentDay(index + 1)}
          onPrevious={() => setCurrentDay(prev => Math.max(1, prev - 1))}
          onNext={() => setCurrentDay(prev => Math.min(totalDays, prev + 1))}
        />

        {/* Current Day Content */}
        <motion.div
          key={currentDay}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="px-4 lg:px-6 py-6"
        >
          {parsedItinerary.length > 0 ? (
            <TimelineDay 
              day={{
                id: currentDay,
                title: parsedItinerary.find(d => d?.day === currentDay)?.title || `Day ${currentDay}`,
                vibe: `Day ${currentDay} of your ${tripData?.destination || 'adventure'} journey`,
                date: `Day ${currentDay}`,
                location: tripData?.destination || 'Your destination',
                isBookmarked: false,
                activities: (parsedItinerary.find(d => d?.day === currentDay)?.timeSlots || []).map((slot, index) => ({
                  id: `${currentDay}-${index}`,
                  name: slot?.timeOfDay || 'Activity',
                  description: slot?.activities?.join(', ') || 'No activities planned',
                  time: slot?.timeOfDay === 'Morning' ? '9:00 AM' : slot?.timeOfDay === 'Afternoon' ? '1:00 PM' : '6:00 PM',
                  type: slot?.timeOfDay === 'Morning' ? 'experience' : slot?.timeOfDay === 'Afternoon' ? 'attraction' : 'meal',
                  location: tripData?.destination || 'Location TBD',
                  duration: '2-3 hours',
                  cost: 'TBD'
                }))
              }}
              onBookmark={(dayId) => {
                console.log('Bookmark day:', dayId);
                // Bookmark functionality can be implemented later
              }}
              onShare={(dayId) => {
                console.log('Share day:', dayId);
                // Share functionality can be implemented later
              }}
            />
          ) : (
            <div className="max-w-4xl mx-auto">
              <div className="bg-card rounded-2xl shadow-sm border border-border p-8">
                <div className="text-center">
                  <Sparkles className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                    Day {currentDay} - Your Adventure Continues
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    This day is part of your {tripData?.destination} journey. 
                    Return to the chat to get more detailed recommendations!
                  </p>
                  <button
                    onClick={() => navigate('/trip-builder-chat-interface')}
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full hover:bg-primary/90 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Continue Planning
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Raw Itinerary Fallback (if parsing fails) */}
        {parsedItinerary.length === 0 && tripData.itinerary && (
          <div className="px-4 lg:px-6 py-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card rounded-2xl shadow-sm border border-border p-8">
                <MarkdownRenderer 
                  content={tripData.itinerary}
                  className="prose prose-lg max-w-none"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Menu */}
      <FloatingActionMenu 
        onNewTrip={() => navigate('/trip-builder-chat-interface')}
        onEditTrip={() => navigate('/trip-builder-chat-interface')}
      />
    </div>
  );
};

export default DayByDayItineraryTimeline;