require("dotenv").config();

const env = process.env.NODE_ENV || "development";

const common = {
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false,
};

module.exports = {
  development: { ...common },
  test: { ...common, storage: ":memory:" },
  production: { ...common },
}[env];