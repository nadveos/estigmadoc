# Imagen base compatible con ARM64
FROM node:18-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar solo los archivos necesarios
COPY .next/standalone ./
COPY .next/static .next/static

# Exponer el puerto
EXPOSE 3000

# Comando de inicio
CMD ["node", "server.js", "-p", "3000", "-H", "0.0.0.0"]