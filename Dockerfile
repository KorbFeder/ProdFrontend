FROM node:11
WORKDIR /app
COPY package*.json ./ 
RUN npm install
RUN npm install -g @angular/cli
COPY . .
EXPOSE 4200 49153
CMD ng serve --host 0.0.0.0
