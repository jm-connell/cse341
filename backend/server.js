// set up express server
const express = require("express");
const cors = require("cors");
const baseRoute = require("./routes/baseRoute");
const app = express();
require("dotenv").config();

app.use(cors());

// routes defined in routes folder
app.use("/", baseRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
