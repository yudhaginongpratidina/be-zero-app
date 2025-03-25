import jwt from "jsonwebtoken";
import Validation from "../../utils/validation.js";
import { registerValidation, loginValidation } from "./auth.validator.js";
import AuthService from "./auth.service.js";

// AuthController class handles authentication-related operations
export default class AuthController {

    // Register a new user
    static async register(req, res, next) {
        try {
            // Validate the request body against the registerValidation schema
            const data = await Validation.validate(registerValidation, req.body);
            // Call the AuthService to register the user
            const response = await AuthService.register(data);
            // Send a success response with the registered user data
            res.status(201).json({
                message: "User created successfully",
                data: response
            });
        } catch (error) {
            // Pass any errors to the next middleware
            next(error);
        }
    }

    // Log in an existing user
    static async login(req, res, next) {
        try {
            // Validate the request body against the loginValidation schema
            const data = await Validation.validate(loginValidation, req.body);

            let response;
            // Log in with email if provided
            if (data.email) response = await AuthService.loginWithEmail(data);
            // Log in with username if provided
            if (data.username) response = await AuthService.loginWithUsername(data);
            // Throw an error if neither email nor username is provided
            if (!data.email && !data.username) throw new Error("Email or username must be provided");

            const code = response.code;
            const role = response.role;

            // Generate access and refresh tokens
            const access_token = jwt.sign({ code, role }, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN });
            const refresh_token = jwt.sign({ code, role }, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN });
            // Set the refresh token as an HTTP-only cookie
            res.cookie("refresh_token", refresh_token, { httpOnly: true, secure: true, sameSite: "None", maxAge: 24 * 60 * 60 * 1000, partitioned: true });

            // Send a success response with the access token
            res.status(200).json({
                message: "User logged in successfully",
                data: access_token
            });
        } catch (error) {
            // Pass any errors to the next middleware
            next(error);
        }
    }

    // Refresh the access token using the refresh token
    static async refresh_token(req, res, next) {
        try {
            // Get the refresh token from cookies
            const refresh_token = req.cookies.refresh_token;
            // If no refresh token is found, send a 401 Unauthorized response
            if (!refresh_token) return res.sendStatus(401);

            // Verify the refresh token
            const decoded = jwt.verify(refresh_token, process.env.JWT_REFRESH_TOKEN_SECRET);
            // If the token is invalid, send a 403 Forbidden response
            if (!decoded) return res.sendStatus(403);

            const code = decoded.code;
            const role = decoded.role;
            // Generate a new access token
            const access_token = jwt.sign({ code, role }, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN });

            // Send a success response with the new access token
            res.status(200).json({ message: "Token refreshed successfully", token: access_token });
        } catch (error) {
            // Pass any errors to the next middleware
            next(error);
        }
    }

    // Log out the user
    static async logout(req, res, next) {
        try {
            // If no refresh token is found in cookies, send a response indicating the user is not logged in
            if (!req.cookies.refresh_token) return res.status(200).json({ message: "user not logged in" });
            // Clear the refresh token cookie
            res.clearCookie('refresh_token', { maxAge: 0 });
            // Send a success response indicating the user has logged out
            res.status(200).json({ message: "User logged out successfully" });
        } catch (error) {
            // Pass any errors to the next middleware
            next(error);
        }
    }

}