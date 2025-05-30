import { useState, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { MapPin } from '@/lib/schema';
import { useStorage, useMutation, useBroadcastEvent } from '@/lib/collaboration/liveblocks';

export function useMapInteraction(mapId: string) {
  const [isAddingPin, setIsAddingPin] = useState(false);
  const [selectedPin, setSelectedPin] = useState<MapPin | null>(null);
  
  // Get pins from Liveblocks storage
  const pins = useStorage((root) => {
    const pinsMap = root.pins;
    if (!pinsMap) return [];
    
    return Array.from(pinsMap.values())
      .filter(pin => pin.mapId === mapId);
  });
  
  // Add pin mutation
  const addPin = useMutation(({ storage }, pin: Omit<MapPin, 'id' | 'createdAt' | 'updatedAt'>) => {
    const pinsMap = storage.get('pins');
    const id = crypto.randomUUID();
    
    pinsMap.set(id, {
      ...pin,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    return id;
  }, []);
  
  // Update pin mutation
  const updatePin = useMutation(({ storage }, pin: Partial<MapPin> & { id: string }) => {
    const pinsMap = storage.get('pins');
    const existingPin = pinsMap.get(pin.id);
    
    if (existingPin) {
      pinsMap.set(pin.id, {
        ...existingPin,
        ...pin,
        updatedAt: new Date()
      });
    }
  }, []);
  
  // Delete pin mutation
  const deletePin = useMutation(({ storage }, pinId: string) => {
    const pinsMap = storage.get('pins');
    pinsMap.delete(pinId);
  }, []);
  
  // Broadcast ping event
  const broadcast = useBroadcastEvent();
  const sendPing = (position: { x: number, y: number }) => {
    broadcast({
      type: 'pointerPing',
      position,
    });
  };
  
  return {
    pins,
    addPin,
    updatePin,
    deletePin,
    isAddingPin,
    setIsAddingPin,
    selectedPin,
    setSelectedPin,
    sendPing
  };
}
