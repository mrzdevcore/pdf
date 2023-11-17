FROM node:15.6.0-buster AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:15.6.0-buster as production
LABEL maintainer="andriamanamisoa@gmail.com"
LABEL version="0.2"
LABEL description="PDFCompiler node"
ARG DEBIAN_FRONTEND=noninteractive
RUN apt update
RUN apt install -y texlive-latex-extra curl unzip wget

ENV NODE_ENV=production
ENV PORT $PORT
ENV HOST 0.0.0.0
ENV CONFIG_FILE=./config.yml

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["npm", "run", "start:prod"]
