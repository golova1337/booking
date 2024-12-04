# NestJs-Postgres-Docker Setup

## Description of the features implemented

User registration and booking features were developed using the NestJS framework and a PostgreSQL database. Secure access was set up using JWT authentication with both access and refresh tokens, managed through the Passport JWT strategy. Roles were added to control user access, so each user can only perform actions allowed for their role.

All booking requirements were fully met, providing a smooth and reliable booking experience. The system is secure, easy to use, and ready to handle different user needs.

## Prerequisites

1. **Git**: Ensure Git is installed to clone the repository.
2. **Docker**: Install Docker to manage containerized applications. You can download it from [Docker Desktop](https://www.docker.com/products/docker-desktop).

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/golova1337/booking.git
```

### 2. Navigate to the Project Directory

cd booking

### 3. Create and Configure the .env File

Copy the contents of .env.example into a new .env file.
Fill in the required values in .env.

### 4. Run Docker

```bash
docker-compose up -d
```

### 5. Go to

localhost:3000/api

### 5. Stop Docker

```bash
docker-compose down
```
