"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("nasabahs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      identitas: {
        type: Sequelize.STRING,
      },
      noIdentitas: {
        type: Sequelize.STRING,
      },
      nama: {
        type: Sequelize.STRING,
      },
      ttl: {
        type: Sequelize.STRING,
      },
      jenisKelamin: {
        type: Sequelize.STRING,
      },
      agama: {
        type: Sequelize.STRING,
      },
      statusPerkawninan: {
        type: Sequelize.STRING,
      },
      kewarganegaraan: {
        type: Sequelize.STRING,
      },
      namaIbu: {
        type: Sequelize.STRING,
      },
      alamat: {
        type: Sequelize.STRING,
      },
      noHP: {
        type: Sequelize.STRING,
      },
      pendidikan: {
        type: Sequelize.STRING,
      },
      statusPekerjaan: {
        type: Sequelize.STRING,
      },
      kategoriBisnis: {
        type: Sequelize.STRING,
      },
      deskBisnis: {
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
    await queryInterface.dropTable("nasabahs");
  },
};
