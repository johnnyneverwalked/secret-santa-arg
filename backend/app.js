const express = require("express");
const app = express();
const cors = require("cors")
const jsonParser = require("body-parser").json()
const path = require('path');
require("dotenv").config({path: path.join(__dirname + "/../.env")});

const {Connection} = require("./Connection");
const reqLogger = require("./RequestLogger");
const messages = require("./routes/messages");
const config = require("./routes/config");

app.use(jsonParser);
app.use(cors({origin: "*"}));

// Create link to Angular build directory
const distDir = path.join(__dirname + "/../dist/arg-site");
app.use(express.static(distDir));

app.use("/messages", reqLogger.log, messages);
app.use("/config", reqLogger.log, config);


app.get("/", (req, res) => {
    // res.send("Hello world!");
    res.redirect("/index.html");
})

Connection.open();

app.listen(process.env.PORT || 3000, async () => {
    console.log("Server is running");
    console.log(`Listening at port ${process.env.PORT || 3000}`);
})
