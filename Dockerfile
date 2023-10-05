FROM oven/bun:1-alpine

ENV NODE_TLS_REJECT_UNAUTHORIZED=0
ARG GH_REPO

LABEL org.opencontainers.image.source $GH_REPO
WORKDIR /repo

COPY package.json bun.lockb index.ts ./
RUN apk add --no-cache git && \
    bun install

COPY pipe.sh ./
CMD ["sh", "/repo/pipe.sh"]
