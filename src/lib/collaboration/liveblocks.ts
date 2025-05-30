import { createClient } from '@liveblocks/client';
import { createRoomContext } from '@liveblocks/react';
import { Card, MapPin } from '../schema';

// Define the shape of our Liveblocks room
type Presence = {
  cursor: { x: number; y: number } | null;
  isTyping: boolean;
};

type Storage = {
  cards: LiveMap<string, Card>;
  pins: LiveMap<string, MapPin>;
};

type UserMeta = {
  id: string;
  name: string;
  role: 'GM' | 'Player';
  picture?: string;
};

type RoomEvent = {
  type: 'pointerPing';
  position: { x: number; y: number };
};

export const client = createClient({
  publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY || '',
  throttle: 100,
});

export const {
  suspense: {
    RoomProvider,
    useRoom,
    useMyPresence,
    useUpdateMyPresence,
    useOthers,
    useOthersMapped,
    useOthersConnectionIds,
    useOther,
    useSelf,
    useStorage,
    useMutation,
    useHistory,
    useBatch,
    useStatus,
    useCanUndo,
    useCanRedo,
    useUndo,
    useRedo,
  },
  RoomProvider: RoomProviderWithoutSuspense,
  useRoom: useRoomWithoutSuspense,
  useMyPresence: useMyPresenceWithoutSuspense,
  useUpdateMyPresence: useUpdateMyPresenceWithoutSuspense,
  useOthers: useOthersWithoutSuspense,
  useOthersMapped: useOthersMappedWithoutSuspense,
  useOthersConnectionIds: useOthersConnectionIdsWithoutSuspense,
  useOther: useOtherWithoutSuspense,
  useSelf: useSelfWithoutSuspense,
  useStorage: useStorageWithoutSuspense,
  useMutation: useMutationWithoutSuspense,
  useHistory: useHistoryWithoutSuspense,
  useBatch: useBatchWithoutSuspense,
  useStatus: useStatusWithoutSuspense,
  useCanUndo: useCanUndoWithoutSuspense,
  useCanRedo: useCanRedoWithoutSuspense,
  useUndo: useUndoWithoutSuspense,
  useRedo: useRedoWithoutSuspense,
  useRoomEvent,
  useBroadcastEvent,
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent>(client);
