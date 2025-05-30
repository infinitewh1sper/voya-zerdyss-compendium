import AppLayout from '@/components/layout/AppLayout';
import ClerkAuthProvider from '@/components/auth/ClerkProvider';
import { RoomProvider } from '@/lib/collaboration/liveblocks';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Voya Zerdyss Compendium',
  description: 'A collaborative compendium for the world of Voya Zerdyss',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkAuthProvider>
          <RoomProvider id="voya-zerdyss-main" initialPresence={{ cursor: null, isTyping: false }}>
            <AppLayout>
              {children}
            </AppLayout>
          </RoomProvider>
        </ClerkAuthProvider>
      </body>
    </html>
  );
}
