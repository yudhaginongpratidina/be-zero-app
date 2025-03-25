# Authentication Module Developer Guide

## Endpoints

### 1. Register a New User

**Endpoint:** `POST /auth/register`

**Description:** Registers a new user.

**Request Body:**
```json
{
    "firstName": "John",
    "lastName": "Doe",
    "username": "johndoe",
    "email": "john.doe@example.com",
    "password": "password123",
    "passwordConfirmation": "password123"
}
```

**Response:**
```json
{
    "message": "User created successfully",
    "data": {
        "code": "USER1",
        "firstName": "John",
        "lastName": "Doe",
        "username": "johndoe",
        "email": "john.doe@example.com",
        "createdAt": "2023-10-01T00:00:00.000Z",
        "updatedAt": "2023-10-01T00:00:00.000Z"
    }
}
```

**Status Codes:**
- `201 Created`: User created successfully.
- `400 Bad Request`: Invalid input or user already exists.

### 2. Login a User

**Endpoint:** `POST /auth/login`

**Description:** Logs in an existing user.

**Request Body:**
```json
{
    "email": "john.doe@example.com",
    "password": "password123"
}
```
or
```json
{
    "username": "johndoe",
    "password": "password123"
}
```

**Response:**
```json
{
    "message": "User logged in successfully",
    "data": "access_token"
}
```

**Status Codes:**
- `200 OK`: User logged in successfully.
- `400 Bad Request`: Invalid input or user not found.

### 3. Refresh Token

**Endpoint:** `GET /auth/token`

**Description:** Refreshes the access token using the refresh token.

**Response:**
```json
{
    "message": "Token refreshed successfully",
    "token": "new_access_token"
}
```

**Status Codes:**
- `200 OK`: Token refreshed successfully.
- `401 Unauthorized`: No refresh token provided.
- `403 Forbidden`: Invalid refresh token.

### 4. Logout a User

**Endpoint:** `GET /auth/logout`

**Description:** Logs out the user.

**Response:**
```json
{
    "message": "User logged out successfully"
}
```

**Status Codes:**
- `200 OK`: User logged out successfully.

## Controllers

### AuthController

- **register(req, res, next)**: Handles user registration.
- **login(req, res, next)**: Handles user login.
- **refresh_token(req, res, next)**: Handles token refresh.
- **logout(req, res, next)**: Handles user logout.

## Services

### AuthService

- **register(data)**: Registers a new user.
- **loginWithEmail(data)**: Logs in a user using their email.
- **loginWithUsername(data)**: Logs in a user using their username.

## Repositories

### AuthRepository

- **len()**: Gets the total number of users.
- **findUsername(username)**: Finds a user by their username.
- **findEmail(email)**: Finds a user by their email.
- **register(data)**: Registers a new user.
- **loginWithEmail(email)**: Finds a user by their email for login.
- **loginWithUsername(username)**: Finds a user by their username for login.

## Validators

### auth.validator.js

- **registerValidation**: Schema for validating user registration data.
- **loginValidation**: Schema for validating user login data.

## Middleware

### verify-token.middleware.js

- **VerfyToken**: Middleware to verify JWT tokens.

## Utilities

### validation.js

- **validate(schema, data)**: Validates data against a schema.

### response-error.js

- **ResponseError**: Custom error class for handling response errors.

### generate-custom-identifier.js

- **generateCustomUserIdentifier(prefix)**: Generates a custom user identifier.

## Environment Variables

- **JWT_ACCESS_TOKEN_SECRET**: Secret key for signing access tokens.
- **JWT_ACCESS_TOKEN_EXPIRES_IN**: Expiration time for access tokens.
- **JWT_REFRESH_TOKEN_SECRET**: Secret key for signing refresh tokens.
- **JWT_REFRESH_TOKEN_EXPIRES_IN**: Expiration time for refresh tokens.

