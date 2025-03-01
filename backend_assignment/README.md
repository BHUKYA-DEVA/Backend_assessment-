# Microservices Architecture for User and Discussion Management

This project demonstrates a microservices architecture for user and discussion management using Node.js, gRPC, and RabbitMQ for asynchronous communication. The system includes user authentication, discussion management, and inter-service communication.

## Services

### User Service

- **Responsibilities**: Handle user-related operations such as creating, updating, deleting users, login, signup, following/unfollowing users, and searching users.
- **Communication**: Exposes gRPC endpoints.
- **Database**: MongoDB

### Discussion Service

- **Responsibilities**: Handle discussion-related operations such as creating, updating, deleting discussions, liking discussions, commenting on discussions, replying to comments, and searching discussions.
- **Communication**: Exposes gRPC endpoints.
- **Database**: MongoDB

### Gateway Service

- **Responsibilities**: Acts as an API gateway to route requests to appropriate microservices and handle user authentication.
- **Communication**: Exposes REST API endpoints, communicates with User and Discussion services via gRPC.

### Notification Service (Future Enhancement)

- **Responsibilities**: Handle sending notifications based on user actions (e.g., follow, like, comment).
- **Communication**: Listens to RabbitMQ messages and sends notifications.

## Design Pattern

The system uses microservices architecture to divide the application into smaller services, each responsible for a specific domain. This approach improves maintainability, scalability, and fault isolation.

## Database Schemas

#### User Schema

```json
{
  "id": "string",
  "name": "string",
  "mobile": "string",
  "email": "string",
  "password": "string",
  "followers": ["string"],
  "following": ["string"],
  "createdAt": "date",
  "updatedAt": "date"
}
```

#### Discussion Schema

```json
{
  "id": "string",
  "userId": "string",
  "text": "string",
  "image": "string",
  "tags": ["string"],
  "likes": ["string"],
  "comments": ["string"],
  "viewCount": "number",
  "createdAt": "date",
  "updatedAt": "date"
}
```

#### Comment Schema

```json
{
  "id": "string",
  "discussionId": "string",
  "userId": "string",
  "text": "string",
  "likes": ["string"],
  "replies": ["string"],
  "createdAt": "date",
  "updatedAt": "date"
}
```

## Installation and Setup

#### Prerequisites

- Docker
- Docker Compose

#### Installation Steps

1. Clone the repository

   ```bash
    git clone https://github.com/AbhishekJadhav2002/spyne_backend_assignment.git
    cd spyne_backend_assignment
   ```

2. Create a `.env` file in the root directory and each individual service directory using the provided `.env.example` file as a reference. For example, in the root directory, run the following command

   ```bash
   cp .env.example .env
   ```

3. Build and start the services using Docker Compose

   ```bash
   docker compose up --build
   ```

4. The services should now be running. You can access the Gateway service at `http://localhost:3000` and the gRPC services at `localhost:50051` (User Service) and `localhost:50052` (Discussion Service), and client UI at `http://localhost:5000`.

## Inter-Service Communication

#### gRPC

The User and Discussion services expose their functionalities through gRPC. The Gateway service uses gRPC clients to communicate with these services.

#### RabbitMQ

RabbitMQ is used for asynchronous communication between services, such as sending notifications based on user actions. Each service publishes messages to RabbitMQ, which can be consumed by other services (e.g., the Notification Service).

## API Endpoints

#### User Service (gRPC Endpoints)

- Create User
- Update User
- Delete User
- List Users
- Search User
- Login
- Signup
- Follow User
- Unfollow User

#### Discussion Service (gRPC Endpoints)

- Create Discussion
- Update Discussion
- Delete Discussion
- Get Discussion
- Search Discussions by Tag
- Search Discussions by Text
- Like Discussion
- Comment on Discussion
- Reply to Comment
- Like Comment

#### Gateway Service (REST Endpoints)

- `/auth/login`: User login
- `/auth/signup`: User signup
- `/users/:id`: Get user by ID
- `/users/search`: Search users by name
- `/discussions`: Create discussion
- `/discussions/:id`: Update discussion
- `/discussions/:id`: Delete discussion
- `/discussions/:id`: Get discussion by ID
- `/discussions/searchByTag`: Search discussions by tag
- `/discussions/searchByText`: Search discussions by text

## API Documentation

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/abhishekjadhav-postman/workspace/spyne-backend-assignment)
