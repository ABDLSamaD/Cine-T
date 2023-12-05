const mongoose = require("mongoose");
mongoose
  .connect("mongodb://0.0.0.0:27017/Cine-t")
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });
