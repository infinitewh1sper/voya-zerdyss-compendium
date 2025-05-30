import { useState } from 'react';
import { Input, Button } from 'reactstrap';
import Fuse from 'fuse.js';
import { Card as CardType } from '@/lib/schema';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (results: Partial<CardType>[]) => void;
  items: Partial<CardType>[];
  debounceMs?: number;
}

export default function SearchBar({ 
  placeholder = 'Search...', 
  onSearch,
  items,
  debounceMs = 300
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  
  // Configure Fuse.js for fuzzy search
  const fuse = new Fuse(items, {
    keys: ['name', 'type', 'habitat', 'description'],
    threshold: 0.4,
    includeScore: true
  });
  
  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    
    // Clear previous timer
    if (timer) {
      clearTimeout(timer);
    }
    
    // Set new timer for debounce
    const newTimer = setTimeout(() => {
      if (searchQuery.trim() === '') {
        onSearch(items);
      } else {
        const results = fuse.search(searchQuery).map(result => result.item);
        onSearch(results);
      }
    }, debounceMs);
    
    setTimer(newTimer);
  };
  
  return (
    <div className="relative">
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="pr-10"
      />
      {query && (
        <Button
          color="link"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
          onClick={() => handleSearch('')}
        >
          ✕
        </Button>
      )}
    </div>
  );
}
