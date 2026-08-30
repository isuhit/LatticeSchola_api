# LatticeSchola API

A RESTful Student Management API built with Node.js, Express, and MongoDB.

The project is being developed as a practical backend engineering project, with emphasis on clean architecture, validation, error handling, relationships, and production readiness.

---

## Current Status

**Version:** v1.0 — Student Management & Course Module

### Completed

- Student CRUD operations
- Request validation with Joi
- Centralized error handling
- Custom `AppError` class
- Async controller handling with `asyncHandler`
- Course management
- Student-course relationships
- Mongoose references and `populate()`
- Student filtering
- Pagination
- Sorting
- Postman API testing collection
- API documentation

### In Progress

- Deployment

---

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **Joi**
- **Postman**

---

## Architecture

The API follows a layered architecture:

```text
Route
  ↓
Middleware
  ↓
Controller
  ↓
Service
  ↓
Model
  ↓
MongoDB
```

### Responsibilities

**Routes**

Define API endpoints and connect requests to the appropriate middleware and controllers.

**Middleware**

Handles cross-cutting request processing such as validation and error forwarding.

**Controllers**

Handle HTTP requests and responses. Controllers delegate business logic to services.

**Services**

Contain business logic and database operations.

**Models**

Define the structure of MongoDB documents and provide the interface for database operations through Mongoose.

---

## Project Structure

```text
src/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── validators/
├── app.js
└── server.js

postman/
└── LatticeSchola.postman_collection.json
```

---

# Getting Started

## Prerequisites

Make sure you have installed:

- Node.js
- MongoDB
- Git

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate into the project:

```bash
cd latticeschola-api
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
MONGO_URL=your_mongodb_connection_string
PORT=5000
```

Do not commit your `.env` file to version control.

---

## Running the API

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

The development server uses Nodemon for automatic restarts.

---

# API Reference

Base URL:

```text
/api
```

## Student Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/students` | Create a student |
| `GET` | `/api/students` | Retrieve students |
| `GET` | `/api/students/:id` | Retrieve a student by ID |
| `PUT` | `/api/students/:id` | Update a student |
| `DELETE` | `/api/students/:id` | Delete a student |
| `POST` | `/api/students/:studentId/course/:courseId` | Assign a course to a student |
| `GET` | `/api/students/:studentId/courses` | Retrieve a student's courses |

---

# Student API

## Create Student

### `POST /api/students`

Creates a new student.

### Request Body

```json
{
  "registrationNumber": "2022/CS/048",
  "firstName": "Blessing",
  "lastName": "Ibet",
  "email": "blessing.ibet@student.edu.ng",
  "phone": "+2348145678901",
  "gender": "Male",
  "level": 300,
  "status": "Pending"
}
```

### Validation

- `gender`: `Male` or `Female`
- `level`: `100`, `200`, `300`, or `400`
- `status`: `Registered` or `Pending`
- Required fields must satisfy the student validation schema.

### Success Response

**201 Created**

```json
{
  "success": true,
  "message": "Student created successfully",
  "data": {
    "...": "created student"
  }
}
```

---

## Get Students

### `GET /api/students`

Retrieves students with optional filtering, pagination, and sorting.

### Query Parameters

| Parameter | Type | Allowed Values | Default | Description |
|---|---|---|---|---|
| `level` | Number | `100`, `200`, `300`, `400` | — | Filter students by level |
| `status` | String | `Registered`, `Pending` | — | Filter students by status |
| `gender` | String | `Male`, `Female` | — | Filter students by gender |
| `page` | Number | Positive integer | `1` | Page number |
| `limit` | Number | `1–100` | `20` | Number of students per page |
| `sort` | String | `firstName`, `-createdAt` | `-createdAt` | Sort the results |

Unknown query parameters are rejected.

### Example Request

```http
GET /api/students?level=300&status=Registered&page=2&limit=3&sort=firstName
```

### Response Fields

| Field | Type | Description |
|---|---|---|
| `success` | Boolean | Indicates whether the request succeeded |
| `message` | String | Human-readable response message |
| `page` | Number | Current page |
| `pages` | Number | Total number of pages |
| `limit` | Number | Maximum number of students per page |
| `size` | Number | Number of students returned in the current response |
| `total` | Number | Total number of students matching the filters |
| `data` | Array | Students returned for the current page |

### Pagination

The number of pages is calculated as:

```text
pages = Math.ceil(total / limit)
```

For example:

```text
total = 37
limit = 3

pages = 13
```

`total` represents all matching students, while `size` represents the number of students returned in the current response.

### Example Response

**200 OK**

```json
{
  "success": true,
  "message": "Students retrieved successfully",
  "page": 2,
  "pages": 13,
  "limit": 3,
  "size": 3,
  "total": 37,
  "data": [
    {
      "firstName": "Blessing",
      "lastName": "Ibet",
      "email": "blessing.ibet@student.edu.ng",
      "level": 300
    },
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "level": 300
    },
    {
      "firstName": "Mary",
      "lastName": "James",
      "email": "mary@example.com",
      "level": 300
    }
  ]
}
```

### Empty Results

A valid query that matches no students does not produce an error.

```json
{
  "success": true,
  "message": "Students retrieved successfully",
  "page": 1,
  "pages": 0,
  "limit": 20,
  "size": 0,
  "total": 0,
  "data": []
}
```

---

## Get Student by ID

### `GET /api/students/:id`

Retrieves a single student by MongoDB ID.

### Success Response

**200 OK**

```json
{
  "success": true,
  "message": "Student retrieved successfully",
  "data": {
    "...": "student"
  }
}
```

### Possible Errors

**400 Bad Request**

Returned when the supplied ID has an invalid format.

```json
{
  "success": false,
  "message": "Invalid ID format"
}
```

**404 Not Found**

Returned when the ID is valid but the student does not exist.

```json
{
  "success": false,
  "message": "Student not found"
}
```

---

## Update Student

### `PUT /api/students/:id`

Updates an existing student.

The request body is validated before reaching the service layer.

### Success Response

**200 OK**

```json
{
  "success": true,
  "message": "Student updated successfully",
  "data": {
    "...": "updated student"
  }
}
```

### Possible Errors

**400 Bad Request**

- Invalid student ID format
- Invalid request body

**404 Not Found**

The student does not exist.

---

## Delete Student

### `DELETE /api/students/:id`

Deletes an existing student.

### Success Response

**200 OK**

```json
{
  "success": true,
  "message": "Student deleted successfully",
  "data": {
    "...": "deleted student"
  }
}
```

### Possible Errors

**400 Bad Request**

```json
{
  "success": false,
  "message": "Invalid ID format"
}
```

**404 Not Found**

```json
{
  "success": false,
  "message": "Student not found"
}
```

---

# Course & Student Relationships

## Assign Course to Student

### `POST /api/students/:studentId/course/:courseId`

Assigns an existing course to a student.

### Success Response

**200 OK**

```json
{
  "success": true,
  "message": "Course assigned successfully",
  "data": {
    "...": "updated student"
  }
}
```

### Possible Errors

**400 Bad Request**

Returned for an invalid student or course ID format.

```json
{
  "success": false,
  "message": "Invalid ID format"
}
```

**404 Not Found**

Returned when the student or course does not exist.

```json
{
  "success": false,
  "message": "Student not found"
}
```

or:

```json
{
  "success": false,
  "message": "Course does not exist"
}
```

**409 Conflict**

Returned when the course has already been assigned to the student.

```json
{
  "success": false,
  "message": "Course already exists for this student"
}
```

---

## Get Student Courses

### `GET /api/students/:studentId/courses`

Retrieves a student's courses.

Courses are populated from their referenced Course documents.

### Success Response

**200 OK**

```json
{
  "success": true,
  "message": "Student courses retrieved successfully",
  "data": {
    "_id": "student-id",
    "registrationNumber": "2022/CS/048",
    "firstName": "Blessing",
    "lastName": "Ibet",
    "email": "blessing.ibet@student.edu.ng",
    "courses": [
      {
        "_id": "course-id",
        "title": "Introduction to Information Systems",
        "code": "INF121",
        "description": "Introduction to information systems",
        "creditUnit": 3,
        "lecturer": "Dr. John Doe"
      }
    ],
    "level": 300,
    "status": "Pending"
  }
}
```

### Possible Errors

**400 Bad Request**

Invalid student ID format.

**404 Not Found**

The student does not exist.

---

# Validation

Request validation is handled using Joi.

Validation is performed at the request boundary before data reaches the service layer.

For query parameters:

```text
Client Request
      ↓
Joi Validation
      ↓
req.validQuery
      ↓
Controller
      ↓
Service
```

Unknown query parameters are rejected.

For request bodies, validated values are assigned back to the request body before reaching the controller.

---

# Error Handling

The API uses a centralized error-handling system.

## AppError

`AppError` is a custom error class used to create application-level errors with a status code and message.

Example:

```js
throw new AppError("Student not found", 404);
```

The centralized error middleware converts these errors into structured HTTP responses.

## AsyncHandler

Controllers use `asyncHandler` to forward asynchronous errors to the centralized error middleware without repetitive `try/catch` blocks.

```text
Async Controller
      ↓
asyncHandler
      ↓
Error Middleware
      ↓
Structured Response
```

## Common Status Codes

| Status | Meaning |
|---|---|
| `200` | Successful request |
| `201` | Resource successfully created |
| `400` | Invalid request or validation failure |
| `404` | Requested resource does not exist |
| `409` | Request conflicts with existing data |
| `500` | Unexpected server error |

---

# Testing

The API is tested using Postman.

The Postman collection is included in:

```text
postman/
└── LatticeSchola.postman_collection.json
```

The collection covers:

- Student CRUD operations
- Student filtering
- Pagination
- Sorting
- Course assignment
- Student course retrieval
- Request validation
- Invalid ID formats
- Resource-not-found scenarios
- Duplicate course assignment

---

# Development Scripts

```bash
npm run dev
```

Starts the development server using Nodemon.

```bash
npm start
```

Starts the API using Node.js.

The current `npm test` script is the default placeholder and is not currently used for API testing. API testing is currently performed through Postman.

---

# Roadmap

## Current — Production Readiness

- [x] Student CRUD
- [x] Request validation
- [x] Centralized error handling
- [x] Course model
- [x] Student-course relationships
- [x] Mongoose population
- [x] Filtering
- [x] Pagination
- [x] Sorting
- [x] Postman collection
- [x] API documentation
- [ ] Deployment

## Future Improvements

Potential future improvements may include:

- Database indexes
- More advanced filtering and sorting
- Automated tests
- Improved API observability
- Authentication and authorization
- Rate limiting
- Additional production optimizations

---

# Learning Goals

This project is being used to develop practical backend engineering skills through progressive implementation.

Key concepts covered include:

- REST API design
- Layered architecture
- Middleware
- Request validation
- Error handling
- MongoDB and Mongoose
- Database relationships
- ObjectId references
- Mongoose `populate()`
- Filtering
- Pagination
- Sorting
- API documentation
- API testing
- Deployment

---

# License

This project is currently for educational and development purposes.
