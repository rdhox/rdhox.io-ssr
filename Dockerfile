# Production SSR (Razzle → Express). Use this on Coolify: build type Dockerfile, not "static".
# Razzle stays in devDependencies: the builder stage installs all deps to run `npm run build`.

FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
ENV NODE_ENV=production
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/build ./build

EXPOSE 3000
CMD ["node", "build/server.js"]
