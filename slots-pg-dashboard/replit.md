# Slots Management System

## Overview

A modern full-stack application for managing and displaying slot machine information with real-time updates. The system features a public dashboard showing "hot" slot machines and their payout percentages, along with an admin panel for managing slot data. Built with React, Express.js, and PostgreSQL, styled with Tailwind CSS and shadcn/ui components.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Build Tool**: Vite for fast development and optimized builds
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Storage**: Memory-based storage with interface for future database integration
- **API**: RESTful API endpoints for slot management

### UI Components
- **Component Library**: shadcn/ui based on Radix UI primitives
- **Design System**: "New York" style with neutral color scheme
- **Theming**: CSS variables for consistent styling
- **Responsive Design**: Mobile-first approach with Tailwind utilities

## Key Components

### Database Schema
```typescript
// Slots table structure
slots: {
  id: serial primary key
  nome: text (slot name)
  categoria: text (category)
  imagem: text (image URL)
  porcentagem: integer (payout percentage)
  jogadores: integer (active players)
  ativo: boolean (active status)
}

// Users table for future authentication
users: {
  id: serial primary key
  username: text unique
  password: text
}
```

### API Endpoints
- `GET /api/slots` - Retrieve all slots
- `GET /api/slots/:id` - Get specific slot by ID
- `POST /api/slots` - Create new slot
- `PUT /api/slots/:id` - Update existing slot
- `DELETE /api/slots/:id` - Delete slot

### Frontend Pages
- **Dashboard** (`/`) - Public view showing slot cards with real-time data
- **Admin Panel** (`/admin`) - Management interface for CRUD operations
- **404 Handler** - Fallback for undefined routes

## Data Flow

1. **Client Requests**: React components use TanStack Query for data fetching
2. **API Layer**: Express.js handles HTTP requests and validates data with Zod
3. **Storage Layer**: Memory storage implements IStorage interface for data persistence
4. **Real-time Updates**: Automatic data refresh every 5-10 seconds on frontend
5. **Form Validation**: Client-side validation with React Hook Form + Zod schemas

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form
- **Backend**: Express.js, Node.js with TypeScript support
- **Database**: Drizzle ORM with PostgreSQL dialect, Neon Database serverless
- **Validation**: Zod for schema validation and type safety

### UI and Styling
- **Component Library**: Complete shadcn/ui component set (40+ components)
- **Styling**: Tailwind CSS with PostCSS and Autoprefixer
- **Icons**: Lucide React icon library
- **Utilities**: clsx, class-variance-authority for conditional styling

### Development Tools
- **Build Tools**: Vite with React plugin, esbuild for production builds
- **TypeScript**: Full TypeScript support with strict configuration
- **Database Tools**: Drizzle Kit for migrations and schema management

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: esbuild bundles server code to `dist/index.js`
3. **Database Setup**: Drizzle migrations handle schema deployment

### Environment Configuration
- **Development**: `npm run dev` - uses tsx for hot reloading
- **Production**: `npm run build && npm start` - serves optimized bundle
- **Database**: PostgreSQL connection via `DATABASE_URL` environment variable

### Deployment Requirements
- Node.js runtime with ES module support
- PostgreSQL database (configured for Neon serverless)
- Environment variables for database connection
- Static file serving for built React application

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- July 02, 2025. Initial setup