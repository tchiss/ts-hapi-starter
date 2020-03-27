FROM node:12.16.1-alpine

MAINTAINER Nestor Alain TCHISSAMBOT MAKOSSO  <tchiss_a@epitech.eu>

RUN apk update && apk add build-base git python

WORKDIR /ts-hapi-starter

COPY package.json /niosso-api/package.json

COPY . /ts-hapi-starter

RUN npm install && apk del --purge build-base git python

RUN npm run build

EXPOSE 7009

CMD ["./node_modules/.bin/pm2-runtime", "pm2.yml"]
