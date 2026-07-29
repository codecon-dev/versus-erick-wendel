FROM node:22-alpine

WORKDIR /app
COPY . .

# Instala as dependências só se você tiver um package.json.
RUN if [ -f package.json ]; then npm install; fi

ENV PORT=3000
EXPOSE 3000

# Troque pelo arquivo que sobe o seu servidor.
CMD ["node", "index.js"]
