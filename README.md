# Orders API - Technical Challenge

[![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)

A RESTful API for order management developed as part of a technical challenge for **Jitterbit**. This project implements core order creation and listing functionality, with additional features demonstrating software engineering best practices.

## 📋 Table of Contents
- [Orders API - Technical Challenge](#orders-api---technical-challenge)
  - [📋 Table of Contents](#-table-of-contents)
  - [🎯 Overview](#-overview)
  - [✨ Features](#-features)
    - [Core Features](#core-features)
    - [Bonus Features](#bonus-features)
  - [🛠 Tech Stack](#-tech-stack)
    - [SOLID Principles Applied](#solid-principles-applied)
  - [📋 Prerequisites](#-prerequisites)
  - [🔧 Installation](#-installation)
  - [⚙️ Configuration](#️-configuration)
  - [🚀 Running the Application](#-running-the-application)
  - [📚 API Documentation](#-api-documentation)
  - [🧪 Testing](#-testing)
  - [🖇️ Git Commit Convention](#️-git-commit-convention)
  - [📁 Project Structure](#-project-structure)
  - [🔮 Future Improvements](#-future-improvements)
  - [📫 Contact](#-contact)
  - [✍️ Note for reviewers:](#️-note-for-reviewers)

## [🎯 Overview](#-table-of-contents)

This project implements an order management system with the following core requirements:
- **Mandatory**: Create and list orders;
- **Optional**: Create, read, update and delete items, initial steps for JWT authentication, API documentation using Swagger and ScalarUI.

The solution emphasizes clean code, maintainability, and testability through the application of SOLID principles and Test-Driven Development (TDD).

## [✨ Features](#-table-of-contents)

### Core Features
- ✅ Create new orders and items;
- ✅ List all orders and items with pagination support;
- ✅ Update and delete orders and items;
- ✅ Drizzle for connection with a PostgreSQL database.

### Bonus Features
- 🚀 SOLID principles: Database can easily be updated to another ORM;
- 📊 Test-Driven Development: All functions are tested (`pnpm run test`);
- 🔒 JWT authentication implemented, can be used in future changes;
- 🐋 Dockerfile and docker-compose for orchestration.

## [🛠 Tech Stack](#-table-of-contents)

- **Runtime**: Node.js (v25.6.1)
- **Framework**: Fastify
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM/ODM**: Drizzle
- **Testing**: Vitest
- **Validation**: Zod
- **Documentation**: Swagger

### SOLID Principles Applied

- **Single Responsibility**: Each class has one well-defined purpose
- **Open/Closed**: Services are designed to be extended without modification
- **Liskov Substitution**: Interfaces ensure interchangeable implementations
- **Interface Segregation**: Focused interfaces prevent bloated dependencies
- **Dependency Inversion**: High-level modules don't depend on low-level modules

## [📋 Prerequisites](#-table-of-contents)

Before you begin, ensure you have installed:
- Node.js v25 or higher
- npm/pnpm
- Postgres
- Docker (optional)

## [🔧 Installation](#-table-of-contents)

1. Clone the repository:
```bash
git clone https://github.com/JeffsHenrique/Order-Products-Jitterbit
cd [project-name]
```

2. Install dependencies:

```bash
pnpm install
# or
yarn install
```

3. Set up environment variables:

```bash
cp .env.example .env
Edit .env with your configuration (see Configuration section)
```

4. Run migrations:

```bash
pnpm run db-migrate
# or
pnpm drizzle-kit migrate
```

5. Seed the database:

```bash
pnpm run db-seed
```

## [⚙️ Configuration](#-table-of-contents)
The application uses the following environment variables:

```bash
    NODE_ENV="dev"
    DATABASE_URL="postgresql://{USERNAME}:{PASSWORD}@localhost:{PORT}/{YOUR_DATABASE}?schema=public"
    JWT_SECRET_KEY="{SECRET_KEY}"
    COOKIE_SECRET="{SECRET_COOKIE}"
```

## [🚀 Running the Application](#-table-of-contents)

**Development mode**
```bash
pnpm run start-dev
# or
yarn dev
```

**Production mode**
```bash
pnpm run build
pnpm start:migrate
```

**Using Docker**

```bash
docker-compose up -d
```
The server will start at http://localhost:3333 (default: 3333)

## [📚 API Documentation](#-table-of-contents)

**Base URL**
```bash
http://localhost:3333/api-docs
```

## [🧪 Testing](#-table-of-contents)
This project follows TDD principles, with tests written before implementation.

Running Tests

```bash
# Run all tests
pnpm run test

# Run tests with coverage
pnpm run test:coverage

# Run tests in watch mode
pnpm run test:watch
```

## [🖇️ Git Commit Convention](#-table-of-contents)
The project follows conventional commits:
- **feat:** New feature
- **fix:** Bug fix
- **test:** Add or update tests
- **refactor:** Code change that neither fixes a bug nor adds a feature
- **docs:** Documentation only changes

## [📁 Project Structure](#-table-of-contents)
```text
├── src/
│   ├── app/                                # Application core layer - business logic and domain
│   │   ├── functions/                      # Use cases / business rules implementations
│   │   │   ├── create-order.ts             
│   │   │   └── create-order.spec.ts        
│   │   └── types/                          # Domain types, interfaces and DTOs
│   ├── env/                                # Environment variables validation and configuration
│   ├── infra/                              # Infrastructure layer - external concerns implementations
│   │   ├── db/                             # Database related code
│   │   ├── factories/                      # Factory functions for creating domain objects
│   │   ├── http/                           # HTTP layer (Fastify)
│   │   │   ├── hooks/                      # Lifecycle hooks (pre-handler, on-response, etc)
│   │   │   ├── routes/                     # API route definitions
│   │   │   │   ├── _errors/                # Error handling routes and pages
│   │   │   │   ├── health/                 # Health check endpoints
│   │   │   │   ├── links/                  # Order/Links feature routes
│   │   │   │   ├── error-handler.ts        # Global error handling middleware
│   │   │   │   └── jwt-authenticate.ts     # JWT authentication middleware/strategy
│   │   │   └── token-generator.ts          # HTTP server setup and configuration
│   │   └── repositories/                   # Data access implementations
│   │       ├── drizzle/                    # Drizzle ORM implementation of repositories
│   │       ├── in-memory/                  # In-memory implementations (useful for testing)
│   │       ├── token/                      # Token generation implementations
│   │       ├── orders-repository.ts        # Interface/abstract class for orders repository
│   │       ├── items-repository.ts         # Interface/abstract class for items repository
│   │       └── token-generator.ts          # Interface/abstract class for token generator
│   └── test/                               # Test utilities and helpers
│       └── factories/                      # Test data factories
│           ├── make-items.ts               # Factory function to create item test data
│           └── make-orders.ts              # Factory function to create order test data
├── .env.example                            # Example environment variables file (copy to .env)
├── .gitignore                              # Git ignore rules
├── .npmrc                                  # npm configuration (registry, auth, etc)
├── biome.json                              # Biome.js configuration (linting, formatting)
├── docker-compose.yml                      # Docker Compose configuration for local development
├── Dockerfile                              # Docker image definition for the application
├── drizzle.config.ts                       # Drizzle ORM configuration (database connection, migrations)
├── package.json                            # Project dependencies and scripts
├── pnpm-lock.yaml                          # Lockfile for pnpm (deterministic dependencies)
├── README.md                               # Project documentation
├── tsconfig.json                           # TypeScript compiler configuration
└── vite.config.mts                         # Vite configuration

```

## [🔮 Future Improvements](#-table-of-contents)
Given more time, I would implement:
- User Authentication
- Roles (only authenticated users can create orders; only admin users can create items)

## [📫 Contact](#-table-of-contents)

[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:henrique.cps15@gmail.com?subject=Olá%20Jeffs)-[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jeffshenrique/)-[![Website](https://camo.githubusercontent.com/6dad8f3c446fc8b0b29d885761e99330d562ca0ff6804f9f97d4308c130a8cfb/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d576562536974652d253233303033373f7374796c653d666f722d7468652d6261646765266c6f676f3d476f6f676c652d4368726f6d65266c6f676f436f6c6f723d7768697465)](https://jeffshenrique.vercel.app/)

## [✍️ Note for reviewers:](#-table-of-contents)
This project was developed as part of a technical challenge for Jitterbit, with a focus on creating a simple API.