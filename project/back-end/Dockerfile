FROM node:20
WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY . .

RUN npx prisma generate --schema=./prisma/schema.prisma

EXPOSE 5000

CMD ["node", "dist/main.js"]
