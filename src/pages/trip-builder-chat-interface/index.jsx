import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import JourneyProgress from '../../components/ui/JourneyProgress';
import ContextualActionMenu from '../../components/ui/ContextualActionMenu';
import AmbientExperienceController from '../../components/ui/AmbientExperienceController';
import ChatContainer from './components/ChatContainer';
import ChatInput from './components/ChatInput';
import TripPlanningFlow from './components/TripPlanningFlow';
import ConversationStarter from './components/ConversationStarter';
import { streamTravelResponse, generateDetailedItinerary } from '../../utils/geminiService';

const TripBuilderChatInterface = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState('destination');
  const [tripData, setTripData] = useState({
    destination: '',
    duration: '',
    pace: '',
    styles: []
  });
  const [conversationStarted, setConversationStarted] = useState(false);
  const [isGeneratingItinerary, setIsGeneratingItinerary] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  // Mock destinations for surprise me feature
  const surpriseDestinations = [
    "Santorini, Greece - with its stunning sunsets and white-washed buildings",
    "Kyoto, Japan - for its ancient temples and cherry blossoms", 
    "Patagonia, Chile - for breathtaking landscapes and adventure",
    "Marrakech, Morocco - for its vibrant souks and rich culture",
    "Bali, Indonesia - for tropical paradise and spiritual experiences",
    "Iceland - for Northern Lights and dramatic landscapes",
    "Tuscany, Italy - for rolling hills and world-class wine",
    "New Zealand - for Lord of the Rings scenery and outdoor adventures"
  ];

  // Add message to chat
  const addMessage = (content, isUser = false) => {
    const newMessage = {
      id: Date.now() + Math.random(),
      content,
      isUser,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  };

  // Handle streaming AI response
  const handleStreamingResponse = async (prompt, contextMessages = []) => {
    setIsTyping(true);
    setIsStreaming(true);
    setStreamingMessage('');

    // Add temporary streaming message
    const tempMessage = {
      id: 'streaming-' + Date.now(),
      content: '',
      isUser: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, tempMessage]);

    let fullResponse = '';

    try {
      await streamTravelResponse(
        prompt,
        (chunk) => {
          fullResponse += chunk;
          setStreamingMessage(fullResponse);
          
          // Update the streaming message in real-time
          setMessages(prev => 
            prev.map(msg => 
              msg.id === tempMessage.id 
                ? { ...msg, content: fullResponse }
                : msg
            )
          );
        },
        contextMessages
      );
    } catch (error) {
      console.error('Streaming error:', error);
      const errorMessage = "I apologize, but I'm having some technical difficulties. Let me help you with your travel planning in just a moment.";
      setMessages(prev => 
        prev.map(msg => 
          msg.id === tempMessage.id 
            ? { ...msg, content: errorMessage }
            : msg
        )
      );
    } finally {
      setIsTyping(false);
      setIsStreaming(false);
      setStreamingMessage('');
    }

    return fullResponse;
  };

  // Handle conversation start
  const handleStartConversation = async (prompt) => {
    if (prompt === 'surprise') {
      handleSurpriseMe();
      return;
    }

    setConversationStarted(true);
    addMessage(prompt, true);
    
    // Use streaming response for better UX
    await handleStreamingResponse(
      `A traveler just said: "${prompt}". Please provide a warm, engaging response that helps them start planning their dream trip. Ask about their destination preferences if they haven't specified one clearly.`,
      []
    );
  };

  // Handle user message
  const handleSendMessage = async (message) => {
    if (!conversationStarted) {
      handleStartConversation(message);
      return;
    }

    addMessage(message, true);
    
    // Get conversation context for AI
    const contextMessages = messages.slice(-6); // Last 6 messages for context
    
    await handleStreamingResponse(message, contextMessages);
    
    // Process for trip planning flow
    await processUserInput(message);
  };

  // Process user input based on conversation flow
  const processUserInput = async (input) => {
    const lowerInput = input.toLowerCase();

    // Smart extraction based on conversation content
    if (currentStep === 'destination' && (lowerInput.includes('go to') || lowerInput.includes('visit') || lowerInput.includes('travel to'))) {
      const destination = extractDestination(input);
      if (destination) {
        setTripData(prev => ({ ...prev, destination }));
        setCurrentStep('duration');
      }
    } else if (currentStep === 'duration' && (lowerInput.includes('day') || lowerInput.includes('week') || /\d+/.test(input))) {
      const duration = extractDuration(input);
      setTripData(prev => ({ ...prev, duration }));
      setCurrentStep('pace');
    } else if (currentStep === 'pace' && (lowerInput.includes('relax') || lowerInput.includes('mix') || lowerInput.includes('intense'))) {
      const pace = extractPace(input);
      setTripData(prev => ({ ...prev, pace }));
      setCurrentStep('style');
    } else if (currentStep === 'style' && hasStyleKeywords(input)) {
      const styles = extractStyles(input);
      const updatedTripData = { ...tripData, styles };
      setTripData(updatedTripData);
      
      if (styles.length > 0 && updatedTripData.destination && updatedTripData.duration) {
        await generateItinerary(updatedTripData);
      }
    }
  };

  // Enhanced destination extraction
  const extractDestination = (input) => {
    const patterns = [
      /(?:go to|visit|travel to|trip to)\s+([^,.!?]+)/i,
      /(?:planning|thinking about)\s+([^,.!?]+)/i,
      /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/
    ];
    
    for (const pattern of patterns) {
      const match = input.match(pattern);
      if (match) {
        return match[1].trim();
      }
    }
    return null;
  };

  // Extract duration from user input
  const extractDuration = (input) => {
    const numbers = input.match(/(\d+)\s*(?:day|week)/i);
    if (numbers) {
      const num = parseInt(numbers[1]);
      return input.toLowerCase().includes('week') ? (num * 7).toString() : num.toString();
    }
    if (input.toLowerCase().includes('weekend')) return '3';
    return input;
  };

  // Extract pace from user input
  const extractPace = (input) => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('relax') || lowerInput.includes('slow') || lowerInput.includes('easy') || lowerInput.includes('chill')) {
      return 'relaxed';
    }
    if (lowerInput.includes('intense') || lowerInput.includes('packed') || lowerInput.includes('busy') || lowerInput.includes('adventure')) {
      return 'intense';
    }
    return 'mixed';
  };

  // Check if input has style keywords
  const hasStyleKeywords = (input) => {
    const styleKeywords = ['luxury', 'culture', 'food', 'nature', 'nightlife', 'premium', 'museum', 'restaurant', 'outdoor', 'party'];
    return styleKeywords.some(keyword => input.toLowerCase().includes(keyword));
  };

  // Extract styles from user input
  const extractStyles = (input) => {
    const lowerInput = input.toLowerCase();
    const styles = [];
    
    if (lowerInput.includes('luxury') || lowerInput.includes('premium') || lowerInput.includes('high-end')) {
      styles.push('luxury');
    }
    if (lowerInput.includes('culture') || lowerInput.includes('museum') || lowerInput.includes('history') || lowerInput.includes('art')) {
      styles.push('culture');
    }
    if (lowerInput.includes('food') || lowerInput.includes('culinary') || lowerInput.includes('restaurant') || lowerInput.includes('cuisine')) {
      styles.push('food');
    }
    if (lowerInput.includes('nature') || lowerInput.includes('outdoor') || lowerInput.includes('hiking') || lowerInput.includes('beach')) {
      styles.push('nature');
    }
    if (lowerInput.includes('nightlife') || lowerInput.includes('party') || lowerInput.includes('entertainment') || lowerInput.includes('bar')) {
      styles.push('nightlife');
    }
    
    return styles;
  };

  // Generate itinerary using Gemini API
  const generateItinerary = async (finalTripData) => {
    setIsGeneratingItinerary(true);
    
    addMessage(
      `Perfect! I have everything I need to create your personalized itinerary:\n\n🌍 **Destination:** ${finalTripData.destination}\n📅 **Duration:** ${finalTripData.duration} days\n⚡ **Pace:** ${finalTripData.pace}\n❤️ **Interests:** ${finalTripData.styles.join(', ')}\n\nLet me craft the perfect journey for you...`
    );

    try {
      const itinerary = await generateDetailedItinerary(finalTripData);
      
      addMessage(
        `🎉 **Your personalized itinerary is ready!**\n\n${itinerary}\n\n---\n\n*This detailed plan is tailored specifically for your ${finalTripData.pace} ${finalTripData.duration}-day journey to ${finalTripData.destination}. Click below to view it in our beautiful timeline format!*`
      );

      // Store itinerary data for the timeline page
      localStorage.setItem('guacamaia_itinerary', JSON.stringify({
        ...finalTripData,
        itinerary,
        createdAt: new Date().toISOString()
      }));

    } catch (error) {
      console.error('Error generating itinerary:', error);
      addMessage(
        `I've created the framework for your ${finalTripData.destination} adventure! Due to high demand, I'm processing the detailed itinerary. You can view what I have so far in the timeline view, and I'll continue to enhance it with more personalized recommendations.`
      );
    }

    setIsGeneratingItinerary(false);
    
    // Auto-navigate after a short delay
    setTimeout(() => {
      navigate('/day-by-day-itinerary-timeline');
    }, 3000);
  };

  // Handle surprise me
  const handleSurpriseMe = async () => {
    const randomDestination = surpriseDestinations[Math.floor(Math.random() * surpriseDestinations.length)];
    
    if (!conversationStarted) {
      setConversationStarted(true);
    }
    
    addMessage("Surprise me with an amazing destination!", true);
    
    await handleStreamingResponse(
      `A traveler wants to be surprised with a destination. Here's what I've randomly selected: ${randomDestination}. Please provide an enthusiastic, detailed response about this destination that makes them excited to visit. Include what makes it special and ask if they'd like to start planning their trip there.`
    );
    
    setTripData(prev => ({ ...prev, destination: randomDestination }));
    setCurrentStep('duration');
  };

  // Update trip data
  const handleUpdateTripData = (updates) => {
    setTripData(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <JourneyProgress />
      <ContextualActionMenu />
      <AmbientExperienceController />

      {/* Main Content */}
      <div className="flex-1 flex flex-col pt-16 lg:pt-20">
        {!conversationStarted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex items-center justify-center"
          >
            <ConversationStarter onStartConversation={handleStartConversation} />
          </motion.div>
        ) : (
          <>
            <ChatContainer 
              messages={messages} 
              isTyping={
                isStreaming && !messages.some(msg => typeof msg.id === 'string' && msg.id.startsWith('streaming-'))
              }
            />
            
            {/* Trip Planning Flow - Show when appropriate */}
            {conversationStarted && currentStep !== 'destination' && !isGeneratingItinerary && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-4 lg:px-6 py-4"
              >
                <TripPlanningFlow
                  currentStep={currentStep}
                  tripData={tripData}
                  onUpdateTripData={handleUpdateTripData}
                />
              </motion.div>
            )}
          </>
        )}

        <ChatInput
          onSendMessage={handleSendMessage}
          onSurpriseMe={!conversationStarted ? handleSurpriseMe : null}
          disabled={isTyping || isGeneratingItinerary || isStreaming}
          placeholder={
            !conversationStarted 
              ? "Describe your dream trip..." 
              : isGeneratingItinerary 
                ? "Creating your itinerary..." 
                : isStreaming
                  ? "GuacamaIA is responding..." :"Continue the conversation..."
          }
        />
      </div>
    </div>
  );
};

export default TripBuilderChatInterface;