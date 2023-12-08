# CI/CD Pipeline using GitHub Actions

## Overview
This github repo is the result of the continuous integration using CI CD from another github repo.
The pipeline involves building Docker images, pushing them to Docker Hub, pulling the images, extracting code, pushing the code to this Github Repository, and finally deploying to Heroku using Dockerfiles.

## Technique Details

### Step 1: Create Dockerfiles

Two Dockerfiles are created—one inside the "server" folder for the backend and another inside the "client" folder for the frontend.

### Step 2: Build and Push Docker Images

The pipeline builds two Docker images—one for the backend and one for the frontend—and then pushes them to Docker Hub.

### Step 3: Pull Docker Images

Pull the Docker images (backend and frontend) that have been pushed to Docker Hub.

### Step 4: Run Containers

Run the containers (backend and frontend) in detached mode.

### Step 5: Extract Code

Use the "docker cp" command to intelligently extract the code from the containers and copy it to the "output" directory in the file system of the GitHub runner's host.

### Step 6: Push Code to Another GitHub Repo

Push the extracted code from the "output" directory to another public GitHub repository named "public_nuitinfo_2023," which should be prepared beforehand.

### Step 7: Deploy to Heroku

Deploy to Heroku using the Dockerfiles located inside the "server" and "client" folders.

## Results

With each commit, the code in the current GitHub repository is mirrored to the "public_nuitinfo_2023" repository, and automatic deployment to Heroku is triggered.

This CI/CD pipeline streamlines the development and deployment processes, ensuring that the code is consistently deployed to Heroku and mirrored to a public GitHub repository for visibility and collaboration.
