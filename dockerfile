FROM node:latest

ENV PORT=3000
ENV FROM_EMAIL_ADDRESS=jackofthejamison@hotmail.com
ENV SG_API_KEY


WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app

CMD node ./bin/www

EXPOSE 80