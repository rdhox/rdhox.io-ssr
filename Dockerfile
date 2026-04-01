# Production SSR (Razzle → Express). Use this on Coolify: build type Dockerfile, not "static".
# Razzle stays in devDependencies: the builder stage installs all deps to run `npm run build`.
#
# Builder uses Debian slim (glibc): webpack 5 + Terser in Alpine often OOMs or fails silently on small CI hosts.

FROM node:20-bookworm-slim AS builder
WORKDIR /app

# Align with local `legacy-peer-deps` (Razzle + webpack 5 peer conflicts); Docker has no ~/.npmrc.
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY . .
ENV NODE_ENV=production
# Webpack + Terser can spike heap; raise Coolify build RAM if this step still dies with no clear error.
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY package.json package-lock.json ./
RUN npm ci --omit=dev --legacy-peer-deps

COPY --from=builder /app/build ./build

EXPOSE 3000
CMD ["node", "build/server.js"]
