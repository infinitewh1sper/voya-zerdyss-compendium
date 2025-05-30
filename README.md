# Voya Zerdyss Compendium

A collaborative web application for managing NPCs, creatures, and maps for the Voya Zerdyss world.

## Features

- Collaborative editing with real-time updates using Liveblocks
- Interactive maps with custom pins and pinging
- Role-based access control (GM/Player)
- Image uploads via Cloudinary
- Full-text search across all entities
- Offline support
- Chat box with GPT integration for rulebook queries

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **UI**: ReactStrap (Bootstrap 5) + Tailwind CSS
- **State & Data**: TypeScript, Zod for schema validation
- **Collaboration**: Liveblocks (with Yjs as optional alternative)
- **Map**: Leaflet (react-leaflet)
- **Auth**: Clerk
- **Storage**: PostgreSQL (via Prisma ORM), Cloudinary for images
- **Linting**: ESLint, Prettier, Husky
- **Testing**: Vitest + React Testing Library
- **CI/CD**: GitHub Actions → Vercel

## Local Development

### Prerequisites

- Node.js 18+
- PostgreSQL
- Clerk account
- Liveblocks account
- Cloudinary account

### Setup

1. Clone the repository:
   ```
   git clone https://github.com/infinitewh1sper/voya-zerdyss-compendium.git
   cd voya-zerdyss-compendium
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   ```
   cp .env.example .env.local
   ```
   Fill in the required values in `.env.local`

4. Set up the database:
   ```
   npx prisma migrate dev
   npx prisma db seed
   ```

5. Start the development server:
   ```
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

The project follows a feature-based structure within the Next.js App Router pattern:

- `src/app/`: Next.js App Router pages and API routes
- `src/components/`: React components organized by feature
- `src/lib/`: Utility functions, schemas, and configuration
- `prisma/`: Database schema and migrations
- `public/`: Static assets
- `styles/`: Global styles and Tailwind configuration

## Deployment

The application is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Set up the required environment variables
3. Deploy!

## License

[MIT](LICENSE)
