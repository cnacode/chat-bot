FROM node:12
WORKDIR /usr/boilerplate-express
COPY package*.json ./
RUN npm install
COPY . ./
EXPOSE 3030
RUN npm run build
CMD [ "node", "./build/src/app.js" ]
