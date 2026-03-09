# Use Node.js as base
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install all packages
RUN npm install

# Copy all React code
COPY . .

# Start React app
CMD ["npm", "start"]

# React runs on port 3000
EXPOSE 3000