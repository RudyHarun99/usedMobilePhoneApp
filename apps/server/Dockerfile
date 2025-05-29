# Dockerfile for Hono + Bun + tRPC + Prisma (Railway Ready)
FROM oven/bun:1.1

# Set working directory
WORKDIR /app

# Copy everything
COPY . .

# Install dependencies
RUN bun install

# Generate Prisma client
RUN bunx prisma generate

# Expose port (optional for Docker, but good practice)
EXPOSE 3000

# Start the Bun server
CMD ["bun", "run", "src/index.ts"]
