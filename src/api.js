// library
import express from "express";

// import controllers
import AuthController from "./domain/auth/auth.controller.js";
import AccountController from "./domain/account/account.controller.js";

// import middlewares
import VerfyToken from "./middlewares/verify-token.middleware.js";

// init router
const api = express.Router();

// authentication
api.post("/auth/register", AuthController.register);
api.post("/auth/login", AuthController.login);
api.get("/auth/token", AuthController.refresh_token);
api.get("/auth/logout", AuthController.logout);

// account
api.get("/account/:code", VerfyToken, AccountController.findCode);
api.patch("/account/:code", VerfyToken, AccountController.update);
api.delete("/account/:code", VerfyToken, AccountController.softDelete);

// export
export default api