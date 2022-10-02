const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");
const erroMiddleware = require("./middleware/error");
const cookieParser = require('cookie-parser')
app.use(express.json());
app.use(cookieParser())
// route
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use("/api", productRoute);
app.use("/api", userRoute)
app.use("/api", orderRoute)

app.use(erroMiddleware);
module.exports = app;