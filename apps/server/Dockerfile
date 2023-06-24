FROM node:18-alpine AS base

# No need to take too much time to understand the stage builder (just rafactor code structure for later stages)
FROM base AS builder

RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app
RUN yarn global add turbo
COPY --chown=node:node . .
RUN turbo prune --scope=server --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
COPY --chown=node:node --from=builder /app/out/json/ .
COPY --chown=node:node --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install --frozen-lockfile --network-timeout 100000

# Build image for development
FROM base AS development
WORKDIR /app

COPY --chown=node:node --from=installer /app .
COPY --chown=node:node --from=builder /app/out/full/ .

USER node

# Build image for production
FROM base AS build
WORKDIR /app

# COPY --chown=node:node --from=builder /app/out/full/ .
# COPY --chown=node:node --from=installer /app .

# RUN yarn turbo build --filter=server

COPY --chown=node:node --from=development /app .

RUN yarn run build

ENV NODE_ENV production

# Passing in --production ensures that only the production dependencies are installed.
# This ensures that the node_modules directory is as optimized as possible.
RUN yarn install --production && yarn cache clean

USER node

###################
# PRODUCTION
###################

FROM base AS production

COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/apps/server/dist ./dist

CMD node dist/main.js

