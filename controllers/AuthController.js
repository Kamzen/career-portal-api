const { sequelize, User, StudentInformation } = require("../models");
const { ApiError, ApiResp } = require("../utils/Response");
const bcryptjs = require("bcryptjs");

/**
 * @Athor Themba Makamu
 * @Date 13 June 2023
 * @Time 17:32
 * @controller - controller associated with authentications
 */

const AuthController = {
  signInUser: (req, res, next) => {
    const { email, password } = req.body;
  },
  /**
   * @method signUpUser
   * @description function to register new user // usually students
   * @return : return user created and token
   * @param ['userInfo', 'email', 'password']
   */

  signUpUser: async (req, res, next) => {
    const t = await sequelize.transaction();

    try {
      if (req.body?.email === "") {
        throw new ApiError("Email is required", 422);
      }

      if (req.body?.identificationNumber === "") {
        throw new ApiError("Identification number required", 422);
      }

      // check if email exist
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (user) {
        throw new ApiError("User email already taken", 409);
      }

      // check if Id number already registered
      const id = await StudentInformation.findOne({
        where: {
          identificationNumber: req.body.identificationNumber,
        },
      });

      if (id) {
        throw new ApiError(
          "User id number already registered, please try reset password",
          409
        );
      }

      // if everything is fine register user
      const password = await bcryptjs.hash(
        req.body.password,
        await bcryptjs.genSalt(10)
      );
      const usr = await User.create(
        { ...req.body, password: password },
        { transaction: t }
      );
      await StudentInformation.create(
        { identificationNumber: req.body.identificationNumber, userId: usr.id },
        { transaction: t }
      );

      t.commit();

      return res
        .status(201)
        .json(ApiResp("User created successfully", "user", usr));
    } catch (e) {
      console.log(e);
      t.rollback();
      next(e);
    }
  },
  resetPasswordUser: (req, res, next) => {
    res.status(200).json({
      success: true,
      message: "Reset Password User",
    });
  },
};

module.exports = AuthController;
