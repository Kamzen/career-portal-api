const { Router } = require("express");
const AuthController = require("../controllers/AuthController");

const AuthRouter = Router();

AuthRouter.post("/login", AuthController.signInUser);
AuthRouter.post("/register", AuthController.signUpUser);
AuthRouter.post('/resetPassword', AuthController.resetPasswordUser)
AuthRouter.get('/isUserLoggedIn', AuthController.isUserLoggedIn)
AuthRouter.get('/refreshToken', AuthController.refreshToken)


module.exports = AuthRouter;