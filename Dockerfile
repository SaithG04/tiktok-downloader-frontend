# Etapa 1: Construir la aplicación Angular
FROM node:23-slim AS build 

WORKDIR /app

# Instalar dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copiar todo el código fuente
COPY . ./

# Instalar Angular CLI
RUN npm install -g @angular/cli

# Construir la aplicación
RUN ng build --configuration production

# Etapa 2: Servir la aplicación con un servidor HTTP
FROM nginx:1.27.4-alpine-slim

# Eliminar la configuración predeterminada de nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar la aplicación construida desde la etapa anterior
COPY --from=build /app/dist/tiktok-downloader/browser /usr/share/nginx/html

RUN chmod -R 755 /usr/share/nginx/html

# Exponer el puerto en el que Nginx escuchará
EXPOSE 80

# Iniciar Nginx cuando el contenedor se ejecute
CMD ["nginx", "-g", "daemon off;"]