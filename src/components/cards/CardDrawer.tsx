import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { Card as CardType } from '@/lib/schema';
import RoleGuard from '@/components/auth/RoleGuard';
import CardForm from './CardForm';

interface CardDrawerProps {
  isOpen: boolean;
  toggle: () => void;
  card: Partial<CardType> | null;
  onSave?: (card: Partial<CardType>) => void;
  onDelete?: (cardId: string) => void;
}

export default function CardDrawer({ isOpen, toggle, card, onSave, onDelete }: CardDrawerProps) {
  const [activeTab, setActiveTab] = useState('details');
  
  if (!card) return null;
  
  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg" className="drawer-modal">
      <ModalHeader toggle={toggle}>
        {card.name || 'Card Details'}
      </ModalHeader>
      <ModalBody>
        <Nav tabs className="mb-4">
          <NavItem>
            <NavLink
              className={`cursor-pointer ${activeTab === 'details' ? 'active' : ''}`}
              onClick={() => setActiveTab('details')}
            >
              Details
            </NavLink>
          </NavItem>
          <RoleGuard gmOnly>
            <NavItem>
              <NavLink
                className={`cursor-pointer ${activeTab === 'edit' ? 'active' : ''}`}
                onClick={() => setActiveTab('edit')}
              >
                Edit
              </NavLink>
            </NavItem>
          </RoleGuard>
        </Nav>
        
        <TabContent activeTab={activeTab}>
          <TabPane tabId="details">
            <div className="flex flex-col md:flex-row gap-6">
              {card.imageUrl && (
                <div className="md:w-1/3">
                  <img 
                    src={card.imageUrl} 
                    alt={card.name} 
                    className="w-full rounded-lg"
                  />
                </div>
              )}
              
              <div className={card.imageUrl ? 'md:w-2/3' : 'w-full'}>
                <h2 className="text-2xl font-bold mb-2">{card.name}</h2>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                  <div>
                    <span className="text-gray-600">Type:</span> {card.type}
                  </div>
                  <div>
                    <span className="text-gray-600">Habitat:</span> {card.habitat}
                  </div>
                  <div>
                    <span className="text-gray-600">Tier:</span> {card.tier}
                  </div>
                  <div>
                    <span className="text-gray-600">HP:</span> {card.hp}
                  </div>
                  <div>
                    <span className="text-gray-600">Attack:</span> {card.attack}
                  </div>
                  <div>
                    <span className="text-gray-600">Defense:</span> {card.defense}
                  </div>
                  <div>
                    <span className="text-gray-600">Raw Damage:</span> {card.rawDamage}
                  </div>
                  <div>
                    <span className="text-gray-600">Evasion:</span> {card.evasion}
                  </div>
                  <div>
                    <span className="text-gray-600">Shield:</span> {card.shield}
                  </div>
                </div>
                
                {card.description && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-1">Description</h3>
                    <p className="text-gray-700">{card.description}</p>
                  </div>
                )}
                
                <RoleGuard gmOnly>
                  {card.gmNotes && (
                    <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                      <h3 className="text-lg font-semibold mb-1">GM Notes</h3>
                      <p className="text-gray-700">{card.gmNotes}</p>
                    </div>
                  )}
                </RoleGuard>
              </div>
            </div>
          </TabPane>
          
          <TabPane tabId="edit">
            <RoleGuard gmOnly>
              <CardForm 
                initialValues={card} 
                onSubmit={(values) => {
                  onSave && onSave(values);
                  setActiveTab('details');
                }}
              />
            </RoleGuard>
          </TabPane>
        </TabContent>
      </ModalBody>
      
      <ModalFooter>
        <RoleGuard gmOnly>
          {activeTab === 'details' && card.id && (
            <Button 
              color="danger" 
              outline
              onClick={() => onDelete && onDelete(card.id as string)}
            >
              Delete
            </Button>
          )}
        </RoleGuard>
        <Button color="secondary" onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>
  );
}
