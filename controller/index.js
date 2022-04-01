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

      const user = await User.findOne({ where: { email: email } });
      console.log(email);
      console.log(user);
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
};
