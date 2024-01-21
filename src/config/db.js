const mongoose = require("mongoose");
const config = require("./config");

//const db_url = config.db.dbURL;
const dbURI  = config.db.dbURL;

//mongoose
//  .connect(db_url)
//  .then(() => {
//    console.log("Database connected");
//  })
//  .catch((err) => {
//    console.error(`Database is not connected. error message: ${err}`);
//  });


mongoose.connect(dbURI, {
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
  //useCreateIndex: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed due to app termination");
    process.exit(0);
  });
});