# Etapa de construcción: compilación de Angular
FROM node:14-alpine as build-step

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# Etapa final: servir la aplicación Angular con un servidor ligero
FROM nginx:alpine

COPY --from=build-step /app/dist/securioApp /usr/share/nginx/html/

FROM nginx:1.17.1-alpine

COPY --from=build-step /app/dist/securio /usr/share/nginx/html/

