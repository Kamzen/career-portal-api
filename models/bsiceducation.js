"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BasicEducation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BasicEducation.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      grade: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      school: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      city: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      provice: {
        type: DataTypes.TEXT,
        allowNull: false
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
      modelName: "BasicEducation",
      tableName: "basicEducations",
      timestamps: true,
      createdAt: "dateCreated",
      updatedAt: "dateUpdated",
    }
  );
  return BasicEducation;
};
