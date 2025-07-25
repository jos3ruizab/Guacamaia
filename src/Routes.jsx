import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import LandingPage from "pages/landing-page";
import DayByDayItineraryTimeline from "pages/day-by-day-itinerary-timeline";
import TripBuilderChatInterface from "pages/trip-builder-chat-interface";
import TravelNotesAndTips from "pages/travel-notes-and-tips";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/day-by-day-itinerary-timeline" element={<DayByDayItineraryTimeline />} />
        <Route path="/trip-builder-chat-interface" element={<TripBuilderChatInterface />} />
        <Route path="/travel-notes-and-tips" element={<TravelNotesAndTips />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;