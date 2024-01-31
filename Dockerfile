FROM ubuntu:latest

WORKDIR /app

COPY ./flask-server .
COPY ./react-frontend .
COPY ./docker-compose .
COPY ./amazon-push.sh .

CMD ["sh", "./amazon-push.sh"]