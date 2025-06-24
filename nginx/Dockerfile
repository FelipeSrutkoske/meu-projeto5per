FROM nginx:stable-alpine

RUN apk add --no-cache openssl

RUN rm /etc/nginx/conf.d/default.conf

WORKDIR /etc/nginx

COPY nginx.conf /etc/nginx/nginx.conf

COPY openssl-san.cnf /etc/nginx/openssl-san.cnf

RUN mkdir -p /etc/nginx/certs \
    && openssl req -x509 -nodes -days 365 \
    -newkey rsa:2048 \
    -keyout /etc/nginx/certs/chave.pem \
    -out /etc/nginx/certs/cert.pem \
    -config /etc/nginx/openssl-san.cnf
