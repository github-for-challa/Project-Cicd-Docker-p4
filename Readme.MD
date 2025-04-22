# CI/CD Pipeline with GitHub Actions & Docker (No Cloud Needed)

## Objective
This project sets up a full CI/CD pipeline that builds a Docker image, runs tests, and deploys locally.

## Tools Used
- GitHub Actions : For automating the CI/CD pipeline.
- Docker : To build and run containers.
- Docker Hub (free): To host the Docker image
- Minikube/Local VM: For deploying and running the Docker container locally.

## Mini Guide

### 1. **Create the Dockerfile**
   Write a `Dockerfile` to define the environment for your app. It should include the necessary steps to install dependencies and run the app.

   Example `Dockerfile`:

   ```dockerfile
   # Use an official Node.js runtime as a parent image
   FROM node:16

   # Set the working directory
   WORKDIR /app

   # Copy package.json and install dependencies
   COPY package.json /app/
   RUN npm install

   # Copy the rest of the application files
   COPY . /app/

   # Expose the port the app runs on
   EXPOSE 3000

   # Run the app
   CMD ["node", "app.js"]
2. Configure GitHub Actions
Configure GitHub Actions to automate:
Checkout code from GitHub
Set up Docker Buildx
Log in to Docker Hub
Build the Docker image
Push the Docker image to Docker Hub

Below is the .github/workflows/ci-cd-pipeline.yml used in the pipeline:

yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main]

jobs:
  build-test-push:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Log in to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: challa1/myapp1:latest
3. Write the Docker Compose File (optional)
If you're using Docker Compose for multi-container setups, include a docker-compose.yml file. Here is a basic version:
yaml

version: '3.7'
services:
  app:
    image: challa1/myapp1:latest
    ports:
      - "3000:3000"
4. Use Local VM for Deployment
After pushing the image to Docker Hub, use a local VM to pull the image and run it. Make sure Docker is installed on your local VM.

To pull and run the image:

docker pull challa1/myapp1:latest
docker run -p 3000:3000 challa1/myapp1:latest
Once the app is running, you can access it at http://<local_vm_ip>:3000/ in your browser, and it will display the message that the CI/CD pipeline is working.

5. Testing the Deployment
After deploying the image, you should be able to access the app by navigating to http://<local_vm_ip>:3000/ in your browser. The app will display a message indicating that the CI/CD pipeline is working.

Deliverables
GitHub Repository: The repository contains the complete codebase with the workflow.

Docker Image: challa1/myapp1:latest

CI/CD Workflow Results: All the jobs in the pipeline run successfully in GitHub Actions.
Screenshots: Screenshots has added in the proof of completion project folder 
