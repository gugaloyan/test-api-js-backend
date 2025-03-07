const logger = require("../../../services/logger.service")(module);
const { OK,UNAUTHORIZED,INTERNAL_ERROR } = require("../../../constants/http-codes");
const JwtService = require("../../../services/jwt.service");
const jwtConfig = require("../../../config").jwt;
const User = require("../../../DB/sample-db/schemas/user.schema");


/**
 * Авторизация пользователя по email и паролю.
 * POST /auth/login
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function getAuth(req, res) {
  logger.init("user login");

  const { email, password } = req.body;


  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(UNAUTHORIZED).json({ message: "Incorrect credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(UNAUTHORIZED).json({ message: "Incorrect credentials" });
    }

    const token = new JwtService(jwtConfig).encode(user).data;

    res.header("Authorization", `Bearer ${token}`);
    logger.success();
    return res.status(OK).json({ token, user: { id: user.id, full_name: user.full_name, email: user.email } });

  } catch (error) {
    logger.error(error.message);
    return res.status(INTERNAL_ERROR).json({ message: "Server error" });
  }
}



module.exports = {
  getAuth,
};
