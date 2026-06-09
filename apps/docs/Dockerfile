# syntax=docker/dockerfile:1
#
# Builds and serves the Diamond docs (Astro static site) at the container root.
#
# IMPORTANT: the build context must be the Diamond REPO ROOT, not apps/docs —
# the docs read component source from `src/registry/**` at build time and rely
# on the workspace-root node_modules (radix, phosphor, cva, …) that the registry
# components import. The rueda-gems docker-compose sets `context: ../Diamond`.
#
#   docker build -f apps/docs/Dockerfile -t diamond-docs .   # run from Diamond/

# ---- build stage ----------------------------------------------------------
FROM node:20-alpine AS build
WORKDIR /diamond

# Install via the workspace root so hoisted devDeps that the registry
# components import (@radix-ui/*, @phosphor-icons/react, cva, …) resolve.
COPY package.json ./
COPY apps/docs/package.json apps/docs/package.json
RUN npm install --no-audit --no-fund

# Source the docs consume: the registry tree (read at build time via fs + the
# @diamond/registry/* alias) and the docs app itself.
COPY tsconfig.json ./
COPY src ./src
COPY apps/docs ./apps/docs

# Served under gems.rueda.dev/diamond/docs — Astro prefixes every asset/link
# with this base. Change here + the COPY target below to relocate the docs.
ENV DOCS_BASE=/diamond/docs
RUN npm run build --workspace apps/docs

# ---- serve stage ----------------------------------------------------------
FROM nginx:alpine
RUN apk add --no-cache curl
COPY apps/docs/nginx.conf /etc/nginx/nginx.conf
# Nest the static output under the base path so full-path requests
# (/diamond/docs/...) resolve directly — no proxy prefix-stripping required.
COPY --from=build /diamond/apps/docs/dist /usr/share/nginx/html/diamond/docs
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
