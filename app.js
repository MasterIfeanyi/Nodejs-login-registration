const express = require("express");
const path = require("path");
const bodyParser = require("body-parser")
const app = express();
const {registerValidation} = require("./controllers/validation")
const mongoose = require("mongoose");
const { MONGO_URI } = require("./config/config");
const routes = require("./routes/api/route")
const logger = require('morgan');
const dotenv = require('dotenv');
dotenv.config();


const port = process.env.PORT || 5000



//connect to mongodb
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("connected to MongoDB"))
.catch(err => console.log(err));

//morgan
app.use(logger('dev'));

//use body-parser
app.use(bodyParser.urlencoded({ extended: false }));


//json bodyParser
app.use(bodyParser.json());


//set static folder
app.use(express.static(path.join(__dirname, "/public")))


//set template engine
app.set("view engine", "ejs");

//set views file
app.set("views", path.join(__dirname, "views"));


//routes middlewrae
app.use("/api/route|/", routes)
// app.use("https://lace-sand-citipati.glitch.me|/", routes)



app.listen(port, () => console.log("sever is on 5000"));