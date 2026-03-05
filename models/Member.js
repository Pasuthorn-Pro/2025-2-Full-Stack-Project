const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

  const Member = sequelize.define("Member", {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false
    },

    phone: {
      type: DataTypes.STRING
    },

    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }

  }, {
    tableName: "members",
    freezeTableName: true,
    timestamps: false
  });

  return Member;
};