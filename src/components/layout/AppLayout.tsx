import { ReactNode } from 'react';
import Navigation from './Navbar';
import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <Container className="flex-grow py-4">
        {children}
      </Container>
      <footer className="bg-dark text-white p-3 text-center">
        <small>© {new Date().getFullYear()} Voya Zerdyss Compendium</small>
      </footer>
    </div>
  );
}
