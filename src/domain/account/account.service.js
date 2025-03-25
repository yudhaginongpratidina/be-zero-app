import AccountRepository from "./account.repository.js";
import ResponseError from "../../utils/response-error.js";

export default class AccountService {

    /**
     * Find an account by code.
     * @param {string} code - The account code.
     * @returns {Promise<Object>} The account data.
     * @throws {ResponseError} If the account is not found.
     */
    static async findCode(code) {
        // Call repository to find account
        const account = await AccountRepository.findCode(code);
        // Throw error if account not found
        if (!account) throw new ResponseError(404, "Account not found");
        // Return account data
        return account;
    }

    /**
     * Update an account.
     * @param {string} code - The account code.
     * @param {Object} data - The account data to update.
     * @returns {Promise<Object>} The updated account data.
     * @throws {ResponseError} If the account is not found.
     */
    static async update(code, data) {
        // Find account first
        const account = await AccountService.findCode(code);
        // Throw error if account not found
        if (!account) throw new ResponseError(404, "Account not found");
        // Call repository to update account
        const updated = await AccountRepository.update(code, data);
        // Return updated account data
        return updated;
    }

    /**
     * Soft delete an account.
     * @param {string} code - The account code.
     * @returns {Promise<Object>} The result of the soft delete operation.
     * @throws {ResponseError} If the account is not found.
     */
    static async softDelete(code) {
        // Find account first
        const account = await AccountService.findCode(code);
        // Throw error if account not found
        if (!account) throw new ResponseError(404, "Account not found");
        // Call repository to soft delete account
        return await AccountRepository.softDelete(code);
    }

}