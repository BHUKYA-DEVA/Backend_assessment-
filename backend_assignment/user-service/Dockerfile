FROM node:20.14.0-slim

COPY . /usr/spyne_backend_assignment/user-service

WORKDIR /usr/spyne_backend_assignment/user-service

RUN npm install -g npm@latest

CMD /bin/bash -c 'npm start'
