FROM mhart/alpine-node

COPY --chown=docker:docker . /app

WORKDIR /app

RUN npm install

ENV MONGO_HOST=localhost
ENV MONGO_PORT=27017

EXPOSE 3000

CMD [ "npm", "start" ]
