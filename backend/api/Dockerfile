FROM node:20

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies including 'devDependencies' if NOT set to 'production'
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "production" ]; \
    then npm install --only=production; \
    else npm install; \
    fi

# Copy the rest of the application code
COPY . .

# Start command
CMD ["npm", "start"]
