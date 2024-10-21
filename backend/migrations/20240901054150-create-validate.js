"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("validates", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      behavior: {
        type: Sequelize.STRING,
      },
      attendance: {
        type: Sequelize.STRING,
      },
      teamwork: {
        type: Sequelize.STRING,
      },
      fileCompleteness: {
        type: Sequelize.STRING,
      },
      customerId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("validates");
  },
};
