import prisma from "../../utils/prisma.js";

export default class AccountRepository {

    static async findCode(code) {
        const account = await prisma.user.findUnique({
            where: {
                code: code
            },
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
        return account;
    }

    static async update(code, data) {
        const account = await prisma.user.update({
            where: {
                code: code
            },
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

    static async softDelete(code) {
        const account = await prisma.user.update({
            where: {
                code: code
            },
            data: {
                deleted: true
            }
        });
        return account;
    }

}