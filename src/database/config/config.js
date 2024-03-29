require("dotenv").config();


let config = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  dialectModule: require("pg"),
  migrationStorageTableName: "sequelize_migrations",
  seederStorageTableName: "sequelize_seeds",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    connectTimeout: 60000,
  },
};

module.exports = {
  development: config,
  test: config,
  production: config,
};
