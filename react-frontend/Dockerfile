FROM node:latest

WORKDIR /app

RUN chown -R node:node /app

USER node

COPY ./package*.json .

RUN npm cache clean --force

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]