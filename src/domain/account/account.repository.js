import prisma from "../../utils/prisma.js";

export default class AccountRepository {

    /**
     * Find an account by code.
     * @param {string} code - The account code.
     * @returns {Promise<Object>} The account data.
     */
    static async findCode(code) {
        const account = await prisma.user.findUnique({
            where: {code: code},
            select: {
                code: true,
                firstName: true,
                lastName: true,
                username: true,
                email: true,
                role: true,
                image: true,
                createdAt: true,
            }
        });
        // Return account data
        return account;
    }

    /**
     * Update an account.
     * @param {string} code - The account code.
     * @param {Object} data - The account data to update.
     * @returns {Promise<Object>} The updated account data.
     */
    static async update(code, data) {
        const account = await prisma.user.update({
            where: {code: code},
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                image: data.image,
                password: data.password,
                updatedAt: new Date()
            },
            select: {
                code: true,
                firstName: true,
                lastName: true,
                username: true,
                email: true,
                password: true,
                role: true,
                image: true,
                updatedAt: true
            }
        });
        return account;
    }

    /**
     * Soft delete an account.
     * @param {string} code - The account code.
     * @returns {Promise<Object>} The result of the soft delete operation.
     */
    static async softDelete(code) {
        const account = await prisma.user.update({
            where: {code: code},
            data: { deleted: true }
        });
        return account;
    }

}