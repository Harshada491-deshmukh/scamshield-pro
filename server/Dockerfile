# Use Node.js as base
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install packages
RUN npm install

# Copy all server code
COPY . .

# Start Node.js server
CMD ["node", "index.js"]

# Server runs on port 5000
EXPOSE 5000