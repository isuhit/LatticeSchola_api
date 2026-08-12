# LatticeSchola API

A backend REST API for managing student information, built with Node.js, Express, MongoDB, and Mongoose.

LatticeSchola is being developed as a progressive backend engineering project. The goal is not only to build working endpoints, but to apply clean architecture, validation, error handling, and scalable API design while continuously improving the system through future versions.

## Current Version

**v1.0 — Student Management Module**

The current version implements complete CRUD operations for students, along with request validation, centralized error handling, and API testing.

---

## Tech Stack

* **Node.js** — JavaScript runtime
* **Express.js** — Web framework
* **MongoDB** — Database
* **Mongoose** — MongoDB ODM
* **Joi** — Request validation
* **dotenv** — Environment variable management
* **Nodemon** — Development server

---

## Project Architecture

The API follows a layered architecture:

```text
Client
   ↓
Express App
   ↓
Routes
   ↓
Controllers
   ↓
Services
   ↓
Models
   ↓
MongoDB
```

### Responsibilities

**Routes**

* Define API endpoints.
* Connect incoming requests to controllers.
* Apply request validation middleware.

**Controllers**

* Handle HTTP requests and responses.
* Extract data from requests.
* Delegate business operations to services.

**Services**

* Contain application/business logic.
* Communicate with Mongoose models.
* Handle business rules such as duplicate detection.

**Models**

* Define database schemas.
* Handle persistence through Mongoose.

**Middleware**

* Validate incoming requests.
* Handle errors centrally.
* Manage asynchronous controller errors.

---

## Project Structure

```text
src/
├── controllers/
│   └── student.controller.js
│
├── middleware/
│   ├── error.middleware.js
│   └── validate.middleware.js
│
├── models/
│   └── student.model.js
│
├── routes/
│   └── student.routes.js
│
├── services/
│   └── student.service.js
│
├── utils/
│   ├── app-error.js
│   └── async-handler.js
│
├── validators/
│   └── student.validators.js
│
├── app.js
└── server.js
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd LatticeSchola-API
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
```

Do not commit your `.env` file or expose your database credentials.

### 4. Start the development server

```bash
npm run dev
```

The API will run on:

```text
http://localhost:3000
```

### 5. Start in production mode

```bash
npm start
```

---

# Student API

Base URL:

```text
/api/students
```

## Endpoints

| Method | Endpoint            | Description         |
| ------ | ------------------- | ------------------- |
| POST   | `/api/students`     | Create a student    |
| GET    | `/api/students`     | Get all students    |
| GET    | `/api/students/:id` | Get a student by ID |
| PUT    | `/api/students/:id` | Update a student    |
| DELETE | `/api/students/:id` | Delete a student    |

---

## Create Student

### Request

```http
POST /api/students
```

Example request body:

```json
{
  "registrationNumber": "REG/2024/003",
  "firstName": "David",
  "lastName": "Okoro",
  "email": "david@example.com",
  "phone": "+2348012345678",
  "gender": "Male",
  "department": "YOUR_DEPARTMENT_ID",
  "level": 200,
  "status": "Registered"
}
```

### Successful Response

```json
{
  "success": true,
  "message": "Student created successfully",
  "data": {}
}
```

Returns:

```text
201 Created
```

---

## Get All Students

```http
GET /api/students
```

Returns:

```text
200 OK
```

Example:

```json
{
  "success": true,
  "message": "Students retrieved successfully",
  "data": []
}
```

---

## Get Student by ID

```http
GET /api/students/:id
```

Returns:

```text
200 OK
```

If the student does not exist:

```text
404 Not Found
```

---

## Update Student

```http
PUT /api/students/:id
```

Only supplied fields are updated.

Example:

```json
{
  "email": "updated@example.com"
}
```

Returns:

```text
200 OK
```

Request validation is applied to supplied fields.

---

## Delete Student

```http
DELETE /api/students/:id
```

Returns:

```text
200 OK
```

Example:

```json
{
  "success": true,
  "message": "Student deleted successfully",
  "data": {}
}
```

---

# Validation

The API uses **Joi** for request-level validation.

Validation is applied before requests reach the controller.

```text
Request
   ↓
Validation
   ↓
Controller
   ↓
Service
   ↓
Database
```

Invalid requests are rejected with a `400 Bad Request` response.

Examples include:

* Missing required fields
* Invalid email addresses
* Invalid gender values
* Invalid student levels
* Invalid update values

---

# Error Handling

The API uses centralized error handling.

Application errors can provide specific HTTP status codes:

| Situation                     | Status |
| ----------------------------- | -----: |
| Invalid request data          |    400 |
| Invalid MongoDB ObjectId      |    400 |
| Student not found             |    404 |
| Duplicate email               |    409 |
| Duplicate registration number |    409 |
| Unexpected server error       |    500 |

Example:

```json
{
  "success": false,
  "message": "Student not found"
}
```

---

# Testing

The Student API has been tested using Postman.

The test coverage currently includes:

* Successful student creation
* Duplicate email handling
* Student retrieval
* Student retrieval by ID
* Nonexistent student handling
* Invalid ObjectId handling
* Successful student updates
* Invalid update data
* Student deletion
* Verification that deleted students can no longer be retrieved

---

# Development Scripts

### Development

```bash
npm run dev
```

Runs the API using Nodemon.

### Production

```bash
npm start
```

Runs the API using Node.js.

---

# Roadmap

LatticeSchola is being developed incrementally.

### v1.0 — Student Management

* [x] Project setup
* [x] Express server
* [x] MongoDB connection
* [x] Student model
* [x] Create student
* [x] Get students
* [x] Get student by ID
* [x] Update student
* [x] Delete student
* [x] Request validation
* [x] Centralized error handling
* [x] Postman testing

### v1.x — Improvements

* [ ] Search
* [ ] Pagination
* [ ] Sorting
* [ ] Improved API documentation
* [ ] Deployment

### v2.0 — Courses & Relationships

* [ ] Course model
* [ ] Department model
* [ ] Student-course relationships
* [ ] MongoDB references
* [ ] Mongoose `populate()`
* [ ] Course management endpoints

Future versions will expand the system into a more complete student management platform.

---

## Learning Goals

This project is also a practical backend engineering learning journey.

Key concepts being developed include:

* REST API design
* Express.js
* MongoDB and Mongoose
* Layered architecture
* Separation of concerns
* Service-oriented thinking
* Request validation
* Error handling
* Async JavaScript
* API testing
* Git and GitHub
* Production-oriented backend practices

---

## Author

**Isuho Friday**

Backend Developer in training, focused on building practical backend systems with Node.js and continuously improving software engineering fundamentals.
