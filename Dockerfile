FROM quay.io/badfic/node:12 as build
COPY . .

RUN npm install
RUN npm run build

FROM quay.io/badfic/nginx:1-alpine
COPY --from=build ./dist /usr/share/nginx/html