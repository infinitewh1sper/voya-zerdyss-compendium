import { useState, useEffect } from 'react';
import { Card as CardType } from '@/lib/schema';
import CardTile from './CardTile';

interface CardGridProps {
  cards: Partial<CardType>[];
  onCardClick?: (card: Partial<CardType>) => void;
}

export default function CardGrid({ cards, onCardClick }: CardGridProps) {
  const [columns, setColumns] = useState(4);

  // Responsive columns based on window width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setColumns(1);
      } else if (width < 768) {
        setColumns(2);
      } else if (width < 1024) {
        setColumns(3);
      } else {
        setColumns(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4`}>
      {cards.map((card) => (
        <CardTile 
          key={card.id} 
          card={card} 
          onClick={() => onCardClick && onCardClick(card)}
        />
      ))}
    </div>
  );
}
