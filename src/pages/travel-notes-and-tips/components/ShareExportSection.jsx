import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ShareExportSection = () => {
  const [shareOptions, setShareOptions] = useState({
    includePersonalNotes: false,
    includeEssentialInfo: true,
    includeLocalInsights: true,
    includePracticalTips: true,
    format: 'pdf'
  });

  const [isSharing, setIsSharing] = useState(false);
  const [shareLink, setShareLink] = useState('');

  const exportFormats = [
    {
      id: 'pdf',
      name: 'PDF Document',
      icon: 'FileText',
      description: 'Printable travel guide with all sections',
      size: '~2.5 MB'
    },
    {
      id: 'markdown',
      name: 'Markdown File',
      icon: 'FileCode',
      description: 'Plain text format for easy editing',
      size: '~50 KB'
    },
    {
      id: 'json',
      name: 'JSON Data',
      icon: 'Database',
      description: 'Structured data for developers',
      size: '~25 KB'
    }
  ];

  const shareChannels = [
    {
      id: 'email',
      name: 'Email',
      icon: 'Mail',
      description: 'Send via email to friends or family'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: 'MessageCircle',
      description: 'Share with travel companions'
    },
    {
      id: 'link',
      name: 'Share Link',
      icon: 'Link',
      description: 'Generate a shareable link'
    },
    {
      id: 'qr',
      name: 'QR Code',
      icon: 'QrCode',
      description: 'Quick access via QR code'
    }
  ];

  const handleExport = (format) => {
    console.log('Exporting as:', format, 'with options:', shareOptions);
    // Here you would implement the actual export functionality
    alert(`Exporting as ${format.toUpperCase()}...`);
  };

  const handleShare = async (channel) => {
    setIsSharing(true);
    
    // Simulate API call to generate share link
    setTimeout(() => {
      const mockLink = `https://guacamaia.com/shared/travel-guide/${Date.now()}`;
      setShareLink(mockLink);
      
      switch (channel) {
        case 'email':
          window.open(`mailto:?subject=My Travel Guide to Japan&body=Check out my personalized travel guide: ${mockLink}`);
          break;
        case 'whatsapp':
          window.open(`https://wa.me/?text=Check out my travel guide to Japan: ${mockLink}`);
          break;
        case 'link':
          navigator.clipboard.writeText(mockLink);
          alert('Link copied to clipboard!');
          break;
        case 'qr':
          // Generate QR code
          console.log('Generating QR code for:', mockLink);
          break;
      }
      
      setIsSharing(false);
    }, 1500);
  };

  const getSectionCount = () => {
    let count = 0;
    if (shareOptions.includeEssentialInfo) count++;
    if (shareOptions.includeLocalInsights) count++;
    if (shareOptions.includePracticalTips) count++;
    if (shareOptions.includePersonalNotes) count++;
    return count;
  };

  return (
    <div className="space-y-8">
      {/* Export Options */}
      <div>
        <h4 className="font-heading font-semibold text-lg text-foreground mb-6 flex items-center">
          <Icon name="Download" size={20} className="text-primary mr-2" />
          Export Your Guide
        </h4>
        
        {/* Content Selection */}
        <div className="bg-card rounded-xl p-6 border border-border mb-6">
          <h5 className="font-medium text-foreground mb-4">Select Content to Include</h5>
          
          <div className="space-y-3">
            {[
              { key: 'includeEssentialInfo', label: 'Essential Information', description: 'Currency, weather, cultural etiquette' },
              { key: 'includeLocalInsights', label: 'Local Insights', description: 'Hidden gems and authentic experiences' },
              { key: 'includePracticalTips', label: 'Practical Tips', description: 'Transportation, safety, communication' },
              { key: 'includePersonalNotes', label: 'Personal Notes', description: 'Your private notes and observations' }
            ].map((option) => (
              <label key={option.key} className="flex items-start space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={shareOptions[option.key]}
                  onChange={(e) => setShareOptions({
                    ...shareOptions,
                    [option.key]: e.target.checked
                  })}
                  className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <div className="flex-1">
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {option.label}
                  </span>
                  <p className="text-xs text-muted-foreground">{option.description}</p>
                </div>
              </label>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <Icon name="Info" size={14} className="inline mr-1" />
              {getSectionCount()} section{getSectionCount() !== 1 ? 's' : ''} selected for export
            </p>
          </div>
        </div>
        
        {/* Export Formats */}
        <div className="grid gap-4 md:grid-cols-3">
          {exportFormats.map((format) => (
            <div 
              key={format.id}
              className={`bg-card rounded-xl p-5 border cursor-pointer spring-hover hover:elevation-1 transition-all duration-200 ${
                shareOptions.format === format.id 
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
              onClick={() => setShareOptions({ ...shareOptions, format: format.id })}
            >
              <div className="flex items-start space-x-3 mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  shareOptions.format === format.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon name={format.icon} size={20} />
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-foreground">{format.name}</h5>
                  <p className="text-xs text-muted-foreground mt-1">{format.description}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">{format.size}</span>
                <Button
                  variant={shareOptions.format === format.id ? "default" : "outline"}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleExport(format.id);
                  }}
                  iconName="Download"
                  iconPosition="left"
                  iconSize={14}
                >
                  Export
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Share Options */}
      <div>
        <h4 className="font-heading font-semibold text-lg text-foreground mb-6 flex items-center">
          <Icon name="Share2" size={20} className="text-accent mr-2" />
          Share Your Guide
        </h4>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {shareChannels.map((channel) => (
            <div 
              key={channel.id}
              className="bg-card rounded-xl p-5 border border-border spring-hover hover:elevation-1 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center mx-auto mb-3">
                <Icon name={channel.icon} size={24} className="text-accent" />
              </div>
              
              <h5 className="font-medium text-foreground mb-2">{channel.name}</h5>
              <p className="text-xs text-muted-foreground mb-4">{channel.description}</p>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare(channel.id)}
                loading={isSharing}
                fullWidth
                className="spring-hover"
              >
                Share
              </Button>
            </div>
          ))}
        </div>
        
        {shareLink && (
          <div className="mt-6 bg-success/5 border border-success/20 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm font-medium text-success">Share link generated!</span>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={shareLink}
                readOnly
                className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded-lg"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(shareLink);
                  alert('Link copied!');
                }}
                iconName="Copy"
              >
                Copy
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Privacy Notice */}
      <div className="bg-muted/30 rounded-xl p-5 border border-border/50">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-primary mt-0.5 flex-shrink-0" />
          <div>
            <h5 className="font-medium text-foreground mb-2">Privacy & Sharing</h5>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Shared links expire after 30 days for security</p>
              <p>• Personal notes are only included if explicitly selected</p>
              <p>• You can revoke access to shared guides at any time</p>
              <p>• All exports are processed securely and not stored on our servers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareExportSection;