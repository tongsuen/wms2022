# Dockerfile for React client

# Build react client
FROM node:16-slim

# Working directory be app
WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./
###  Installing dependencies

RUN yarn install

# copy local files to app folder
COPY . .

EXPOSE 3000

CMD ["yarn","start"]