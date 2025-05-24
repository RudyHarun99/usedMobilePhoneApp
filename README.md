# usedMobilePhoneApp

## Prerequisites
- Node.js and bun installed
- Docker installed (for database setup)
## Setup Instructions
1. Clone the Repository
   
   ```
   git clone https://github.com/RudyHarun99/usedMobilePhoneApp.git
   cd usedMobilePhoneApp
   ```
2. Install Dependencies
   
   Navigate to the backend and frontend directories and install the dependencies using Bun:
   
   ```
   cd backend
   bun install
   cd ../frontend/user
   bun install
   ```
3. Database Setup
   
   Ensure Docker is running and set up the PostgreSQL database using Docker Compose:
   
   ```
   cd backend
   docker-compose up -d
   bun db:generate
   bun db:push
   bun db:seed
   ```
4. Run the Backend
   
   Start the backend server:
   
   ```
   bun run dev
   ```
5. Run the Frontend
   
   Navigate to the frontend directory and start the development server:
   
   ```
   cd frontend/user
   bun run dev
   ```
6. Access the Application
   
   Open your browser and navigate to http://localhost:3000/api/trpc for the backend and http://localhost:5173 for the frontend.
## Additional Information
- Ensure environment variables are set correctly in the .env file.

## Check List
### Backend
- [x] setup prisma database
- [x] schema and seed database
- [x] setup docker compose for database
- [x] setup hono and trpc
- [x] get all phones
- [x] search, filter, sort, limit, offset phones
- [x] get phone by id
- [x] create new phone
- [x] update phone
- [x] delete phone
- [x] validation using zod
- [x] error handler
- [ ] user database
- [ ] login and register
- [ ] implement basic authentication and authorization
- [ ] deployment

### Frontend
- [x] react router v7 framework setup
- [x] trpc client setup
- [x] fetch from backend using useQuery
- [x] search and filter features
- [x] router for home page and detail page
- [x] navbar component
- [x] searchbar component
- [x] left filterbar component
- [x] product card component
- [x] product detail component
- [ ] mobile friendly
- [ ] login and register
- [ ] admin dashboard to manage the products
- [ ] sort and pagination
- [ ] deploy

## Tech Stack

- [x] Runtime: Bun.
- [x] Frontend: React with React Router v7 Framework.
- [x] Styling: Tailwind CSS with shadcn/ui.
- [x] Schema Validation: Zod.
- [x] Backend Framework: Hono.
- [x] API Layer: tRPC.
- [x] ORM: Prisma.
- [x] Database: PostgreSQL.
- [x] Containerization: Docker and Docker Compose. At least for local database setup.
- [x] Tools: Biome or ESLint with Prettier.
- (Optional) Auth: Better Auth.
- (Optional) Monorepo Tool: Turborepo.
- Deployment: Deploy on any platform such as Vercel, Netlify, Railway, Render, Neon, Supabase, Coolify, VPS, GCP, AWS, or anywhere is fine.
- Domain: Connect to a subdomain/domain you own.