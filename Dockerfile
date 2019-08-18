FROM node:lts as build

RUN mkdir -p /app

WORKDIR /app

COPY . /app

RUN npm install -g gulp
RUN npm install
RUN gulp default

FROM halverneus/static-file-server:v1.6.5
COPY --from=build /app/dist /web