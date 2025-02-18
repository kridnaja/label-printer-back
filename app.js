require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const rateLimitMiddleware = require('./src/middlewares/rate-limit')
const adminRoute = require("./src/routes/readAll-route");
const zohoRoute = require("./src/routes/addZohoData-route");


const app = express();

app.use(cors());
app.use(morgan("dev"));
// app.use(rateLimitMiddleware)
app.use(express.json());
// app.use(express.static('public'))


app.use("/admin", adminRoute);
app.use("/adminZoho", zohoRoute);

const PORT = process.env.PORT || "5000";

app.listen(PORT, () => console.log(`server runnig on port: ${PORT}`));
