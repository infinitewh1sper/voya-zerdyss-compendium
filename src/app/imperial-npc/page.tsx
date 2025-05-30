import { useState } from 'react';
import { Button, Input, Alert } from 'reactstrap';
import RoleGuard from '@/components/auth/RoleGuard';
import Link from 'next/link';

export default function ImperialNPCPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState<string | null>(null);
  
  // This would be replaced with actual data fetching in a real implementation
  const npcs = [
    {
      id: '1',
      name: 'Commander Vex',
      type: 'Human',
      imageUrl: '/images/imperial/commander_vex.jpg'
    }
  ];

  return (
    <div>
      {notification && (
        <Alert color="light" className="bg-green-50 mb-4">
          {notification}
        </Alert>
      )}
      
      <h1 className="text-4xl font-bold mb-2">Imperial NPCs</h1>
      <p className="text-gray-600 mb-6">Characters aligned with the Imperial faction in Voya Zerdyss.</p>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input 
          type="text" 
          placeholder="Search Imperial NPCs by name, type, habitat, or description..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow"
        />
        <RoleGuard gmOnly>
          <Link href="/imperial-npc/new">
            <Button color="primary" className="whitespace-nowrap">
              Add New NPC
            </Button>
          </Link>
        </RoleGuard>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {npcs.map(npc => (
          <Link href={`/imperial-npc/${npc.id}`} key={npc.id} className="no-underline text-inherit">
            <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-200 relative">
                {npc.imageUrl && (
                  <img 
                    src={npc.imageUrl} 
                    alt={npc.name} 
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold">{npc.name}</h3>
                <p className="text-gray-600">{npc.type}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
