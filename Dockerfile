# Use an official Node runtime as a parent image
FROM node:alpine

# Set the working directory to /app
WORKDIR '/app'

# Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Start the server
CMD [ "npm", "start" ]