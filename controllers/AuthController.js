const {
  sequelize,
  User,
  StudentInformation,
  Address,
  BasicEducation,
  TertiaryEducation,
  ProfessionalSkill,
  EmployerFilter,
  Document,
  LearnerProgramme,
  Programme,
  CertificateAndTraning,
} = require("../models");
const { ApiError, ApiResp } = require("../utils/Response");
const bcryptjs = require("bcryptjs");

/**
 * @Athor Themba Makamu
 * @Date 13 June 2023
 * @Time 17:32
 * @controller - controller associated with authentications
 */

const AuthController = {
  signInUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      let usr = null;

      const user = await User.findOne({
        where: {
          email: email,
        },
        raw: true,
      });

      if (!user) {
        throw new ApiError("User email don't exist, please register", 404);
      }

      const isValid = await bcryptjs.compare(password, user.password);

      if (!isValid) {
        throw new ApiError("user credentials invalid", 404);
      }

      if (user.userType === "super") {
        return res.status(200).json(
          ApiResp("User logged in successfully", "user", {
            ...user,
            password: "",
          })
        );
      }

      if (user.userType === "employer") {
        usr = await User.findOne({
          where: {
            id: user.id,
          },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: EmployerFilter,
              as: "filters",
            },
          ],
        });
      }

      if (user.userType === "student") {
        usr = await User.findOne({
          where: {
            id: user.id,
          },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: StudentInformation,
              as: "studentInformation",
            },
            {
              model: Address,
              as: "studentAddress",
            },
            {
              model: BasicEducation,
              as: "basicEducation",
            },
            {
              model: TertiaryEducation,
              as: "tertiaryEducation",
            },
            {
              model: ProfessionalSkill,
              as: "skills",
            },
            {
              model: LearnerProgramme,
              as: "studentProgrammes",
              include: [
                {
                  model: Programme,
                  as: "programmes",
                },
              ],
            },
            {
              model: CertificateAndTraning,
              as: "certificates",
            },
          ],
          raw: true,
          nested: true,
        });
      }

      return res
        .status(200)
        .json(ApiResp("User logged in successfully", "user", usr));
    } catch (e) {
      console.log(e);
      next(e);
    }
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
