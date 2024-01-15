const mongoose = require("mongoose");
const config = require("./config");

const db_url = config.db.dbURL;

mongoose
  .connect(db_url)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error(`Database is not connected. error message: ${err}`);
  });
