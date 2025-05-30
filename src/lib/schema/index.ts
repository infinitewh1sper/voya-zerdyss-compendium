import { z } from 'zod';

export const CardSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  type: z.string().min(1),           // e.g. "Humanoid", "Beast"
  habitat: z.string(),
  category: z.enum(['Imperial', 'Rebel', 'Regent', 'Creature']),
  tier: z.number().int().min(0).max(10),
  hp: z.number().int().min(0),
  attack: z.number().int().min(0),
  defense: z.number().int().min(0),
  rawDamage: z.number().int().min(0),
  evasion: z.number().int().min(0),
  shield: z.number().int().min(0),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
  gmNotes: z.string().optional(),    // GM-only viewable notes
  createdAt: z.date(),
  updatedAt: z.date()
});

export type Card = z.infer<typeof CardSchema>;

export const MapPinSchema = z.object({
  id: z.string().uuid(),
  mapId: z.string().uuid(),
  cardId: z.string().uuid().optional(),
  label: z.string().optional(),
  x: z.number().min(0).max(100),     // Percentage-based X coordinate
  y: z.number().min(0).max(100),     // Percentage-based Y coordinate
  gmNotes: z.string().optional(),    // GM-only viewable notes
  createdAt: z.date(),
  updatedAt: z.date()
});

export type MapPin = z.infer<typeof MapPinSchema>;

export const MapSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().optional(),
  imageUrl: z.string().url(),
  gmNotes: z.string().optional(),    // GM-only viewable notes
  createdAt: z.date(),
  updatedAt: z.date()
});

export type Map = z.infer<typeof MapSchema>;
