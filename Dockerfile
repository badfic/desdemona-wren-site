FROM node:lts as build

RUN mkdir -p /app

WORKDIR /app

COPY . /app

RUN npm install -g gulp
RUN npm install
RUN gulp dist

FROM halverneus/static-file-server
COPY --from=build /app/dist /web