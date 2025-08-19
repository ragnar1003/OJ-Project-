# AlgoBaazi

Welcome to AlgoBaazi! This is a competitive programming platform where you can solve problems, compete with others, and improve your coding skills. This README provides a comprehensive guide to understanding, setting up, and contributing to the project.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Project Links](#project-links)

## Features

AlgoBaazi comes with a range of features designed to provide a seamless and engaging experience for competitive programmers:

- **User Authentication**: Secure sign-up and login functionality to manage user profiles.
- **Problem List**: A comprehensive list of coding problems with varying difficulty levels.
- **Detailed Problem View**: A dedicated page for each problem, including the problem statement, constraints, and sample test cases.
- **Online Code Editor**: An integrated code editor with support for multiple languages to write and submit solutions.
- **Real-time Code Compilation**: A robust backend service to compile and execute code in real-time, providing instant feedback.
- **Submission History**: A record of all submissions for each problem, including the code, verdict, and execution time.
- **User Profiles**: A personalized space for users to track their progress and view their submission history.
- **AI-Powered Assistance**: An integrated AI assistant to help with debugging and provide hints.

## Tech Stack

This project is built with a modern tech stack, ensuring scalability, performance, and a great developer experience.

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A next-generation frontend tooling for fast development.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Monaco Editor**: A powerful code editor that powers VS Code.

### Backend

- **Node.js**: A JavaScript runtime for building server-side applications.
- **Express**: A fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: A NoSQL database for storing application data.
- **Mongoose**: An ODM library for MongoDB and Node.js.
- **JWT**: For secure user authentication.

### Compiler Service

- **Node.js & Express**: To create the compiler API.
- **Docker**: To containerize the compiler service.
- **AWS EC2**: For deploying the compiler service.
- **AWS ECR**: To store and manage the Docker images.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [MongoDB](https://www.mongodb.com/try/download/community) (for the backend)
- [Docker](https://www.docker.com/get-started) (for the compiler service)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/algobaazi.git
   cd algobaazi
   ```

2. **Set up the Frontend**:
   ```bash
   cd Frontend
   npm install
   ```

3. **Set up the Backend**:
   ```bash
   cd ../backend
   npm install
   ```
   You will also need to create a `.env` file in the `backend` directory. You can use the `.env.example` file as a template.

4. **Set up the Compiler Service**:
   ```bash
   cd ../compiler
   npm install
   ```

## Usage

To run the application, you will need to start the frontend, backend, and compiler services separately.

- **Start the Frontend**:
  ```bash
  cd Frontend
  npm run dev
  ```
  The frontend will be available at `http://localhost:5173`.

- **Start the Backend**:
  ```bash
  cd backend
  npm start
  ```
  The backend server will start on `http://localhost:3000`.

- **Start the Compiler Service**:
  ```bash
  cd compiler
  npm run dev
  ```
  The compiler service will run on `http://localhost:5000`.

Alternatively, you can run the compiler service using Docker:
```bash
cd compiler
docker build -t compiler-service .
docker run -p 5000:5000 compiler-service
```

## Deployment

### Frontend (Vercel)

The frontend of this application is deployed on [Vercel](https://vercel.com/). The deployment is configured to automatically build and deploy the `Frontend` directory upon new commits to the `main` branch.

### Backend (Render)

The backend of this application is deployed on [Render](https://render.com/).

### Compiler Service (AWS)

The compiler service is deployed on an **AWS EC2** instance and managed with **Amazon ECR**. Here’s a brief overview of the deployment process:

1. **Dockerize the Service**: The `compiler` directory contains a `Dockerfile` to create a container image of the service.
2. **Push to ECR**: The Docker image is pushed to a private repository on Amazon ECR.
3. **Deploy on EC2**: An EC2 instance pulls the image from ECR and runs the container, exposing the compiler API to the internet.

This setup ensures that the code compilation is handled in a secure and isolated environment, separate from the main application.

## Screenshots

- **Home Page**: ![Home Page](https://i.postimg.cc/XqJ6WN0n/Screenshot-2025-08-19-140327.png)
- **Problem List**: ![Problem List](https://i.postimg.cc/bJV16Ly3/Screenshot-2025-08-19-140445.png)
- **Problem Detail & Editor**: ![Problem Detail](https://i.postimg.cc/Tw3rqB6K/Screenshot-2025-08-19-140558.png)
- **User Profile**: ![User Profile](https://i.postimg.cc/jjK6CL3Q/Screenshot-2025-08-19-140636.png)

## Project Links

- **Live Project**: [https://algobaazi.vercel.app/](https://algobaazi.vercel.app/)
- **Project Demo Video**: [Watch on Loom](https://www.loom.com/share/db9f937204e44fc791eb09fbeb836f55?t=121&sid=c79008dc-c024-483c-b075-1abf64203b25)
