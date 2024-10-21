"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class validate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      validate.belongsTo(models.customer, {
        foreignKey: "customerId",
      });
    }
  }
  validate.init(
    {
      behavior: DataTypes.STRING,
      attendance: DataTypes.STRING,
      teamwork: DataTypes.STRING,
      fileCompleteness: DataTypes.STRING,
      incomplate: DataTypes.STRING,
      customerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "validate",
    }
  );
  return validate;
};
