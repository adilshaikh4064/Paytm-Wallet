const express = require("express");
const cors = require("cors");

const { connectDB, UserModel } = require("./db");
const { VersionOneRouter } = require("./routes");
const { PORT } = require("./config");

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1", VersionOneRouter);

app.listen(PORT, function () {
    console.log(`paytm app is listening on port number: ${PORT}`);
});
