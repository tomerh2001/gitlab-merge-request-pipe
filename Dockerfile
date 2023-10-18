FROM oven/bun:1-alpine

ENV NODE_TLS_REJECT_UNAUTHORIZED=0
ARG GH_REPO

LABEL org.opencontainers.image.source $GH_REPO
WORKDIR /repo

COPY package.json bun.lockb *.ts ./
RUN apk add --no-cache git openssh-client && \
    bun install

COPY pipe.sh ./
CMD ["sh", "/repo/pipe.sh"]
