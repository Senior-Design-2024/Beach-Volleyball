FROM node:14

WORKDIR /app

COPY ./package*.json .

RUN npm cache clean --force

RUN npm install -g --unsafe-perm=true --allow-root

COPY . .

EXPOSE 3000

CMD ["npm", "start"]