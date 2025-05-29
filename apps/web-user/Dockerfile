# ---- 1. Build stage ----
FROM oven/bun:1.1.13 AS builder

WORKDIR /app

# Install dependencies
COPY bun.lockb package.json ./
RUN bun install

# Copy source files
COPY . .

# Build the app
RUN bun run build

# ---- 2. Serve stage ----
FROM oven/bun:1.1.13 AS runner

WORKDIR /app

# Install a static file server
RUN bun add serve

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Expose port for Railway
EXPOSE 3000

# Serve the app
CMD ["bunx", "serve", "dist", "--single", "--port", "3000"]