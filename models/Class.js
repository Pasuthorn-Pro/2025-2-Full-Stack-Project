const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

  const Class = sequelize.define("Class", {
    name: DataTypes.STRING,
    trainer: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    schedule: DataTypes.STRING
  });

  return Class;
};