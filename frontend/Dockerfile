FROM node:18.17.0


WORKDIR /app

COPY package*.json /app/

RUN npm i

COPY . /app

RUN npm run build

RUN npm install -g serve

CMD serve -s build 