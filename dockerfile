# Usa una imagen base oficial de Node.js
FROM node:20.10.0-alpine

# Indica el directorio de trabajo 
WORKDIR /app

# Copia el package.json y el package-lock.json (del package.json al directorio indicado en WORKDIR)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el codigo en WORKDIR
COPY . .

# Expone el puerto en el que la aplicación se ejecutará
# EXPOSE 3000

# Define el comando para ejecutar
CMD ["node", "./src/app.js"]

#para buildear la imagen: (app-image es el nombre de la imagen, 1.0.0 es la version, el punto final indica que el dockerfile esta en el directorio actual)
# docker build -t tp-mongo-aykema-image:1.0.0 .

# para correr la imagen: (-p indica el puerto, 4000 es el puerto del host, 3000 es el puerto del contenedor, -d indica que se corra en segundo plano)
# docker run -p 4000:3000 -d tp-mongo-aykema-image:1.0.0