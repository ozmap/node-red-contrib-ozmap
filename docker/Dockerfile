FROM nodered/node-red:latest

LABEL MAINTAINER="dev@ozmap.com.br"

ARG TZ

USER root

# Set timezone
RUN apk add --no-cache tzdata \
    && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone

# Copy package.json to the WORKDIR so npm builds all
# of your added nodes modules for Node-RED
COPY [ \
  "package.json",\
  "package-lock.json", \
   "./" \
]

RUN npm install \
  --unsafe-perm \
  --no-update-notifier \
  --no-fund \
  --only=production

# Copy _your_ Node-RED project files into place
# NOTE: This will only work if you DO NOT later mount /data as an external volume.
#       If you need to use an external volume for persistence then
#       copy your settings and flows files to that volume instead.
#COPY ./data ./data
#COPY ./nodes ./nodes

EXPOSE 1880/tcp 9229/tcp
