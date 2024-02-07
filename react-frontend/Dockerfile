FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Ensure that the directory permissions are set correctly
RUN chmod -R 777 /app

# Expose port 3000
EXPOSE 3000

# Run the application
CMD ["npm", "start"]