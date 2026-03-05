const { Sequelize } = require("sequelize");
const config = require("../config/config");

const sequelize = new Sequelize(config);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Package = require("./Package")(sequelize);

module.exports = db;