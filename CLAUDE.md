# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Must be following

- **CRITICAL**: Always respond in Korean.

## Project Overview

This is a **monorepo blog project** ("nihilog") built with pnpm workspaces containing:

- **API**: NestJS backend with Drizzle ORM and PostgreSQL
- **UI**: Next.js 15 frontend with App Router and React 19

## Development Commands

### Root Level Commands

```bash
# Install dependencies for all workspaces
pnpm install

# Run commands in specific workspace
pnpm --filter api <command>
pnpm --filter ui <command>
```

### API (NestJS Backend)

```bash
# Development server
pnpm --filter api dev

# Build
pnpm --filter api build

# Production server
pnpm --filter api start:prod

# Linting
pnpm --filter api lint
pnpm --filter api lint:fix

# Database operations
pnpm --filter api db:generate  # Generate Drizzle migrations
pnpm --filter api db:migrate   # Run migrations
pnpm --filter api db:studio    # Open Drizzle Studio
```

### UI (Next.js Frontend)

```bash
# Development server with Turbopack
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
├── package.json       # Root workspace config
└── pnpm-workspace.yaml
```

### API Architecture (NestJS)

- **Framework**: NestJS with Fastify adapter
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: JWT with cookie-based sessions
- **Validation**: Zod schemas with NestJS pipes
- **Documentation**: Swagger API docs at `/api`

Key modules:

- `AuthModule`: JWT authentication, login, registration
- `UsersModule`: User management and profiles
- `AdminModule`: Administrative functionality
- `DrizzleModule`: Database connection and schema

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

### Database Schema

- **ORM**: Drizzle ORM with PostgreSQL
- **Tables**: User info, posts, categories, tags
- **Enums**: User roles, post status, Y/N flags
- **Schema Location**: `apps/api/src/endpoints/drizzle/`
- **Global Module**: `DrizzleModule` provides `DRIZZLE` symbol for dependency injection
- **Connection**: Uses pg Pool with connection string from ConfigService

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
   # Modify schema files in apps/api/src/endpoints/drizzle/tables/
   pnpm --filter api db:generate
   pnpm --filter api db:migrate
   ```

3. **Add new dependencies**:

   ```bash
   # API dependencies
   pnpm --filter api add <package>

   # UI dependencies
   pnpm --filter ui add <package>
   ```

### Code Conventions

- **API**: Modular NestJS structure with repositories, services, controllers
- **UI**: App Router with route groups and component co-location
- **Shared**: TypeScript strict mode, ESLint with stylistic rules
- **Database**: Drizzle schema-first approach with type safety

### Important Notes

- API runs on port 8000 (default)
- UI runs on port 3000 with Turbopack
- Both apps have independent CLAUDE.md files with detailed guidance
- Use pnpm for all package management operations
- Each app has its own linting and build configuration

## Testing and Quality

Always run linting before committing:

```bash
pnpm --filter api lint
pnpm --filter ui lint
```

Database migrations should be generated and tested before deployment:

```bash
pnpm --filter api db:generate
pnpm --filter api db:migrate
```
