FROM node:16

RUN apt-get update && apt-get install -y -qq cron

RUN mkdir -p /app
WORKDIR /app
RUN mkdir ./annexes
RUN mkdir ./camera

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD ["node", "index.js"]
