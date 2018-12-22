FROM node:8-alpine

COPY . /docker-expressdir
WORKDIR /docker-expressdir
RUN npm install
RUN npm install sequelize --save
RUN npm install pg --save

EXPOSE 3000

CMD npm start