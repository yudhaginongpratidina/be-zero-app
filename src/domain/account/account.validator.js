import { z } from "zod";

// Define validation schema for account update
// This schema validates the following fields:
// - firstName: Optional, must be a string containing only letters, numbers, and spaces, with a length between 2 and 60 characters.
// - lastName: Optional, must be a string containing only letters, numbers, and spaces, with a maximum length of 60 characters.
// - password: Optional, must be a string with a length between 6 and 28 characters.
// - passwordConfirmation: Optional, must be a string with a length between 6 and 28 characters, and must match the password field.
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