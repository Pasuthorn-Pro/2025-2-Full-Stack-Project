const { Sequelize } = require("sequelize");
const config = require("../config/config");

const sequelize = new Sequelize(config);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.Member = require("./Member")(sequelize);
db.Package = require("./Package")(sequelize);
db.Class = require("./Class")(sequelize);
db.Enrollment = require("./Enrollment")(sequelize);

module.exports = db;