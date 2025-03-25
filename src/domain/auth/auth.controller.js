import jwt from "jsonwebtoken";
import Validation from "../../utils/validation.js";
import { registerValidation, loginValidation } from "./auth.validator.js";
import AuthService from "./auth.service.js";

export default class AuthController {

    static async register(req, res, next) {
        try {
            const data = await Validation.validate(registerValidation, req.body);
            const response = await AuthService.register(data);
            res.status(201).json({
                message: "User created successfully",
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const data = await Validation.validate(loginValidation, req.body);

            let response;
            if (data.email) response = await AuthService.loginWithEmail(data);
            if (data.username) response = await AuthService.loginWithUsername(data);
            if (!data.email && !data.username) throw new Error("Email or username must be provided");

            const code = response.code;
            const role = response.role;

            const access_token = jwt.sign({ code, role }, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN });
            const refresh_token = jwt.sign({ code, role }, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN });
            res.cookie("refresh_token", refresh_token, { httpOnly: true, secure: true, sameSite: "None", maxAge: 24 * 60 * 60 * 1000, partitioned: true });

            res.status(200).json({
                message: "User logged in successfully",
                data: access_token
            });
        } catch (error) {
            next(error);
        }
    }

    static async refresh_token(req, res, next) {
        try {
            const refresh_token = req.cookies.refresh_token;
            if (!refresh_token) return res.sendStatus(401);

            const decoded = jwt.verify(refresh_token, process.env.JWT_REFRESH_TOKEN_SECRET);
            if (!decoded) return res.sendStatus(403);

            const code = decoded.code;
            const role = decoded.role;
            const access_token = jwt.sign({ code, role }, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN });

            res.status(200).json({ message: "Token refreshed successfully", token: access_token });
        } catch (error) {
            next(error);
        }
    }

    static async logout(req, res, next) {
        try {
            if (!req.cookies.refresh_token) return res.status(200).json({ message: "user not logged in" });
            res.clearCookie('refresh_token', { maxAge: 0 });
            res.status(200).json({ message: "User logged out successfully" });
        } catch (error) {
            next(error);
        }
    }

}