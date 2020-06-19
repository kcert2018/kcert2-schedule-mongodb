FROM node:slim

MAINTAINER David You <frog@falinux.com>

ENV DEBIAN_FRONTEND noninteractive

RUN echo "node:ehsqjfwk9414$" | chpasswd

RUN apt-get update -y && \
    apt-get install \
      sudo \
      ca-certificates \
      openssh-client \
      gconf-service \
      libasound2 \
      libatk1.0-0 \
      libatk1.0-0 \
      libdbus-1-3 \
      libgconf-2-4 \
      libgtk-3-0 \
      libnspr4 \
      libnss3 \
      libx11-xcb1 \
      libxss1 \
      libxtst6 \
      fonts-liberation \
      libappindicator3-1 \
      xdg-utils \
      lsb-release \
      wget \
      curl \
      xz-utils -y --no-install-recommends && \
    wget https://dl.google.com/linux/direct/google-chrome-unstable_current_amd64.deb && \
    dpkg -i google-chrome*.deb && \
    apt-get install -f && \
    apt-get clean autoclean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* google-chrome-unstable_current_amd64.deb

RUN apt-get update && apt-get install -y fonts-nanum

# RUN [ ! -e /etc/nsswitch.conf ] && echo 'hosts: files dns' > /etc/nsswitch.conf

ENV DOCKER_CHANNEL stable
ENV DOCKER_VERSION 19.03.8

RUN set -eux; \
              \
    # 'armel' 'armhf' 'aarch64'
    dockerArch='x86_64'; \
    if ! wget -O docker.tgz "https://download.docker.com/linux/static/${DOCKER_CHANNEL}/${dockerArch}/docker-${DOCKER_VERSION}.tgz"; then \
      echo >&2 "error: failed to download 'docker-${DOCKER_VERSION}' from '${DOCKER_CHANNEL}' for '${dockerArch}'"; \
      exit 1; \
    fi; \
    tar --extract \
      --file docker.tgz \
      --strip-components 1 \
      --directory /usr/local/bin/ \
    ; \
    rm docker.tgz; \
    \
    dockerd --version; \
    docker --version

ENV DOCKER_TLS_CERTDIR=/certs
RUN mkdir /certs /certs/client && chmod 1777 /certs /certs/client

RUN usermod -aG sudo node
RUN groupadd docker
RUN usermod -aG docker node

COPY ./ /work
WORKDIR /work
RUN npm install @babel/core @babel/node @babel/preset-env
RUN npm install babel-jest jest puppeteer jest-puppeteer
RUN npm install -g jest-cli
RUN npm install -g pm2
RUN npm install -g cross-env

RUN echo "node	ALL=NOPASSWD: ALL" >> /etc/sudoers

ADD app /work/app
WORKDIR /work/app
RUN npm install
ENV NODE_ENV production

CMD bash
