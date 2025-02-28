# Project Setup Guide

This guide will walk you through setting up the frontend and backend of the project, running the application locally.

## Frontend Setup (Next.js + Vite)
---

### 1. Navigate to the `frontend` directory:

    
    cd frontend


### 2. Install dependencies:

Ensure that you have [Node.js](https://nodejs.org/) installed on your system. Then, run the following command to install the dependencies for the frontend application:

    npm install


### 3. Create `.env` file:

In the `frontend` directory, create a `.env` file and add the following environment variable:

    NEXT_PUBLIC_BASE_URL=<your-backend-base-url>

Replace `<your-backend-base-url>` with the actual base URL for your backend (e.g., `http://localhost:4000`).


### 4. Run the frontend application:

To start the frontend application in development mode, run:

    npm run dev

This will start the Next.js application with Vite on [http://localhost:3000]() (or another port if configured differently).

***


## Backend Setup (NestJS)

### 1. Navigate to the `backend` directory:

    cd backend


### 2. Install dependencies:

Run the following command to install the necessary dependencies for the backend application:

    npm install


### 3. Create `.env` file:

In the `backend` directory, create a `.env` file and add the following environment variables:

    BASE_URL=<your-external-api-url>   # URL of the external service for address validation
    BEARER_TOKEN=<your-bearer-token>    # Bearer token to authenticate with the API
    FRONTEND_URL=<frontend-url>         # The URL of the frontend application

Replace the placeholders with your actual values. The `BASE_URL` is where the backend will communicate with the Australia Post API, and the `BEARER_TOKEN` is used for authentication.


### 4. Run the backend application:

To start the backend application in development mode, run:

    npm run start:dev

This will start the NestJS server on [http://localhost:3001]() (or another port if configured).

***

