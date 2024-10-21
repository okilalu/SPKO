"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class responsible extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      responsible.belongsTo(models.customer, {
        foreignKey: "customerId",
      });
    }
  }
  responsible.init(
    {
      responsible: DataTypes.STRING,
      responsibleIdentity: DataTypes.STRING,
      responsibleNoIdentity: DataTypes.STRING,
      responsibleName: DataTypes.STRING,
      customerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "responsible",
    }
  );
  return responsible;
};
