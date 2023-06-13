"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StudentInformation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StudentInformation.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      identificationNumber: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      disbility: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      careerStatus: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false,
      },
      mobileNumber: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      race: {
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
      modelName: "StudentInformation",
      tableName: "studentInformations",
      timestamps: true,
      createdAt: "dateCreated",
      updatedAt: "dateUpdated",
    }
  );
  return StudentInformation;
};
