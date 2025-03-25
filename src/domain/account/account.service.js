import AccountRepository from "./account.repository.js";
import ResponseError from "../../utils/response-error.js";

export default class AccountService {

    static async findCode(code) {
        const account = await AccountRepository.findCode(code);
        if (!account) throw new ResponseError(404, "Account not found");
        return account;
    }

    static async update(code, data) {
        const account = await AccountService.findCode(code);
        if (!account) throw new ResponseError(404, "Account not found");
        const updated = await AccountRepository.update(code, data);
        return updated;
    }

    static async softDelete(code) {
        const account = await AccountService.findCode(code);
        if (!account) throw new ResponseError(404, "Account not found");
        return await AccountRepository.softDelete(code);
    }

}