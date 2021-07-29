FROM node:14.15
COPY . /usr/src/app/
WORKDIR /usr/src/app
RUN npm install
EXPOSE 4200
RUN npm install -g @angular/cli

CMD ["ng","serve","--host", "0.0.0.0"]
