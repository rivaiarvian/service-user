"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Rivai Arvian",
          profession: "Frontend Development",
          role: "admin",
          email: "rivai@gmail.com",
          password: await bcrypt.hash("bismillah", 10),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Adzkiya naseeka shanum",
          profession: "Backend Development",
          role: "student",
          email: "shanum@gmail.com",
          password: await bcrypt.hash("bismillah", 10),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
