const AuthController = {
  signInUser: (req, res, next) => {
    return res.status(200).json({
      success: true,
      message: 'Login User'
    })
  },
  signUpUser: (req, res, next) => {
    return res.status(200).json({
      success: true,
      message: 'Register User'
    })
  },
  resetPasswordUser: (req, res, next) => {
    res.status(200).json({
      success: true,
      message: 'Reset Password User'
    })
  }
}

module.exports = AuthController;