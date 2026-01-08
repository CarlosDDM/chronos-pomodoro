#Builder
FROM node:22-alpine AS build

# Define diretório de trabalho
WORKDIR /app

# Copia arquivos de dependência
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Gera o build de produção
RUN npm run build

# Etapa 2: Servir com Nginx
FROM nginx:stable-alpine

# Remove configuração padrão
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos do build gerado
COPY --from=build /app/dist /usr/share/nginx/html

# Exportando porta HTTP
EXPOSE 80

# Comando padrão
CMD ["nginx", "-g", "daemon off;"]

