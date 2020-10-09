FROM node:12.16.2-alpine

WORKDIR /app

RUN apk update && apk add build-base git python

RUN npm config set unsafe-perm true

COPY package.json .
COPY tsconfig.json .
COPY tslint.json .
COPY pm2.yml .
COPY .env .
COPY src ./src
COPY test ./test

RUN npm install && apk del --purge build-base git python

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
