const bcrypt = require("bcrypt");
const { User, RefreshToken } = require("../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = {
  register: async (req, res) => {
    try {
      const { name, email, password, profession } = req.body;

      const schema = {
        name: "string|empty:false",
        email: "email|empty:false",
        password: "string|min:6",
        profession: "string|optional",
      };

      const validate = v.validate(req.body, schema);

      if (validate.length) {
        return res.status(400).json({
          status: "error",
          message: validate,
        });
      }

      const user = await User.findOne({ email: email });

      if (user) {
        return res.status(409).json({
          status: "error",
          message: "Email alyready exist",
        });
      }

      const passwordHas = await bcrypt.hash(password, 10);

      const data = {
        password: passwordHas,
        name: name,
        email: email,
        profession: profession,
        role: "student",
      };

      const createUser = await User.create(data);

      return res.status(200).json({
        status: "success",
        data: {
          id: createUser.id,
        },
      });
    } catch (error) {
      console.log("error:", error);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const schema = {
        email: "email|empty:false",
        password: "string|min:6",
      };

      const validate = v.validate(req.body, schema);

      if (validate.length) {
        return res.status(400).json({
          status: "error",
          message: validate,
        });
      }

      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(404).json({
          status: "error",
          message: "User not found.!",
        });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(404).json({
          status: "error",
          message: "Password not match",
        });
      }

      res.status(200).json({
        status: "success",
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          profession: user.profession,
        },
      });
    } catch (error) {
      console.log("error:", error);
    }
  },
  updateProfile: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, password, profession, avatar } = req.body;
      const schema = {
        name: "string|empty:false",
        email: "email|empty:false",
        password: "string|min:6",
        profession: "string|optional",
        avatar: "string|optional",
      };

      const validate = v.validate(req.body, schema);

      if (validate.length) {
        return res.status(400).json({
          status: "error",
          message: validate,
        });
      }

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          status: "error",
          message: "User not found",
        });
      }

      if (email) {
        const checkEmail = await User.findOne({ where: { email: email } });

        if (checkEmail && email !== user.email) {
          return res.status(409).json({
            status: "error",
            message: "Email already Exist",
          });
        }
      }

      const passwordHas = await bcrypt.hash(password, 10);

      await user.update({
        email: email,
        password: passwordHas,
        name: name,
        profession: profession,
        avatar: avatar,
      });

      return res.status(200).json({
        status: "success",
        data: {
          id: user.id,
          name,
          email,
          profession,
          avatar,
        },
      });
    } catch (error) {
      console.log("error:", error);
    }
  },
};
