# ---- Etapa 1: dependencias de produccion ----
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# ---- Etapa 2: imagen final (pequena y sin root) ----
FROM node:18-alpine
ENV NODE_ENV=production \
    PORT=8000 \
    DATABASE_NAME=/app/data/dev.sqlite
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY package*.json index.js ./
COPY shared ./shared
COPY users ./users

# Carpeta de datos escribible por el usuario no root ("node" ya existe en la imagen)
RUN mkdir -p /app/data && chown -R node:node /app
USER node

EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:${PORT}/health || exit 1

CMD ["node", "index.js"]
