module.exports = (sequelize, DataTypes) => {
  const Enrollment = sequelize.define('Enrollment', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    enrollDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active'
    },
    code: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['userId', 'classId']
      }
    ]
  });

  return Enrollment;
};