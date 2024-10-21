"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("customers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      identity: {
        type: Sequelize.STRING,
      },
      noIdentity: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      born: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.STRING,
      },
      religion: {
        type: Sequelize.STRING,
      },
      merriedStatus: {
        type: Sequelize.STRING,
      },
      citizenShip: {
        type: Sequelize.STRING,
      },
      motherName: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      phoneNumber: {
        type: Sequelize.STRING,
      },
      education: {
        type: Sequelize.STRING,
      },
      jobStatus: {
        type: Sequelize.STRING,
      },
      businessCategory: {
        type: Sequelize.STRING,
      },
      businessDesc: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("customers");
  },
};
