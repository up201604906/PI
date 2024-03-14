# Use an official Node runtime as a parent image
FROM node:alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Install any dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of your app's source code from host to image filesystem.
COPY . .

# Start the app in development mode with npm or yarn
# This assumes you have a script named "start" in your package.json
CMD ["npm", "start"]
