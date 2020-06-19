FROM node:slim

MAINTAINER David You <frog@falinux.com>

ENV DEBIAN_FRONTEND noninteractive

RUN echo "node:ehsqjfwk9414$" | chpasswd

RUN apt-get update -y

COPY ./ /work
WORKDIR /work
RUN npm install @babel/core @babel/node @babel/preset-env
RUN npm install node-schedule-tz

RUN echo "node	ALL=NOPASSWD: ALL" >> /etc/sudoers

ADD app /work/app
WORKDIR /work/app
RUN npm install
ENV NODE_ENV production

CMD bash
