"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class penanggungJawab extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      penanggungJawab.belongsTo(models.nasabah, {
        foreignKey: "nasabahId",
      });
    }
  }
  penanggungJawab.init(
    {
      penanggungJawab: DataTypes.STRING,
      identitasPenanggungJawab: DataTypes.STRING,
      noIdentitasPenanggungJawab: DataTypes.STRING,
      namaPenanggungJawab: DataTypes.STRING,
      nasabahId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "penanggungJawab",
    }
  );
  return penanggungJawab;
};
