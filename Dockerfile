# Dockerfile for CapRover on ARM64
# Stage 1: Install dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install

# Stage 2: Build the application
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Copy environment variables for build time
# CapRover will inject these as build arguments
ARG POCKETBASE_URL
ARG POCKETBASE_ADMIN_EMAIL
ARG POCKETBASE_ADMIN_PASSWORD
ENV POCKETBASE_URL=${POCKETBASE_URL}
ENV POCKETBASE_ADMIN_EMAIL=${POCKETBASE_ADMIN_EMAIL}
ENV POCKETBASE_ADMIN_PASSWORD=${POCKETBASE_ADMIN_PASSWORD}
RUN npm run build

# Stage 3: Production image
FROM --platform=linux/arm64 node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy the standalone output
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expose the port CapRover expects
EXPOSE 3000

# Set the host to 0.0.0.0 to be accessible from outside the container
ENV HOSTNAME 0.0.0.0

# Start the server
CMD ["node","start", "server.js"]
