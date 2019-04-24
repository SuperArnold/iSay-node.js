FROM node:8-alpine

COPY ./ /docker-expressdir
WORKDIR /docker-expressdir
RUN npm install
RUN npm install sequelize -save
RUN npm install pg --save
RUN npm install body-parser -save
RUN npm install express-session -save
RUN npm install uuid -save
RUN npm install multer -save
RUN npm install jsonwebtoken
RUN npm install pm2 -g
RUN npm install mocha -save
RUN npm install chai -save
RUN npm install supertest -save

EXPOSE 3000

CMD npm start