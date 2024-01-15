require("dotenv").config();

const dev = {
  app: {
    port: process.env.PORT || 5000,
  },
  db: {
    dbURL: process.env.DB_URI,
  },
};

module.exports = dev;
