import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <Navbar dark className="bg-dark">
      <NavbarBrand href="/" className="ms-3">Voya Zerdyss Compendium</NavbarBrand>
      <Nav className="me-auto" navbar>
        <NavItem>
          <Link href="/" passHref legacyBehavior>
            <NavLink active={isActive('/')}>Home</NavLink>
          </Link>
        </NavItem>
        <NavItem>
          <Link href="/imperial-npc" passHref legacyBehavior>
            <NavLink active={isActive('/imperial-npc')}>Imperial NPC</NavLink>
          </Link>
        </NavItem>
        <NavItem>
          <Link href="/rebel-npc" passHref legacyBehavior>
            <NavLink active={isActive('/rebel-npc')}>Rebel NPC</NavLink>
          </Link>
        </NavItem>
        <NavItem>
          <Link href="/regents" passHref legacyBehavior>
            <NavLink active={isActive('/regents')}>Regents</NavLink>
          </Link>
        </NavItem>
        <NavItem>
          <Link href="/creatures" passHref legacyBehavior>
            <NavLink active={isActive('/creatures')}>Creatures</NavLink>
          </Link>
        </NavItem>
        <NavItem>
          <Link href="/maps" passHref legacyBehavior>
            <NavLink active={isActive('/maps')}>Maps</NavLink>
          </Link>
        </NavItem>
      </Nav>
    </Navbar>
  );
}
