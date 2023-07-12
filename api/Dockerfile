FROM node

WORKDIR /api

COPY package*.json .

RUN npm install

COPY . . 

EXPOSE 8800

CMD ["node", "server.js"]