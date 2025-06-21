# Use uma imagem Node.js para construir o projeto
FROM node:18-alpine

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de dependência e instale
COPY package*.json ./
RUN npm install

# Copie o resto do código do frontend
COPY . .

# Rode o build para gerar os arquivos estáticos na pasta /app/dist
RUN npm run build

# ESTE CONTAINER NÃO PRECISA DE 'CMD'.
# Seu único propósito é criar a pasta /app/dist, que será
# compartilhada com o container do Nginx através de um volume.
