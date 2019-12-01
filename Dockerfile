FROM node:12-stretch as build

RUN mkdir -p /app

WORKDIR /app

COPY . /app

RUN npm install
RUN npm run build

FROM nginx:1-alpine
COPY --from=build /app/dist /usr/share/nginx/html