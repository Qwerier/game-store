# Stage 1: Build React app
FROM node:20-bookworm-slim AS build
WORKDIR /app

# Copy only package files first (enables caching)
COPY package*.json ./

# Install dependencies (cached if package.json doesn't change)
RUN npm ci --legacy-peer-deps

# Rebuild esbuild binary for container environment
RUN npm rebuild esbuild

# Copy rest of the source code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve static files with nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
