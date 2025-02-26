FROM node:20 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as production-stage
EXPOSE 3000
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist/frontend_web_angular_laravel/browser /usr/share/nginx/html