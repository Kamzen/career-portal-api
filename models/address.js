"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Address.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      streetNumber: {
        type: DataTypes.TEXT,
      },
      streetName: {
        type: DataTypes.TEXT,
      },
      suburb: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      manicipality: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      city: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      province: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      country: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      postalCode: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      dateCreated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      dateUpdated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Address",
      tableName: "addresses",
      timestamps: true,
      createdAt: "dateCreated",
      updatedAt: "dateUpdated",
    }
  );
  return Address;
};
