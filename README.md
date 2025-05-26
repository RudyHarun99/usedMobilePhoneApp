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
   - [ ] Comments in the code to explain key parts of the implementation.
   - [ ] (Optional) A short write-up in the README explaining decisions made during the development process, including challenges you encountered and how they were resolved.
- [x] Display a list of all realistic products, the used mobile phones, on a homepage with a CSS grid showing name, price, thumbnail image, and more.
- [x] Allow users to select a product to view its details on a separate page with name, description, price, larger image, and more.
- [x] Ensure code quality through consistent linting/formatting, modular folder structure, and comments for complex logic.
- [x] (Optional) Search products by keyword.
- [x] (Optional) Have sorting, filtering, and pagination with various criteria.
- [ ] Deploy the application with a live URL and a public GitHub repository including documentation.
- [ ] (Optional) Product category.
- [ ] (Optional) Product variant.
- [ ] (Optional) Implement basic authentication & authorization.
- [ ] (Optional) Add to cart and check out flow of buying the product.
- [ ] (Optional) Admin dashboard to manage the products, monitoring the transactions, etc.
- [ ] (Optional) Payment gateway integration. Sandbox is okay.