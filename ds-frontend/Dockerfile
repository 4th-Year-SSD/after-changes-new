# Use an official Node.js runtime as a parent image
FROM node:16.13.1

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
COPY yarn.lock  ./
# Install Node.js dependencies
RUN yarn

# Copy the current directory contents to the container at /app
COPY . .

# Set environment variables
ENV REACT_APP_API_KEY=localhost
ENV REACT_APP_BACKEND_URL=http://localhost:3001
ENV REACT_APP_IP_ADRRESS_API_KEY=c1611048089c513c9658afbbcb8f1b6e
ENV REACT_APP_NUMBER_VALIDATION_API_KEY=67efcd0a91113a0b6671a9df960b50d6

# Expose port 5000 for the frontend
EXPOSE 3000

# Start the app
CMD ["yarn", "dev"]
