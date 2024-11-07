"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class nasabah extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association
      nasabah.hasMany(models.validasi, {
        foreignKey: "nasabahId",
      });
      nasabah.hasMany(models.penanggungJawab, {
        foreignKey: "nasabahId",
      });
    }
  }
  nasabah.init(
    {
      userId: DataTypes.INTEGER,
      identitas: DataTypes.STRING,
      noIdentitas: DataTypes.STRING,
      nama: DataTypes.STRING,
      ttl: DataTypes.STRING,
      jenisKelamin: DataTypes.STRING,
      agama: DataTypes.STRING,
      statusPerkawninan: DataTypes.STRING,
      kewarganegaraan: DataTypes.STRING,
      namaIbu: DataTypes.STRING,
      alamat: DataTypes.STRING,
      noHP: DataTypes.STRING,
      pendidikan: DataTypes.STRING,
      statusPekerjaan: DataTypes.STRING,
      kategoriBisnis: DataTypes.STRING,
      deskBisnis: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "nasabah",
    }
  );
  return nasabah;
};
