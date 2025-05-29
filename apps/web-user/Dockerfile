# --- 1. Build Stage ---
FROM oven/bun:1.1.13 AS builder

WORKDIR /app

# Copy dependencies first for better caching
COPY bun.lockb package.json ./
RUN bun install

# Copy the entire monorepo
COPY . .

# Move into the actual frontend app directory
WORKDIR /app/apps/web-user

# Run the Vite build
RUN bun run build


# --- 2. Serve Stage ---
FROM oven/bun:1.1.13 AS runner

WORKDIR /app

# Install a lightweight static file server
RUN bun add serve

# Copy the built frontend from builder stage
COPY --from=builder /app/apps/web-user/dist ./dist

EXPOSE 3000

CMD ["bunx", "serve", "dist", "--single", "--port", "3000"]
    