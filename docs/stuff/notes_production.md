### Backend index.js
- REMOVE CORS

### docker-compose.yml

~~~yml
# ...
react-client:
    build: ./client
    ports:
      - "3001:80" 
    depends_on:
      - api 
~~~

### React Dockerfile
~~~Dockerfile
FROM node:alpine as build

# Set the working directory in the container
WORKDIR /app
# Copy the package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./
RUN npm install --legacy-peer-deps
# Copy the rest of your app's source code from host to image filesystem.
COPY . .

RUN npm run build

FROM nginx:alpine
# Copy the built app to Nginx's serve directory
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
~~~

