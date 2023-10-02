FROM bun/oven:latest

ARG GH_REPO
ARG RELEASE_NOTES

LABEL org.opencontainers.image.source $GH_REPO

WORKDIR /app

COPY package.json bun.lockb index.ts ./
RUN bun i
CMD ["bun", "run", "index.ts"]