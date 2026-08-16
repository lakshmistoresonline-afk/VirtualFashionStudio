FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY dist/server.cjs ./dist/server.cjs
COPY dist/index.html ./dist/index.html
COPY dist/assets ./dist/assets

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

CMD ["node", "dist/server.cjs"]
