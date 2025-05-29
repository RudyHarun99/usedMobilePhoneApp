# --- 1. Build Stage ---
FROM oven/bun:1.1.13 AS builder

WORKDIR /app

# Copy root dependencies for caching
COPY bun.lockb package.json ./
RUN bun install

# Copy entire monorepo
COPY . .

# Set workdir to frontend app
WORKDIR /app/apps/web-user

# Run build
RUN bun run build

# --- 2. Serve Stage ---
FROM oven/bun:1.1.13 AS runner

WORKDIR /app

# Install lightweight static server
RUN bun add serve

# Copy built files from builder
COPY --from=builder /app/apps/web-user/build ./build

EXPOSE 3000

CMD ["bunx", "serve", "dist", "--single", "--port", "3000"]
    