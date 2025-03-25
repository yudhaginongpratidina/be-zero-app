# Account Module Documentation

## Endpoints

### 1. Find Account by Code

**Endpoint:** `GET /account/:code`

**Description:** Retrieve account details by account code.

**Request Parameters:**
- `code` (string, required): The account code.

**Response:**
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "message": "Account found successfully",
    "data": {
      "code": "string",
      "firstName": "string",
      "lastName": "string",
      "username": "string",
      "email": "string",
      "role": "string",
      "image": "string",
      "createdAt": "string"
    }
  }
  ```

**Error Responses:**
- **Status Code:** `404 Not Found`
- **Body:**
  ```json
  {
    "message": "Account not found"
  }
  ```

### 2. Update Account

**Endpoint:** `PATCH /account/:code`

**Description:** Update account details by account code.

**Request Parameters:**
- `code` (string, required): The account code.

**Request Body:**
- `firstName` (string, optional): First name (2-60 characters, letters, numbers, spaces).
- `lastName` (string, optional): Last name (max 60 characters, letters, numbers, spaces).
- `password` (string, optional): Password (6-28 characters).
- `passwordConfirmation` (string, optional): Password confirmation (must match password).

**Response:**
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "message": "Account updated successfully",
    "data": {
      "code": "string",
      "firstName": "string",
      "lastName": "string",
      "username": "string",
      "email": "string",
      "password": "string",
      "role": "string",
      "image": "string",
      "updatedAt": "string"
    }
  }
  ```

**Error Responses:**
- **Status Code:** `404 Not Found`
- **Body:**
  ```json
  {
    "message": "Account not found"
  }
  ```
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "message": "Validation error",
    "errors": {
      "field": "error message"
    }
  }
  ```

### 3. Soft Delete Account

**Endpoint:** `DELETE /account/:code`

**Description:** Soft delete an account by account code.

**Request Parameters:**
- `code` (string, required): The account code.

**Response:**
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "message": "Account deleted successfully",
    "data": {
      "code": "string",
      "deleted": true
    }
  }
  ```

**Error Responses:**
- **Status Code:** `404 Not Found`
- **Body:**
  ```json
  {
    "message": "Account not found"
  }
  ```

## Validation Schema

### Account Update Validation

**Schema:**
```javascript
import { z } from "zod";

export const accountUpdateValidation = z.object({
    firstName: z
        .string()
        .regex(
            /^[a-zA-Z0-9\s]+$/,
            "First name can only contain letters, numbers, and spaces."
        )
        .min(2, "First name must be at least 2 characters long")
        .max(60, "First name must be at most 60 characters long")
        .optional(),
    lastName: z
        .string()
        .regex(
            /^[a-zA-Z0-9\s]+$/,
            "Last name can only contain letters, numbers, and spaces."
        )
        .max(60, "Last name must be at most 60 characters long")
        .optional(),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .max(28, "Password must be at most 28 characters long")
        .optional(),
    passwordConfirmation: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .max(28, "Password must be at most 28 characters long")
        .optional(),
}).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
});
```

This schema validates the following fields:
- `firstName`: Optional, must be a string containing only letters, numbers, and spaces, with a length between 2 and 60 characters.
- `lastName`: Optional, must be a string containing only letters, numbers, and spaces, with a maximum length of 60 characters.
- `password`: Optional, must be a string with a length between 6 and 28 characters.
- `passwordConfirmation`: Optional, must be a string with a length between 6 and 28 characters, and must match the password field.
