/**
 * Author : Themba Makamu
 * Date : 13 June 2023
 */

const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require('cookie-parser')
const { sequelize } = require("./models");
const AppRouter = require("./routes");
const ErrorMid = require("./middlewares/ErrorMid");

// initalize express application
const app = express();

dotenv.config({ path: `${__dirname}/config/config.env` });

// middlewares
app.use(morgan("method :url :status :res[content-length] - :response-time ms"));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

const VERSION = process.env.API_VERSION || "v1";
const API_BASE_URL = `/api/${VERSION}`;
const PORT = process.env.PORT || 5000;

app.get("/", (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "Yes, it is working",
  });
});

app.use(`${API_BASE_URL}`, AppRouter);

app.use(ErrorMid)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} and version ${VERSION}`);
  sequelize.authenticate();
  console.log(`Database connected on port ${5432}`);
});
