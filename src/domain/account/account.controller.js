import bcrypt from "bcrypt";
import AccountService from "./account.service.js";
import Validation from "../../utils/validation.js";
import { accountUpdateValidation } from "./account.validator.js";

export default class AccountController {

    static async findCode(req, res, next) {
        try {
            const response = await AccountService.findCode(req.params.code);
            res.status(200).json({ 
                message: "Account found successfully", 
                data: response 
            });
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            const data = await Validation.validate(accountUpdateValidation, req.body);
            if (data.password) data.password = await bcrypt.hash(data.password, 10);
            const response = await AccountService.update(req.params.code, data);
            res.status(200).json({ 
                message: "Account updated successfully", 
                data: response 
            });
        } catch (error) {
            next(error);
        }
    }

    static async softDelete(req, res, next) {
        try {
            if (!req.cookies.refresh_token) return res.status(200).json({ message: "account is deleted" });
            const response = await AccountService.softDelete(req.params.code);
            res.clearCookie('refresh_token', { maxAge: 0 });
            res.status(200).json({ 
                message: "Account deleted successfully", 
                data: response 
            });
        } catch (error) {
            next(error);
        }
    }

}