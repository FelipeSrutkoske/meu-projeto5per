# 1. Use uma imagem base oficial do Node.js. 'alpine' é uma versão leve.
FROM node:18-alpine

# 2. Crie e defina o diretório de trabalho dentro do contêiner.
WORKDIR /app

# 3. Copie o package.json e package-lock.json para o contêiner.
#    Fazemos isso separadamente para aproveitar o cache do Docker.
COPY package*.json ./

# 4. Instale as dependências do projeto.
RUN npm install

# 5. Copie o resto do código do seu backend para o contêiner.
COPY . .

# 6. Se você usa TypeScript, rode o build para gerar o JavaScript.
#    Certifique-se que seu package.json tem um script "build".
RUN npm run build

# 7. Exponha a porta que sua API usa (ex: 3000).
EXPOSE 3000

# 8. O comando para iniciar sua aplicação quando o contêiner rodar.
#    Ajuste se o seu arquivo de entrada for outro (ex: dist/app.js).
CMD [ "node", "dist/app.js" ]
