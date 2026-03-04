const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Package = sequelize.define(
    "Package",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

      package_name: { type: DataTypes.STRING(120), allowNull: false, unique: true },

      description: { type: DataTypes.TEXT, allowNull: true },

      price: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },

      session_count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },

      duration_days: { type: DataTypes.INTEGER, allowNull: true },

      is_active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    },
    {
      tableName: "packages",
      underscored: false,
    }
  );

  return Package;
};