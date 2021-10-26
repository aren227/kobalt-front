FROM node:14-alpine as build

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN yarn
RUN yarn build

FROM nginx:latest

RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

COPY --from=build /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]