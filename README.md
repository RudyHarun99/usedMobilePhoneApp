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