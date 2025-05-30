import { useState } from 'react';
import { Button, Input, Alert } from 'reactstrap';
import RoleGuard from '@/components/auth/RoleGuard';
import Link from 'next/link';

export default function RegentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState<string | null>(null);
  
  // This would be replaced with actual data fetching in a real implementation
  const regents = [
    {
      id: '1',
      name: 'Queen Elara',
      type: 'Human',
      imageUrl: '/images/regents/queen_elara.jpg'
    }
  ];

  return (
    <div>
      {notification && (
        <Alert color="light" className="bg-green-50 mb-4">
          {notification}
        </Alert>
      )}
      
      <h1 className="text-4xl font-bold mb-2">Regents</h1>
      <p className="text-gray-600 mb-6">Powerful rulers and influential leaders of Voya Zerdyss.</p>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input 
          type="text" 
          placeholder="Search Regents by name, type, habitat, or description..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow"
        />
        <RoleGuard gmOnly>
          <Link href="/regents/new">
            <Button color="primary" className="whitespace-nowrap">
              Add New Regent
            </Button>
          </Link>
        </RoleGuard>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {regents.map(regent => (
          <Link href={`/regents/${regent.id}`} key={regent.id} className="no-underline text-inherit">
            <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-200 relative">
                {regent.imageUrl && (
                  <img 
                    src={regent.imageUrl} 
                    alt={regent.name} 
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold">{regent.name}</h3>
                <p className="text-gray-600">{regent.type}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
