import prisma from "../../utils/prisma.js";

export default class AuthRepository {

    static async len() { 
        const count = await prisma.user.count();
        return count;
    }

    static async findUsername(username) {
        const user = await prisma.user.findUnique({
            where: {
                username: username,
            },
            select: {
                username: true
            }
        });
        return user;
    }

    static async findEmail(email) {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            },
            select: {
                email: true
            }
        });
        return user;
    }

    static async register(data) {
        const {code, firstName, lastName, username, email, password} = data;

        const user = await prisma.user.create({
            data: {
                code        : code,
                firstName   : firstName,
                lastName    : lastName,
                username    : username,
                email       : email,
                password    : password
            },
            select: {
                code        : true,
                firstName   : true,
                lastName    : true,
                username    : true,
                email       : true,
                createdAt   : true,
                updatedAt   : true
            }
        });

        return user;
    }

    static loginWithEmail(email) {
        const user = prisma.user.findUnique({
            where: {
                email: email
            },
            select: {
                code        : true,
                email       : true,
                password    : true,
                role        : true,
                deleted     : true
            }
        });
        return user;
    }

    static loginWithUsername(username) {
        const user = prisma.user.findUnique({
            where: {
                username: username
            },
            select: {
                code        : true,
                username    : true,
                password    : true,
                role        : true,
                deleted     : true
            }
        });
        return user;
    }

}