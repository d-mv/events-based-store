FROM node:18-alpine AS app_builder

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY . .

RUN npm i
RUN npm run build

EXPOSE 3000

ENTRYPOINT ["npm","start"]
