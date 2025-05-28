# Used Mobile Phone App

A monorepo application for managing used mobile phone listings, built with React, Bun, and Prisma.

## Project Structure

```
.
├── apps/
│   ├── server/         # Backend API (Bun + Prisma)
│   ├── web-admin/      # Admin Dashboard (React)
│   └── web-user/       # User Frontend (React)
└── packages/           # Shared packages (if any)
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Bun](https://bun.sh/) (latest version)
- [Docker](https://www.docker.com/) (for PostgreSQL database)
- [Turbo](https://turbo.build/) (included as a dev dependency)

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd usedMobilePhoneApp
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy the example env files
cp apps/server/.env.local.bak apps/server/.env
```

4. Run the database setup command:
```bash
# This will set up the database and generate necessary files
turbo run db:setup
```

5. Start the development environment:
```bash
turbo run dev
```

This will start:
- PostgreSQL database (port 5433)
- Backend server (port 3000)
- Admin dashboard (port 5173)
- User frontend (port 5174)

## Available Commands

### Setup and Initialization

```bash
# Complete project setup (database, dependencies, etc.)
turbo run setup

# Database setup only
turbo run db:setup
```

### Development

```bash
# Start all applications in development mode
turbo run dev

# Start specific applications
turbo run dev --filter=server
turbo run dev --filter=web-admin
turbo run dev --filter=web-user
```

## Additional Information
- Ensure environment variables are set correctly in the .env file.

## Check List

### Tech Stack
- [x] Runtime & Package Manager: Bun.
- [x] Frontend: React with React Router v7 Framework. Following the latest convention and practice.
- [x] Styling: Tailwind CSS with shadcn/ui.
- [x] Schema Validation: Zod.
- [x] Backend Framework: Hono.
- [x] API Layer: tRPC.
- [x] ORM: Prisma.
- [x] Database: PostgreSQL.
- [x] Containerization: Docker and Docker Compose. At least for local database setup.
- [x] Tools: Biome or ESLint with Prettier.
- [ ] Deployment: Deploy on any platform such as Vercel, Netlify, Railway, Render, Neon, Supabase, Coolify, VPS, GCP, AWS, or anywhere is fine.
- [ ] Domain: Connect to a subdomain/domain you own.
- [ ] (Optional) Auth: Better Auth.
- [ ] (Optional) Monorepo Tool: Turborepo.

### Features and Deliverables
- [x] Provide a public GitHub repository with:
   - [x] Clear instructions on the README how to set up and run the project locally.
   - [x] The database schema and any necessary seed scripts.
   - [x] Comments in the code to explain key parts of the implementation.
   - [ ] (Optional) A short write-up in the README explaining decisions made during the development process, including challenges you encountered and how they were resolved.
- [x] Display a list of all realistic products, the used mobile phones, on a homepage with a CSS grid showing name, price, thumbnail image, and more.
- [x] Allow users to select a product to view its details on a separate page with name, description, price, larger image, and more.
- [x] Ensure code quality through consistent linting/formatting, modular folder structure, and comments for complex logic.
- [x] (Optional) Search products by keyword.
- [x] (Optional) Have sorting, filtering, and pagination with various criteria.
- [x] (Optional) Admin dashboard to manage the products, monitoring the transactions, etc.
- [ ] Deploy the application with a live URL and a public GitHub repository including documentation.
- [ ] (Optional) Product category.
- [ ] (Optional) Product variant.
- [ ] (Optional) Implement basic authentication & authorization.
- [ ] (Optional) Add to cart and check out flow of buying the product.
- [ ] (Optional) Payment gateway integration. Sandbox is okay.