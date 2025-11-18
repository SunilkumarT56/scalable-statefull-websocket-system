
FROM node:18-alpine AS builder

WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


RUN npx tsc -b



FROM node:18-alpine

WORKDIR /app


COPY --from=builder /app/dist ./dist
COPY package*.json ./

RUN npm install --omit=dev

CMD ["node", "dist/index.js"]