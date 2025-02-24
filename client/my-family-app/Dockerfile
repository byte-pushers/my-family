FROM --platform=linux/amd64 node:18.19.1-alpine AS build
LABEL authors="tonte"
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points
COPY . .
RUN npm run build
