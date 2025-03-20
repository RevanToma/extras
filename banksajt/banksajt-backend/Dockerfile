FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm install -g typescript
RUN npm run build
EXPOSE 3001
CMD ["node", "dist/server.js"]
