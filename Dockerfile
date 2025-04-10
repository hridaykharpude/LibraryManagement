# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the Vite project (optional: remove if you only want dev server)
# RUN npm run build

# Expose Vite default dev server port
EXPOSE 5173

# Start the dev server and bind it to 0.0.0.0 so Docker can expose it
CMD ["npm", "run", "dev", "--", "--host"]
