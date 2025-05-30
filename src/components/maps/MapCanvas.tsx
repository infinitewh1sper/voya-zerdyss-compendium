import { useState, useEffect, useRef } from 'react';
import { MapContainer, ImageOverlay, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, LatLngBounds, LatLng } from 'leaflet';
import { Button } from 'reactstrap';
import RoleGuard from '@/components/auth/RoleGuard';
import { useMapInteraction } from '@/hooks/useMap';
import { useRoomEvent } from '@/lib/collaboration/liveblocks';
import 'leaflet/dist/leaflet.css';

interface MapCanvasProps {
  mapId: string;
  mapImageUrl: string;
  onPinClick?: (pinId: string) => void;
}

// Custom hook for map controls
function MapControls({ fitBounds }: { fitBounds: LatLngBounds }) {
  const map = useMap();
  
  useEffect(() => {
    map.fitBounds(fitBounds);
  }, [map, fitBounds]);
  
  return null;
}

// Ping animation component
function PingAnimation({ position, onComplete }: { position: [number, number], onComplete: () => void }) {
  const [opacity, setOpacity] = useState(1);
  const [scale, setScale] = useState(1);
  
  useEffect(() => {
    const duration = 1500; // 1.5 seconds
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setOpacity(1 - progress);
      setScale(1 + progress * 2);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        onComplete();
      }
    };
    
    requestAnimationFrame(animate);
  }, [onComplete]);
  
  return (
    <div
      className="absolute rounded-full bg-blue-500 pointer-events-none"
      style={{
        left: position[1],
        top: position[0],
        width: '20px',
        height: '20px',
        opacity,
        transform: `translate(-50%, -50%) scale(${scale})`,
        transition: 'opacity 0.1s, transform 0.1s',
      }}
    />
  );
}

export default function MapCanvas({ mapId, mapImageUrl, onPinClick }: MapCanvasProps) {
  const mapRef = useRef<any>(null);
  const [bounds] = useState<LatLngBounds>(new LatLngBounds([0, 0], [100, 100]));
  const [pings, setPings] = useState<Array<{ id: string; position: [number, number] }>>([]);
  
  const {
    pins,
    addPin,
    updatePin,
    deletePin,
    isAddingPin,
    setIsAddingPin,
    sendPing
  } = useMapInteraction(mapId);
  
  // Listen for ping events
  useRoomEvent(({ event }) => {
    if (event.type === 'pointerPing') {
      const pingId = crypto.randomUUID();
      const position: [number, number] = [event.position.y, event.position.x];
      
      setPings(prev => [...prev, { id: pingId, position }]);
      
      // Remove ping after animation completes
      setTimeout(() => {
        setPings(prev => prev.filter(ping => ping.id !== pingId));
      }, 1500);
    }
  });
  
  // Handle map click for adding pins
  const handleMapClick = (e: any) => {
    if (!isAddingPin) return;
    
    const { lat, lng } = e.latlng;
    
    // Convert lat/lng to percentage coordinates
    const x = (lng / 100) * 100;
    const y = (lat / 100) * 100;
    
    addPin({
      mapId,
      x,
      y,
      label: 'New Pin',
    });
    
    setIsAddingPin(false);
  };
  
  // Custom marker icon
  const markerIcon = new Icon({
    iconUrl: '/images/map-marker.png', // This would need to be added to public/images
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
  
  // Handle ping button click
  const handlePingClick = () => {
    if (!mapRef.current) return;
    
    const center = mapRef.current.getCenter();
    sendPing({ x: center.lng, y: center.lat });
  };
  
  return (
    <div className="relative h-[600px] w-full border rounded-lg overflow-hidden">
      <MapContainer
        center={[50, 50]}
        zoom={1}
        style={{ height: '100%', width: '100%' }}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
        whenReady={(map) => {
          mapRef.current = map.target;
        }}
        onClick={handleMapClick}
      >
        <MapControls fitBounds={bounds} />
        
        <ImageOverlay
          url={mapImageUrl}
          bounds={bounds}
          opacity={1}
          zIndex={10}
        />
        
        {pins.map((pin) => (
          <Marker
            key={pin.id}
            position={[pin.y, pin.x]}
            icon={markerIcon}
            draggable={true}
            eventHandlers={{
              click: () => onPinClick && onPinClick(pin.id),
              dragend: (e) => {
                const marker = e.target;
                const position = marker.getLatLng();
                
                // Convert lat/lng to percentage coordinates
                const x = (position.lng / 100) * 100;
                const y = (position.lat / 100) * 100;
                
                updatePin({
                  id: pin.id,
                  x,
                  y
                });
              }
            }}
          >
            <Popup>
              <div>
                <h4>{pin.label || 'Unnamed Pin'}</h4>
                {pin.cardId && <p>Linked to card: {pin.cardId}</p>}
                {pin.gmNotes && (
                  <RoleGuard gmOnly>
                    <div className="bg-yellow-50 p-2 mt-2 text-sm">
                      <strong>GM Notes:</strong> {pin.gmNotes}
                    </div>
                  </RoleGuard>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
        
        {pings.map((ping) => (
          <PingAnimation
            key={ping.id}
            position={ping.position}
            onComplete={() => {
              setPings(prev => prev.filter(p => p.id !== ping.id));
            }}
          />
        ))}
      </MapContainer>
      
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
        <RoleGuard gmOnly>
          <Button
            color={isAddingPin ? 'success' : 'primary'}
            size="sm"
            onClick={() => setIsAddingPin(!isAddingPin)}
          >
            {isAddingPin ? 'Cancel' : 'Add Pin'}
          </Button>
        </RoleGuard>
        
        <Button
          color="info"
          size="sm"
          onClick={handlePingClick}
        >
          Ping
        </Button>
        
        <Button
          color="secondary"
          size="sm"
          onClick={() => {
            if (mapRef.current) {
              mapRef.current.fitBounds(bounds);
            }
          }}
        >
          Reset View
        </Button>
      </div>
    </div>
  );
}
