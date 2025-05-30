import { useState } from 'react';
import { Button, Input, Alert } from 'reactstrap';
import RoleGuard from '@/components/auth/RoleGuard';
import Link from 'next/link';

export default function CreaturesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState<string | null>('Orcs has been added to the diary!');
  
  // This would be replaced with actual data fetching in a real implementation
  const creatures = [
    {
      id: '1',
      name: 'Orcs',
      type: 'Humanoids',
      imageUrl: '/images/creatures/orc.jpg'
    }
  ];

  return (
    <div>
      {notification && (
        <Alert color="light" className="bg-green-50 mb-4">
          {notification}
        </Alert>
      )}
      
      <h1 className="text-4xl font-bold mb-2">Creatures</h1>
      <p className="text-gray-600 mb-6">Wild beasts and monsters that roam the lands of Voya Zerdyss.</p>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input 
          type="text" 
          placeholder="Search creatures by name, type, habitat, or description..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow"
        />
        <RoleGuard gmOnly>
          <Link href="/creatures/new">
            <Button color="primary" className="whitespace-nowrap">
              Add New Creature
            </Button>
          </Link>
        </RoleGuard>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {creatures.map(creature => (
          <Link href={`/creatures/${creature.id}`} key={creature.id} className="no-underline text-inherit">
            <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-200 relative">
                {creature.imageUrl && (
                  <img 
                    src={creature.imageUrl} 
                    alt={creature.name} 
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold">{creature.name}</h3>
                <p className="text-gray-600">{creature.type}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
