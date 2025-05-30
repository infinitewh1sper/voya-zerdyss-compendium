import { useState } from 'react';
import { Button, Input, Alert } from 'reactstrap';
import RoleGuard from '@/components/auth/RoleGuard';
import Link from 'next/link';

export default function MapsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState<string | null>(null);
  
  // This would be replaced with actual data fetching in a real implementation
  const maps = [
    {
      id: '1',
      name: 'Forest Battleground',
      description: 'A tactical map of the western forest',
      imageUrl: '/images/maps/forest_battleground.jpg'
    }
  ];

  return (
    <div>
      {notification && (
        <Alert color="light" className="bg-green-50 mb-4">
          {notification}
        </Alert>
      )}
      
      <h1 className="text-4xl font-bold mb-2">Maps</h1>
      <p className="text-gray-600 mb-6">Battle and world maps of Voya Zerdyss with interactive pins.</p>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input 
          type="text" 
          placeholder="Search maps by name or description..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow"
        />
        <RoleGuard gmOnly>
          <Link href="/maps/new">
            <Button color="primary" className="whitespace-nowrap">
              Add New Map
            </Button>
          </Link>
        </RoleGuard>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {maps.map(map => (
          <Link href={`/maps/${map.id}`} key={map.id} className="no-underline text-inherit">
            <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-200 relative">
                {map.imageUrl && (
                  <img 
                    src={map.imageUrl} 
                    alt={map.name} 
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold">{map.name}</h3>
                <p className="text-gray-600 line-clamp-2">{map.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
