import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import JourneyProgress from '../../components/ui/JourneyProgress';
import ContextualActionMenu from '../../components/ui/ContextualActionMenu';
import AmbientExperienceController from '../../components/ui/AmbientExperienceController';
import SearchBar from './components/SearchBar';
import SectionCard from './components/SectionCard';
import EssentialInfoSection from './components/EssentialInfoSection';
import LocalInsightsSection from './components/LocalInsightsSection';
import PracticalTipsSection from './components/PracticalTipsSection';
import PersonalNotesSection from './components/PersonalNotesSection';
import ShareExportSection from './components/ShareExportSection';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TravelNotesAndTips = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    essential: true,
    insights: false,
    practical: false,
    personal: false,
    share: false
  });
  const [bookmarkedSections, setBookmarkedSections] = useState({
    essential: false,
    insights: true,
    practical: false,
    personal: false,
    share: false
  });
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Load language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Mock destination data
  const destinationInfo = {
    destination: "Tokyo, Japan",
    duration: "7 days",
    travelStyle: "Culture & Food",
    lastUpdated: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  };

  const sections = [
    {
      id: 'essential',
      title: 'Essential Information',
      icon: 'Info',
      description: 'Currency, weather, cultural etiquette, and must-know basics',
      component: EssentialInfoSection
    },
    {
      id: 'insights',
      title: 'Local Insights',
      icon: 'Gem',
      description: 'Hidden gems, authentic experiences, and cultural nuances',
      component: LocalInsightsSection
    },
    {
      id: 'practical',
      title: 'Practical Tips',
      icon: 'Compass',
      description: 'Transportation, safety, communication, and emergency info',
      component: PracticalTipsSection
    },
    {
      id: 'personal',
      title: 'Personal Notes',
      icon: 'BookOpen',
      description: 'Your private observations, bookmarks, and custom insights',
      component: PersonalNotesSection
    },
    {
      id: 'share',
      title: 'Share & Export',
      icon: 'Share2',
      description: 'Export your guide or share with travel companions',
      component: ShareExportSection
    }
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Here you would implement search functionality across all sections
    console.log('Searching for:', query);
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const toggleBookmark = (sectionId) => {
    setBookmarkedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setSidebarVisible(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Travel Notes & Tips - {destinationInfo.destination} | GuacamaIA</title>
        <meta name="description" content={`Comprehensive travel guide for ${destinationInfo.destination} with local insights, practical tips, and cultural information.`} />
      </Helmet>

      <div className="min-h-screen bg-background ambient-texture">
        <Header />
        <JourneyProgress />
        <ContextualActionMenu />
        <AmbientExperienceController />

        {/* Desktop Sidebar Navigation */}
        <div className={`hidden lg:block fixed left-0 top-20 h-screen w-64 bg-card/95 backdrop-blur-sm border-r border-border z-30 transition-transform duration-300 ${
          sidebarVisible ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
          <div className="p-6 border-b border-border">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Icon name="MapPin" size={20} color="white" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground">
                  {destinationInfo.destination}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {destinationInfo.duration} • {destinationInfo.travelStyle}
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Last updated: {destinationInfo.lastUpdated}
            </p>
          </div>

          <nav className="p-4 space-y-2 custom-scrollbar overflow-y-auto h-full pb-32">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-xl text-left spring-hover transition-all duration-200 ${
                  expandedSections[section.id]
                    ? 'bg-primary/10 text-primary border border-primary/20' :'hover:bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={section.icon} size={18} />
                <div className="flex-1">
                  <div className="font-medium text-sm">{section.title}</div>
                  <div className="text-xs opacity-70 line-clamp-1">{section.description}</div>
                </div>
                {bookmarkedSections[section.id] && (
                  <Icon name="Bookmark" size={14} className="text-accent" />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Mobile Sidebar Toggle */}
        <Button
          variant="default"
          size="icon"
          onClick={() => setSidebarVisible(!sidebarVisible)}
          className="lg:hidden fixed top-24 left-4 z-40 w-12 h-12 rounded-full elevation-3"
        >
          <Icon name={sidebarVisible ? "X" : "Menu"} size={20} color="white" />
        </Button>

        {/* Mobile Sidebar Overlay */}
        {sidebarVisible && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-20"
            onClick={() => setSidebarVisible(false)}
          />
        )}

        {/* Main Content */}
        <main className="lg:ml-64 pt-20 pb-12">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="fluid-heading-lg font-heading font-bold text-foreground mb-2">
                    Travel Guide
                  </h1>
                  <div className="flex items-center space-x-4 text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Icon name="MapPin" size={16} />
                      <span className="text-sm">{destinationInfo.destination}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Calendar" size={16} />
                      <span className="text-sm">{destinationInfo.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Heart" size={16} />
                      <span className="text-sm">{destinationInfo.travelStyle}</span>
                    </div>
                  </div>
                </div>
                
                <div className="hidden md:flex items-center space-x-2">
                  <Button variant="outline" iconName="Download" iconPosition="left">
                    Export Guide
                  </Button>
                  <Button variant="default" iconName="Share2" iconPosition="left">
                    Share
                  </Button>
                </div>
              </div>

              <SearchBar 
                onSearch={handleSearch}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>

            {/* Content Sections */}
            <div className="space-y-8">
              {sections.map((section) => {
                const SectionComponent = section.component;
                return (
                  <div key={section.id} id={`section-${section.id}`}>
                    <SectionCard
                      title={section.title}
                      icon={section.icon}
                      isExpanded={expandedSections[section.id]}
                      onToggle={() => toggleSection(section.id)}
                      bookmarked={bookmarkedSections[section.id]}
                      onBookmark={() => toggleBookmark(section.id)}
                      className="message-slide-in"
                    >
                      <SectionComponent />
                    </SectionCard>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions - Mobile */}
            <div className="md:hidden fixed bottom-6 left-6 right-6 bg-card/95 backdrop-blur-sm rounded-2xl p-4 border border-border elevation-3">
              <div className="flex justify-center space-x-4">
                <Button variant="outline" size="sm" iconName="Download">
                  Export
                </Button>
                <Button variant="default" size="sm" iconName="Share2">
                  Share
                </Button>
                <Button variant="ghost" size="sm" iconName="Bookmark">
                  Save
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default TravelNotesAndTips;