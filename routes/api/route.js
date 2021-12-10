const express = require("express");
const bodyParser = require("body-parser")
const {registerValidation}  = require("../../controllers/validation")
const  {select, save, login, register, index}  = require("../../controllers/EmployeeController")
const router = express.Router();
const mongoose = require("mongoose");
const { MONGO_URI } = require("../../config/config");


//fetch from database
router.get("/", index)



//register
router.get("/register", register)



//login
router.get("/login", login)


////////////////////////////////// POST requests are made here /////////////////////

//insert a person
router.post("/register", save)




router.post("/login", select)


module.exports = router;