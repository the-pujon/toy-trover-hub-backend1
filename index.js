//require("dotenv").config();
const config = require("./src/config/config")

const app=require("./app");

//const app = require("./app");

const PORT = config.app.port;

console.log(PORT)
app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
