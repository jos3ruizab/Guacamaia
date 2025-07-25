import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SearchBar = ({ onSearch, searchQuery, setSearchQuery }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <div className="relative mb-6">
      <form onSubmit={handleSearch} className="flex items-center space-x-2">
        <div className="flex-1 relative">
          <Input
            type="search"
            placeholder="Search tips, insights, or locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`transition-all duration-300 spring-transition ${
              isExpanded ? 'pl-12' : 'pl-4'
            }`}
            onFocus={() => setIsExpanded(true)}
            onBlur={() => !searchQuery && setIsExpanded(false)}
          />
          <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
            isExpanded ? 'opacity-100' : 'opacity-50'
          }`}>
            <Icon name="Search" size={18} className="text-muted-foreground" />
          </div>
          {searchQuery && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={clearSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6"
            >
              <Icon name="X" size={14} />
            </Button>
          )}
        </div>
        <Button
          type="submit"
          variant="default"
          iconName="Search"
          className="spring-hover"
        >
          Search
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;