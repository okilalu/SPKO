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
      perilaku: {
        type: Sequelize.STRING,
      },
      kehadiran: {
        type: Sequelize.STRING,
      },
      kerjasamaTim: {
        type: Sequelize.STRING,
      },
      kelengkapanBerkas: {
        type: Sequelize.STRING,
      },
      nasabahId: {
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
