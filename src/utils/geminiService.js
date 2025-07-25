import genAI from './geminiClient';

/**
 * Generates a text response based on user input for travel planning.
 * @param {string} prompt - The user's input prompt.
 * @param {Array} context - Previous conversation context
 * @returns {Promise<string>} The generated text.
 */
export async function generateTravelResponse(prompt, context = []) {
  try {
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-pro',
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        maxOutputTokens: 1024,
      },
    });

    // Create travel planning system prompt
    const systemPrompt = `You are GuacamaIA, a sophisticated AI travel planner with expertise in creating personalized, elegant travel itineraries. Your personality is warm, knowledgeable, and inspiring - like a well-traveled friend who knows all the hidden gems.

Key guidelines:
- Create responses that feel personal and engaging
- Use rich, descriptive language that evokes wanderlust
- Provide practical, actionable travel advice
- Include local insights and cultural context
- Format responses with markdown for better readability
- Use emojis sparingly but effectively for visual appeal
- Ask follow-up questions to better understand traveler preferences
- Be enthusiastic but not overwhelming

When planning itineraries:
- Consider travel pace preferences (relaxed/mixed/intense)
- Include diverse experiences based on interests
- Provide meal suggestions and local cuisine recommendations
- Add practical tips and insider knowledge
- Structure information clearly with headings and lists
- Include approximate time allocations
- Suggest alternatives for different weather or circumstances

Always maintain an elegant, sophisticated tone while being helpful and approachable.`;

    let conversationHistory = [];
    
    // Add system context
    if (context.length > 0) {
      conversationHistory = context.map(msg => ({
        role: msg.isUser ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));
    }

    // Start chat with history
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: systemPrompt }]
        },
        {
          role: 'model',
          parts: [{ text: 'Hello! I\'m GuacamaIA, your sophisticated travel companion. I\'m here to help you create unforgettable journeys tailored to your unique style and preferences. What adventure shall we plan together?' }]
        },
        ...conversationHistory
      ]
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error in travel response generation:', error);
    
    // Fallback response for API errors
    if (error.message?.includes('API_KEY')) {
      return "I apologize, but I'm having trouble connecting to my travel knowledge base right now. Please check that your API key is properly configured in your environment variables.";
    }
    
    return "I'm experiencing some technical difficulties at the moment. Let me try to help you with your travel planning in just a moment. In the meantime, could you tell me more about your dream destination?";
  }
}

/**
 * Streams a text response chunk by chunk for travel planning.
 * @param {string} prompt - The user's input prompt.
 * @param {Function} onChunk - Callback to handle each streamed chunk.
 * @param {Array} context - Previous conversation context
 */
export async function streamTravelResponse(prompt, onChunk, context = []) {
  try {
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        maxOutputTokens: 1024,
      },
    });

    const systemPrompt = `You are GuacamaIA, a sophisticated AI travel planner. Create engaging, personalized travel responses with markdown formatting for better readability. Be warm, knowledgeable, and inspiring.`;

    let conversationHistory = [];
    
    if (context.length > 0) {
      conversationHistory = context.map(msg => ({
        role: msg.isUser ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));
    }

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: systemPrompt }]
        },
        {
          role: 'model',
          parts: [{ text: 'I\'m GuacamaIA, ready to help plan your perfect journey!' }]
        },
        ...conversationHistory
      ]
    });

    const result = await chat.sendMessageStream(prompt);

    for await (const chunk of result.stream) {
      const text = chunk.text();
      if (text) {
        onChunk(text);
      }
    }
  } catch (error) {
    console.error('Error in streaming travel response:', error);
    onChunk("I'm having some technical difficulties. Let me help you plan your trip in just a moment!");
  }
}

/**
 * Generates a detailed itinerary based on trip parameters
 * @param {Object} tripData - Trip planning data
 * @returns {Promise<string>} Formatted itinerary
 */
export async function generateDetailedItinerary(tripData) {
  const { destination, duration, pace, styles } = tripData;
  
  const prompt = `Create a detailed ${duration}-day itinerary for ${destination} with a ${pace} travel pace, focusing on ${styles.join(', ')} experiences.

Please format the response as a comprehensive day-by-day itinerary including:

## Trip Overview
- Brief destination introduction
- Best time to visit
- Travel tips

## Daily Itinerary

For each day, include:
### Day X: [Theme/Focus]
**Morning (9:00 AM - 12:00 PM)**
- Activity/attraction
- Location and practical details
- Estimated time and cost

**Afternoon (12:00 PM - 6:00 PM)**
- Lunch recommendation
- Main activities
- Cultural experiences

**Evening (6:00 PM - 10:00 PM)**
- Dinner suggestions
- Evening activities
- Local experiences

**💡 Insider Tips**
- Local secrets
- Money-saving tips
- Cultural etiquette

**🍽️ Food Highlights**
- Must-try dishes
- Recommended restaurants
- Local food markets

Make each day unique and well-balanced, considering travel distances and energy levels. Include specific recommendations for restaurants, attractions, and activities that match the requested travel style.`;

  try {
    const response = await generateTravelResponse(prompt);
    return response;
  } catch (error) {
    console.error('Error generating detailed itinerary:', error);
    return `# Your ${destination} Adventure Awaits!\n\nI'm preparing a detailed ${duration}-day itinerary for you, but I'm experiencing some technical difficulties. Let me create something special for your ${pace}-paced journey focusing on ${styles.join(', ')} experiences.\n\nPlease try again in a moment, and I'll have your personalized itinerary ready!`;
  }
}