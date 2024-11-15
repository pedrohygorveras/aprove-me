FROM node:20
WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY .env .env
COPY ./dist ./dist

EXPOSE 5000

CMD ["node", "dist/main.js"]
