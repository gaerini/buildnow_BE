# Base image
FROM node:21

RUN apt-get update && apt-get install -y netcat-openbsd

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "dist/src/main"]

# 기존 Dockerfile 내용...

# Entrypoint 스크립트 복사
COPY entrypoint.sh /usr/src/app/entrypoint.sh
RUN chmod +x /usr/src/app/entrypoint.sh

# Entrypoint 설정
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]
