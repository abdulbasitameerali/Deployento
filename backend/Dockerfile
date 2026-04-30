FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Expose port (ensure this matches the port in server.js, typically 5000)
EXPOSE 5000

# Start server
CMD ["node", "server.js"]
