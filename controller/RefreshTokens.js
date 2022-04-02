const { RefreshToken, User } = require("../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = {
  create: async (req, res) => {
    try {
      const { userId, refreshToken } = req.body;
      const schema = {
        refreshToken: "string",
        userId: "number",
      };
      const validate = v.validate(req.body, schema);

      if (validate.length) {
        return res.status(400).json({
          status: "error",
          message: validate,
        });
      }
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({
          status: "error",
          message: "User not found",
        });
      }

      const createdRefreshToken = await RefreshToken.create({
        token: refreshToken,
        user_id: userId,
      });

      return res.status(200).json({
        status: "success",
        data: {
          id: createdRefreshToken.id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
  getToken: async (req, res) => {
    try {
      const refreshToken = req.query.refresh_token;
      const token = await RefreshToken.findOne({
        token: refreshToken,
      });
      if (!token) {
        return res.status(400).json({
          status: "error",
          message: "Invalid Token",
        });
      }

      return res.status(200).json({
        status: "success",
        token: token,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
