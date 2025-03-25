// import
import { z } from "zod";

// register validation
export const registerValidation = z.object({
    firstName: z
        .string()
        .regex(
            /^[a-zA-Z0-9\s]+$/,
            "First name can only contain letters, numbers, and spaces."
        )
        .min(2, "First name must be at least 2 characters long")
        .max(60, "First name must be at most 60 characters long"),
    lastName: z
        .string()
        .regex(
            /^[a-zA-Z0-9\s]+$/,
            "Last name can only contain letters, numbers, and spaces."
        )
        .max(60, "Last name must be at most 60 characters long")
        .optional(),
    username: z
        .string()
        .regex(
            /^[a-zA-Z0-9\s_]+$/,
            "Username can only contain letters, numbers, spaces, and underscores."
        )
        .min(2, "Username must be at least 2 characters long")
        .max(60, "Username must be at most 60 characters long"),
    email: z
        .string()
        .email("Invalid email format"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .max(28, "Password must be at most 28 characters long"),
    passwordConfirmation: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .max(28, "Password must be at most 28 characters long"),
}).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
});

// login validation
export const loginValidation = z.object({
    username: z
        .string()
        .regex(
            /^[a-zA-Z0-9\s_]+$/,
            "Username can only contain letters, numbers, spaces, and underscores."
        )
        .max(60, "Username must be at most 60 characters long")
        .optional(),
    email: z
        .string()
        .email("Invalid email format")
        .optional(),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .max(28, "Password must be at most 28 characters long"),
});