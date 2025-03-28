// Import the zod library for schema validation
import { z } from "zod";

// Define the validation schema for user registration
export const registerValidation = z.object({
    // Validate the first name: must be a string, contain only letters, numbers, and spaces, and be between 2 and 60 characters long
    firstName: z
        .string()
        .min(2, "First name must be at least 2 characters long")
        .max(60, "First name must be at most 60 characters long"),
    // Validate the last name: must be a string, contain only letters, numbers, and spaces, and be at most 60 characters long (optional)
    lastName: z
        .string()
        .max(60, "Last name must be at most 60 characters long")
        .optional(),
    // Validate the username: must be a string, contain only letters, numbers, and underscores, and be between 2 and 60 characters long
    username: z
        .string()
        .regex(
            /^[a-zA-Z0-9_]+$/,
            "Username can only contain letters, numbers, and underscores."
        )
        .min(2, "Username must be at least 2 characters long")
        .max(60, "Username must be at most 60 characters long"),
    // Validate the email: must be a string, follow a valid email format, and ensure characters after '@' are lowercase
    email: z
        .string()
        .email("Invalid email format")
        .regex(
            /^[^\s@]+@[a-z0-9.-]+$/,
            "Email domain must contain only lowercase letters"
        ),
    // Validate the password: must be a string and be between 6 and 28 characters long
    password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .max(28, "Password must be at most 28 characters long"),
    // Validate the password confirmation: must be a string and be between 6 and 28 characters long
    passwordConfirmation: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .max(28, "Password must be at most 28 characters long"),
}).refine((data) => data.password === data.passwordConfirmation, {
    // Ensure that the password and password confirmation match
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
});

// Define the validation schema for user login
export const loginValidation = z.object({
    // Validate the username: must be a string, contain only letters, numbers, spaces, and underscores, and be at most 60 characters long (optional)
    username: z
        .string()
        .regex(
            /^[a-zA-Z0-9\s_]+$/,
            "Username can only contain letters, numbers, spaces, and underscores."
        )
        .max(60, "Username must be at most 60 characters long")
        .optional(),
    // Validate the email: must be a string and follow a valid email format (optional)
    email: z
        .string()
        .email("Invalid email format")
        .optional(),
    // Validate the password: must be a string and be between 6 and 28 characters long
    password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .max(28, "Password must be at most 28 characters long"),
});