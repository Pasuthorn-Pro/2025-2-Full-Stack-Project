"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("packages", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },

      package_name: { type: Sequelize.STRING(120), allowNull: false, unique: true },
      description: { type: Sequelize.TEXT, allowNull: true },
      price: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      session_count: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
      duration_days: { type: Sequelize.INTEGER, allowNull: true },
      is_active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },

      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("packages");
  },
};