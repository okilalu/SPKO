"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association
      customer.hasMany(models.validate, {
        foreignKey: "customerId",
      });
      customer.hasMany(models.responsible, {
        foreignKey: "customerId",
      });
    }
  }
  customer.init(
    {
      userId: DataTypes.INTEGER,
      identity: DataTypes.STRING,
      noIdentity: DataTypes.STRING,
      name: DataTypes.STRING,
      born: DataTypes.STRING,
      gender: DataTypes.STRING,
      religion: DataTypes.STRING,
      merriedStatus: DataTypes.STRING,
      citizenShip: DataTypes.STRING,
      motherName: DataTypes.STRING,
      address: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      education: DataTypes.STRING,
      jobStatus: DataTypes.STRING,
      businessCategory: DataTypes.STRING,
      businessDesc: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "customer",
    }
  );
  return customer;
};
