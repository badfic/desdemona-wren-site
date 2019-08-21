FROM node:lts as build

RUN mkdir -p /app

WORKDIR /app

COPY . /app

RUN npm install -g gulp
RUN npm install
RUN gulp default

FROM nginx:1-alpine
COPY --from=build /app/dist /usr/share/nginx/html