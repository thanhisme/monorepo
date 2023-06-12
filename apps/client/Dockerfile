FROM node:18-alpine AS base

# No need to take too much time to understand the stage builder (just rafactor code structure for later stages)
FROM base AS builder

RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app
RUN yarn global add turbo
COPY --chown=node:node . .
RUN turbo prune --scope=client --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
COPY --chown=node:node --from=builder /app/out/json/ .
COPY --chown=node:node --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install --frozen-lockfile --network-timeout 100000

USER node

# Build image for development
FROM base AS development
WORKDIR /app

COPY --chown=node:node --from=installer /app .
COPY --chown=node:node --from=builder /app/out/full/ .

# RUN mkdir /app/apps/client/node_modules/ && mkdir /app/apps/client/node_modules/.vite \
#     && chown -R node:node /app/apps/client/node_modules/.vite

USER node

# Build image for production
FROM base AS production
WORKDIR /app

COPY --chown=node:node --from=development /app .

USER node

# RUN yarn workspace client run build
RUN yarn turbo build --filter=client


# Copy the build output to the nginx image
FROM nginx:alpine

COPY --chown=node:node --from=production /app/apps/client/dist /usr/share/nginx/html
COPY --chown=node:node --from=production /app/apps/client/nginx/conf.d /etc/nginx/conf.d

ENTRYPOINT ["nginx", "-g", "daemon off;"]