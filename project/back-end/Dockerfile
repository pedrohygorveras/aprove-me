FROM node:18 AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production=false
COPY . .
RUN npx prisma generate --schema=./prisma/schema.prisma
RUN npm run build

FROM node:18-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/prisma ./prisma
RUN npm install --production
EXPOSE 5000
CMD ["node", "dist/main"]
