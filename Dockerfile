# Elejimos la imagen de node
FROM node:19.2-alpine3.16

#Instalamos nodemon
RUN npm install -g nodemon

# Creamos el directorio de la app
WORKDIR /app

# Copiamos el package.json
COPY package*.json ./

# Copiamos el resto de archivos
COPY . .

# Instalamos las dependencias
RUN npm install

CMD ["npm", "run", "dev"]