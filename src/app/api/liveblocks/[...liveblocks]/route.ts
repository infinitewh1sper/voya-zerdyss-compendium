import { Liveblocks } from '@liveblocks/node';
import { NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs';

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY || '',
});

export async function POST(request: NextRequest) {
  // Get the current user from Clerk
  const { userId } = auth();
  
  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Get the current user's metadata from your database
  // For now, we'll use a simple role assignment
  const userInfo = {
    id: userId,
    name: 'User', // In a real app, fetch this from Clerk or your database
    role: 'Player', // Default role, in a real app determine this from your database
  };

  // Create a session based on the current user
  const session = liveblocks.prepareSession(
    userId,
    { userInfo }
  );

  // Give the user access to the rooms they need
  const { room } = await request.json();
  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }

  // Return the session
  const { status, body } = await session.authorize();
  return new Response(body, { status });
}
