FROM node:20.14.0-slim as build

COPY . /usr/spyne_backend_assignment/discussion-service

WORKDIR /usr/spyne_backend_assignment/discussion-service

RUN npm install -g npm@latest

RUN npm install && npm run build

FROM node:20.14.0-slim

COPY --from=build /usr/spyne_backend_assignment/discussion-service/build /usr/spyne_backend_assignment/discussion-service/build

WORKDIR /usr/spyne_backend_assignment/discussion-service

RUN npm install -g serve

CMD ["bash", "-c", "serve -s build -l 3000"]
