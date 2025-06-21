# Use a imagem oficial e leve do Nginx
FROM nginx:stable-alpine

# Remova a configuração padrão
RUN rm /etc/nginx/conf.d/default.conf

# Copie nosso arquivo de configuração customizado
COPY nginx.conf /etc/nginx/conf.d/
