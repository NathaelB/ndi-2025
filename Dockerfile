# Base Node stage
FROM node:22.16.0-alpine3.22 AS base

# Setup PNPM
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

# API dependencies stage
FROM base AS api-deps
WORKDIR /app
COPY api/package.json api/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# API production dependencies stage
FROM base AS api-production-deps
WORKDIR /app
COPY api/package.json api/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

# API build stage
FROM base AS api-build
WORKDIR /app
COPY --from=api-deps /app/node_modules /app/node_modules
COPY api/ .
RUN node ace build


# API production stage
FROM base AS api
ENV NODE_ENV=production
WORKDIR /app

# Create non-root user
RUN \
    addgroup -S appuser && \
    adduser \
    -S \
    -H \
    -D \
    -G appuser \
    appuser

COPY --from=api-production-deps /app/node_modules /app/node_modules
COPY --from=api-build /app/build /app
COPY --chown=appuser:appuser --from=api-build /app/build /app

USER appuser

EXPOSE 8080

CMD ["node", "./bin/server.js"]

# Frontend build stage
FROM node:22.16.0-alpine3.22 AS webapp-build
WORKDIR /usr/local/src/ndi

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN \
    corepack enable && \
    corepack prepare pnpm@9.15.0 --activate && \
    apk --no-cache add dumb-init=1.2.5-r3

COPY webapp/package.json webapp/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY webapp/ .
RUN pnpm run build

# Webapp production stage
FROM nginx:1.28.0-alpine3.21-slim AS webapp

COPY --from=webapp-build /usr/local/src/ndi/dist /usr/local/src/ndi
COPY webapp/nginx.conf /etc/nginx/conf.d/default.conf

# Copy entrypoint script if it exists
COPY webapp/docker-entrypoint.sh /docker-entrypoint.d/docker-entrypoint.sh

RUN chmod +x /docker-entrypoint.d/docker-entrypoint.sh
