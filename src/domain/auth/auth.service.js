import bcrypt from "bcrypt";
import AuthRepository from "./auth.repository.js";
import ResponseError from "../../utils/response-error.js";
import generateCustomUserIdentifier from "../../utils/generate-custom-identifier.js";

export default class AuthService {

    static async register(data) {
        // destructure data
        const { firstName, lastName, username, email, password } = data;

        // validation check
        const existingUsername = await AuthRepository.findUsername(username);
        if (existingUsername) throw new ResponseError(400, "Username already exists");

        const existingEmail = await AuthRepository.findEmail(email);
        if (existingEmail) throw new ResponseError(400, "Email already exists");

        // manipulate data
        const hashedPassword    = await bcrypt.hash(password, 10);
        const userCount         = await AuthRepository.len();
        const code              = generateCustomUserIdentifier(`USER${userCount + 1}`);
        const userData          = { code, firstName, lastName, username, email, password: hashedPassword };

        // create user
        const user              = await AuthRepository.register(userData);
        
        // return user
        return user;
    }

    static async loginWithEmail(data) {
        // destructure data
        const { email, password } = data;

        // validation check
        const user = await AuthRepository.loginWithEmail(email);
        if (!user) throw new ResponseError(400, "User not found");

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new ResponseError(400, "Invalid password");

        // check if user is deleted
        if (user.deleted) throw new ResponseError(400, "User is deleted");

        // return user
        return user;
    }

    static async loginWithUsername(data) {
        // destructure data
        const { username, password } = data;

        // validation check
        const user = await AuthRepository.loginWithUsername(username);
        if (!user) throw new ResponseError(400, "User not found");

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new ResponseError(400, "Invalid password");

        // check if user is deleted
        if (user.deleted) throw new ResponseError(400, "User is deleted");

        // return user
        return user;
    }

}