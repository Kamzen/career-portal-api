const { Router } = require("express");
const AuthController = require("../controllers/AuthController");

const AuthRouter = Router();

AuthRouter.post("/login", AuthController.signInUser);
AuthRouter.post("/register", AuthController.signUpUser);
AuthRouter.post('/reset-password', AuthController.resetPasswordUser)


module.exports = AuthRouter;