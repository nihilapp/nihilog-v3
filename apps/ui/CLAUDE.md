# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**CRITICAL** All responses must be in Korean.

## 🛠 Development Commands

### Essential Commands

```bash
# Development server with Turbopack
pnpm dev

# Production build
pnpm build

# Start production server (builds first)
pnpm start

# Vercel-specific build
pnpm vercel:build

# Clean build cache and node_modules
pnpm build:remove

# Package manager cleanup
pnpm clean

# Linting
pnpm lint
pnpm lint:fix
```

### Key Development Notes

- Use `pnpm` for all package management operations
- Development server runs on port 3000 with Turbopack for fast builds
- Build artifacts are stored in `build/` directory (not `.next/`)
- ESLint and TypeScript errors are ignored during builds (configured for development flexibility)

## 🏗 Architecture Overview

### Tech Stack

- **Next.js 15.5.3** with App Router and React 19
- **TailwindCSS v4** (CSS-in-JS, no config file)
- **TypeScript 5.9.2** with strict configuration
- **TanStack React Query 5.89.0** for server state
- **Zustand 5.0.8** for client state
- **React Hook Form 7.62.0** + Zod 4.1.8 for forms
- **Radix UI** components with shadcn/ui styling
- **Styled Components** for CSS-in-JS

### Project Structure

```
app/
├── (auth)/              # Authentication route group
├── (profile)/           # User profile route group
├── (users)/             # User management route group
├── (admin)/             # Admin functionality route group
├── (common)/            # Common/shared route group
├── _code/               # Status codes and constants
├── _config/             # Application configuration
├── _data/               # Static data exports
├── _entities/           # Domain business logic
│   ├── admin/           # Admin-related logic
│   ├── auth/            # Authentication logic
│   ├── common/          # Shared utilities
│   └── users/           # User management logic
├── _icons/              # Custom icon components
├── _layouts/            # Global layout components
├── _libs/               # Utility libraries
├── _schemas/            # Zod validation schemas
└── _styles/             # TailwindCSS and global styles
```

### Entity Structure Pattern

Each domain in `_entities/` follows this pattern:

- `index.ts` - Main exports
- `[entity].api.ts` - API layer functions
- `[entity].store.ts` - Zustand state management
- `[entity].keys.ts` - React Query key factory
- `[entity].types.ts` - TypeScript interfaces
- `hooks/` - Custom React hooks

### Component Organization

- Route-specific components: `(group)/route/_components/`
- Shared components: `(common)/_components/`
- UI components: `(common)/_components/ui/` (shadcn/ui)
- Layout components: `(group)/_layouts/`
- All component folders require `index.ts` with explicit exports

## 🎯 Development Guidelines

### Code Style and Structure

- Use Korean for all user-facing text and error messages
- File naming: kebab-case (e.g., `user-profile.ts`)
- Component files: PascalCase (e.g., `UserCard.tsx`)
- Folder naming: kebab-case
- Import path `@/` maps to `app/` directory

### React/Next.js Patterns

- Server components by default (no `use client` in page.tsx)
- All pages require metadata with title and url
- Dynamic routes use `generateMetadata` function
- Page parameters are Promise type: `params: Promise<{id: string}>`
- Use `export default` only in page.tsx files
- Component exports: `export { Component } from './Component'`

### State Management

- **Server state**: TanStack React Query with key factories
- **Client state**: Zustand with Immer middleware
- **Forms**: React Hook Form with Zod validation
- **UI state**: Local component state or Zustand

### Styling System

- **TailwindCSS v4** with CSS-in-JS (no config file)
- **shadcn/ui** components in `(common)/_components/ui/`
- **class-variance-authority** for custom component variants
- **Styled Components** for complex styling needs
- Custom CSS in `_styles/` with CSS variables

### Authentication & Middleware

- JWT-based authentication with refresh tokens
- Middleware handles automatic token refresh
- Protected routes redirect to `/auth/signin`
- Public paths: `/auth/*` routes
- Cookie-based session management

### Import Organization

```typescript
// External libraries (alphabetical)
import { NextResponse } from "next/server";
import { create } from "zustand";

// Internal utilities and config
import { siteConfig } from "@/_config/config";

// Domain entities
import { useAuth } from "@/_entities/auth";

// Components (UI first, then custom)
import { Button } from "@/(common)/_components/ui/button";
import { CustomComponent } from "@/(common)/_components/CustomComponent";
```

### Data Validation

- Use Zod schemas in `_schemas/` directory
- Form validation with `@hookform/resolvers/zod`
- API request/response validation
- Runtime type checking for external data

## 🔧 Configuration

### Environment Variables

Configure in `.env.local` (see `.env.local.example`):

- `NEXT_PUBLIC_SITE_*` - Site metadata
- `NEXT_PUBLIC_API_ROUTE` - API endpoint (default: http://localhost:8000)
- `NEXT_PUBLIC_AUTHOR_*` - Author information

### Key Files

- `next.config.ts` - Next.js configuration with Turbopack
- `middleware.ts` - Authentication and routing logic
- `eslint.config.js` - ESLint rules with TypeScript/React
- `tsconfig.json` - TypeScript configuration with strict rules
- `components.json` - shadcn/ui configuration

### Build Configuration

- Standalone output mode for containerization
- SVG handling via @svgr/webpack
- Image optimization with remote patterns
- ESM externals enabled
- React Strict Mode disabled for development
