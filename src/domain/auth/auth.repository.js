// Import the Prisma client instance
import prisma from "../../utils/prisma.js";

// Define the AuthRepository class
export default class AuthRepository {

    /**
     * Get the total number of users in the database.
     * @returns {Promise<number>} The total count of users.
     */
    static async len() { 
        const count = await prisma.user.count();
        return count;
    }

    /**
     * Find a user by their username.
     * @param {string} username - The username to search for.
     * @returns {Promise<Object|null>} The user object if found, otherwise null.
     */
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

    /**
     * Find a user by their email.
     * @param {string} email - The email to search for.
     * @returns {Promise<Object|null>} The user object if found, otherwise null.
     */
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

    /**
     * Register a new user in the database.
     * @param {Object} data - The user data to register.
     * @param {string} data.code - The user code.
     * @param {string} data.firstName - The user's first name.
     * @param {string} data.lastName - The user's last name.
     * @param {string} data.username - The user's username.
     * @param {string} data.email - The user's email.
     * @param {string} data.password - The user's password.
     * @returns {Promise<Object>} The newly created user object.
     */
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

    /**
     * Find a user by their email for login purposes.
     * @param {string} email - The email to search for.
     * @returns {Promise<Object|null>} The user object if found, otherwise null.
     */
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

    /**
     * Find a user by their username for login purposes.
     * @param {string} username - The username to search for.
     * @returns {Promise<Object|null>} The user object if found, otherwise null.
     */
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