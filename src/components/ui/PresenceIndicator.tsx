import { useState, useEffect } from 'react';
import { useOthers, useMyPresence } from '@/lib/collaboration/liveblocks';
import { Avatar, AvatarGroup, Tooltip } from 'reactstrap';

export default function PresenceIndicator() {
  const others = useOthers();
  const [myPresence, updateMyPresence] = useMyPresence();
  
  // Update cursor position on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      updateMyPresence({
        cursor: {
          x: e.clientX,
          y: e.clientY,
        },
      });
    };
    
    const handleMouseLeave = () => {
      updateMyPresence({
        cursor: null,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [updateMyPresence]);
  
  return (
    <div className="fixed top-4 right-4 z-50">
      <AvatarGroup>
        {others.map(({ connectionId, presence, info }) => {
          if (!info) return null;
          
          return (
            <Tooltip
              key={connectionId}
              title={info.name || 'Anonymous'}
              placement="bottom"
            >
              <Avatar
                className="border-2 border-white"
                style={{ 
                  backgroundColor: info.role === 'GM' ? '#dc3545' : '#0d6efd',
                }}
              >
                {info.name ? info.name.charAt(0).toUpperCase() : 'U'}
              </Avatar>
            </Tooltip>
          );
        })}
      </AvatarGroup>
      
      {/* Render other users' cursors */}
      {others.map(({ connectionId, presence, info }) => {
        if (!presence.cursor || !info) return null;
        
        return (
          <div
            key={connectionId}
            className="absolute pointer-events-none"
            style={{
              left: presence.cursor.x,
              top: presence.cursor.y,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
                fill={info.role === 'GM' ? '#dc3545' : '#0d6efd'}
                stroke="white"
              />
            </svg>
            
            <div
              className="px-2 py-1 rounded-md text-xs text-white"
              style={{ 
                backgroundColor: info.role === 'GM' ? '#dc3545' : '#0d6efd',
                marginTop: '4px',
              }}
            >
              {info.name || 'Anonymous'}
            </div>
          </div>
        );
      })}
    </div>
  );
}
