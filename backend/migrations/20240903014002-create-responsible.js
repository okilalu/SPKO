"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("responsibles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      responsible: {
        type: Sequelize.STRING,
      },
      responsibleIdentity: {
        type: Sequelize.STRING,
      },
      responsibleNoIdentity: {
        type: Sequelize.STRING,
      },
      responsibleName: {
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
    await queryInterface.dropTable("responsibles");
  },
};
