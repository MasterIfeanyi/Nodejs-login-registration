const mongoose = require("mongoose");
const express = require("express");
const Schema = mongoose.Schema;
const { MONGO_URI } = require("../config/config");

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const user = mongoose.model("User", userSchema)

module.exports = user
