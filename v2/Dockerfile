FROM oven/bun:1 AS base
WORKDIR /app

# Install dependencies
FROM base AS install
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Build the app
FROM base AS build
COPY --from=install /app/node_modules ./node_modules
COPY . .
RUN bun run build

# Production stage
FROM base AS release
COPY --from=install /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY server ./server
COPY package.json .

# Create data directory for SQLite
RUN mkdir -p /app/data
ENV DATABASE_PATH=/app/data/prompty.db

EXPOSE 3000
EXPOSE 5173

CMD ["bun", "server/prod.ts"]