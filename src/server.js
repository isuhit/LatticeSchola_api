const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config();

const port = process.env.PORT || 3030;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB...")
    app.listen(port, (req, res) => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err.reason);
  });
