import { useState } from 'react';
import { Card, CardBody, CardTitle, CardText, Button, Badge } from 'reactstrap';
import RoleGuard from '@/components/auth/RoleGuard';
import { Card as CardType } from '@/lib/schema';

interface CardTileProps {
  card: Partial<CardType>;
  onClick?: () => void;
}

export default function CardTile({ card, onClick }: CardTileProps) {
  return (
    <div 
      className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="h-48 bg-gray-200 relative">
        {card.imageUrl && (
          <img 
            src={card.imageUrl} 
            alt={card.name} 
            className="w-full h-full object-cover"
          />
        )}
        {card.tier !== undefined && (
          <Badge 
            color="primary" 
            className="absolute top-2 right-2"
          >
            Tier {card.tier}
          </Badge>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold">{card.name}</h3>
        <p className="text-gray-600">{card.type}</p>
        {card.habitat && (
          <p className="text-gray-500 text-sm">Habitat: {card.habitat}</p>
        )}
      </div>
    </div>
  );
}
