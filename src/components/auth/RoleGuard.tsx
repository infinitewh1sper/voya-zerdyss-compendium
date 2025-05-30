import { ReactNode } from 'react';
import { useUser } from '@clerk/nextjs';

interface RoleGuardProps {
  children: ReactNode;
  gmOnly?: boolean;
}

export default function RoleGuard({ children, gmOnly = false }: RoleGuardProps) {
  const { user, isLoaded } = useUser();
  
  // If not loaded yet, show nothing
  if (!isLoaded) return null;
  
  // If this component is for GM-only content
  if (gmOnly) {
    // Check if user has GM role tag
    const isGM = user?.publicMetadata?.role === 'GM';
    
    // Only render children if user is a GM
    return isGM ? <>{children}</> : null;
  }
  
  // For non-GM-only content, just render children
  return <>{children}</>;
}
