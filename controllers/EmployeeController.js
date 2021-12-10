const express = require("express");
const bodyParser = require("body-parser")
const {registerValidation} = require("./validation")
const User = require("../models/Employee")

//show the list of employees
//fetch from database
const index = async (req, res) => {
    try {
        const users = await User.find()
        if(!users) throw Error("something wrong")
        res.render("index", {
            users: users
        })
    } catch (err) {
        res.status(400).json({"msg": err})
    }
}

//register
const register = async (req, res) => {
    try {
        const users = await User.find()
        if (!users) throw Error("Can not register")
        res.render( "register", {
            users: users
        })
    } catch (err) {
        res.status(400).json({"msg": err})
    }
}


//login
const login = async (req, res) => {
    try {
        const users = await User.find()
        if (!users) throw Error("Can not Login")
        res.render("login", {
            users: users
        })
    } catch (err) {
        res.status(400).json({"msg": err})
    }
}

///////// POST requests are made here /////////

//insert a person

const save = async (req, res) => {
    const { error } = registerValidation(req.body);
    let { name } = req.body;
    let { password } = req.body;
    let data = { name, password };
    const newUser = new User(data)
    if (error) {
        return res.status(400).send(error.details[0].message);
    } else {
        try {
            const user = await newUser.save()
            if (!user) throw Error("can not save the new user")
            res.redirect("/")
        } catch (err) {
            res.status(400).json({"msg": err})
        }        
    }
}


// Login a person
const select = async (req, res) => {
    const { error } = registerValidation(req.body);
    let { name } = req.body;
    let { password } = req.body;
    let data = { name, password };
    if (error) {
        return res.status(400).send(error.details[0].message);
    } else {
        try {
            const user = await User.findOne({ name: name }).exec()
            if (!user) throw Error("could not find the user")
            else {
                try {
                    if (user.password === password) {
                        res.render("Hello", {
                            user: user
                        });                        
                    }
                } catch (err) {
                    res.send("Please try again"); 
                }
            }            
        } catch (err) {
                res.send("Please try again");             
        }
    }
}



module.exports = {select, save, login, index, register}