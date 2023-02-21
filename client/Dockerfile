#build
FROM node:19.6.0 as build
RUN mkdir /srv/build/
ADD src /srv/build/src/
ADD public /srv/build/public/
COPY package*.json /srv/build/
COPY vite.config.js /srv/build/
COPY nginx /srv/build/nginx/
WORKDIR /srv/build/
RUN ls -l nginx/
RUN yarn
RUN yarn build

#run app
FROM nginx:stable-alpine
COPY --from=build /srv/build/dist/ /usr/share/nginx/html/
COPY --from=build /srv/build/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]