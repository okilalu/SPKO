"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("penanggungJawabs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      penanggungJawab: {
        type: Sequelize.STRING,
      },
      identitasPenanggungJawab: {
        type: Sequelize.STRING,
      },
      noIdentitasPenanggungJawab: {
        type: Sequelize.STRING,
      },
      namaPenanggungJawab: {
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
    await queryInterface.dropTable("penanggungJawabs");
  },
};
