FROM node:alpine as builder
WORKDIR /app
COPY ./frontend/package.json /app
RUN npm install
COPY ./frontend/ .
CMD [ "npm", "run", "dev", "--", "--host", "0.0.0.0" ]