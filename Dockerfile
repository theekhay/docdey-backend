FROM node:10

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . /app

CMD ["npm", "run", "dev"]


EXPOSE 4000