//require("dotenv").config();
//const config = require("./src/config/config")

const app=require("./app");

//const app = require("./app");

//const PORT = config.app.port;
app.listen(1000, () => {
  console.log(`server is running at http://localhost:${1000}`);
});
