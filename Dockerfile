## Multi-stage Dockerfile to build the React Router app and serve via Nginx

# 1) Builder: install deps and build
FROM node:20-alpine AS builder
WORKDIR /app

# Only copy manifests first for better layer caching
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the source and build
COPY . .
RUN npm run build

# 2) Runtime: Nginx serving the static client build
FROM nginx:alpine

# Custom nginx config with SPA fallback to /index.html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# React Router's client build output
COPY --from=builder /app/build/client /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]