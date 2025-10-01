# Etapa 1: Builder - Instalar dependencias y construir el proyecto
FROM node:18-alpine AS builder
WORKDIR /app

# Copiar archivos de definición de paquetes e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa 2: Runner - Preparar la imagen final de producción
FROM node:18-alpine AS runner
WORKDIR /app

# Crear un usuario no-root para mayor seguridad
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar los artefactos de la compilación standalone desde la etapa builder
COPY --from=builder /app/.next/standalone ./

# Copiar los assets públicos y estáticos
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# Asignar permisos al usuario no-root
USER nextjs

# Exponer el puerto en el que corre la aplicación
EXPOSE 3000

# Variable de entorno para el puerto
ENV PORT 3000

# Comando para iniciar el servidor de Node.js
CMD ["node", "server.js"]
