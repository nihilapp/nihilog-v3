**CRITICAL: 반드시 한국어로 답해야 합니다.**

# Gemini Code-Context: NestJS API for "nihilog" Blog

This document provides a comprehensive overview of the NestJS API project for the "nihilog" blog, designed to give Gemini a deep understanding of the codebase for effective assistance.

## 1. Project Overview

This project is the backend REST API for a full-stack blog application named "nihilog". It is built with NestJS and TypeScript, utilizing a modern technology stack to provide a robust, secure, and scalable API.

### Key Technologies

- **Framework**: NestJS 11 on top of Fastify for high performance.
- **Language**: TypeScript
- **Database**: PostgreSQL, managed with Drizzle ORM for type-safe database queries.
- **Authentication**: JWT-based authentication with tokens stored in secure cookies.
- **API Documentation**: Swagger (OpenAPI) is used for automatic API documentation generation.
- **Validation**: Zod, integrated via `nestjs-zod`, for strict and type-safe request validation.
- **Configuration**: Environment-specific settings are managed through a `config.yaml` file.

### Architecture

The project follows a modular, feature-based architecture, which is a standard convention in NestJS development.

- **`src/endpoints`**: This is the core directory containing the application's features, such as `auth`, `users`, `posts`, and `admin`. Each feature is encapsulated within its own NestJS module.
- **Layered Structure**: Within each feature module, a clear separation of concerns is maintained using Controllers (handling HTTP requests), Services (containing business logic), and Repositories (abstracting data access).
- **`src/endpoints/drizzle`**: This directory contains all database-related logic, including Drizzle ORM schemas (`tables/`), enums, and the main service for database connection.
- **`src/dto`**: Data Transfer Objects are defined here to structure the data for API requests and responses.
- **`src/repositories`**: The repository pattern is used to decouple business logic from the database implementation. These classes contain the Drizzle ORM queries.
- **`src/conf`**: Handles the loading and parsing of the `config.yaml` file.

## 2. Building and Running the Project

The project uses `pnpm` as its package manager.

### Key Commands

- **Install Dependencies**:
  ```bash
  pnpm install
  ```

- **Run in Development Mode**: Starts the server with hot-reloading.
  ```bash
  pnpm run dev
  ```

- **Build for Production**: Compiles the TypeScript code into JavaScript in the `dist` directory.
  ```bash
  pnpm run build
  ```

- **Run in Production Mode**: Starts the server from the compiled code.
  ```bash
  pnpm run start:prod
  ```

- **Linting**: Check for code style and potential errors.
  ```bash
  pnpm run lint
  ```

- **Database Migrations**:
  - To generate a new migration based on schema changes:
    ```bash
    pnpm run db:generate
    ```
  - To apply pending migrations to the database:
    ```bash
    pnpm run db:migrate
    ```

### Configuration

1.  Copy `config.example.yaml` to `config.yaml`.
2.  Update the values in `config.yaml`, especially the `database`, `jwt`, and `nodemailer` sections, with your local or production settings.

## 3. Development Conventions

- **Modularity**: All new features should be created as separate modules within the `src/endpoints` directory to maintain a clean and organized structure.
- **File Naming**: Files are named according to their function, following NestJS conventions (e.g., `posts.controller.ts`, `posts.service.ts`, `posts.module.ts`).
- **Authentication**: Endpoints are secured using guards. Use `@UseGuards(JwtAuthGuard)` for general authenticated routes and `@UseGuards(AdminAuthGuard)` for admin-only routes.
- **Database Interaction**: All database queries must go through the repository layer (`src/repositories`). Avoid calling Drizzle ORM functions directly from services or controllers.
- **Validation**: Use Zod schemas within DTO files (`src/dto`) to define the shape of request bodies and parameters. The `ZodValidationPipe` is applied globally.
- **API Responses**: The `UnifiedResponseInterceptor` wraps all successful responses in a consistent JSON structure. Custom error responses can be created using the helpers in `src/utils`.
- **Code Style**: The project uses ESLint with a predefined configuration (`eslint.config.mjs`) to enforce a consistent code style. Please adhere to these rules.