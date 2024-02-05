# Base image
FROM node:21

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Build the application
RUN npm run build

RUN npm run seed
# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "dist/src/main"]
