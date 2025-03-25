import bcrypt from "bcrypt";
import AccountService from "./account.service.js";
import Validation from "../../utils/validation.js";
import { accountUpdateValidation } from "./account.validator.js";

export default class AccountController {

    /**
     * Find an account by code.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     */
    static async findCode(req, res, next) {
        try {
            // Call service to find account
            const response = await AccountService.findCode(req.params.code);
            // Send success response
            res.status(200).json({ 
                message: "Account found successfully", 
                data: response 
            });
        } catch (error) {
            // Pass error to error handler
            next(error);
        }
    }

    /**
     * Update an account.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     */
    static async update(req, res, next) {
        try {
            // Validate request body
            const data = await Validation.validate(accountUpdateValidation, req.body);
            // Hash password if present
            if (data.password) data.password = await bcrypt.hash(data.password, 10);
            // Call service to update account
            const response = await AccountService.update(req.params.code, data);
            // Send success response
            res.status(200).json({ 
                message: "Account updated successfully", 
                data: response 
            });
        } catch (error) {
            // Pass error to error handler
            next(error);
        }
    }

    /**
     * Soft delete an account.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     */
    static async softDelete(req, res, next) {
        try {
            // Check for refresh token
            if (!req.cookies.refresh_token) return res.status(200).json({ message: "account is deleted" });
            // Call service to soft delete account
            const response = await AccountService.softDelete(req.params.code);
            // Clear refresh token cookie
            res.clearCookie('refresh_token', { maxAge: 0 });
            // Send success response
            res.status(200).json({ 
                message: "Account deleted successfully", 
                data: response 
            });
        } catch (error) {
            // Pass error to error handler
            next(error);
        }
    }

}