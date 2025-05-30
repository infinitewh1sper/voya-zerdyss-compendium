import { useState, useEffect } from 'react';
import { Card } from '@/lib/schema';
import { useStorage, useMutation } from '@/lib/collaboration/liveblocks';

export function useCards(category?: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Get cards from Liveblocks storage
  const cards = useStorage((root) => {
    const cardsMap = root.cards;
    if (!cardsMap) return [];
    
    const allCards = Array.from(cardsMap.values());
    
    // Filter by category if provided
    if (category) {
      return allCards.filter(card => card.category === category);
    }
    
    return allCards;
  });
  
  // Add card mutation
  const addCard = useMutation(({ storage }, card: Omit<Card, 'id' | 'createdAt' | 'updatedAt'>) => {
    const cardsMap = storage.get('cards');
    const id = crypto.randomUUID();
    
    cardsMap.set(id, {
      ...card,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    return id;
  }, []);
  
  // Update card mutation
  const updateCard = useMutation(({ storage }, card: Partial<Card> & { id: string }) => {
    const cardsMap = storage.get('cards');
    const existingCard = cardsMap.get(card.id);
    
    if (existingCard) {
      cardsMap.set(card.id, {
        ...existingCard,
        ...card,
        updatedAt: new Date()
      });
    }
  }, []);
  
  // Delete card mutation
  const deleteCard = useMutation(({ storage }, cardId: string) => {
    const cardsMap = storage.get('cards');
    cardsMap.delete(cardId);
  }, []);
  
  // Fetch initial cards from API
  useEffect(() => {
    const fetchCards = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/cards');
        
        if (!response.ok) {
          throw new Error('Failed to fetch cards');
        }
        
        const data = await response.json();
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setIsLoading(false);
      }
    };
    
    fetchCards();
  }, []);
  
  return {
    cards,
    addCard,
    updateCard,
    deleteCard,
    isLoading,
    error
  };
}
