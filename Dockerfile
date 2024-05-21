# Etapa de construcción: compilación de Angular
FROM node:21-alpine as build-step

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# Etapa final: 
FROM nginx:1.17.1-alpine

# Copiar los archivos generados de Angular a la carpeta de Nginx
COPY --from=build-step /app/dist/securio-chat-in-live/browser /usr/share/nginx/html/


# Exponer el puerto 80 para que sea accesible desde fuera del contenedor (opcional)
EXPOSE 80

# Comando para iniciar Nginx en primer plano al ejecutar el contenedor
CMD ["nginx", "-g", "daemon off;"]