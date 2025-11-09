# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Must be following

- **CRITICAL**: Always respond in Korean.
- **CRITICAL**: Remove unused imports when creating or modifying files.

## Project Overview

This is a **monorepo blog project** ("nihilog") built with pnpm workspaces containing:

- **API**: NestJS backend (port 8000) with Fastify adapter
- **UI**: Next.js 15 frontend (port 3000) with App Router and React 19
- **Packages**: Shared packages for database, schemas, and response codes

## Development Commands

### Root Level Commands

```bash
# Install dependencies for all workspaces
pnpm install

# Convenience scripts for development
pnpm api:dev              # Start API dev server
pnpm ui:dev               # Start UI dev server

# Dependency updates
pnpm api:ncu              # Check API outdated packages
pnpm api:ncu:update       # Update API packages
pnpm ui:ncu               # Check UI outdated packages
pnpm ui:ncu:update        # Update UI packages

# Database operations (via @nihilog/db package)
pnpm db:generate          # Generate Prisma client
pnpm db:migrate           # Run development migrations
pnpm db:migrate:deploy    # Deploy migrations to production
pnpm db:studio            # Open Prisma Studio
pnpm db:format            # Format Prisma schema

# Package building (shared packages)
pnpm schemas:build        # Build @nihilog/schemas package
pnpm code:build           # Build @nihilog/code package

# Run commands in specific workspace
pnpm --filter api <command>
pnpm --filter ui <command>
pnpm --filter @nihilog/db <command>
pnpm --filter @nihilog/schemas <command>
pnpm --filter @nihilog/code <command>
```

### API (NestJS Backend)

```bash
# Development server (port 8000)
pnpm --filter api dev

# Build
pnpm --filter api build

# Production server
pnpm --filter api start:prod

# Linting
pnpm --filter api lint
pnpm --filter api lint:fix

# Database operations (delegates to @nihilog/db)
pnpm --filter api db:generate  # Generate Prisma client
pnpm --filter api db:migrate   # Run migrations
pnpm --filter api db:studio    # Open Prisma Studio
```

### UI (Next.js Frontend)

```bash
# Development server with Turbopack (port 3000)
pnpm --filter ui dev

# Build
pnpm --filter ui build

# Start production server
pnpm --filter ui start

# Vercel build
pnpm --filter ui vercel:build

# Linting
pnpm --filter ui lint
pnpm --filter ui lint:fix

# Clean build cache
pnpm --filter ui build:remove
```

## Architecture Overview

### Monorepo Structure

```
├── apps/
│   ├── api/           # NestJS backend
│   └── ui/            # Next.js frontend
├── packages/
│   ├── db/            # @nihilog/db - Prisma schema and client
│   ├── schemas/       # @nihilog/schemas - Zod validation schemas
│   └── code/          # @nihilog/code - Response/message codes
├── package.json       # Root workspace config
└── pnpm-workspace.yaml
```

### API Architecture (NestJS)

- **Framework**: NestJS with Fastify adapter
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with cookie-based sessions
- **Validation**: Zod schemas with NestJS pipes
- **Documentation**: Swagger API docs at `/api`

Key modules:

- `AuthModule`: JWT authentication, login, registration
- `UsersModule`: User management and profiles
- `AdminModule`: Administrative functionality
- `PrismaModule`: Global database connection and schema

### UI Architecture (Next.js)

- **Framework**: Next.js 15 with App Router and React 19
- **Styling**: TailwindCSS v4 (CSS-in-JS) + shadcn/ui components
- **State Management**: TanStack Query (server) + Zustand (client)
- **Forms**: React Hook Form + Zod validation
- **Authentication**: JWT with automatic token refresh

Route groups:

- `(auth)/`: Authentication pages
- `(profile)/`: User profile management
- `(admin)/`: Admin functionality
- `(common)/`: Shared layouts and components

### Shared Packages Architecture

#### @nihilog/db
- **Purpose**: Centralized Prisma schema and generated client
- **Location**: `packages/db/`
- **Schema File**: `packages/db/prisma/schema.prisma`
- **Output**: Generated client in `packages/db/output/`
- **Database**: PostgreSQL
- **Tables**: User info, posts, categories, tags, comments
- **Enums**: User roles, post status, Y/N flags
- **Usage**: Imported by API as `@nihilog/db`

#### @nihilog/schemas
- **Purpose**: Shared Zod validation schemas
- **Location**: `packages/schemas/`
- **Build Tool**: tsup (ESM + CJS outputs)
- **Dependencies**: Uses `@nihilog/db` and `@nihilog/code`
- **Integration**: Zod-to-OpenAPI for Swagger documentation
- **Usage**: Imported by both API and UI

#### @nihilog/code
- **Purpose**: Shared response/message codes and constants
- **Location**: `packages/code/`
- **Build Tool**: tsup (ESM + CJS outputs)
- **Usage**: Imported by API, UI, and schemas package

## Development Workflow

### Common Tasks

1. **Start development servers**:

   ```bash
   # Terminal 1 - API
   pnpm --filter api dev

   # Terminal 2 - UI
   pnpm --filter ui dev
   ```

2. **Database changes**:

   ```bash
   # Modify schema file: packages/db/prisma/schema.prisma
   pnpm db:generate          # Generate Prisma client
   pnpm db:migrate           # Create and apply migration
   ```

3. **Add new dependencies**:

   ```bash
   # API dependencies
   pnpm --filter api add <package>

   # UI dependencies
   pnpm --filter ui add <package>

   # Shared package dependencies
   pnpm --filter @nihilog/db add <package>
   pnpm --filter @nihilog/schemas add <package>
   pnpm --filter @nihilog/code add <package>
   ```

4. **Building shared packages**:

   ```bash
   # After modifying schemas or code packages
   pnpm schemas:build        # Build Zod schemas
   pnpm code:build           # Build response codes

   # Or build from package directory
   pnpm --filter @nihilog/schemas build
   pnpm --filter @nihilog/code build
   ```

### Code Conventions

- **API**: Modular NestJS structure with repositories, services, controllers
- **UI**: App Router with route groups and component co-location
- **Shared Packages**: pnpm workspace protocol (`workspace:*`) for internal dependencies
- **TypeScript**: Strict mode enabled across all packages
- **Database**: Prisma schema-first approach with centralized schema in `@nihilog/db`
- **Validation**: Zod schemas centralized in `@nihilog/schemas` for reuse
- **Build Tools**: tsup for package building (ESM + CJS dual output)

## UI Development Rules

### React Component Rules

- **CRITICAL**: Components must use function declarations, NOT arrow functions
- **CRITICAL**: All custom components (except shadcn/ui) must use CVA (class-variance-authority) structure
- **CRITICAL**: Component names must be PascalCase
- Component file name and component name must match
- Event handler naming: `on<Event><Target>` format (e.g., `onClickButton`, `onSubmitForm`)

Example CVA structure:

```typescript
const cssVariants = cva(["flex flex-col gap-2"], {
  variants: {},
  defaultVariants: {},
  compoundVariants: [],
});
```

### TailwindCSS v4 Custom Rules

This project uses TailwindCSS v4 with extensive customizations:

#### Color System (OKLCH)
- All colors use OKLCH color space defined in `apps/ui/app/_styles/colors.css`
- Dark mode support via CSS variables
- Class names: `bg-red-500`, `text-blue-600`, `border-gray-200`

#### Custom Utilities

**DVH/DVW Units** (mobile viewport support):
- Class names: `h-dvh-100`, `w-dvw-50`
- Better than vh/vw for mobile browsers

**Extended Border Radius**:
- Custom radius values: `rounded-0`, `rounded-px`, `rounded-1` through `rounded-120`
- More granular control than default Tailwind

**Custom Variants**:
- `first:mt-0`, `last:mb-0`: First/last element selectors
- `hocus:bg-primary`: Hover and focus combined
- `nth-1:block`, `nth-2:hidden`: nth-child selectors
- `nth-last-1:border-t`: nth-last-child selectors

#### Font System
- Default: 'Noto Sans KR' (Korean optimized)
- Code: 'Cascadia Code' - class `font-code`
- Icons: 'Font Awesome 5 Free' - class `font-fa`

#### Text Size Custom
- `text-xs`: 0.8rem
- `text-sm`: 1rem
- `text-md`: 1.2rem
- `text-lg`: 1.4rem
- `text-h1` through `text-h6`: Heading sizes

**Important**: Do NOT use default Tailwind classes for colors, radius, or fonts. Use the custom OKLCH palette and utilities defined in `apps/ui/app/_styles/`.

### Import Organization

Always organize imports in this order:

```typescript
// 1. External libraries (alphabetical)
import { NextResponse } from "next/server";
import { create } from "zustand";

// 2. Internal utilities and config
import { siteConfig } from "@/_config/config";

// 3. Domain entities
import { useAuth } from "@/_entities/auth";

// 4. Components (UI first, then custom)
import { Button } from "@/(common)/_components/ui/button";
import { CustomComponent } from "@/(common)/_components/CustomComponent";
```

## Important Notes

- **Ports**: API (8000), UI (3000)
- **Package Manager**: pnpm only (enforced by workspace)
- **Workspace Configuration**: Uses `onlyBuiltDependencies` for native modules
- **Detailed Guidance**: Both apps have independent CLAUDE.md files
- **Shared Packages**: Must build schemas/code packages after modifications
- **Database**: Centralized in `@nihilog/db`, no longer in individual apps
- **Development**: Run both API and UI servers simultaneously for full stack development

## Testing and Quality

Always run linting before committing:

```bash
pnpm --filter api lint
pnpm --filter ui lint
```

Database migrations should be generated and tested before deployment:

```bash
pnpm db:generate           # Generate Prisma client after schema changes
pnpm db:migrate            # Create and apply development migrations
pnpm db:migrate:deploy     # Deploy migrations to production
```

Shared packages should be rebuilt after modifications:

```bash
pnpm schemas:build         # After modifying Zod schemas
pnpm code:build            # After modifying response codes
```
