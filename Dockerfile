FROM node:16.13.1 as requirements
WORKDIR /map-frontend/

COPY public public
COPY src src
COPY package.json yarn.lock tsconfig.json .env .
RUN yarn

FROM requirements as test
COPY jest.config.js babel.config.js .
CMD ["yarn", "test:ci"]

FROM requirements as build
EXPOSE 3000
RUN yarn build

RUN yarn global add serve
CMD serve -s build
