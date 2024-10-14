# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=22.0.0
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Next.js"

# Next.js app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"


# Install pnpm
ARG PNPM_VERSION=9.12.1
RUN npm install -g pnpm@$PNPM_VERSION

# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED=1

# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install node modules
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod=false

# Copy application code
COPY . .

ARG DATABASE_URL
ARG DB_HOST
ARG DB_USER
ARG DB_PASSWORD
ARG DB_NAME
ARG DB_PORT
ARG NEXTAUTH_URL
ARG NEXTAUTH_SECRET
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET

# Build application
RUN --mount=type=secret,id=DATABASE_URL \
    --mount=type=secret,id=DB_HOST \
    --mount=type=secret,id=DB_USER \
    --mount=type=secret,id=DB_PASSWORD \
    --mount=type=secret,id=DB_NAME \
    --mount=type=secret,id=DB_PORT \
    --mount=type=secret,id=NEXTAUTH_URL \
    --mount=type=secret,id=NEXTAUTH_SECRET \
    --mount=type=secret,id=GOOGLE_CLIENT_ID \
    --mount=type=secret,id=GOOGLE_CLIENT_SECRET \
    DATABASE_URL="$(cat /run/secrets/DATABASE_URL)" \
    DB_HOST="$(cat /run/secrets/DB_HOST)" \
    DB_USER="$(cat /run/secrets/DB_USER)" \
    DB_PASSWORD="$(cat /run/secrets/DB_PASSWORD)"  \
    DB_NAME="$(cat /run/secrets/DB_NAME)"  \
    DB_PORT="$(cat /run/secrets/DB_PORT)"  \
    NEXTAUTH_URL="$(cat /run/secrets/NEXTAUTH_URL)"  \
    NEXTAUTH_SECRET="$(cat /run/secrets/NEXTAUTH_SECRET)"  \
    GOOGLE_CLIENT_ID="$(cat /run/secrets/GOOGLE_CLIENT_ID)"  \
    GOOGLE_CLIENT_SECRET="$(cat /run/secrets/GOOGLE_CLIENT_SECRET)"  \
    pnpm run build

# Remove development dependencies
RUN pnpm prune --prod


# Final stage for app image
FROM base

# Copy built application

COPY --from=build /app/.next/standalone /app
COPY --from=build /app/.next/static /app/.next/static
COPY --from=build /app/public /app/public

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "node", "server.js" ]

