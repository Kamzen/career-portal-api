const { Router } = require("express");
const AuthRouter = require("./Authouter");

const AppRouter = Router();

AppRouter.use("/auth", AuthRouter);

module.exports = AppRouter;
