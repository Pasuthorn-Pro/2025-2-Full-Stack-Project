require("dotenv").config();

const env = process.env.NODE_ENV || "development";

const common = {
  dialect: "sqlite",
  storage: "./database.sqlite",
};

module.exports = {
  development: { ...common },
  test: { ...common, storage: ":memory:" },
  production: { ...common },
}[env];