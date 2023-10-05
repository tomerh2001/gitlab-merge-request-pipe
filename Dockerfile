FROM oven/bun:alpine

ARG GH_REPO

LABEL org.opencontainers.image.source $GH_REPO
WORKDIR /app 

COPY package.json bun.lockb index.ts /app/ 
RUN bun i
CMD ["bun", "run", "/app/index.ts"]
