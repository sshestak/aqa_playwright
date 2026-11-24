FROM node:22-bookworm

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

RUN npx playwright install --with-deps firefox

COPY . .

CMD ["npx", "playwright", "test"]