"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class validasi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      validasi.belongsTo(models.nasabah, {
        foreignKey: "nasabahId",
      });
    }
  }
  validasi.init(
    {
      perilaku: DataTypes.STRING,
      kehadiran: DataTypes.STRING,
      kerjasamaTim: DataTypes.STRING,
      kelengkapanBerkas: DataTypes.STRING,
      nasabahId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "validasi",
    }
  );
  return validasi;
};
