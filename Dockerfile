FROM node:alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the Next.js port
EXPOSE 3000

RUN chown -R node /app

# Start the Next.js application
CMD ["npm", "run", "start"]