FROM node:19

WORKDIR /app

COPY package*.json ./

CMD [ "yarn", "start:dev" ]
