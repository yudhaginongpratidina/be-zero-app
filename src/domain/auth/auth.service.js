// Import necessary modules and classes
import bcrypt from "bcrypt";
import AuthRepository from "./auth.repository.js";
import ResponseError from "../../utils/response-error.js";
import generateCustomUserIdentifier from "../../utils/generate-custom-identifier.js";

// Define the AuthService class
export default class AuthService {

    /**
     * Register a new user.
     * @param {Object} data - The user data to register.
     * @param {string} data.firstName - The user's first name.
     * @param {string} data.lastName - The user's last name.
     * @param {string} data.username - The user's username.
     * @param {string} data.email - The user's email.
     * @param {string} data.password - The user's password.
     * @returns {Promise<Object>} The newly created user object.
     * @throws {ResponseError} If the username or email already exists.
     */
    static async register(data) {
        // Destructure data
        const { firstName, lastName, username, email, password } = data;

        // Check if the username already exists
        const existingUsername = await AuthRepository.findUsername(username);
        if (existingUsername) throw new ResponseError(400, "Username already exists");

        // Check if the email already exists
        const existingEmail = await AuthRepository.findEmail(email);
        if (existingEmail) throw new ResponseError(400, "Email already exists");

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate a custom user identifier
        const userCount = await AuthRepository.len();
        const code = generateCustomUserIdentifier(`USER${userCount + 1}`);

        // Prepare user data
        const userData = { code, firstName, lastName, username, email, password: hashedPassword };

        // Create the user in the database
        const user = await AuthRepository.register(userData);
        
        // Return the newly created user
        return user;
    }

    /**
     * Login a user using their email.
     * @param {Object} data - The login data.
     * @param {string} data.email - The user's email.
     * @param {string} data.password - The user's password.
     * @returns {Promise<Object>} The user object if login is successful.
     * @throws {ResponseError} If the user is not found, the password is invalid, or the user is deleted.
     */
    static async loginWithEmail(data) {
        // Destructure data
        const { email, password } = data;

        // Find the user by email
        const user = await AuthRepository.loginWithEmail(email);
        if (!user) throw new ResponseError(400, "User not found");

        // Check if the password is valid
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new ResponseError(400, "Invalid password");

        // Check if the user is deleted
        if (user.deleted) throw new ResponseError(400, "User is deleted");

        // Return the user
        return user;
    }

    /**
     * Login a user using their username.
     * @param {Object} data - The login data.
     * @param {string} data.username - The user's username.
     * @param {string} data.password - The user's password.
     * @returns {Promise<Object>} The user object if login is successful.
     * @throws {ResponseError} If the user is not found, the password is invalid, or the user is deleted.
     */
    static async loginWithUsername(data) {
        // Destructure data
        const { username, password } = data;

        // Find the user by username
        const user = await AuthRepository.loginWithUsername(username);
        if (!user) throw new ResponseError(400, "User not found");

        // Check if the password is valid
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new ResponseError(400, "Invalid password");

        // Check if the user is deleted
        if (user.deleted) throw new ResponseError(400, "User is deleted");

        // Return the user
        return user;
    }

}