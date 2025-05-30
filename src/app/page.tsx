import { Card } from 'reactstrap';
import { useSearch } from '@/hooks/useSearch';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
        <h1 className="text-3xl font-bold mb-4">Voya Zerdyss Compendium</h1>
        <p className="text-lg">
          Welcome to the collaborative compendium for the world of Voya Zerdyss.
          Search across all entries or navigate to specific categories.
        </p>
        
        <div className="mt-6">
          <input
            type="text"
            placeholder="Search across all entries..."
            className="w-full p-3 border rounded-lg"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card body className="hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-2">About Voya Zerdyss</h2>
          <p>
            Explore the rich lore and history of the Voya Zerdyss world. 
            This compendium serves as a collaborative tool for Game Masters and Players.
          </p>
        </Card>
        
        <Card body className="hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Getting Started</h2>
          <p>
            Browse categories using the navigation bar above. 
            Each entry can be viewed in detail, and Game Masters can edit and create new entries.
          </p>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/imperial-npc" className="no-underline">
          <Card body className="bg-gray-100 hover:bg-gray-200 transition-colors h-full">
            <h3 className="text-lg font-semibold">Imperial NPCs</h3>
            <p className="text-gray-700">Characters aligned with the Imperial faction</p>
          </Card>
        </Link>
        
        <Link href="/rebel-npc" className="no-underline">
          <Card body className="bg-gray-100 hover:bg-gray-200 transition-colors h-full">
            <h3 className="text-lg font-semibold">Rebel NPCs</h3>
            <p className="text-gray-700">Characters fighting against Imperial control</p>
          </Card>
        </Link>
        
        <Link href="/regents" className="no-underline">
          <Card body className="bg-gray-100 hover:bg-gray-200 transition-colors h-full">
            <h3 className="text-lg font-semibold">Regents</h3>
            <p className="text-gray-700">Powerful rulers and influential leaders</p>
          </Card>
        </Link>
        
        <Link href="/creatures" className="no-underline">
          <Card body className="bg-gray-100 hover:bg-gray-200 transition-colors h-full">
            <h3 className="text-lg font-semibold">Creatures</h3>
            <p className="text-gray-700">Beasts and monsters that roam the lands</p>
          </Card>
        </Link>
        
        <Link href="/maps" className="no-underline">
          <Card body className="bg-gray-100 hover:bg-gray-200 transition-colors h-full">
            <h3 className="text-lg font-semibold">Maps</h3>
            <p className="text-gray-700">Interactive battle and world maps</p>
          </Card>
        </Link>
      </div>
    </div>
  );
}
