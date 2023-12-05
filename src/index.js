const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
// require express for routes
const { notFound, errorHandler } = require("./middleware/errormiddleware");
// mongoose connection file
require("./models/Conn");

const app = express();
dotenv.config();

// bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors policy for browser recieve data from frontend
app.use(cors());

// routes connetion file
const routers = require("./routes/route");

// all route from this line
app.use("/api/users", routers);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4400;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
